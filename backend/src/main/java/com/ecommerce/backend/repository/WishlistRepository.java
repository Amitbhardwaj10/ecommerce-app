package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    public Optional<Wishlist> findByUserId(Long userId);
}
