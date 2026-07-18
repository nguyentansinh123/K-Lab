package com.caffein.tracker.service.auth.google;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.caffein.tracker.exception.AppException;
import com.caffein.tracker.exception.ErrorCode;

@Service
public class GoogleLoginCodeService {

    private static final Duration CODE_TTL = Duration.ofSeconds(60);
    private static final int CODE_BYTES = 32;

    private final SecureRandom secureRandom = new SecureRandom();
    private final Map<String, PendingLogin> pendingLogins = new ConcurrentHashMap<>();

    public String create(String userId) {
        removeExpiredCodes();

        String code;
        do {
            byte[] bytes = new byte[CODE_BYTES];
            secureRandom.nextBytes(bytes);
            code = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        } while (pendingLogins.containsKey(code));

        pendingLogins.put(code, new PendingLogin(userId, Instant.now().plus(CODE_TTL)));
        return code;
    }

    public String consume(String code) {
        if (code == null || code.isBlank()) {
            throw new AppException(ErrorCode.INVALID_GOOGLE_LOGIN_CODE);
        }

        PendingLogin pendingLogin = pendingLogins.remove(code);
        if (pendingLogin == null || pendingLogin.expiresAt().isBefore(Instant.now())) {
            throw new AppException(ErrorCode.INVALID_GOOGLE_LOGIN_CODE);
        }

        return pendingLogin.userId();
    }

    private void removeExpiredCodes() {
        Instant now = Instant.now();
        pendingLogins.entrySet().removeIf(entry -> entry.getValue().expiresAt().isBefore(now));
    }

    private record PendingLogin(String userId, Instant expiresAt) {
    }
}
