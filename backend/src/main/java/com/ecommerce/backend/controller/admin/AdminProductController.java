package com.ecommerce.backend.controller.admin;

import com.ecommerce.backend.dto.request.ProductRequestDto;
import com.ecommerce.backend.dto.response.ProductResponseDto;
import com.ecommerce.backend.payload.ApiResponse;
import com.ecommerce.backend.service.AdminProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/products")
public class AdminProductController {

    private final AdminProductService adminProductService;

    public AdminProductController(AdminProductService adminProductService) {
        this.adminProductService = adminProductService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDto>> createProduct(@RequestBody ProductRequestDto dto) {
        ProductResponseDto addedProduct = adminProductService.createProduct(dto);
        ApiResponse<ProductResponseDto> response = ApiResponse.<ProductResponseDto>builder()
                .success(true)
                .message("Product created successfully")
                .data(addedProduct)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/create/bulk")
    public ResponseEntity<String> createMultipleProducts(@Valid @RequestBody List<ProductRequestDto> productDtos) {
        return adminProductService.saveAllProducts(productDtos);
    }
}
