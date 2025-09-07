import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";
import useCategories from "../hooks/useCategories";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBrand, setCategory } from "../store/features/filters/filterSlice";
import {
	HiChevronLeft,
	HiChevronRight,
	HiChevronDoubleDown,
} from "react-icons/hi2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroImg1 from "../assets/heroImg1.png";
import heroImg2 from "../assets/heroImg2.png";
import heroImg3 from "../assets/heroImg3.png";

const slides = [
	{
		title: "Ultimate Destination for Computer Peripherals and Components",
		desc: "Explore a vast selection of high-quality keyboards, mice, laptops, and all the essential components to build the dream PC. We bring you the latest in technology and performance.",
		img: heroImg1,
	},
	{
		title: "Level Up Your Setup",
		desc: "Discover the perfect synergy of gear. From responsive keyboards and precise mice to powerful laptops, find everything you need for peak performance and immersive gaming.",
		img: heroImg2,
	},
	{
		title: "TYPE. GAME. CONQUER.",
		desc: "Unleash peak performance with our cutting-edge mechanical keyboards. Experience swappable switches, customizable backlighting, and ergonomic designs built for precision typing and immersive gaming.",
		img: heroImg3,
	},
];

function ScrollIndicator() {
	const handleScroll = () => {
		window.scrollBy({
			top: window.innerHeight * 0.9,
			left: 0,
			behavior: "smooth",
		});
	};

	return (
		<button
			onClick={handleScroll}
			className="flex flex-col items-center focus:outline-none"
			aria-label="Scroll down"
		>
			<span className="text-sm text-gray-700 mb-1 hidden sm:block">Scroll</span>
			<HiChevronDoubleDown className="w-6 h-6 text-gray-700 animate-bounce" />
		</button>
	);
}

function NextArrow({ onClick }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 focus:outline-none border-2"
		>
			<HiChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
		</button>
	);
}

function PrevArrow({ onClick }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 focus:outline-none border-2"
		>
			<HiChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
		</button>
	);
}

export default function Home() {
	const [products, setProducts] = useState([]);
	const { categories } = useCategories();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const settings = {
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3500,
		speed: 700,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		pauseOnHover: false,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
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
			<section className="mb-5 border-b relative w-full h-full lg:h-[90vh] pb-5 lg-pb-0 bg-white">
				<Slider {...settings} className="w-full h-full">
					{slides.map((slide, idx) => (
						<div key={idx} className="h-full lg:mt-8">
							<div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full h-full max-w-7xl mx-auto mt-5 gap-5 px-2 lg:px-12">
								<div className="w-full lg:w-1/2 flex flex-col justify-center h-full text-center lg:text-left space-y-4 lg:space-y-6">
									<h2 className="text-2xl lg:text-5xl font-bold text-gray-900 leading-tight">
										{slide.title}
									</h2>
									<p className="text-sm lg:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
										{slide.desc}
									</p>
									<button
										className="mt-4 px-6 py-3 bg-blue-800 text-white rounded-lg text-base hover:bg-blue-700 transition w-fit mx-auto lg:mx-0"
										onClick={() => navigate("/products")}
									>
										Shop Now
									</button>
								</div>

								<div className="w-full lg:w-2/5 flex items-center justify-center h-full mt-8 lg:mt-0">
									<img
										src={slide.img}
										alt={slide.title}
										draggable="false"
										className="max-h-[60vh] lg:max-h-[80vh] w-auto object-contain select-none flex-shrink-0"
									/>
								</div>
							</div>
						</div>
					))}
				</Slider>

				{/* Scroll Indicator */}
				<div className="mt-6 lg:mt-0 lg:absolute lg:bottom-5 lg:left-1/2 lg:-translate-x-1/2 z-20 flex justify-center w-full lg:w-auto">
					<ScrollIndicator />
				</div>
			</section>

			{/* Categories Section */}
			<section className="py-10 px-6 max-w-6xl mx-auto rounded-2xl bg-black">
				<h2 className="text-xl sm:text-4xl text-white font-bold mb-12 text-center">
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
			<section className="py-10 px-3 sm:px-6 max-w-6xl  mx-auto bg-black mt-5 rounded-2xl">
				<h2 className="text-xl sm:text-4xl font-bold mb-12 text-white text-center">
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
			<section className="py-10 px-1 sm:px-6 bg-black max-w-6xl mx-auto flex flex-col items-center justify-center text-white my-5 rounded-2xl">
				<h2 className="text-xl sm:text-4xl font-bold mb-12 text-center">
					TRENDING PRODUCTS
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-7xl mx-auto">
					{products.slice(0, 7).map((product) => (
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
			{/* <section className="py-20 bg-blue-800 text-center text-white">
				<h2 className="text-xl sm:text-4xl font-bold mb-6">
					Ready to Build Your Dream Setup?
				</h2>
				<p className="sm:text-lg mb-8">
					Subscribe to get the latest deals on cameras, audio gear, and more.
				</p>
				<div className="flex flex-col items-center sm:flex-row justify-center gap-4">
					<input
						type="email"
						placeholder="Enter your email"
						className="px-4 py-3 rounded-lg text-black w-72"
					/>
					<button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
						Subscribe
					</button>
				</div>
			</section> */}
		</div>
	);
}
