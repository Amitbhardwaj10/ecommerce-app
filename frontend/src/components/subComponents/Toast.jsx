const Toast = ({ message }) => {
	return (
		<div
			id="toast-success"
			className="flex fixed top-[10%] right-6 items-center w-full max-w-xs py-3 px-4 text-white bg-gradient-to-r from-[#020c27] via-[#006387] to-[#01283e77] rounded-lg shadow-lg shadow-blue-800/40 backdrop-blur-md border border-white/20 animate-pop z-50"
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

			<div className="ms-2 font-normal">{message}</div>

			{/* <button
				type="button"
				className="ms-auto -mx-1.5 -my-1.5 bg-slate-300 text-primary hover:text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-primary"
				data-dismiss-target="#toast-success"
				aria-label="Close"
			>
				<span className="sr-only">Close</span>
				<svg
					className="w-3 h-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
			</button> */}
		</div>
	);
};

export default Toast;
