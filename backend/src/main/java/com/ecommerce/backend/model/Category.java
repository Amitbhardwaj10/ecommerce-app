package com.ecommerce.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    String category;

    @Column(unique = true)
    private String slug;

    @PrePersist
    @PreUpdate
    public void generateSlug() {
        if (this.category != null && (this.slug == null || this.slug.isEmpty())) {
            String trimmed = category.trim().toLowerCase();
            this.slug = trimmed.replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
        }
    }

    @OneToMany(mappedBy = "category")
    private List<Product> products;
}
