import React from "react";

function Dropdown() {
	return (
		<div className="absolute top-full right-0 mt-2 w-36 shadow-2xl shadow-gray-700 bg-[#003049] text-[#ffffffde] ring-1 ring-black ring-opacity-5 focus:outline-none z-40 rounded-md">
			<a
				href="/login"
				className="block px-4 py-2 text-sm hover:text-black hover:bg-slate-300 rounded-t-md"
			>
				Login
			</a>
			<a
				href="/signup"
				className="block px-4 py-2 text-sm hover:text-black hover:bg-slate-300 rounded-b-md"
			>
				Sign Up
			</a>
		</div>
	);
}

export default Dropdown;
