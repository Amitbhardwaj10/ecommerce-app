import React from "react";
import CategoryFilter from "./subComponents/CategoryFilter";
import BrandFilter from "./subComponents/BrandFilter";
import ColorFilter from "./subComponents/ColorFilter";
import PriceRangeFilter from "./subComponents/PriceRangeFilter";
import { useDispatch } from "react-redux";
import { clearFilters } from "../store/features/filters/filterSlice";

const FilterSidebar = ({ filterOptions }) => {
	const dispatch = useDispatch();
	const { categories, brands, colors, priceRange } = filterOptions || {};

	return (
		<div className="w-full bg-white md:sticky md:top-20">
			<div className="flex items-center justify-between py-3 px-5">
				<h2 className="font-bold text-lg">FILTERS</h2>
				<button
					className="text-blue-600 text-xs font-semibold"
					onClick={() => dispatch(clearFilters())}
				>
					CLEAR ALL
				</button>
			</div>

			<div>
				{categories?.length > 0 && <CategoryFilter options={categories} />}
				{brands?.length > 0 && <BrandFilter options={brands} />}
				{priceRange && (
					<PriceRangeFilter min={priceRange[0]} max={priceRange[1]} />
				)}
				{colors?.length > 0 && <ColorFilter options={colors} />}
			</div>
		</div>
	);
};

export default FilterSidebar;
