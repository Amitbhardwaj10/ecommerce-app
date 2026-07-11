package com.ecommerce.backend.controller.admin;

import com.ecommerce.backend.dto.request.CategoryRequestDto;
import com.ecommerce.backend.dto.response.CategoryDto;
import com.ecommerce.backend.payload.ApiResponse;
import com.ecommerce.backend.service.admin.AdminCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/categories")
public class AdminCategoryController {

    private final AdminCategoryService adminCategoryService;

    public AdminCategoryController(AdminCategoryService adminCategoryService) {
        this.adminCategoryService = adminCategoryService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryDto>> addCategory(@RequestBody CategoryRequestDto categoryReqDto) {
        CategoryDto categoryDto = adminCategoryService.addCategory(categoryReqDto);

        ApiResponse<CategoryDto> response = new ApiResponse<>(true, "Category added successfully", categoryDto);

        return ResponseEntity.status(201).body(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryDto>> updateCategory(@PathVariable Long id, @RequestBody CategoryRequestDto requestDto) {
        CategoryDto updatedCategory = adminCategoryService.updateCategory(id, requestDto);

        ApiResponse<CategoryDto> response = new ApiResponse<>(true, "Category updated successfully", updatedCategory);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        adminCategoryService.deleteCategory(id);

        ApiResponse<Void> response = new ApiResponse<>(true, "Category deleted successfully", null);
        return ResponseEntity.ok(response);
    }
}
