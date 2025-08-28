package com.ecommerce.backend.repository;

import com.ecommerce.backend.dto.FilterOptionProjection;
import com.ecommerce.backend.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {
    public Optional<Color> findByName(String name);

    @Query("SELECT c.name AS label, c.id AS value, COUNT(p) AS count " +
            "FROM Color c JOIN Product p ON p.color = c " +
            "GROUP BY c.id, c.name")
    public List<FilterOptionProjection> findColorFilterOptions();

}
