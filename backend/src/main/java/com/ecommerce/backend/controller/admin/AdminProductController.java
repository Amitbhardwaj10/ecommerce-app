package com.ecommerce.backend.controller.admin;

import com.ecommerce.backend.dto.request.ProductRequestDto;
import com.ecommerce.backend.dto.response.ProductResponseDto;
import com.ecommerce.backend.payload.ApiResponse;
import com.ecommerce.backend.service.admin.AdminProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/products")
public class AdminProductController {

    private final AdminProductService adminProductService;

    public AdminProductController(AdminProductService adminProductService) {
        this.adminProductService = adminProductService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> getAllProducts() {
        List<ProductResponseDto> products = adminProductService.getAllProductus();
        ApiResponse<List<ProductResponseDto>> response = ApiResponse.<List<ProductResponseDto>>builder()
                .success(true)
                .message("Products retrieved successfully")
                .data(products)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
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

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> updateProduct(@PathVariable Long id, @RequestBody ProductRequestDto dto) {
        ProductResponseDto updatedProduct = adminProductService.updateProduct(id, dto);
        ApiResponse<ProductResponseDto> response = ApiResponse.<ProductResponseDto>builder()
                .success(true)
                .message("Product updated successfully")
                .data(updatedProduct)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> deleteProduct(@PathVariable Long id) {
        ProductResponseDto deletedProduct = adminProductService.deleteProduct(id);
        ApiResponse<ProductResponseDto> response = ApiResponse.<ProductResponseDto>builder()
                .success(true)
                .message("Product deleted successfully")
                .data(deletedProduct)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
