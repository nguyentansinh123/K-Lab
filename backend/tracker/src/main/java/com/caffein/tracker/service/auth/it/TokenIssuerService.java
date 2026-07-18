package com.caffein.tracker.service.auth.it;

import org.springframework.stereotype.Service;

import com.caffein.tracker.config.security.jwt.JwtService;
import com.caffein.tracker.mapper.UserMapper;
import com.caffein.tracker.model.User;
import com.caffein.tracker.re.response.LoginResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenIssuerService implements ITokenIssuer{
    
    private final JwtService jwtService;
    private final UserMapper userMapper;
    private static final String TOKEN_TYPE = "Bearer ";
    
    @Override
    public LoginResponse issueToken(User user) {

        String accessToken = jwtService.generateAccessToken(user.getEmail());
        String refreshToken = jwtService.generateAccessRefreshToken(user.getEmail());

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType(TOKEN_TYPE)
                .user(userMapper.toDto(user))
                .build();
    }

    
}
