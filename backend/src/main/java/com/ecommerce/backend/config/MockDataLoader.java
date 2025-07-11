package com.ecommerce.backend.config;

import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MockDataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            Category men = categoryRepository.findByCategory("men's clothing")
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            Category electronics = categoryRepository.findByCategory("electronics")
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            Category jewellery = categoryRepository.findByCategory("jewelery")
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            Category women = categoryRepository.findByCategory("women's clothing")
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            List<Product> products = List.of(
                    Product.builder()
                            .title("Fjallraven - Foldsack No. 1 Backpack")
                            .description("Perfect pack for everyday use and forest walks.")
                            .price(109.95)
                            .image("https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg")
                            .category(men)
                            .build(),

                    Product.builder()
                            .title("Mens Casual Premium Slim Fit T-Shirts")
                            .description("Slim-fitting style, contrast raglan long sleeve...")
                            .price(22.30)
                            .image("https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg")
                            .category(men)
                            .build(),

                    Product.builder()
                            .title("Mens Cotton Jacket")
                            .description("Great outerwear jackets for Spring/Autumn/Winter.")
                            .price(55.99)
                            .image("https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg")
                            .category(men)
                            .build(),

                    Product.builder()
                            .title("Mens Casual Slim Fit")
                            .description("Color may differ slightly...")
                            .price(15.99)
                            .image("https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg")
                            .category(men)
                            .build(),

                    Product.builder()
                            .title("Solid Gold Petite Micropave")
                            .description("Return or exchange any order within 30 days.")
                            .price(168.00)
                            .image("https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg")
                            .category(jewellery)
                            .build(),

                    Product.builder()
                            .title("White Gold Plated Princess")
                            .description("Classic Created Wedding Engagement Ring.")
                            .price(9.99)
                            .image("https://fakestoreapi.com/img/71ya6Jk9F0L._AC_UL640_QL65_ML3_.jpg")
                            .category(jewellery)
                            .build(),

                    Product.builder()
                            .title("Pierced Owl Rose Gold Plated Stainless Steel")
                            .description("Rose Gold Plated Double Flared Tunnel Plug Earrings.")
                            .price(10.99)
                            .image("https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg")
                            .category(jewellery)
                            .build(),

                    Product.builder()
                            .title("WD 2TB Elements Portable External Hard Drive")
                            .description("USB 3.0 and USB 2.0 Compatibility.")
                            .price(64.00)
                            .image("https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg")
                            .category(electronics)
                            .build(),

                    Product.builder()
                            .title("SanDisk SSD PLUS 1TB Internal SSD")
                            .description("Easy upgrade for faster boot up, shutdown, and app response.")
                            .price(109.00)
                            .image("https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg")
                            .category(electronics)
                            .build(),

                    Product.builder()
                            .title("Opna Women's Short Sleeve Moisture")
                            .description("Soft, lightweight fabric delivers superior comfort.")
                            .price(7.95)
                            .image("https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg")
                            .category(women)
                            .build()
            );

            productRepository.saveAll(products);
        }
    }
}
