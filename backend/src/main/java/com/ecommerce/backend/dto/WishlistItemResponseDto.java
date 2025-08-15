package com.ecommerce.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class WishlistItemResponseDto {
    private Long id;
    private Long productId;
    private String productTitle;
    private Long price;
    private String image;
}