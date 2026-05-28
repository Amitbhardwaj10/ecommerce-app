package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.UpdateQuantityDto;
import com.ecommerce.backend.dto.request.CartItemRequestDto;
import com.ecommerce.backend.dto.response.CartItemResponseDto;
import com.ecommerce.backend.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItemResponseDto>> fetchAllCartItems(@PathVariable Long userId) {

        List<CartItemResponseDto> cartItems = cartService.fetchAllCartItems(userId);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<CartItemResponseDto> addCartItem(@PathVariable Long userId, @Valid @RequestBody CartItemRequestDto requestDto) {
       return cartService.addCartItem(userId, requestDto.getProductId());
    }

    @PutMapping("/items/{itemId}")
    public void  updateCartItemQuantity(@PathVariable Long itemId, @RequestBody UpdateQuantityDto dto) {
        cartService.updateCartItemQuantity(itemId, dto.getQuantity());
    }

    @DeleteMapping("items/{itemId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long itemId) {
        cartService.deleteCartItem(itemId);
        return ResponseEntity.ok("Item deleted Successfully");
    }
}
