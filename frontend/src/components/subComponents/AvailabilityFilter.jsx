import React from "react";

function AvailabilityFilter({ selected, onToggle }) {
	const availabilityOptions = [
		{ label: "In Stock", value: "1" },
		{ label: "Out of Stock", value: "0" },
	];

	return (
		<div className="border-t py-3 px-5">
			<h3 className="font-semibold mb-4 text-sm text-gray-800">AVAILABILITY</h3>
			<div className="flex flex-col space-y-1">
				{availabilityOptions.map((option) => (
					<label
						key={option.value}
						className="flex items-center cursor-pointer"
					>
						<input
							type="checkbox"
							checked={selected.includes(option.value)}
							onChange={() => onToggle(option.value)}
							className="accent-[var(--primary-color)] w-4 h-4"
						/>
						<span className="ml-2 text-sm">{option.label}</span>
					</label>
				))}
			</div>
		</div>
	);
}

export default AvailabilityFilter;
