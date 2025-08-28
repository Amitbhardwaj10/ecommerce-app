package com.ecommerce.backend.repository;

import com.ecommerce.backend.dto.FilterOptionProjection;
import com.ecommerce.backend.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {
    @Query("SELECT c.name AS label, c.id AS value, COUNT(p) AS count " +
            "FROM Color c JOIN Product p ON p.color = c " +
            "GROUP BY c.id, c.name")
    List<FilterOptionProjection> findColorFilterOptions();

}
