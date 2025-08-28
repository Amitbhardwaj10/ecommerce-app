package com.ecommerce.backend.repository;

import com.ecommerce.backend.dto.FilterOptionProjection;
import com.ecommerce.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByCategory(String categoryName);

    Optional<Category> findBySlug(String slug);

    boolean existsByCategory(String name);

    @Query("SELECT c.id AS value, c.category AS label, COUNT(p) AS count " +
            "FROM Category c JOIN Product p ON p.category = c " +
            "GROUP BY c.id, c.category")
    List<FilterOptionProjection> findCategoryFilterOptions();

}
