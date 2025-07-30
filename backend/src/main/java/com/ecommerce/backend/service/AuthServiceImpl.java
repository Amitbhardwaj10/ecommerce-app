package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ErrorMessage;
import com.ecommerce.backend.dto.LoginResponseDto;
import com.ecommerce.backend.dto.UserDto;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthRepository authRepository;

    @Override
    public ResponseEntity<String> saveNewUser(User user) {
        if (authRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }

        authRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @Override
    public ResponseEntity<LoginResponseDto> userLogin(User loginRequest) {
        Optional<User> user = authRepository.findByUsername(loginRequest.getUsername());

        if (user.isPresent()) {
            User foundUser = user.get();
            if (foundUser.getPassword().equals(loginRequest.getPassword())) {

                UserDto userDto = UserDto.builder()
                        .id(user.get().getId())
                        .fullname(user.get().getFullname())
                        .username(user.get().getUsername())
                        .build();

                LoginResponseDto response = LoginResponseDto.builder()
                        .message("Login Successfully!")
                        .user(userDto)
                        .build();

                return ResponseEntity.ok(response);
            } else {
                LoginResponseDto errorResponse = LoginResponseDto.builder()
                        .message("Invalid password!")
                        .user(null)
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            }
        } else {
            LoginResponseDto errorResponse = LoginResponseDto.builder()
                    .message("User not registered. Please sign up.")
                    .user(null)
                    .build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
