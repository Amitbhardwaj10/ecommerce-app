package com.ecommerce.backend.service.admin;

import com.ecommerce.backend.dto.request.ProductRequestDto;
import com.ecommerce.backend.dto.response.ProductResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminProductService {
    public ProductResponseDto createProduct(ProductRequestDto dto);

    ProductResponseDto updateProduct(Long id, ProductRequestDto dto);
}
