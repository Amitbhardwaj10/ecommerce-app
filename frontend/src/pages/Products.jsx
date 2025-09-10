import React, { useEffect, useRef, useState } from "react";
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
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

function Products() {
	const [filterOptions, setFilterOptions] = useState({});
	const [products, setProducts] = useState([]);
	const dispatch = useDispatch();
	const selectedFilters = useSelector((state) => state.filters.selected);
	const [searchParams, setSearchParams] = useSearchParams();
	const [filtersInitialized, setFiltersInitialized] = useState(false); // NEW
	const ref = useRef();

	// Only initialize Redux filter state from URL ONCE (on mount)
	useEffect(() => {
		if (!filtersInitialized) {
			const categories =
				searchParams.get("category")?.split(",").filter(Boolean) || [];
			const brands =
				searchParams.get("brand")?.split(",").filter(Boolean) || [];
			const colors =
				searchParams.get("color")?.split(",").filter(Boolean) || [];
			const price = searchParams.get("price")?.split(",") || [];
			const inStock =
				searchParams.get("inStock")?.split(",").filter(Boolean) || [];

			if (categories.length) dispatch(setCategory(categories));
			if (brands.length) dispatch(setBrand(brands));
			if (colors.length) dispatch(setColor(colors));
			if (inStock.length) dispatch(setInStock(inStock));
			if (price.length === 2) {
				const [min, max] = price.map(Number);
				dispatch(setPrice([min, max]));
			}
			setFiltersInitialized(true);
		}
	}, [filtersInitialized, searchParams, dispatch]);

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
		if (!filtersInitialized) return; // Prevent premature param update
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
	}, [selectedFilters, setSearchParams, filtersInitialized]);

	// Fetch filtered products only when Redux filters change
	useEffect(() => {
		if (!filtersInitialized) return; // Don't fetch until filters are set
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
			) {
				params.price = `${selectedFilters.price[0]},${selectedFilters.price[1]}`;
			}

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
	}, [selectedFilters, dispatch, filtersInitialized]);

	return (
		<>
			<div className="w-full py-3 md:py-0 flex flex-col md:flex-row border-t gap-x-4 overflow-x-hidden">
				{/* Filter Sidebar */}
				<div
					ref={ref}
					className="md:w-80 w-full md:border-r z-50 md:z-auto fixed overflow-y-auto inset-0 md:static  hidden md:block overflow-x-hidden"
				>
					<FilterSidebar filterOptions={filterOptions} />

					<button
						className="sticky bottom-0 mt-auto w-full bg-primary text-white py-3 block md:hidden"
						onClick={() => (ref.current.style.display = "none")}
					>
						Apply
					</button>
				</div>

				{/* Products Grid */}
				<div className="lg:w-full w-full mt-4">
					<div className="flex items-center justify-between border-b px-3 pb-1">
						<div>
							<h2 className="inline-block text-2xl">PRODUCTS</h2>
							<span className="text-gray-400 text-lg mx-2 font-semibold">
								({products.length})
							</span>
						</div>

						{/* Filter button to Show filters on small screens */}
						<button
							className="my-2 py-2 px-2  gap-x-2 flex md:hidden items-center"
							onClick={() => (ref.current.style.display = "block")}
						>
							<HiOutlineAdjustmentsHorizontal className="w-6 h-6 text-gray-600" />
							<h2 className="text-lg">Filters</h2>
						</button>
					</div>
					<div className="pt-5 pb-16 px-3 pr-5 xl:max-w-7xl border-b">
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
