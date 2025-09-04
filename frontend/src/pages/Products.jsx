import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
	startLoading,
	stopLoading,
} from "../store/features/loading/loadingSlice";
import FilterSidebar from "../components/FilterSidebar";
import {
	setBrand,
	setCategory,
	setColor,
	setInStock,
	setPrice,
} from "../store/features/filters/filterSlice";
import { useSearchParams } from "react-router-dom";

function Products() {
	const [filterOptions, setFilterOptions] = useState({});
	const [products, setProducts] = useState([]);
	const dispatch = useDispatch();
	const selectedFilters = useSelector((state) => state.filters.selected);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const categories = searchParams.get("category")?.split(",") || [];
		const brands = searchParams.get("brand")?.split(",") || [];
		const colors = searchParams.get("color")?.split(",") || [];
		const price = searchParams.get("price")?.split(",") || [];
		const inStock = searchParams.get("inStock")?.split(",") || [];

		if (categories.length) dispatch(setCategory(categories));
		if (brands.length) dispatch(setBrand(brands));
		if (colors.length) dispatch(setColor(colors));
		if (inStock.length) dispatch(setInStock(inStock));
		if (price.length === 2) {
			const [min, max] = price.map(Number);
			dispatch(setPrice([min, max]));
		}
	}, []);

	// Fetch filter options once
	useEffect(() => {
		const fetchFilterOptions = async () => {
			try {
				const res = await api.get("/products/filters");
				setFilterOptions(res.data);
			} catch (err) {
				console.error("Error fetching filter options:", err);
			}
		};
		fetchFilterOptions();
	}, []);

	// Update URL query params whenever Redux filter state changes
	useEffect(() => {
		const params = {};
		if (selectedFilters.categories.length)
			params.category = selectedFilters.categories.join(",");
		if (selectedFilters.brands.length)
			params.brand = selectedFilters.brands.join(",");
		if (selectedFilters.colors.length)
			params.color = selectedFilters.colors.join(",");
		if (selectedFilters.inStock.length)
			params.inStock = selectedFilters.inStock.join(",");
		if (
			selectedFilters.price.length === 2 &&
			selectedFilters.price[0] != null &&
			selectedFilters.price[1] != null
		) {
			params.price = `${selectedFilters.price[0]},${selectedFilters.price[1]}`;
		}
		setSearchParams(params, { replace: true });
	}, [selectedFilters, setSearchParams]);

	// Fetch products whenever filters in Redux change
	useEffect(() => {
		const fetchFilteredProducts = async () => {
			const params = {};

			if (selectedFilters.categories.length)
				params.category = selectedFilters.categories.join(",");
			if (selectedFilters.brands.length)
				params.brand = selectedFilters.brands.join(",");
			if (selectedFilters.colors.length)
				params.color = selectedFilters.colors.join(",");
			if (selectedFilters.inStock.length)
				params.inStock = selectedFilters.inStock.join(",");
			if (
				selectedFilters.price.length === 2 &&
				selectedFilters.price[0] != null &&
				selectedFilters.price[1] != null
			)
				params.price = `${selectedFilters.price[0]},${selectedFilters.price[1]}`;

			dispatch(startLoading());
			try {
				const res = await api.get("/products", { params });
				setProducts(res.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				dispatch(stopLoading());
			}
		};

		fetchFilteredProducts();
	}, [selectedFilters, dispatch]);

	return (
		<>
			<div className="w-full flex flex-col md:flex-row border-t gap-x-4 border-collapse">
				{/* Filter Sidebar */}
				<div className="md:w-80 w-full border-r">
					<FilterSidebar filterOptions={filterOptions} />
				</div>

				{/* Products Grid */}
				<div className="lg:w-full w-full border-b border-separate">
					<div className="pt-5 pb-16 px-3 xl:max-w-7xl">
						<div className="grid grid-cols-2 gap-x-1 sm:gap-x-4 gap-y-1 sm:gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
							{products.map((product) => (
								<ProductCard key={product.productId} {...product} />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Products;
