package com.ecommerce.backend.error;

public class BrandNotFoundException extends RuntimeException {

    public BrandNotFoundException(String message) {
        super(message);
    }

    public BrandNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public BrandNotFoundException(Throwable cause) {
        super(cause);
    }

    protected BrandNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
