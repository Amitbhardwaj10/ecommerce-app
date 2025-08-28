package com.ecommerce.backend.repository;

import com.ecommerce.backend.dto.MinMaxPrice;
import com.ecommerce.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    public List<Product> findByCategory_Id(Long id);

    @Query("SELECT MIN(p.price) as minPrice, MAX(p.price) as maxPrice FROM Product p")
    public MinMaxPrice findMinMaxPrice();
}
