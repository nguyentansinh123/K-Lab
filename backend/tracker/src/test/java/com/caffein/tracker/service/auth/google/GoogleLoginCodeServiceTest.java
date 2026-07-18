package com.caffein.tracker.service.auth.google;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

import com.caffein.tracker.exception.AppException;
import com.caffein.tracker.exception.ErrorCode;

class GoogleLoginCodeServiceTest {

    private final GoogleLoginCodeService service = new GoogleLoginCodeService();

    @Test
    void createdCodeCanBeConsumedOnce() {
        String code = service.create("user-123");

        assertEquals("user-123", service.consume(code));

        AppException exception = assertThrows(AppException.class, () -> service.consume(code));
        assertEquals(ErrorCode.INVALID_GOOGLE_LOGIN_CODE, exception.getErrorCode());
    }

    @Test
    void blankCodeIsRejected() {
        AppException exception = assertThrows(AppException.class, () -> service.consume(" "));
        assertEquals(ErrorCode.INVALID_GOOGLE_LOGIN_CODE, exception.getErrorCode());
    }
}
