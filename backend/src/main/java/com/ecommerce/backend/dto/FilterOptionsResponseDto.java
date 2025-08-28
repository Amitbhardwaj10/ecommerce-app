package com.ecommerce.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FilterOptionsResponseDto {
    private List<FilterOptionDto> categories;
    private List<FilterOptionDto> brands;
    private List<FilterOptionDto> colors;

    private Long minPrice;
    private Long maxPrice;
}
