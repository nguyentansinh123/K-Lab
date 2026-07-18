package com.caffein.tracker.config.security.googleHandler;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.caffein.tracker.model.User;
import com.caffein.tracker.service.auth.google.GoogleLoginCodeService;
import com.caffein.tracker.service.user.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Oauth2OnSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserService userService;
    private final GoogleLoginCodeService googleLoginCodeService;

    @Value("${app.frontend.oauth2-callback-url:http://localhost:5173/oauth/callback}")
    private String frontendCallbackUrl;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");
        String picture = oauthUser.getAttribute("picture");
        Boolean emailVerified = oauthUser.getAttribute("email_verified");

        if (email == null || email.isBlank() || !Boolean.TRUE.equals(emailVerified)) {
            clearAuthenticationAttributes(request);
            response.sendRedirect(buildFrontendRedirect("error", "google_email_not_verified"));

            return;
        }

        User user = userService.findOrCreateUserLoginByGoogle(name, email, picture, true);
        String loginCode = googleLoginCodeService.create(user.getId());

        clearAuthenticationAttributes(request);
        response.sendRedirect(buildFrontendRedirect("code", loginCode));
    }

    private String buildFrontendRedirect(String parameter, String value) {
        return UriComponentsBuilder.fromUriString(frontendCallbackUrl)
                .queryParam(parameter, value)
                .build()
                .encode()
                .toUriString();
    }
}
