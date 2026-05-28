package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.dto.response.WishlistItemResponseDto;
import com.ecommerce.backend.error.ProductNotFoundException;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.Wishlist;
import com.ecommerce.backend.entity.WishlistItem;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.WishlistItemRepository;
import com.ecommerce.backend.repository.WishlistRepository;
import com.ecommerce.backend.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public WishlistItemResponseDto toDto(WishlistItem item) {
        Product product = item.getProduct();

        return WishlistItemResponseDto.builder()
                .id(item.getId())
                .productId(product.getProductId())
                .productTitle(product.getTitle())
                .price(product.getPrice())
                .image(product.getImage())
                .build();
    }

    @Override
    @Transactional
    public List<WishlistItemResponseDto> fetchWishlist(Long userId) {
        Wishlist wishlist = wishlistRepository.findWithItemsByUserId(userId).orElseGet(() -> {
            Wishlist newWishlist = Wishlist.builder()
                    .userId(userId)
                    .wishlistItems(new ArrayList<>())
                    .build();
            return wishlistRepository.save(newWishlist);
        });

        return wishlist.getWishlistItems().stream().map(this::toDto).collect(Collectors.toList());

    }

    @Override
    @Transactional
    public WishlistItemResponseDto addToWishlist(Long userId, Long productId) {
        Wishlist wishlist = wishlistRepository.findWithItemsByUserId(userId).orElseGet(() -> {
            Wishlist newWishlist = Wishlist.builder()
                    .userId(userId)
                    .wishlistItems(new ArrayList<>())
                    .build();
            return wishlistRepository.save(newWishlist);
        });

        Optional<WishlistItem> existItem = wishlistItemRepository.findByWishlistAndProduct_ProductId(wishlist, productId);

        if (existItem.isPresent()) return toDto(existItem.get());

        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException("product not found"));

        WishlistItem wishlistItem = WishlistItem.builder()
                .wishlist(wishlist)
                .product(product)
                .build();

        wishlistItemRepository.save(wishlistItem);

        if (wishlist.getWishlistItems() == null) {
            wishlist.setWishlistItems(new ArrayList<>());
        }
        wishlist.getWishlistItems().add(wishlistItem);

        return toDto(wishlistItem);
    }

    @Override
    @Transactional
    public boolean deleteFromWishlist(Long itemId) {
        Optional<WishlistItem> wishlistItem = wishlistItemRepository.findById(itemId);

        if (wishlistItem.isEmpty()) return false;

        wishlistItemRepository.deleteById(itemId);
        return true;
    }
}
