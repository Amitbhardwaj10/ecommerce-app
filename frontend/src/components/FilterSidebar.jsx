import React from "react";
import CategoryFilter from "./subComponents/CategoryFilter";
import BrandFilter from "./subComponents/BrandFilter";
import ColorFilter from "./subComponents/ColorFilter";
import PriceRangeFilter from "./subComponents/PriceRangeFilter";
import { useDispatch, useSelector } from "react-redux";
import {
	clearFilters,
	toggleFilter,
} from "../store/features/filters/filterSlice";
import AvailabilityFilter from "./subComponents/AvailabilityFilter";

const FilterSidebar = ({ filterOptions }) => {
	const dispatch = useDispatch();
	const { categories, brands, colors, minPrice, maxPrice } =
		filterOptions || {};
	const { selected } = useSelector((state) => state.filters);

	const handleToggle = (key, value) => {
		dispatch(toggleFilter({ key, value }));
	};

	const isFilterActive = Object.values(selected).some((value) => {
		if (value.length === 2 && typeof value[0] === "number") {
			return value[0] > minPrice || value[1] < maxPrice;
		}

		return value.length > 0;
	});

	return (
		<div className="w-full bg-white md:sticky md:top-20 scroll-my-6">
			<div className="flex items-center justify-between py-3 px-5">
				<h2 className="font-bold text-lg">FILTERS</h2>
				<button
					className={`text-blue-600 text-xs font-semibold ${
						!isFilterActive && "hidden"
					}`}
					onClick={() => dispatch(clearFilters())}
				>
					CLEAR ALL
				</button>
			</div>

			<div>
				{categories?.length > 0 && (
					<CategoryFilter
						options={categories}
						selected={selected.categories}
						onToggle={(value) => handleToggle("categories", value)}
					/>
				)}
				{brands?.length > 0 && (
					<BrandFilter
						options={brands}
						selected={selected.brands}
						onToggle={(value) => handleToggle("brands", value)}
					/>
				)}
				{colors?.length > 0 && (
					<ColorFilter
						options={colors}
						selected={selected.colors}
						onToggle={(value) => handleToggle("colors", value)}
					/>
				)}
				{minPrice && maxPrice && (
					<PriceRangeFilter min={minPrice} max={maxPrice} />
				)}
				<AvailabilityFilter
					selected={selected.inStock}
					onToggle={(value) => handleToggle("inStock", value)}
				/>
			</div>
		</div>
	);
};

export default FilterSidebar;
