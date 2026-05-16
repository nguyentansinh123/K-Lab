package com.caffein.tracker.service.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.caffein.tracker.config.security.jwt.JwtService;
import com.caffein.tracker.exception.AppException;
import com.caffein.tracker.exception.ErrorCode;
import com.caffein.tracker.mapper.UserMapper;
import com.caffein.tracker.model.User;
import com.caffein.tracker.re.request.auth.LoginRequest;
import com.caffein.tracker.re.request.auth.RefreshRequest;
import com.caffein.tracker.re.request.auth.RegistrationReq;
import com.caffein.tracker.re.response.LoginResponse;
import com.caffein.tracker.re.response.RefreshResponse;
import com.caffein.tracker.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private static final String TOKEN_TYPE = "Bearer ";

    @Override
    public LoginResponse login(LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        User user = (User) auth.getPrincipal();
        return issueTokensFor(user);
    }

    @Override
    public RefreshResponse refresh(RefreshRequest request) {
        String newAccessToken = jwtService.refreshAccessToken(request.getRefreshToken());
        return RefreshResponse.builder()
                .accessToken(newAccessToken)
                .tokenType(TOKEN_TYPE)
                .build();
    }

    @Override
    @Transactional
    public LoginResponse register(RegistrationReq request) {
        checkPasswordMatch(request.getPassword(), request.getConfirmPassword());
        checkEmail(request.getEmail());

        User user = userMapper.toUser(request);
        User savedUser = userRepository.save(user);

        return issueTokensFor(savedUser);
    }

    private LoginResponse issueTokensFor(User user) {
        String accessToken = jwtService.generateAccessToken(user.getEmail());
        String refreshToken = jwtService.generateAccessRefreshToken(user.getEmail());

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType(TOKEN_TYPE)
                .user(userMapper.toDto(user))
                .build();
    }

    private void checkEmail(String email) {
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }
    }

    private void checkPasswordMatch(String password, String confirmPassword) {
        if (password == null || !password.equals(confirmPassword)) {
            throw new AppException(ErrorCode.PASSWORD_MISMATCH);
        }
    }

}
