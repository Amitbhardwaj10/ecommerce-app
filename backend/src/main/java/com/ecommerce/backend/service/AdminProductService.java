package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.request.ProductRequestDto;
import com.ecommerce.backend.dto.response.ProductResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminProductService {
    public ProductResponseDto createProduct(ProductRequestDto dto);

    public ResponseEntity<String> saveAllProducts(List<ProductRequestDto> productDtos);
}
