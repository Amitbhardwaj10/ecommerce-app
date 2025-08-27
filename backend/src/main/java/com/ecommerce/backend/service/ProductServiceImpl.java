package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.FilterOptionsResponseDto;
import com.ecommerce.backend.dto.ProductRequestDto;
import com.ecommerce.backend.dto.ProductResponseDto;
import com.ecommerce.backend.error.ProductNotFoundException;
import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private ProductResponseDto mapToDto(Product product) {
        ProductResponseDto dto = ProductResponseDto.builder()
                .productId(product.getProductId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .image(product.getImage())
                .categoryName(product.getCategory().getCategory())
                .build();
        return dto;
    }

    @Override
    public ResponseEntity<String> createProduct(ProductRequestDto dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = Product.builder()
                .title(dto.getTitle())
                .price(dto.getPrice())
                .description(dto.getDescription())
                .image(dto.getImage())
                .category(category)
                .build();

        productRepository.save(product);
        return ResponseEntity.ok("Created successfully!");
    }

    @Override
    public ResponseEntity<String> saveAllProducts(List<ProductRequestDto> productDtos) {
        List<Product> products = new ArrayList<>();

        for (ProductRequestDto dto : productDtos) {
            Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found"));

            Product product = Product.builder()
                    .title(dto.getTitle())
                    .description(dto.getDescription())
                    .price(dto.getPrice())
                    .image(dto.getImage())
                    .category(category)
                    .build();

            products.add(product);
        }
        productRepository.saveAll(products);
        return ResponseEntity.ok("products saved successfully");
    }

    @Override
    public List<ProductResponseDto> getFilteredProducts(Map<String, List<String>> filters) {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public FilterOptionsResponseDto getAvailableFilterOptions() {

    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product is not available!"));
        return mapToDto(product);
    }

    @Override
    public List<ProductResponseDto> getprodutsByCategory(String slug) {
        Category category = categoryRepository.findBySlug(slug.toLowerCase())
                .orElseThrow(() -> new RuntimeException("Category not found with slug: " + slug));
        List<Product> products = productRepository.findByCategory_Id(category.getId());
        return products.stream().map(this::mapToDto).toList();
    }
}
