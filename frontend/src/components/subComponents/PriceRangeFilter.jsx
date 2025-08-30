import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPrice } from "../../store/features/filters/filterSlice";
import { Slider } from "@mui/material";

const PriceRangeFilter = ({ min, max }) => {
	const value = useSelector((state) => state.filters.selected.price);
	const dispatch = useDispatch();

	const handleChange = (_, newValue) => {
		dispatch(setPrice(newValue));
	};

	return (
		<div className="border-t py-3 px-5">
			<h3 className="font-semibold mb-2 text-sm text-gray-800">PRICE</h3>
			<Slider
				value={!value.length ? [min, max] : value}
				onChange={handleChange}
				min={min}
				step={100}
				max={max}
				size="small"
				valueLabelDisplay="auto"
				sx={{
					"& .MuiSlider-thumb": {
						color: "#00546e",
					},
					"& .MuiSlider-track": {
						color: "#023c5c",
					},
					"& .MuiSlider-rail": {
						color: "lightgray",
					},
				}}
			/>
			<div className="mt-2 flex space-x-2 text-sm">
				<span>₹{value[0] ? value[0] : min}</span>
				<span>–</span>
				<span>₹{value[1] ? value[1] : max}</span>
			</div>
		</div>
	);
};

export default PriceRangeFilter;
