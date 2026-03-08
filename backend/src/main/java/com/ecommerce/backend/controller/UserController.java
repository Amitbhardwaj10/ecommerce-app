package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.LoginResponseDto;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.security.service.AuthService;
import com.ecommerce.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = {"http://localhost:5173", "https://tech-store-ts.vercel.app"})
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public String register(@Valid @RequestBody User user) {
        return userService.register(user);
    }

//    @PostMapping("/login")
//    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody User loginRequest) {
//        return authService.verify(loginRequest);
//    }
}
