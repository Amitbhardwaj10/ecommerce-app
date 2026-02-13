package com.ecommerce.backend.security.service;

import com.ecommerce.backend.security.dto.response.LoginResponse;
import com.ecommerce.backend.entity.User;

public interface RefreshTokenService {

    void saveToken(String refresh_token, User user);

    LoginResponse generateAccessTokenAndRotateRefreshToken(String refreshToken);
}
