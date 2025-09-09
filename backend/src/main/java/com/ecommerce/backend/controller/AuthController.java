package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.LoginResponseDto;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.AuthRepository;
import com.ecommerce.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "https://tech-store-ts.vercel.app"})
public class AuthController {

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody User user) {
        return authService.saveNewUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody User loginRequest) {
        return authService.userLogin(loginRequest);
    }
}
