package com.ecommerce.backend.service.admin.impl;

import com.ecommerce.backend.dto.request.ProductRequestDto;
import com.ecommerce.backend.dto.response.ProductResponseDto;
import com.ecommerce.backend.entity.Brand;
import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.entity.Color;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.error.BrandNotFoundException;
import com.ecommerce.backend.error.CategoryNotFoundException;
import com.ecommerce.backend.error.ColorNotFoundException;
import com.ecommerce.backend.error.ProductNotFoundException;
import com.ecommerce.backend.mapper.ProductMapper;
import com.ecommerce.backend.repository.BrandRepository;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ColorRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.service.admin.AdminProductService;
import org.springframework.stereotype.Service;

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

        Brand brand = brandRepository.findById(dto.getBrandId()).orElseThrow(() -> new BrandNotFoundException("Brand not found!"));

        Color color = colorRepository.findById(dto.getColorId())
                .orElseThrow(() -> new ColorNotFoundException("Color not found"));

        Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(() -> new CategoryNotFoundException("Category not found"));

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
    public ProductResponseDto updateProduct(Long id, ProductRequestDto dto) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product not found"));

        Brand brand = brandRepository.findById(dto.getBrandId()).orElseThrow(() -> new BrandNotFoundException("Brand not found!"));

        Color color = colorRepository.findById(dto.getColorId())
                .orElseThrow(() -> new ColorNotFoundException("Color not found"));

        Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        product.setBrand(brand);
        product.setCategory(category);
        product.setColor(color);
        product.setImage(dto.getImage());
        product.setDescription(dto.getDescription());
        product.setTitle(dto.getTitle());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity() != null ? dto.getQuantity() : 0);
        product.setInStock(dto.getQuantity() != null && dto.getQuantity() >= 1 ? 1 : 0);

        productRepository.save(product);
        return productMapper.mapToDto(product);
    }

}
