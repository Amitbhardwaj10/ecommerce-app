package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.request.RegisterRequestDto;

public interface UserService {
    public String register(RegisterRequestDto registerRequestDto);
}
