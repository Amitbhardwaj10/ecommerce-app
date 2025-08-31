package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CartItemResponseDto;
import com.ecommerce.backend.error.ProductNotFoundException;
import com.ecommerce.backend.entity.Cart;
import com.ecommerce.backend.entity.CartItem;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.repository.AuthRepository;
import com.ecommerce.backend.repository.CartItemRepository;
import com.ecommerce.backend.repository.CartRepository;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;


    public CartItemResponseDto toDto(CartItem cartItem) {
        Product product = cartItem.getProduct();

        boolean status = product.getInStock() == 1;

        return CartItemResponseDto.builder()
                .id(cartItem.getId())
                .productId(product.getProductId())
                .productTitle(product.getTitle())
                .price(product.getPrice())
                .quantity(1)
                .image(product.getImage())
                .stockStatus(status)
                .build();
    }

    @Override
    public List<CartItemResponseDto> fetchAllCartItems(Long userId) {
        Cart cart = cartRepository.findByUserId(userId).orElseGet(() -> {
            Cart newCart = Cart.builder()
                    .userId(userId)
                    .cartItems(new ArrayList<>())
                    .build();
            return cartRepository.save(newCart);
        });

        return cart.getCartItems().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<CartItemResponseDto> addCartItem(Long userId, Long productId) {

        Cart cart = cartRepository.findByUserId(userId).orElseGet(() -> {
            Cart newCart = Cart.builder()
                    .userId(userId)
                    .build();
            return cartRepository.save(newCart);
        });

        Optional<CartItem> existingItem = cartItemRepository.findByCartAndProduct_ProductId(cart, productId);

        if (existingItem.isPresent()) {
            return ResponseEntity.ok(toDto(existingItem.get()));
        }

        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException("Product not found"));

        CartItem cartItem = CartItem.builder()
                .cart(cart)
                .price(product.getPrice())
                .product(product)
                .build();

        cartItemRepository.save(cartItem);

        return ResponseEntity.ok(toDto(cartItem));
    }

    @Override
    public void updateCartItemQuantity(Long cartItemId, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new RuntimeException("Cart item not found"));

        Product product = productRepository.findById(cartItem.getProduct().getProductId()).orElseThrow(() -> new ProductNotFoundException("Product not found!"));

        long updatedPrice = product.getPrice() * quantity;

        cartItem.setQuantity(quantity);
        cartItem.setPrice(updatedPrice);
        cartItemRepository.save(cartItem);
    }

    @Override
    public void deleteCartItem(Long itemId) {
        CartItem item = cartItemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Cart item not found"));

        cartItemRepository.deleteById(itemId);
    }
}
