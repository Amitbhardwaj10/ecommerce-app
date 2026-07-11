package com.ecommerce.backend.service.admin;

import com.ecommerce.backend.dto.request.CategoryRequestDto;
import com.ecommerce.backend.dto.response.CategoryDto;

public interface AdminCategoryService {
    CategoryDto addCategory(CategoryRequestDto categoryReqDto);

    CategoryDto updateCategory(Long id, CategoryRequestDto requestDto);


    void deleteCategory(Long id);
}
