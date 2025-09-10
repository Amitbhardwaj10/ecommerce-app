package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.WishlistItemResponseDto;
import com.ecommerce.backend.error.ProductNotFoundException;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.Wishlist;
import com.ecommerce.backend.entity.WishlistItem;
import com.ecommerce.backend.repository.AuthRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.WishlistItemRepository;
import com.ecommerce.backend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private AuthRepository authRepository;

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
    public List<WishlistItemResponseDto> fetchWishlist(Long userId) {
        Wishlist wishlist = wishlistRepository.findWithItemsByUserId(userId).orElseGet(() -> {
            Wishlist newWishlist = Wishlist.builder()
                    .userId(userId)
                    .wishlistItems(new ArrayList<>())
                    .build();
            wishlistRepository.save(newWishlist);
            return newWishlist;
        });

        return wishlist.getWishlistItems().stream().map(this::toDto).collect(Collectors.toList());

    }

    @Override
    public WishlistItemResponseDto  addToWishlist(Long userId, Long productId) {
        Wishlist wishlist = wishlistRepository.findWithItemsByUserId(userId).orElseGet(() -> {
            Wishlist newWishlist = new Wishlist();
            newWishlist.setUserId(userId);
            wishlistRepository.save(newWishlist);
            return newWishlist;
        });

        Optional<WishlistItem> existItem = wishlistItemRepository.findByWishlistAndProduct_ProductId(wishlist, productId);

        if (existItem.isPresent()) return toDto(existItem.get());

        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException("product not found"));

       WishlistItem wishlistItem =  WishlistItem.builder()
                .wishlist(wishlist)
                .product(product)
                .build();

        wishlistItemRepository.save(wishlistItem);

        return toDto(wishlistItem);
    }

    @Override
    public boolean deleteFromWishlist(Long itemId) {
        Optional<WishlistItem> wishlistItem = wishlistItemRepository.findById(itemId);

        if (wishlistItem.isEmpty()) return false;

        wishlistItemRepository.deleteById(itemId);
        return true;
    }
}
