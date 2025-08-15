package com.ecommerce.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistAddRequestDto {
    @NotNull(message = "Product ID must not be null")
    private Long ProductId;
}
