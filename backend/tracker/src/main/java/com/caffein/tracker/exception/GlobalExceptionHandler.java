package com.caffein.tracker.exception;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(AppException.class)
  public ResponseEntity<ErrorResponse> handleAppException(AppException ex) {
    ErrorCode errorCode = ex.getErrorCode();

    ErrorResponse response = ErrorResponse.builder()
        .code(errorCode.getCode())
        .message(ex.getMessage())
        .status(errorCode.getStatus().value())
        .error(errorCode.getStatus().getReasonPhrase())
        .timestamp(LocalDateTime.now())
        .build();

    return ResponseEntity.status(errorCode.getStatus()).body(response);
  }

}
