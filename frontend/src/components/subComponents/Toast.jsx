import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../store/features/toast/toastSlice";

const Toast = () => {
	const { message, type, show } = useSelector((state) => state.toast);
	const dispatch = useDispatch();

	useEffect(() => {
		if (show) {
			const timer = setTimeout(() => {
				dispatch(hideToast());
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [show]);

	const getIcon = (type) => {
		if (type == "success")
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-6 h-6 text-green-500"
				>
					<circle
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
					/>
					<path
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M7 13l3 3 7-7"
					/>
				</svg>
			);

		if (type == "error")
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-6 h-6 text-red-500"
				>
					<circle
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
					/>
					<path
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 9l-6 6m0-6l6 6"
					/>
				</svg>
			);

		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={2}
				stroke="currentColor"
				className="w-6 h-6 text-blue-500"
			>
				<circle
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="2"
					fill="none"
				/>
				<line
					x1="12"
					y1="16"
					x2="12"
					y2="12"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				/>
				<circle cx="12" cy="8" r="1" fill="currentColor" />
			</svg>
		);
	};

	return (
		<div
			className="flex items-center w-fit fixed z-50 px-4 py-3 text-xs md:text-base text-white bg-gray-900 border border-white/20 rounded-md shadow-lg shadow-blue-800/40 backdrop-blur-md animate-pop
			inset-x-4 bottom-12
			sm:inset-x-auto sm:left-auto sm:right-3 sm:top-[11%] sm:bottom-auto mx-auto sm:mx-0 text-center"
			role="alert"
		>
			<div className="flex items-center justify-center w-4 h-4 md:w-6 md:h-6">
				{getIcon(type)}
			</div>

			<div className={`ms-2 font-medium pointer-events-auto`}>{message}</div>
		</div>
	);
};

export default Toast;
