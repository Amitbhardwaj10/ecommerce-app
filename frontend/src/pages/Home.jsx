import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";
import useCategories from "../hooks/useCategories";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBrand, setCategory } from "../store/features/filters/filterSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
	{
		title: "Premium Mechanical Keyboards",
		description:
			"Upgrade your workspace or battlestation with tactile, durable keyboards for productivity and gaming.",
		image:
			"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=cover&w=900&q=80",
	},
	{
		title: "4K UltraWide Monitors",
		description:
			"Experience immersive visuals and crisp, ultra-high definition color for every workflow.",
		image:
			"https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=cover&w=900&q=80",
	},
	{
		title: "Studio-Grade Headsets",
		description:
			"Hear every detail in meetings, gaming, or creativity—without distraction or compromise.",
		image:
			"https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=cover&w=900&q=80",
	},
	{
		title: "Precision Gaming Mice",
		description:
			"Command accuracy and customizability at your fingertips with our wireless gaming mice.",
		image:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=cover&w=900&q=80",
	},
];

export default function HomePage() {
	const [products, setProducts] = useState([]);
	const { categories } = useCategories();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3500,
		speed: 700,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		pauseOnHover: false,
	};

	// Fetch a few trending products
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await api.get("/products");
				setProducts(res.data);
			} catch (err) {
				console.error("Error fetching trending products:", err);
			}
		};
		fetchProducts();
	}, []);

	return (
		<div className="bg-white text-gray-900">
			{/* Hero Section */}
			<section className="relative w-full mb-5 h-screen bg-white flex items-center  transition-all duration-500">
				<Slider {...settings} className="w-full h-full">
					{slides.map((slide, idx) => (
						<div
							key={idx}
							className="relative w-full h-screen flex items-center justify-center"
						>
							{/* Background Image */}
							<img
								src={slide.image}
								alt={slide.title}
								className="absolute inset-0 w-full h-full object-cover opacity-60"
								style={{ zIndex: 0 }}
							/>
							{/* Content */}
							<div className="z-20 mx-auto text-center max-w-2xl relative">
								<h1 className="text-5xl font-extrabold text-gray-900 mb-7 drop-shadow-lg">
									{slide.title}
								</h1>
								<p className="text-xl text-gray-700 mb-10 drop-shadow">
									{slide.description}
								</p>
								<button className="inline-block px-8 py-3 bg-blue-600 text-white text-lg rounded-lg font-semibold hover:bg-blue-700 shadow transition">
									Shop Now
								</button>
							</div>
						</div>
					))}
				</Slider>
			</section>

			{/* Categories Section */}
			<section className="py-10 px-6 max-w-6xl mx-auto rounded-2xl bg-black">
				<h2 className="text-4xl text-white font-bold mb-12 text-center">
					SHOP BY CATEGORY
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
					{categories.map((cat, idx) => (
						<div
							key={idx}
							className="relative rounded-xl overflow-hidden hover:scale-105 transition-transform ease-in bg-gray-900 shadow-lg group"
						>
							<img
								src={cat.products[idx].image}
								alt={cat.category}
								className="w-full h-60 object-cover opacity-60 group-hover:opacity-80 transition"
							/>
							<div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent">
								<h3 className="text-2xl font-semibold text-white">
									{cat.category}
								</h3>
								<p className="text-sm text-gray-100 line-clamp-2">
									{cat.products[idx].title}
								</p>
								<button
									className="mt-4 px-4 py-2 text-white bg-blue-800 text-sm rounded-lg hover:bg-blue-700 transition"
									onClick={() => {
										dispatch(setCategory([cat.category]));
										navigate("/products");
									}}
								>
									Explore
								</button>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Featured Brands */}
			<section className="py-10 px-6 max-w-6xl  mx-auto bg-black mt-5 rounded-2xl">
				<h2 className="text-4xl font-bold mb-12 text-white text-center">
					FEATURED BRANDS
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
					{products
						.map((prod) => prod.brand)
						.slice(0, 6)
						.map((brand, idx) => (
							<div
								key={idx}
								className="cursor-pointer flex items-center justify-center h-24 bg-white border rounded-xl shadow hover:shadow-md hover:scale-105 transition-transform ease-in"
								onClick={() => {
									dispatch(setBrand([brand]));
									navigate("/products");
								}}
							>
								<p className="text-lg font-semibold">{brand}</p>
							</div>
						))}
				</div>
			</section>

			{/* Trending Products Section */}
			<section className="py-10 px-6 bg-black max-w-6xl mx-auto flex flex-col items-center justify-center text-white my-5 rounded-2xl">
				<h2 className="text-4xl font-bold mb-12 text-center">
					TRENDING PRODUCTS
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
					{products.slice(0, 8).map((product) => (
						<div
							key={product.productId}
							className="cursor-pointer rounded-md bg-white"
						>
							<ProductCard {...product} />
						</div>
					))}
				</div>
				<button
					className="mt-8 px-6 w-fit py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition"
					onClick={() => navigate("/products")}
				>
					All Products
				</button>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-blue-800 text-center text-white">
				<h2 className="text-4xl font-bold mb-6">
					Ready to Build Your Dream Setup?
				</h2>
				<p className="text-lg mb-8">
					Subscribe to get the latest deals on cameras, audio gear, and more.
				</p>
				<div className="flex justify-center gap-4">
					<input
						type="email"
						placeholder="Enter your email"
						className="px-4 py-3 rounded-lg text-black w-72"
					/>
					<button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
						Subscribe
					</button>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-8 bg-gray-100 text-center text-gray-600 text-sm">
				© {new Date().getFullYear()} ElectroStore. All rights reserved.
			</footer>
		</div>
	);
}
