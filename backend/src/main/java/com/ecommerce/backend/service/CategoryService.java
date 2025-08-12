package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
   public List<CategoryDto> getAllCategories();
}
