package com.ecommerce.backend.repository;

import com.ecommerce.backend.dto.MinMaxPrice;
import com.ecommerce.backend.entity.Product;
import lombok.NonNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    @EntityGraph(attributePaths = {"brand", "color", "category"})
    List<Product> findByCategory_Id(Long id);

    @EntityGraph(attributePaths = {"brand", "color", "category"})
    @NonNull
    List<Product> findAll();

    @EntityGraph(attributePaths = {"brand", "color", "category"})
    @NonNull
    Optional<Product> findById( @NonNull Long id);

    @Query("SELECT DISTINCT p FROM Product p " +
            "JOIN FETCH p.brand " +
            "JOIN FETCH p.color " +
            "JOIN FETCH p.category")
    public List<Product> findAllWithRelations();


    @Query("SELECT MIN(p.price) as minPrice, MAX(p.price) as maxPrice FROM Product p")
    public MinMaxPrice findMinMaxPrice();
}
