import React from "react";
import { useSelector } from "react-redux";

const GlobalLoader = () => {
	const isLoading = useSelector((state) => state.loading.isLoading);

	if (!isLoading) {
		return null;
	}

	return (
		<div className="z-[100] p-1.5 w-9 h-9 rounded-full shadow-md shadow-slate-500 bg-white fixed pointer-events-none top-1/2 left-1/2">
			<div className="w-full h-full  border-2 border-s-sky-900 border-t-sky-900 border-white animate-spin rounded-full"></div>
		</div>
	);
};

export default GlobalLoader;
