package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.response.FilterOptionsResponseDto;
import com.ecommerce.backend.dto.request.ProductRequestDto;
import com.ecommerce.backend.dto.response.ProductResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ProductService {

    public List<ProductResponseDto> getFilteredProducts(Map<String, String> filters);

    public FilterOptionsResponseDto getAvailableFilterOptions();

    public ProductResponseDto getProductById(Long id);

    public List<ProductResponseDto> getProductsByCategory(String slug);
}
