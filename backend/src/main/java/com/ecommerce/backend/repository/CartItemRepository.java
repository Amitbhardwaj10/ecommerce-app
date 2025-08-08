package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    public Optional<CartItem> findByCartAndProduct_ProductId(Cart cart, Long productId);
}
