import { useState } from "react";
import { Link } from "react-router-dom";

function Dropdown() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		Boolean(localStorage.getItem("isLoggedIn"))
	);

	const signOut = () => {
		localStorage.setItem("isLoggedIn", "false");
		setIsLoggedIn(!isLoggedIn);
	};

	return (
		<div className="absolute top-full right-0 mt-2 w-36 shadow-2xl shadow-gray-700 bg-primary text-[#ffffffde] ring-1 ring-black ring-opacity-5 focus:outline-none z-40 rounded-md">
			{isLoggedIn ? (
				<>
					<p className="px-4 py-2 text-sm text-white font-normal">
						Signed in as test@example.com
					</p>

					<Link
						className="block px-4 py-2 text-sm hover:text-black hover:bg-slate-300 rounded-b-md"
						onClick={signOut}
					>
						Sign out
					</Link>
				</>
			) : (
				<>
					<Link
						to="/auth/login"
						className="block px-4 py-2 text-sm hover:text-black hover:bg-slate-300 rounded-t-md"
					>
						Login
					</Link>
					<Link
						to="/auth/signup"
						className="block px-4 py-2 text-sm hover:text-black hover:bg-slate-300 rounded-b-md"
					>
						Sign Up
					</Link>
				</>
			)}
		</div>
	);
}

export default Dropdown;
