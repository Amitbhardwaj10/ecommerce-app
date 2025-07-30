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

	return (
		<div
			className="flex fixed top-[10%] right-6 items-center w-full max-w-xs py-3 px-4 bg-white rounded-lg shadow-lg shadow-blue-800/40 backdrop-blur-md border border-white/20 animate-pop z-50"
			role="alert"
		>
			{/* <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-white rounded-lg bg-green-900">
				<svg
					className="w-5 h-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />	
				</svg>
				<span className="sr-on
				ly">Check icon</span>
			</div> */}

			<div
				className={`ms-2 font-medium ${
					type == "success"
						? "text-green-700"
						: type == "error"
						? "text-red-500"
						: type == "info" && "text-sky-500"
				} text-white`}
			>
				{message}
			</div>
		</div>
	);
};

export default Toast;
