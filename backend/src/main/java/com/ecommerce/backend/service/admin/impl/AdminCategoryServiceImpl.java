package com.ecommerce.backend.service.admin.impl;

import com.ecommerce.backend.dto.request.CategoryRequestDto;
import com.ecommerce.backend.dto.response.CategoryDto;
import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.error.CategoryNotFoundException;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.service.admin.AdminCategoryService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminCategoryServiceImpl implements AdminCategoryService {

    private final CategoryRepository categoryRepository;

    public AdminCategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryDto addCategory(CategoryRequestDto categoryReqDto) {
        Optional<Category> category = categoryRepository.findByName(categoryReqDto.getName());

        if (category.isPresent()) {
            throw new IllegalArgumentException("Category with name: " + categoryReqDto.getName() + " already exists!");
        } else {
            Category newCategory = new Category();
            newCategory.setName(categoryReqDto.getName());
            newCategory.generateSlug();
            Category savedCategory = categoryRepository.save(newCategory);

            return new CategoryDto(savedCategory.getId(), savedCategory.getName(), savedCategory.getSlug());
        }
    }

    @Override
    public CategoryDto updateCategory(Long id, CategoryRequestDto requestDto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category with id: " + id + " not found!"));

        category.setName(requestDto.getName());
        category.generateSlug();
        Category updatedCategory = categoryRepository.save(category);

        return new CategoryDto(updatedCategory.getId(), updatedCategory.getName(), updatedCategory.getSlug());
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("Category with id: " + id + " not found!"));

        categoryRepository.delete(category);
    }


}
