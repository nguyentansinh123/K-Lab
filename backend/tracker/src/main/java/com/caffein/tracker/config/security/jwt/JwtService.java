package com.caffein.tracker.config.security.jwt;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.caffein.tracker.exception.AppException;
import com.caffein.tracker.exception.ErrorCode;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {

    private static final String TOKEN_TYPE = "token_type";

    private final SecretKey key;
    private final long accessTokenExpiration;
    private final long refreshTokenExpiration;

    public JwtService(
            @Value("${JWT_SECRET}") String jwtSecret,
            @Value("${app.security.jwt.access-token-expiration}") long accessTokenExpiration,
            @Value("${app.security.jwt.refresh-token-expiration}") long refreshTokenExpiration) {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        this.accessTokenExpiration = accessTokenExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
    }

    public String generateAccessToken(String email) {
        Map<String, Object> claims = Map.of(TOKEN_TYPE, "ACCESS_TOKEN");
        return createToken(claims, email, accessTokenExpiration);
    }

    public String generateAccessRefreshToken(String email) {
        Map<String, Object> claims = Map.of(TOKEN_TYPE, "REFRESH_TOKEN");
        return createToken(claims, email, refreshTokenExpiration);
    }

    private String createToken(Map<String, Object> claim, String email, long timeExpired) {
        return Jwts.builder()
                .claims(claim)
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + timeExpired))
                .signWith(key)
                .compact();
    }

    public String createRefreshToken(String token) {
        Claims claims = extractClaims(token);
        if (!"REFRESH_TOKEN".equals(claims.get(TOKEN_TYPE))) {
            throw new AppException(ErrorCode.INVALID_TOKEN_TYPE);
        }
        if (IsTokenExpired(token)) {
            throw new AppException(ErrorCode.REFRESH_TOKEN_EXPIRED);
        }

        return generateAccessRefreshToken(claims.getSubject());
    }

    public Boolean checkToken(String email, String token) {
        return extractUserName(token).equals(email) && !IsTokenExpired(token);
    }

    public String extractUserName(String token) {
        return extractClaims(token).getSubject();
    }

    public Boolean IsTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    private Claims extractClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception e) {
            throw new AppException(ErrorCode.INVALID_JWT_TOKEN);
        }
    }

    public String refreshAccessToken(String refreshToken) {
        Claims claim = extractClaims(refreshToken);
        if (!"REFRESH_TOKEN".equals(claim.get(TOKEN_TYPE))) {
            throw new AppException(ErrorCode.INVALID_TOKEN_TYPE);
        }
        if (IsTokenExpired(refreshToken)) {
            throw new AppException(ErrorCode.REFRESH_TOKEN_EXPIRED);
        }
        return generateAccessToken(claim.getSubject());
    }

    public String extractTokenType(String token) {
        return (String) extractClaims(token).get(TOKEN_TYPE);
    }

}
