package com.ecommerce.backend.security.service;

import com.ecommerce.backend.security.dto.request.LoginRequest;
import com.ecommerce.backend.security.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse verify(LoginRequest loginRequest);
    void logout(String refreshJwt);
}
