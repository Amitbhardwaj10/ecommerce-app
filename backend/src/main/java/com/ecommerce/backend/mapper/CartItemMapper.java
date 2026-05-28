package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.response.CartItemResponseDto;
import com.ecommerce.backend.entity.CartItem;
import com.ecommerce.backend.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class CartItemMapper {
    public CartItemResponseDto toDto(CartItem cartItem) {
        Product product = cartItem.getProduct();

        boolean status = product.getInStock() != null && product.getInStock() == 1;

        return CartItemResponseDto.builder()
                .id(cartItem.getId())
                .productId(product.getProductId())
                .productTitle(product.getTitle())
                .price(product.getPrice())
                .quantity(cartItem.getQuantity())
                .totalPrice(cartItem.getQuantity() * product.getPrice())
                .image(product.getImage())
                .stockStatus(status)
                .build();
    }
}
