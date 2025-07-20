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
            Category laptop = categoryRepository.findByCategory("Laptops")
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            Category monitor = categoryRepository.findByCategory("Monitors")
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            Category keyboard = categoryRepository.findByCategory("Keyboards")
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            Category mouse = categoryRepository.findByCategory("Mouses")
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            List<Product> products = List.of(
                    Product.builder()
                            .title("MSI Thin 15, Intel 12th Gen. i7-12650H, 40CM FHD 144Hz Gaming Laptop (16GB/1TB NVMe SSD/Windows 11 Home/Office 2021/NVIDIA GeForce RTX 3050, GDDR6 4GB/Cosmos Gray/1.86Kg) B12UC-2239IN")
                            .description("Massive lightning crackles through the sky; soaring dragons emerge from the mountains, the vastness and wonders of gaming world awaits to be discovered, and the Thin 15 is the perfect companion for your journey! The iconic thin chassis now comes in brand new cosmos grey color and upgraded hardware. Harness the power and experience the gaming world freely, swiftly with Thin 15 !")
                            .price(71990L)
                            .image("https://m.media-amazon.com/images/I/71Ie8YsWrFL._SL1500_.jpg")
                            .category(laptop)
                            .build(),

                    Product.builder()
                            .title("HP Victus, 13th Gen Intel Core i5-13420H, 6GB RTX 4050 (16GB DDR4, 512GB SSD) FHD, 144Hz, IPS, 15.6\"/39.6cm, Win11, Office21, Mica Silver, 2.3kg, fa1319TX, Backlit, B&0, Enhanced Cooling Gaming Laptop")
                            .description("Massive lightning crackles through the sky; soaring dragons emerge from the mountains, the vastness and wonders of gaming world awaits to be discovered, and the Thin 15 is the perfect companion for your journey! The iconic thin chassis now comes in brand new cosmos grey color and upgraded hardware.")
                            .price(76490L)
                            .image("https://m.media-amazon.com/images/I/71NZgR0v39L._SL1500_.jpg")
                            .category(laptop)
                            .build(),

                    Product.builder()
                            .title("HP Smartchoice Omen, AMD Ryzen 9 7940HS, 8GB RTX 4070 (16GB DDR5, 1TB SSD) FHD, 165Hz, IPS, 300 nits, 16.1''/40.9cm, Black, 2.38kg, xf0100AX, RGB KB, B&O, Tempest Cooling, AI-Powered Gaming Laptop")
                            .description("Next-level gamers need next-level processors like the AMD Ryzen 7 7840HS processor, which distributes performance where you need it the most.")
                            .price(142990L)
                            .image("https://m.media-amazon.com/images/I/71-wkc60V-L._SL1500_.jpg")
                            .category(laptop)
                            .build(),

                    Product.builder()
                            .title("ZEBRONICS 81.28 cm (32 inch) Curved Full HD VA Panel Wall Mountable Monitor (ZEB -AC32FHD LED)  (Response Time: 8 ms, 75 Hz Refresh Rate)")
                            .description("\n" +
                                    "Introducing Zebronics ZEB-AC32FHD LED, an 80 cm full high definition curved LED monitor and truly stunning picture quality. The 80 cm screen comes with a curved wide screen and ultra-slim bezel perfect for productivity or entertainment. The monitor has HDMI input & has a dynamic contrast ratio of 500000:1, for deeper blacks and brighter whites.")
                            .price(11999L)
                            .image("https://rukminim2.flixcart.com/image/416/416/xif0q/monitor/d/s/x/zeb-ac32fhd-led-full-hd-32-2022-zeb-ac32fhd-zebronics-original-imagydzpqfy3tvaq.jpeg?q=70&crop=false")
                            .category(monitor)
                            .build(),

                    Product.builder()
                            .title("Acer NITRO 68.58 cm (27 inch) Full HD IPS Panel with sRGB 99%, HDR10 Support, 2X2W Inbuilt Speakers, Acer Display Widget, Acer VisionCare 2.0, Tilt-able stand Gaming Monitor (VG270 X1)  (Frameless, AMD Free Sync, Response Time: 0.5 ms, 200 Hz Refresh Rate)")
                            .description("The Acer Nitro VGO 68.58 cm (27) Full HD monitor offers a stunning 99% sRGB color gamut for vibrant visuals. Its compact, sleek black design is VESA mountable for a clean setup. Enjoy ultra-smooth gameplay with 200 Hz overclocking and AMD FreeSync Premium. The 0.5 ms response time ensures fast reactions, while built-in speakers provide clear audio. Adjust the screen with ErgoStand tilt, and experience wide viewing angles for consistent image quality.")
                            .price(11589L)
                            .image("https://rukminim2.flixcart.com/image/416/416/xif0q/monitor/r/i/i/-original-imahdfzurxsabawa.jpeg?q=70&crop=false")
                            .category(monitor)
                            .build(),

                    Product.builder()
                            .title("Logitech G G213 Prodigy USB Gaming Keyboard with LIGHTSYNC RGB Backlit Keys, Spill-Resistant, Customizable Keys, Dedicated Multi-Media Keys (Black)")
                            .description("Comfortable and Durable G213 Prodigy is a full-sized keyboard designed for gaming and productivity. The slim body is built for gamers of all levels, with a durable construction that repels liquids, crumbs and dirt for easy cleanup. An integrated palm rest and adjustable feet let you set your keyboard to the ideal position, so it’s comfortable to use even during the longest gaming sessions.")
                            .price(3995L)
                            .image("https://m.media-amazon.com/images/I/711iU01TgJL._SL1500_.jpg")
                            .category(keyboard)
                            .build(),

                    Product.builder()
                            .title("Redragon K599 Diemos RGB LED Backlit Mechanical Gaming Keyboard (Black)")
                            .description("Redragon K599 Wireless/Wired Mechanical Gaming Keyboard up to 60 hours battery life with LED off and 30 hours with LED on, easily switch between wired and wireless mode by plugging in the USB cable")
                            .price(4299L)
                            .image("https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg")
                            .category(keyboard)
                            .build(),

                    Product.builder()
                            .title("Keychron Q5 Max Wireless Custom Mechanical Keyboard, 2.4 GHz Bluetooth QMK Full Aluminum 96% Layout RGB with Hot-swappable Gateron Red Switch Compatible with Mac Windows Linux")
                            .description("Upgraded Wireless Full Metal Keyboard: The Q5 Max combines advanced 2.4 GHz wireless, Bluetooth, and Type-C wired connectivity, and enhances workspace efficiency with an explosive compact 96% layout. Features QMK key remapping, a 1000 Hz polling rate (on 2.4 and wired modes), PBT keycaps, and more for that premium thock feel.")
                            .price(58978L)
                            .image("https://m.media-amazon.com/images/I/61L+Vt9ujoL._SL1500_.jpg")
                            .category(keyboard)
                            .build(),

                    Product.builder()
                            .title("Perixx [Hardware Update PERIMICE-513N, Wired Ergonomic Vertical Mouse - 1000/1500/2000 DPI - Natural Ergonomic Vertical Design - Recommended with RSI User")
                            .description("100% Polyester;Imported; Perfect Size: this dublin popcorn stretch slipcover has 94L x 24W most arm chair\n" +
                                    "Durable material: the furniture cover protector is durably Made from 100Percent polyester")
                            .price(1799L)
                            .image("https://m.media-amazon.com/images/I/51N0cWqT93L._SL1499_.jpg")
                            .category(mouse)
                            .build(),

                    Product.builder()
                            .title("Logitech G502 Lightspeed Wireless Gaming Mouse, Hero 16K Sensor, 16,000 DPI, RGB, Adjustable Weights, 11 Programmable Buttons, Long Battery Life, On-Board Memory, PC/Mac - Black")
                            .description("High-performance design:The iconic shape that pushed the boundaries of PC gaming mouse has evolved for wireless performance & internal endoskeleton structure to reduce weight & increase gaming control")
                            .price(9429L)
                            .image("https://m.media-amazon.com/images/I/51ZLPEu0SmS._SL1000_.jpg")
                            .category(mouse)
                            .build()
            );

            productRepository.saveAll(products);
        }
    }
}
