package dev.armando.login_page_backend.auth;

import dev.armando.login_page_backend.infra.exception.RestErrorMessage;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        RestErrorMessage restErrorMessage = new RestErrorMessage(401, HttpStatus.UNAUTHORIZED.getReasonPhrase(), "Invalid Token");

        response.getWriter().write(restErrorMessage.toString());
    }
}
