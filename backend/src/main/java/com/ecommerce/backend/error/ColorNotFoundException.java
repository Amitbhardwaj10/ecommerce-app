package com.ecommerce.backend.error;

public class ColorNotFoundException extends RuntimeException {
    public ColorNotFoundException(String message) {
        super(message);
    }

    public ColorNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ColorNotFoundException(Throwable cause) {
        super(cause);
    }

    protected ColorNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
