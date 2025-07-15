import React from "react";

function Dropdown() {
	return (
		<div className="absolute top-full right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
			<div className="py-1">
				<a
					href="/login"
					className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
				>
					Login
				</a>
				<a
					href="/signup"
					className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
				>
					Sign Up
				</a>
			</div>
		</div>
	);
}

export default Dropdown;
