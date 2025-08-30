import { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import userImage from "../assets/user.png";

import { HiXMark } from "react-icons/hi2";
import { useSelector } from "react-redux";

function Sidebar({ isVisible, setIsVisible }) {
	const [translate, setTranslate] = useState("-translate-x-full");
	const { categories } = useCategories();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (isVisible) {
			setTranslate("translate-x-0"); // Slide in
		} else {
			setTranslate("-translate-x-full"); // Slide out
		}
	}, [isVisible]);

	return (
		<>
			<aside
				className={`side-bar w-3/4 sm:w-80 text-[#ffffffde] bg-primary h-screen fixed top-0 left-0 shadow-neutral-800 shadow-xl z-50 transition-all duration-500 ${translate} ease-in-out`}
			>
				{isLoggedIn ? (
					<div className="flex gap-4 items-center bg-secondary p-2">
						<img className="w-8 h-8" src={userImage} alt="avatar" />
						<p>{user.username}</p>
					</div>
				) : (
					<div className="auth-box w-full px-2 py-2 bg-secondary">
						<div className="flex gap-1 items-center mb-5">
							<HiUser className="w-6 h-6" />
							<p href="/login">Login, Signup </p>
						</div>

						<div className="flex flex-col gap-3 my-3">
							<Link to="/auth/signup">
								<button
									type="button"
									className="text-white w-full bg-black hover:bg-slate-900 rounded-md sm:text-lg px-4 py-3 text-center"
									onClick={() => setIsVisible(false)}
								>
									Sign up
								</button>
							</Link>
							<Link to="/auth/login">
								<button
									type="button"
									className="text-black w-full bg-white hover:bg-neutral-300 rounded-md sm:text-lg px-4 py-3 text-center"
									onClick={() => setIsVisible(false)}
								>
									Log in
								</button>
							</Link>
						</div>
					</div>
				)}

				<div className="menuItems mt-5 py-4 px-3">
					<ul className="px-4 py-3 flex flex-col gap-3">
						<p className="text-xl">Shop by category</p>
						{categories.map((item) => {
							return (
								<NavLink
									key={item.id}
									to="/products"
									onClick={() => {
										setTimeout(() => {
											setIsVisible(false);
										}, 100);
									}}
									className={({ isActive }) =>
										`block px-4 py-2 ${
											isActive ? "text-cyan-400 font-semibold" : ""
										}`
									}
								>
									{item.category}
								</NavLink>
							);
						})}
					</ul>
				</div>

				<div className="close-icon w-fit rounded-full absolute top-2 right-2">
					<HiXMark
						className="h-7 w-7"
						onClick={() => {
							setIsVisible(false);
						}}
					/>
				</div>
			</aside>

			{isVisible && (
				// Overlay
				<div
					className="overlay h-screen w-full bg-black bg-opacity-70 fixed top-0 left-0 z-30 duration-750 ease-in overflow-hidden"
					onClick={() => setIsVisible(false)}
				></div>
			)}
		</>
	);
}

export default Sidebar;
