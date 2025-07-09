package com.ecommerce.backend.service;

import com.ecommerce.backend.model.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    public ResponseEntity<String> saveNewUser(User user);

    public ResponseEntity<String> userLogin(User loginRequest);
}
