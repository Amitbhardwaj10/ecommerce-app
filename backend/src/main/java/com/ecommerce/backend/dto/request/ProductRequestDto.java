package com.ecommerce.backend.dto.request;

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
    private String image;

    @NotNull
    private Long price;

    @NotNull
    private Long brandId;

    @NotNull
    private Long colorId;

    @NotNull
    private Long categoryId;

    @NotNull
    private Integer Quantity;
}
