package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.repository.CategoryRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{

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

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
