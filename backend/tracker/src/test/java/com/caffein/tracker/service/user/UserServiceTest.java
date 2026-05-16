package com.caffein.tracker.service.user;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.io.IOException;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import com.caffein.tracker.model.User;
import com.caffein.tracker.repository.UserRepository;
import com.cloudinary.Cloudinary;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.ArgumentMatchers.eq;

import java.io.File;
import java.util.Map;

import static org.mockito.Mockito.never;

import com.cloudinary.Uploader;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserService Unit Test")
public class UserServiceTest {

  @Mock
  UserRepository userRepository;

  @Mock
  Cloudinary cloudinary;

  @InjectMocks
  UserService userService;

  @Test
  void findbyId_returnUser_whenExists() {

    User user = User.builder().id("123").email("email@gmail.com").build();
    when(userRepository.findById("123")).thenReturn(Optional.of(user));

    Optional<User> result = userService.findById("123");

    assertThat(result).isPresent();
    assertThat(result.get().getEmail()).isEqualTo("email@gmail.com");

  }

  @Test
  void findbyId_returnEmpty_whenNotExist() {

    when(userRepository.findById("nope")).thenReturn(Optional.empty());

    Optional<User> result = userService.findById("nope");

    assertThat(result).isEmpty();
  }

  @Test
  void loadUserByUserName_returnUser_whenExists() {
    User user = User.builder().id("123").email("email@gmail.com").build();
    when(userRepository.findByEmailIgnoreCase("email@gmail.com")).thenReturn(Optional.of(user));

    UserDetails result = userService.loadUserByUsername("email@gmail.com");

    assertThat(result).isSameAs(user);
    assertThat(result.getUsername()).isEqualTo("email@gmail.com");
  }

  @Test
  void loadUserByUserName_throws_whenNotExists() {
    when(userRepository.findByEmailIgnoreCase("missing@gmail.com"))
        .thenReturn(Optional.empty());

    assertThatThrownBy(() -> userService.loadUserByUsername("missing@gmail.com"))
        .isInstanceOf(UsernameNotFoundException.class)
        .hasMessageContaining("missing@gmail.com");
  }

  @AfterEach
  void clearSecurityContext() {
    SecurityContextHolder.clearContext();
  }

  @Test
  void addImageUrl_uploadsAndSaves_whenNoOldImage() throws IOException {

    User user = User.builder().id("123").email("abc@gmail.com").imgUrl(null).build();

    SecurityContext ctx = mock(SecurityContext.class);
    Authentication auth = mock(Authentication.class);
    when(ctx.getAuthentication()).thenReturn(auth);
    when(auth.getPrincipal()).thenReturn(user);
    SecurityContextHolder.setContext(ctx);

    MultipartFile file = mock(MultipartFile.class);
    when(file.getOriginalFilename()).thenReturn("avatar.png");
    when(file.getBytes()).thenReturn(new byte[] { 1, 2, 3 });

    Uploader uploader = mock(Uploader.class);
    when(cloudinary.uploader()).thenReturn(uploader);
    when(uploader.upload(any(File.class), anyMap()))
        .thenReturn(Map.of("url", "https://res.cloudinary.com/x/upload/v1/userAva/new.jpg"));
    
    when(userRepository.save(any(User.class))).thenReturn(user);

    User result = userService.addImageUrl(file);

    assertThat(result).isSameAs(user);
    assertThat(user.getImgUrl())
        .isEqualTo("https://res.cloudinary.com/x/upload/v1/userAva/new.jpg");
    verify(userRepository).save(user);
    verify(uploader, never()).destroy(any(), anyMap());

  }

  @Test
  void addImageUrl_uploadsAndSavesAndDeletesOldImage_whenOldImageExists() throws IOException {

    User user = User.builder()
        .id("123")
        .email("abc@gmail.com")
        .imgUrl("https://res.cloudinary.com/x/upload/v1/userAva/old.jpg")
        .build();

    SecurityContext ctx = mock(SecurityContext.class);
    Authentication auth = mock(Authentication.class);
    when(ctx.getAuthentication()).thenReturn(auth);
    when(auth.getPrincipal()).thenReturn(user);
    SecurityContextHolder.setContext(ctx);

    MultipartFile file = mock(MultipartFile.class);
    when(file.getOriginalFilename()).thenReturn("avatar.png");
    when(file.getBytes()).thenReturn(new byte[] { 1, 2, 3 });

    Uploader uploader = mock(Uploader.class);
    when(cloudinary.uploader()).thenReturn(uploader);
    when(uploader.upload(any(File.class), anyMap()))
        .thenReturn(Map.of("url", "https://res.cloudinary.com/x/upload/v2/userAva/new.jpg"));

    when(userRepository.save(any(User.class))).thenReturn(user);

    User result = userService.addImageUrl(file);

    assertThat(result).isSameAs(user);
    assertThat(user.getImgUrl())
        .isEqualTo("https://res.cloudinary.com/x/upload/v2/userAva/new.jpg");
    verify(userRepository).save(user);
    verify(uploader).destroy(eq("userAva/old"), anyMap());

  }

}
