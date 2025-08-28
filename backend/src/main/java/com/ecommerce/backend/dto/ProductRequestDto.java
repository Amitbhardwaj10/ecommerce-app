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

    private String image;

    @NotNull
    private Long price;

    @NotNull
    private Long brandId;

    @NotNull
    private Long colorId;

    @NotNull
    private Long categoryId;
}
