package com.caffein.tracker.re.response;

import com.caffein.tracker.dto.UserDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private String accessToken;

    private String refreshToken;

    private String tokenType;

    private UserDTO user;

}
