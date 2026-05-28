package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.dto.request.ProductRequestDto;
import com.ecommerce.backend.dto.response.ProductResponseDto;
import com.ecommerce.backend.entity.Brand;
import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.entity.Color;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.mapper.ProductMapper;
import com.ecommerce.backend.repository.BrandRepository;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ColorRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.service.AdminProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminProductServiceImpl implements AdminProductService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final ColorRepository colorRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public AdminProductServiceImpl(ProductRepository productRepository, BrandRepository brandRepository, ColorRepository colorRepository, CategoryRepository categoryRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.colorRepository = colorRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
    }

    @Override
    public ProductResponseDto createProduct(ProductRequestDto dto) {

        Brand brand = brandRepository.findById(dto.getBrandId()).orElseThrow(() -> new RuntimeException("Brand not found!"));

        Color color = colorRepository.findById(dto.getColorId())
                .orElseThrow(() -> new RuntimeException("Color not found"));

        Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = Product.builder()
                .color(color)
                .inStock(dto.getQuantity() >= 1 ? 1 : 0)
                .quantity(dto.getQuantity())
                .image(dto.getImage())
                .description(dto.getDescription())
                .title(dto.getTitle())
                .category(category)
                .price(dto.getPrice())
                .brand(brand)
                .build();

        productRepository.save(product);

        return productMapper.mapToDto(product);
    }

    @Override
    public ResponseEntity<String> saveAllProducts(List<ProductRequestDto> productDtos) {
        return null;
    }
}
