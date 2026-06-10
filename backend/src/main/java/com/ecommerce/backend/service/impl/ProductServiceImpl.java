package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.dto.FilterOptionDto;
import com.ecommerce.backend.dto.FilterOptionProjection;
import com.ecommerce.backend.dto.MinMaxPrice;
import com.ecommerce.backend.dto.response.FilterOptionsResponseDto;
import com.ecommerce.backend.dto.response.ProductResponseDto;
import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.error.ProductNotFoundException;
import com.ecommerce.backend.mapper.ProductMapper;
import com.ecommerce.backend.repository.BrandRepository;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ColorRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.service.ProductService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
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

    @Autowired
    private ProductMapper productMapper;

    private List<FilterOptionDto> mapToFilterOptionDto(List<FilterOptionProjection> projections) {
        return projections.stream().map((proj) -> FilterOptionDto.builder()
                .label(proj.getLabel())
                .value(proj.getValue())
                .count(proj.getCount())
                .build()).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDto> getFilteredProducts(Map<String, String> filters) {
        List<Product> products;

        if (filters == null || filters.isEmpty()) {
            products = productRepository.findAll();
        } else {
            Specification<Product> spec = (root, query, cb) -> {
                List<Predicate> predicates = new ArrayList<>();

                filters.forEach((key, value) -> {
                    if (value == null || value.isBlank()) return;

                    switch (key) {
                        case "brand":
                            predicates.add(root.get("brand").get("name").in(
                                    Arrays.stream(value.split(","))
                                            .map(String::trim)
                                            .filter(v -> !v.isBlank())
                                            .collect(Collectors.toList())
                            ));
                            break;

                        case "category":
                            predicates.add(root.get("category").get("name").in(
                                    Arrays.stream(value.split(","))
                                            .map(String::trim)
                                            .filter(v -> !v.isBlank())
                                            .collect(Collectors.toList())
                            ));
                            break;

                        case "color":
                            predicates.add(root.get("color").get("name").in(
                                    Arrays.stream(value.split(","))
                                            .map(String::trim)
                                            .filter(v -> !v.isBlank())
                                            .collect(Collectors.toList())
                            ));
                            break;

                        case "price":
                            String[] prices = value.split(",");
                            if (prices.length == 2) {
                                try {
                                    Long min = Long.parseLong(prices[0].trim());
                                    Long max = Long.parseLong(prices[1].trim());

                                    if (min > max) {
                                        Long temp = min;
                                        min = max;
                                        max = temp;
                                    }

                                    predicates.add(cb.between(root.get("price"), min, max));
                                } catch (NumberFormatException ignored) {
                                }
                            }
                            break;

                        case "inStock":
                            List<String> stockValues = Arrays.stream(value.split(","))
                                    .map(String::trim)
                                    .filter(v -> !v.isBlank())
                                    .toList();

                            List<Predicate> stockPredicates = new ArrayList<>();

                            if (stockValues.contains("1")) {
                                stockPredicates.add(cb.greaterThan(root.get("quantity"), 0));
                            }

                            if (stockValues.contains("0")) {
                                stockPredicates.add(
                                        cb.or(
                                                cb.lessThanOrEqualTo(root.get("quantity"), 0),
                                                cb.isNull(root.get("quantity"))
                                        )
                                );
                            }

                            if (!stockPredicates.isEmpty()) {
                                predicates.add(cb.or(stockPredicates.toArray(new Predicate[0])));
                            }
                            break;
                    }
                });

                return predicates.isEmpty()
                        ? cb.conjunction()
                        : cb.and(predicates.toArray(new Predicate[0]));
            };

            products = productRepository.findAll(spec);
        }

        return products.stream()
                .map(productMapper::mapToDto)
                .collect(Collectors.toList());
    }


    @Override
    public FilterOptionsResponseDto getAvailableFilterOptions() {
        List<FilterOptionProjection> brandFilters = brandRepository.findBrandFilterOptions();
        List<FilterOptionProjection> colorFilters = colorRepository.findColorFilterOptions();
        List<FilterOptionProjection> categoryFilters = categoryRepository.findCategoryFilterOptions();

        Long countInStock = productRepository.countInStock();
        Long countOutOfStock = productRepository.countOutOfStock();


        List<FilterOptionDto> stockOptions = List.of(
                new FilterOptionDto("In Stock", 1L, countInStock),
                new FilterOptionDto("Out of Stock", 0L, countOutOfStock)
        );

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
                .inStock(stockOptions)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .build();
    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product is not available!"));
        return productMapper.mapToDto(product);
    }

    @Override
    public List<ProductResponseDto> getProductsByCategory(String slug) {
        Category category = categoryRepository.findBySlug(slug.toLowerCase())
                .orElseThrow(() -> new RuntimeException("Category not found with slug: " + slug));
        List<Product> products = productRepository.findByCategory_Id(category.getId());
        return products.stream().map(productMapper::mapToDto).collect(Collectors.toList());
    }
}
