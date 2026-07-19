package dev.armando.login_page_backend.infra.exception;

import org.springframework.http.HttpStatus;

public record RestErrorMessage(int status, String error, String message) {}
