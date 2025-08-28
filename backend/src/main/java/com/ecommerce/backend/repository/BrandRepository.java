package com.ecommerce.backend.repository;

import com.ecommerce.backend.dto.FilterOptionProjection;
import com.ecommerce.backend.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    public Optional<Brand> findByName(String name);

    @Query("SELECT b.name AS label, b.id AS value, COUNT(p) AS count " +
            "FROM Brand b JOIN Product p ON p.brand = b " +
            "GROUP BY b.id, b.name")
    public List<FilterOptionProjection> findBrandFilterOptions();


}
