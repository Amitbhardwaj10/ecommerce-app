package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    public String register(User user);
}
