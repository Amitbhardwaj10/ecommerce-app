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
			className="flex fixed top-6 right-3 items-center w-fit py-3 px-4 bg-white rounded-lg shadow-lg shadow-blue-800/40 backdrop-blur-md border border-white/20 animate-pop z-50"
			role="alert"
		>
			<div className="inline-flex items-center justify-center shrink-0 w-6 h-6 text-white rounded-full">
				{getIcon(type)}
			</div>

			<div
				className={`ms-2 font-medium ${
					type == "success"
						? "text-green-700"
						: type == "error"
						? "text-red-500"
						: "text-sky-500"
				}`}
			>
				{message}
			</div>
		</div>
	);
};

export default Toast;
