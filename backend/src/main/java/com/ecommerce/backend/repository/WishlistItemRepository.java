package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Wishlist;
import com.ecommerce.backend.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
    public Optional<WishlistItem> findByWishlistAndProduct_ProductId(Wishlist wishlist, Long productId);
}
