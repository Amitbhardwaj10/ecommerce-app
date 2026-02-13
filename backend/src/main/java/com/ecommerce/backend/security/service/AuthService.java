package com.ecommerce.backend.security.service;

import com.ecommerce.backend.security.dto.request.LoginRequest;
import com.ecommerce.backend.security.dto.response.LoginResponse;
import com.ecommerce.backend.entity.User;

public interface AuthService {
    User register(User user);
    LoginResponse verify(LoginRequest loginRequest);
    void logout(String refreshJwt);
}
