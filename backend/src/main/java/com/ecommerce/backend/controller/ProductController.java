package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.ProductRequestDto;
import com.ecommerce.backend.dto.ProductResponseDto;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<String> createProduct(@RequestBody ProductRequestDto dto) {
        return productService.createProduct(dto);
    }

    @PostMapping("/bulk")
    public ResponseEntity<String> createMultipleProducts(@RequestBody List<ProductRequestDto> productDtos) {
        return productService.saveAllProducts(productDtos);
    }

    @GetMapping
    public List<ProductResponseDto> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{productId}")
    public ProductResponseDto getProductById(@PathVariable Long productId) {
        return productService.getProductById(productId);
    }

    @GetMapping("/category/{categoryId}")
    public List<ProductResponseDto> getProductsByCategoryId(@PathVariable Long categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }

//    PUT /products/{id} → Edit product
//    DELETE /products/{id} → Delete product

}
