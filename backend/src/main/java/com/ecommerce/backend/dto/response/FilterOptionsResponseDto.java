package com.ecommerce.backend.dto.response;

import com.ecommerce.backend.dto.FilterOptionDto;
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
    private List<FilterOptionDto> inStock;

    private Long minPrice;
    private Long maxPrice;
}
