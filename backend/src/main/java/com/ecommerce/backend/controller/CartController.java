package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.CartItemRequestDto;
import com.ecommerce.backend.dto.CartItemResponseDto;
import com.ecommerce.backend.dto.UpdateQuantityDto;
import com.ecommerce.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItemResponseDto>> fetchAllCartItems(@PathVariable Long userId) {

        List<CartItemResponseDto> cartItems = cartService.fetchAllCartItems(userId);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<CartItemResponseDto> addCartItem(@PathVariable Long userId, @RequestBody CartItemRequestDto requestDto) {
       return cartService.addCartItem(userId, requestDto);
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<?> updateCartItemQuantity(@PathVariable Long itemId, @RequestBody UpdateQuantityDto dto) {
        cartService.updateCartItemQuantity(itemId, dto.getQuantity());
        return ResponseEntity.ok("Cart item Updated successfully");
    }
}
