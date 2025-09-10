package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.FilterOptionsResponseDto;
import com.ecommerce.backend.dto.ProductRequestDto;
import com.ecommerce.backend.dto.ProductResponseDto;
import com.ecommerce.backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {"http://localhost:5173", "https://tech-store-ts.vercel.app"})
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<String> createProduct(@RequestBody ProductRequestDto dto) {
        return productService.createProduct(dto);
    }

    @PostMapping("/bulk")
    public ResponseEntity<String> createMultipleProducts(@Valid @RequestBody List<ProductRequestDto> productDtos) {
        return productService.saveAllProducts(productDtos);
    }

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

//    PUT /products/{id} → Edit product
//    DELETE /products/{id} → Delete product

}
