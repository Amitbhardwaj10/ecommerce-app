import { useSelector, useDispatch } from "react-redux";
import { setColor } from "../../store/features/filters/filterSlice";

const ColorFilter = ({ options }) => {
	const selected = useSelector((state) => state.filters.selected.colors);
	const dispatch = useDispatch();

	const toggle = (value) => {
		dispatch(
			setColor(
				selected.includes(value)
					? selected.filter((v) => v !== value)
					: [...selected, value]
			)
		);
	};

	return (
		<div className="border-t py-3 px-5">
			<h3 className="font-semibold mb-4 text-sm text-gray-800">Color</h3>
			<div className="flex flex-col space-y-1">
				{options.map((opt) => (
					<label key={opt.value} className="flex items-center cursor-pointer">
						<input
							type="checkbox"
							checked={selected.includes(opt.value)}
							onChange={() => toggle(opt.value)}
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

export default ColorFilter;
