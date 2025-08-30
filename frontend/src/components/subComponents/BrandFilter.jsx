const BrandFilter = ({ options, selected, onToggle }) => {
	return (
		<div className="border-t py-3 px-5">
			<h3 className="font-semibold mb-4 text-sm text-gray-800">BRAND</h3>
			<div className="flex flex-col space-y-1 max-h-56 overflow-y-auto">
				{options.map((opt) => (
					<label key={opt.value} className="flex items-center cursor-pointer">
						<input
							type="checkbox"
							checked={selected.includes(opt.label)}
							onChange={() => onToggle(opt.label)}
							className="accent-[var(--primary-color)] w-4 h-4"
						/>
						<span className="ml-2 text-sm">{opt.label}</span>
						<span className="ml-2 text-gray-500 text-xs">({opt.count})</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default BrandFilter;
