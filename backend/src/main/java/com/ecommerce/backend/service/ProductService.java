package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.FilterOptionsResponseDto;
import com.ecommerce.backend.dto.ProductRequestDto;
import com.ecommerce.backend.dto.ProductResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface ProductService {
    public ResponseEntity<String> createProduct(ProductRequestDto dto);

    public List<ProductResponseDto> getFilteredProducts(Map<String, List<String>> filters);

    public FilterOptionsResponseDto getAvailableFilterOptions();

    public ProductResponseDto getProductById(Long id);

    public ResponseEntity<String> saveAllProducts(List<ProductRequestDto> productDtos);

   public List<ProductResponseDto> getprodutsByCategory(String slug);
}
