package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CartItemRequestDto;
import com.ecommerce.backend.dto.CartItemResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CartService {
   public List<CartItemResponseDto> fetchAllCartItems(Long userId);

  public ResponseEntity<CartItemResponseDto> addCartItem(Long userId, CartItemRequestDto requestDto);

   public void updateCartItemQuantity(Long cartItemId, int quantity);
}
