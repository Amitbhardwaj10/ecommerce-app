package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CategoryDto;
import com.ecommerce.backend.dto.ProductResponseDto;
import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.repository.CategoryRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @PostConstruct
    public void initCategories() {
        saveCategoryIfNotExists("Laptops");
        saveCategoryIfNotExists("Monitors");
        saveCategoryIfNotExists("Keyboards");
        saveCategoryIfNotExists("Mouses");
    }

    private void saveCategoryIfNotExists(String name) {
        if (!categoryRepository.existsByCategory(name)) {
            Category category = new Category();
            category.setCategory(name);
            categoryRepository.save(category); // Triggers @PrePersist and slug generation
        }
    }

    private CategoryDto mapToCategoryDto(Category category) {
        List<ProductResponseDto> productDtos = category.getProducts().stream().map(this::mapToProductDto).collect(Collectors.toList());

        return CategoryDto.builder()
                .id(category.getId())
                .category(category.getCategory())
                .slug(category.getSlug())
                .products(productDtos)
                .build();
    }

    private ProductResponseDto mapToProductDto(Product product) {
        return ProductResponseDto.builder()
                .productId(product.getProductId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .image(product.getImage())
                .build();
    }


    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(this::mapToCategoryDto)
                .collect(Collectors.toList());
    }
}
