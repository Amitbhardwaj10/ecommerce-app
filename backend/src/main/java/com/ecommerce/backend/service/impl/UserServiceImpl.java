package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.dto.request.RegisterRequestDto;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.entity.enums.Role;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String register(RegisterRequestDto requestDto) {
        if (userRepository.findByUsername(requestDto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        var user = User.builder()
                .fullname(requestDto.getFullname())
                .username(requestDto.getUsername())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        return "User registered Successfully";
    }
}
