package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.request.ProductRequestDto;
import com.ecommerce.backend.dto.response.FilterOptionsResponseDto;
import com.ecommerce.backend.dto.response.ProductResponseDto;
import com.ecommerce.backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductResponseDto> getAllProducts(@RequestParam  Map<String, String> filters) {
        return productService.getFilteredProducts(filters);
    }

    @GetMapping("/filters")
    public FilterOptionsResponseDto getFilterOptions() {
        return productService.getAvailableFilterOptions();
    }

    @GetMapping("/{productId}")
    public ProductResponseDto getProductById(@PathVariable Long productId) {
        return productService.getProductById(productId);
    }

    @GetMapping("/category/{slug}")
    public List<ProductResponseDto> getProductsBySlug(@PathVariable String slug) {
        return productService.getProductsByCategory(slug);
    }
}
