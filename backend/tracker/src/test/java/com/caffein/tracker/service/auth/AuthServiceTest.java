package com.caffein.tracker.service.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.caffein.tracker.config.security.jwt.JwtService;
import com.caffein.tracker.dto.UserDTO;
import com.caffein.tracker.mapper.UserMapper;
import com.caffein.tracker.model.User;
import com.caffein.tracker.re.request.auth.LoginRequest;
import com.caffein.tracker.re.request.auth.RefreshRequest;
import com.caffein.tracker.re.request.auth.RegistrationReq;
import com.caffein.tracker.re.response.LoginResponse;
import com.caffein.tracker.re.response.RefreshResponse;
import com.caffein.tracker.repository.UserRepository;

import static org.mockito.Mockito.never;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService Unit Test")
public class AuthServiceTest {

    @InjectMocks
    AuthService authService;

    @Mock
    AuthenticationManager authenticationManager;

    @Mock
    JwtService jwtService;

    @Mock
    UserMapper userMapper;

    @Mock
    UserRepository userRepository;

    @Test
    void testLogin() {

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("email@gmail.com");
        loginRequest.setPassword("password");

        User user = User.builder()
                .id("123")
                .email("email@gmail.com")
                .password("password")
                .build();

        UserDTO userDTO = UserDTO.builder()
                .id("123")
                .email("email@gmail.com")
                .build();

        Authentication auth = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(auth);

        ArgumentCaptor<UsernamePasswordAuthenticationToken> tokenCaptor = ArgumentCaptor
                .forClass(UsernamePasswordAuthenticationToken.class);

        when(auth.getPrincipal()).thenReturn(user);

        when(jwtService.generateAccessToken("email@gmail.com"))
                .thenReturn("access-token");

        when(jwtService.generateAccessRefreshToken("email@gmail.com"))
                .thenReturn("refresh-token");

        when(userMapper.toDto(user))
                .thenReturn(userDTO);

        LoginResponse result = authService.login(loginRequest);

        assertThat(result.getAccessToken()).isEqualTo("access-token");
        assertThat(result.getRefreshToken()).isEqualTo("refresh-token");
        assertThat(result.getTokenType()).isEqualTo("Bearer ");
        assertThat(result.getUser()).isSameAs(userDTO);

        verify(authenticationManager).authenticate(tokenCaptor.capture());
        UsernamePasswordAuthenticationToken token = tokenCaptor.getValue();

        assertThat(token.getPrincipal()).isEqualTo("email@gmail.com");
        assertThat(token.getCredentials()).isEqualTo("password");
    }

    @Test
    void testLogin_throws_whenBadCredentials() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("wrong@gmail.com");
        loginRequest.setPassword("wrong-password");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        assertThatThrownBy(() -> authService.login(loginRequest))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessageContaining("Bad credentials");

        verify(jwtService, never()).generateAccessToken(any());
        verify(jwtService, never()).generateAccessRefreshToken(any());
        verify(userMapper, never()).toDto(any());
    }

    @Test
    void testRefresh() {

        RefreshRequest req = new RefreshRequest();
        req.setRefreshToken("myRFTK");

        when(jwtService.refreshAccessToken("myRFTK")).thenReturn("new-access-token");

        RefreshResponse res = authService.refresh(req);

        assertThat(res.getAccessToken()).isEqualTo("new-access-token");
        assertThat(res.getTokenType()).isEqualTo("Bearer ");
        verify(jwtService).refreshAccessToken("myRFTK");

    }

    @Test
    void testRegister() {
        RegistrationReq req = new RegistrationReq();
        req.setFirstName("John");
        req.setLastName("Doe");
        req.setEmail("email@gmail.com");
        req.setPassword("password123");
        req.setConfirmPassword("password123");

        User user = User.builder()
                .email("email@gmail.com")
                .password("encoded-password")
                .build();

        User savedUser = User.builder()
                .id("123")
                .email("email@gmail.com")
                .password("encoded-password")
                .build();

        UserDTO userDTO = UserDTO.builder()
                .id("123")
                .email("email@gmail.com")
                .build();

        when(userRepository.existsByEmailIgnoreCase("email@gmail.com"))
                .thenReturn(false);
        when(userMapper.toUser(req))
                .thenReturn(user);
        when(userRepository.save(user))
                .thenReturn(savedUser);
        when(jwtService.generateAccessToken("email@gmail.com"))
                .thenReturn("access-token");
        when(jwtService.generateAccessRefreshToken("email@gmail.com"))
                .thenReturn("refresh-token");
        when(userMapper.toDto(savedUser))
                .thenReturn(userDTO);

        LoginResponse res = authService.register(req);

        assertThat(res.getAccessToken()).isEqualTo("access-token");
        assertThat(res.getRefreshToken()).isEqualTo("refresh-token");
        assertThat(res.getTokenType()).isEqualTo("Bearer ");
        assertThat(res.getUser()).isSameAs(userDTO);

        verify(userRepository).existsByEmailIgnoreCase("email@gmail.com");
        verify(userMapper).toUser(req);
        verify(userRepository).save(user);
    }

    @Test
    void testRegister_throws_whenPasswordDoesNotMatch() {
        RegistrationReq req = new RegistrationReq();
        req.setFirstName("John");
        req.setLastName("Doe");
        req.setEmail("email@gmail.com");
        req.setPassword("password123");
        req.setConfirmPassword("different-password");

        assertThatThrownBy(() -> authService.register(req))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Password does not match");

        verify(userRepository, never()).existsByEmailIgnoreCase(any());
        verify(userMapper, never()).toUser(any());
        verify(userRepository, never()).save(any());
        verify(jwtService, never()).generateAccessToken(any());
        verify(jwtService, never()).generateAccessRefreshToken(any());
    }

}
