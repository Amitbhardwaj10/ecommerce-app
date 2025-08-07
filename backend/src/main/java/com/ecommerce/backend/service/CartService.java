package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CartItemResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CartService {
   public List<CartItemResponseDto> fetchAllCartItems(Long userId);
}
