package com.ecommerce.backend.service;


import com.ecommerce.backend.dto.WishlistItemResponseDto;

import java.util.List;

public interface WishlistService {

    public List<WishlistItemResponseDto> fetchWishlist(Long userId);

    public WishlistItemResponseDto addToWishlist(Long userId, Long productId);

    public boolean deleteFromWishlist (Long itemId);
}
