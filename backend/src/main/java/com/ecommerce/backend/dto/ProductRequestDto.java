package com.ecommerce.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDto {

    @NotNull
    private String title;
    private String description;

    @NotNull
    private Long price;
    private String image;

    @NotNull
    private Long categoryId;
}
