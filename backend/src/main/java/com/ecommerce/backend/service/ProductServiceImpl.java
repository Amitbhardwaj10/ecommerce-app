package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.*;
import com.ecommerce.backend.entity.Brand;
import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.entity.Color;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.error.ProductNotFoundException;
import com.ecommerce.backend.repository.BrandRepository;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ColorRepository;
import com.ecommerce.backend.repository.ProductRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ColorRepository colorRepository;

    private ProductResponseDto mapToDto(Product product) {
        ProductResponseDto dto = ProductResponseDto.builder()
                .productId(product.getProductId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .image(product.getImage())
                .brand(product.getBrand().getName())
                .color(product.getColor().getName())
                .inStock(product.getInStock() != null && product.getInStock() == 1)
                .categoryName(product.getCategory().getName())
                .build();
        return dto;
    }

    private List<FilterOptionDto> mapToFilterOptionDto(List<FilterOptionProjection> projections) {
        return projections.stream().map((proj) -> FilterOptionDto.builder()
                .label(proj.getLabel())
                .value(proj.getValue())
                .count(proj.getCount())
                .build()).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<String> createProduct(ProductRequestDto dto) {
        Brand brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        Color color = colorRepository.findById(dto.getColorId())
                .orElseThrow(() -> new RuntimeException("Color not found"));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = Product.builder()
                .title(dto.getTitle())
                .price(dto.getPrice())
                .description(dto.getDescription())
                .image(dto.getImage())
                .brand(brand)
                .color(color)
                .category(category)
                .build();

        productRepository.save(product);
        return ResponseEntity.ok("Created successfully!");
    }

    @Override
    public ResponseEntity<String> saveAllProducts(List<ProductRequestDto> productDtos) {
        List<Product> products = new ArrayList<>();

        for (ProductRequestDto dto : productDtos) {
            Brand brand = brandRepository.findById(dto.getBrandId())
                    .orElseThrow(() -> new RuntimeException("Brand not found"));

            Color color = colorRepository.findById(dto.getColorId())
                    .orElseThrow(() -> new RuntimeException("Color not found"));

            Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found"));


            Product product = Product.builder()
                    .title(dto.getTitle())
                    .description(dto.getDescription())
                    .price(dto.getPrice())
                    .image(dto.getImage())
                    .color(color)
                    .brand(brand)
                    .category(category)
                    .build();

            products.add(product);
        }
        productRepository.saveAll(products);
        return ResponseEntity.ok("products saved successfully");
    }

    @Override
    public List<ProductResponseDto> getFilteredProducts(Map<String, String> filters) {
        List<Product> products;

        if (filters == null || filters.isEmpty()) {
            // No filters → optimized fetch join query
            products = productRepository.findAllWithRelations();
        } else {
            // Apply filters dynamically
            Specification<Product> spec = (root, query, cb) -> {
                List<Predicate> predicates = new ArrayList<>();

                filters.forEach((key, value) -> {
                    switch (key) {
                        case "brand":
                            predicates.add(root.get("brand").get("name").in(Arrays.asList(value.split(","))));
                            break;
                        case "category":
                            predicates.add(root.get("category").get("name").in(Arrays.asList(value.split(","))));
                            break;
                        case "color":
                            predicates.add(root.get("color").get("name").in(Arrays.asList(value.split(","))));
                            break;
                        case "price":
                            String[] prices = value.split(",");
                            if (prices.length == 2) {
                                try {
                                    Long min = Long.parseLong(prices[0]);
                                    Long max = Long.parseLong(prices[1]);
                                    predicates.add(cb.between(root.get("price"), min, max));
                                } catch (NumberFormatException ignored) {}
                            }
                            break;
                        case "inStock":
                            List<Integer> inStockValues = Arrays.stream(value.split(","))
                                    .map(Integer::valueOf)
                                    .collect(Collectors.toList());
                            predicates.add(root.get("inStock").in(inStockValues));
                            break;
                    }
                });

                return predicates.isEmpty() ? cb.conjunction() : cb.and(predicates.toArray(new Predicate[0]));
            };

            products = productRepository.findAll(spec);
        }

        return products.stream().map(this::mapToDto).collect(Collectors.toList());
    }


    @Override
    public FilterOptionsResponseDto getAvailableFilterOptions() {
        List<FilterOptionProjection> brandFilters = brandRepository.findBrandFilterOptions();
        List<FilterOptionProjection> colorFilters = colorRepository.findColorFilterOptions();
        List<FilterOptionProjection> categoryFilters = categoryRepository.findCategoryFilterOptions();

        MinMaxPrice result = productRepository.findMinMaxPrice();
        Long minPrice = result != null ? result.getMinPrice() : 0L;
        Long maxPrice = result != null ? result.getMaxPrice() : 0L;

        List<FilterOptionDto> brands = mapToFilterOptionDto(brandFilters);
        List<FilterOptionDto> colors = mapToFilterOptionDto(colorFilters);
        List<FilterOptionDto> categories = mapToFilterOptionDto(categoryFilters);

        return FilterOptionsResponseDto.builder()
                .brands(brands)
                .categories(categories)
                .colors(colors)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .build();
    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product is not available!"));
        return mapToDto(product);
    }

    @Override
    public List<ProductResponseDto> getProductsByCategory(String slug) {
        Category category = categoryRepository.findBySlug(slug.toLowerCase())
                .orElseThrow(() -> new RuntimeException("Category not found with slug: " + slug));
        List<Product> products = productRepository.findByCategory_Id(category.getId());
        return products.stream().map(this::mapToDto).collect(Collectors.toList());
    }
}
