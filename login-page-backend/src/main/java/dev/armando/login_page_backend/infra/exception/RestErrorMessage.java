package dev.armando.login_page_backend.infra.exception;

public record RestErrorMessage(int status, String error, String message) {

    @Override
    public String toString() {
        return String.format("""
                {
                    "status": %d,
                    "error": "%s",
                    "message": "%s"
                }
                """, status, error, message);
    }
}
