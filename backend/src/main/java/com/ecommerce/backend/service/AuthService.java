package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.LoginResponseDto;
import com.ecommerce.backend.model.User;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    public ResponseEntity<String> saveNewUser(User user);

    public ResponseEntity<LoginResponseDto> userLogin(User loginRequest);
}
