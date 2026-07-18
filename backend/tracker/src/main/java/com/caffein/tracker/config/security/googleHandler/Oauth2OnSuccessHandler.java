package com.caffein.tracker.config.security.googleHandler;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.caffein.tracker.model.User;
import com.caffein.tracker.re.response.LoginResponse;
import com.caffein.tracker.service.auth.it.ITokenIssuer;
import com.caffein.tracker.service.user.UserService;
import tools.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Oauth2OnSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserService userService;
    private final ObjectMapper objectMapper;
    private final ITokenIssuer iTokenIssuer;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");
        String picture = oauthUser.getAttribute("picture");

        if (email == null || email.isBlank()) {
            clearAuthenticationAttributes(request);
            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Google email is missing or not verified");

            return;
        }

        // find or create user
        User findOrCreateUser = userService.findOrCreateUserLoginByGoogle(name, email, picture);

        LoginResponse loginResponse = iTokenIssuer.issueToken(findOrCreateUser);
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        objectMapper.writeValue(response.getOutputStream(), loginResponse);
        clearAuthenticationAttributes(request);

    }

}
