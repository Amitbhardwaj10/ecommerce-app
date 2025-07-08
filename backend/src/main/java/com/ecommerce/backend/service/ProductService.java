package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Product;

import java.util.List;

public interface ProductService {
    public Product saveProduct(Product product);
    public List<Product> getAllProducts();
    public Product getProductById(Long id);
    public List<Product> getProductsByCategoryId(Long categoryId);
}
