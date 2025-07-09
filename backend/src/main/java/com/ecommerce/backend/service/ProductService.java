package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductRequestDto;
import com.ecommerce.backend.dto.ProductResponseDto;
import com.ecommerce.backend.model.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    public ResponseEntity<String> createProduct(ProductRequestDto dto);

    public List<ProductResponseDto> getAllProducts();

    public ProductResponseDto getProductById(Long id);

    public List<ProductResponseDto> getProductsByCategoryId(Long categoryId);

    public ResponseEntity<String> saveAllProducts(List<ProductRequestDto> productDtos);
}
