import React from "react";
import CategoryFilter from "./subComponents/CategoryFilter";
import BrandFilter from "./subComponents/BrandFilter";
import ColorFilter from "./subComponents/ColorFilter";
import PriceRangeFilter from "./subComponents/PriceRangeFilter";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters } from "../store/features/filters/filterSlice";

const FilterSidebar = ({ filterOptions }) => {
	const dispatch = useDispatch();
	const { categoriesArr, brandsArr, colorsArr, priceRangeArr } =
		filterOptions || {};
	const { selected } = useSelector((state) => state.filters);

	const minPrice = priceRangeArr[0];
	const maxPrice = priceRangeArr[1];

	const isFilterActive = Object.values(selected).some((value) => {
		// Custom check for the price array
		if (value.length === 2 && typeof value[0] === "number") {
			return value[0] > minPrice || value[1] < maxPrice;
		}

		return value.length > 0;
	});

	return (
		<div className="w-full bg-white md:sticky md:top-20">
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
				{categoriesArr?.length > 0 && (
					<CategoryFilter options={categoriesArr} />
				)}
				{brandsArr?.length > 0 && <BrandFilter options={brandsArr} />}
				{priceRangeArr && (
					<PriceRangeFilter min={priceRangeArr[0]} max={priceRangeArr[1]} />
				)}
				{colorsArr?.length > 0 && <ColorFilter options={colorsArr} />}
			</div>
		</div>
	);
};

export default FilterSidebar;
