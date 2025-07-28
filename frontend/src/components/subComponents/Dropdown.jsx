import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";
import { Link, Navigate, replace, useNavigate } from "react-router-dom";
import { useState } from "react";
import Toast from "./Toast";

function Dropdown() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const user = useSelector((state) => state.auth.user);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/", {
			replace: true,
			state: { toast: "You have been logged out." },
		});
	};

	return (
		<div className="absolute top-full right-0 mt-2 p-4 w-40 shadow-2xl shadow-gray-700 bg-secondary text-[#ffffffde] ring-1 ring-black ring-opacity-5 focus:outline-none z-40 rounded-md">
			{isLoggedIn ? (
				<>
					<div className="border-b border-slate-500 mb-3 py-1">
						<p className="text-sm text-white font-normal">
							Hello, {user.fullname.split(" ")[0]}
						</p>
						<p className="text-[13px] text-[#adb5bd]">{user.username}</p>
					</div>

					<a
						href="#"
						className="text-sm"
						onClick={(e) => {
							e.preventDefault();
							handleLogout();
						}}
					>
						Logout
					</a>
				</>
			) : (
				<div className="flex flex-col gap-2">
					<Link to="/auth/signup">
						<button
							type="button"
							className="text-white w-full bg-black hover:bg-slate-900 rounded-md text-sm py-2 text-center"
						>
							Sign up
						</button>
					</Link>
					<Link to="/auth/login">
						<button
							type="button"
							className="text-black w-full bg-white hover:bg-neutral-300 rounded-md text-sm py-2 text-center"
						>
							Log in
						</button>
					</Link>
				</div>
			)}
		</div>
	);
}

export default Dropdown;
