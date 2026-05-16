package com.caffein.tracker.mapper;

import java.util.Random;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.caffein.tracker.dto.UserDTO;
import com.caffein.tracker.model.User;
import com.caffein.tracker.model.type.RoleType;
import com.caffein.tracker.re.request.auth.RegistrationReq;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PasswordEncoder passwordEncoder;
    private static final Random RANDOM = new Random();

    public User toUser(RegistrationReq registrationReq) {
        int seed = RANDOM.nextInt(1000) + 1;
        String avatarUrl = "https://picsum.photos/seed/" + seed + "/300";
        return User.builder()
                .firstName(registrationReq.getFirstName())
                .lastName(registrationReq.getLastName())
                .email(registrationReq.getEmail())
                .password(passwordEncoder.encode(registrationReq.getPassword()))
                .emailVerified(false)
                .role(RoleType.USER)
                .imgUrl(avatarUrl)
                .build();
    }

    public UserDTO toDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .emailVerified(user.getEmailVerified())
                .role(user.getRole())
                .imgUrl(user.getImgUrl())
                .build();
    }

}
