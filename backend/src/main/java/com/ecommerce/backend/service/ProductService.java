package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductRequestDto;
import com.ecommerce.backend.model.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    public Product saveProduct(Product product);
    public List<Product> getAllProducts();
    public Product getProductById(Long id);
    public List<Product> getProductsByCategoryId(Long categoryId);

    public ResponseEntity<String> saveAllproducts(List<ProductRequestDto> productDtos);
}
