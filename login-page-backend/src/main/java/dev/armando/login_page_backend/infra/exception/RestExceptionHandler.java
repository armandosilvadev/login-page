package dev.armando.login_page_backend.infra.exception;

import dev.armando.login_page_backend.user.exception.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<RestErrorMessage> handleUserAlreadyExistsException(UserAlreadyExistsException exception) {
        return this.buildResponseEntity(HttpStatus.CONFLICT, exception.getMessage());
    }

    @ExceptionHandler({
            UsernameNotFoundException.class,
            BadCredentialsException.class
    })
    public ResponseEntity<RestErrorMessage> handleUsernameNotFoundException(AuthenticationException exception) {
        return this.buildResponseEntity(HttpStatus.UNAUTHORIZED, "Invalid username or password.");
    }

    private ResponseEntity<RestErrorMessage> buildResponseEntity(HttpStatus status, String message) {
        RestErrorMessage restErrorMessage = new RestErrorMessage(
                status.value(),
                status.getReasonPhrase(),
                message
        );
        return ResponseEntity
                .status(status)
                .body(restErrorMessage);
    }
}
