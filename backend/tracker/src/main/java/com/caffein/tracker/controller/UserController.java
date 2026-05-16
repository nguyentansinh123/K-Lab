package com.caffein.tracker.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.caffein.tracker.dto.UserDTO;
import com.caffein.tracker.mapper.UserMapper;
import com.caffein.tracker.model.User;
import com.caffein.tracker.service.user.IUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;
    private final UserMapper userMapper;

    // TODO: replace with real endpoints (me, list, getById, etc.)
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> me() {

        User currentUser = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @PostMapping(value = "/me/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserDTO> uploadAvatar(@RequestParam("image") MultipartFile image) {
        User updated = userService.addImageUrl(image);
        return ResponseEntity.ok(userMapper.toDto(updated));
    }

}
