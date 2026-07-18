package com.caffein.tracker.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.HttpStatus.NOT_FOUND;


import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    EMAIL_ALREADY_EXISTS("EMAIL_ALREADY_EXISTS", "Email already exists", CONFLICT),
    PASSWORD_MISMATCH("PASSWORD_MISMATCH", "Password does not match", BAD_REQUEST),
    BAD_CREDENTIALS("BAD_CREDENTIALS", "Email or password is incorrect", UNAUTHORIZED),
    INVALID_JWT_TOKEN("INVALID_JWT_TOKEN", "Invalid JWT token", UNAUTHORIZED),
    INVALID_TOKEN_TYPE("INVALID_TOKEN_TYPE", "Invalid token type", UNAUTHORIZED),
    REFRESH_TOKEN_EXPIRED("REFRESH_TOKEN_EXPIRED", "Refresh token expired", UNAUTHORIZED),
    INVALID_GOOGLE_LOGIN_CODE("INVALID_GOOGLE_LOGIN_CODE", "Google login code is invalid or expired", UNAUTHORIZED),
    INVALID_IMAGE("INVALID_IMAGE", "Image must be a JPG, PNG, or WebP file no larger than 5 MB", BAD_REQUEST),
    IMAGE_UPLOAD_FAILED("IMAGE_UPLOAD_FAILED", "Could not upload image", INTERNAL_SERVER_ERROR),
    INTERNAL_EXCEPTION("INTERNAL_EXCEPTION", "Something went wrong", INTERNAL_SERVER_ERROR),
    STUDY_SESSION_NOT_FOUND("STUDY_SESSION_NOT_FOUND", "Study session not found", NOT_FOUND),
    USER_NOT_FOUND("USER_NOT_FOUND", "User not found", NOT_FOUND),
    ACTIVITY_NOT_FOUND("ACTIVITY_NOT_FOUND", "Activity not found", NOT_FOUND);

    private final String code;
    private final String defaultMessage;
    private final HttpStatus status;

}
