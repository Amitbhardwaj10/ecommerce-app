package com.ecommerce.backend.controller;


import com.ecommerce.backend.dto.WishlistAddRequestDto;
import com.ecommerce.backend.dto.WishlistItemResponseDto;
import com.ecommerce.backend.error.ProductNotFoundException;
import com.ecommerce.backend.model.WishlistItem;
import com.ecommerce.backend.service.WishlistService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistItemResponseDto>> fetchWishlist(@PathVariable Long userId) {
        return ResponseEntity.ok(wishlistService.fetchWishlist(userId));
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<WishlistItemResponseDto> addToWishlist(@PathVariable Long userId,@Valid @RequestBody WishlistAddRequestDto requestDto) {
        WishlistItemResponseDto  wishlistItemResponseDto = wishlistService.addToWishlist(userId, requestDto.getProductId());

        return ResponseEntity.status(HttpStatus.CREATED).body(wishlistItemResponseDto);
    }
}
