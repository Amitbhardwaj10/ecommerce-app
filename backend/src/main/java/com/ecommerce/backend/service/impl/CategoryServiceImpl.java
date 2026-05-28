package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.dto.response.CategoryDto;
import com.ecommerce.backend.dto.response.ProductResponseDto;
import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    private ProductResponseDto mapToProductDto(Product product) {
        return ProductResponseDto.builder()
                .productId(product.getProductId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .image(product.getImage())
                .build();
    }

    private CategoryDto mapToCategoryDto(Category category) {
        List<ProductResponseDto> productDtos = category.getProducts().stream().map(this::mapToProductDto).collect(Collectors.toList());

        return CategoryDto.builder()
                .id(category.getId())
                .category(category.getName())
                .slug(category.getSlug())
                .products(productDtos)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(this::mapToCategoryDto)
                .collect(Collectors.toList());
    }
}
