package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.response.ProductResponseDto;
import com.ecommerce.backend.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    public ProductResponseDto mapToDto(Product product) {
        return ProductResponseDto.builder()
                .productId(product.getProductId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .image(product.getImage())
                .brand(product.getBrand().getName())
                .color(product.getColor().getName())
                .quantity(product.getQuantity() != null ? product.getQuantity() : 0)
                .inStock(product.getQuantity() != null && product.getQuantity() > 0)
                .categoryName(product.getCategory().getName())
                .build();
    }
}
