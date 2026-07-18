package com.caffein.tracker.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.caffein.tracker.re.request.auth.LoginRequest;
import com.caffein.tracker.re.request.auth.RefreshRequest;
import com.caffein.tracker.re.request.auth.RegistrationReq;
import com.caffein.tracker.re.request.auth.google.GoogleCodeExchangeRequest;
import com.caffein.tracker.re.response.LoginResponse;
import com.caffein.tracker.re.response.RefreshResponse;
import com.caffein.tracker.service.auth.IAuthService;
import com.caffein.tracker.service.auth.google.GoogleLoginCodeService;
import com.caffein.tracker.service.auth.it.ITokenIssuer;
import com.caffein.tracker.service.user.IUserService;
import com.caffein.tracker.exception.AppException;
import com.caffein.tracker.exception.ErrorCode;
import com.caffein.tracker.model.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService authService;
    private final GoogleLoginCodeService googleLoginCodeService;
    private final IUserService userService;
    private final ITokenIssuer tokenIssuer;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegistrationReq request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshResponse> refresh(@Valid @RequestBody RefreshRequest request) {
        return ResponseEntity.ok(authService.refresh(request));
    }

    @PostMapping("/google/exchange")
    public ResponseEntity<LoginResponse> exchangeGoogleCode(
            @Valid @RequestBody GoogleCodeExchangeRequest request) {

        String userId = googleLoginCodeService.consume(request.getCode());
        User user = userService.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return ResponseEntity.ok(tokenIssuer.issueToken(user));
    }

}
