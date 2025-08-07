package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CartItemResponseDto;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.CartItem;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    public CartItemResponseDto toDto(CartItem cartItem) {
        Product product = cartItem.getProduct();

        return CartItemResponseDto.builder()
                .id(cartItem.getId())
                .productId(product.getProductId())
                .productTitle(product.getTitle())
                .status("inStock")
                .price(product.getPrice())
                .quantity(cartItem.getQuantity())
                .image(product.getImage())
                .build();
    }

    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<CartItemResponseDto> fetchAllCartItems(Long userId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found for user"));

        List<CartItemResponseDto> cartItems = cart.getCartItems().stream().map(this::toDto).collect(Collectors.toList());

        return cartItems;
    }
}
