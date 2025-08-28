package com.ecommerce.backend.config;

import com.ecommerce.backend.entity.Brand;
import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.entity.Color;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.repository.BrandRepository;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ColorRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class MockDataLoader  {

        @Autowired
        private ProductRepository productRepository;

        @Autowired
        private CategoryRepository categoryRepository;

        @Autowired
        private BrandRepository brandRepository;

        @Autowired
        private ColorRepository colorRepository;


        @PostConstruct
        public void loadData () {
            if (productRepository.count() == 0) {
                ObjectMapper mapper = new ObjectMapper();
                InputStream inputStream = getClass().getResourceAsStream("/mock_data.json");

                try {
                    List<Product> products = mapper.readValue(inputStream, new com.fasterxml.jackson.core.type.TypeReference<List<Product>>() {
                    });

                    // Now, save each entity to the database
                    for (Product product : products) {
                        // Check if category and brand already exist to avoid duplicates
                        Category existingCategory = categoryRepository.findByName(product.getCategory().getName()).orElse(null);
                        if (existingCategory == null) {
                            categoryRepository.save(product.getCategory());
                        } else {
                            product.setCategory(existingCategory);
                        }

                        Brand existingBrand = brandRepository.findByName(product.getBrand().getName()).orElse(null);
                        if (existingBrand == null) {
                            brandRepository.save(product.getBrand());
                        } else {
                            product.setBrand(existingBrand);
                        }

                        Color existingColor = colorRepository.findByName(product.getColor().getName()).orElse(null);

                        if(existingColor == null) {
                            colorRepository.save(product.getColor());
                        } else {
                            product.setColor(existingColor);
                        }

                        productRepository.save(product);
                    }
                    System.out.println("Database populated with " + products.size() + " products.");
                } catch (IOException e) {
                    System.out.println("Error loading data: " + e.getMessage());
                }
            }
        }

    }
