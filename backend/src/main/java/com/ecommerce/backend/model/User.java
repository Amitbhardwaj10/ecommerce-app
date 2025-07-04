package com.ecommerce.backend.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class User {
    // I added Long in UserRepository so that depends about the data that i'm going to use in the particular entity. (Apply for all Entities)
}
