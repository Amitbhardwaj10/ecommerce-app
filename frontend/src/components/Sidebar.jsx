import { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";

import { HiXMark } from "react-icons/hi2";

function Sidebar({ isVisible, setIsVisible }) {
	const [translate, setTranslate] = useState("-translate-x-full");
	const { categories } = useCategories();
	const navigate = useNavigate();

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
				className={`side-bar w-3/4 sm:w-80 py-4 px-3 text-[#ffffffde] bg-[#003049] h-screen fixed top-0 left-0 shadow-neutral-800 shadow-xl z-50 transition-transform duration-500 ${translate} ease-in-out`}
			>
				<div className="auth-box w-full px-2 py-2">
					<div className="flex gap-1 items-center mb-5">
						<HiUser className="w-6 h-6" />
						<p href="/login">Login, Signup </p>
					</div>

					<div className="flex flex-col gap-3 my-5">
						<Link to="/signup">
							<button
								type="button"
								className="text-white w-full bg-black hover:bg-gray-900 rounded-md text-lg px-5 py-3 text-center"
							>
								Sign up
							</button>
						</Link>
						<Link to="/login">
							<button
								type="button"
								className="text-black w-full bg-neutral-300 hover:bg-neutral-400 rounded-md text-xl px-4 py-3 text-center"
								// onClick={setIsVisible(false)}
							>
								Log in
							</button>
						</Link>
					</div>
				</div>

				<div className="menuItems">
					<ul className="px-4 py-3 flex flex-col gap-3">
						<p className="text-2xl">Categories</p>
						{categories.map((item) => {
							return (
								<li
									key={item.id}
									// to={`/${item.category.toLowerCase()}`}
									onClick={() => {
										setIsVisible(false);
										navigate(`products/category/${item.id}`);
									}}
								>
									{item.category}
								</li>
							);
						})}
					</ul>
				</div>
				<div className="close-icon w-fit rounded-full absolute top-2 right-2">
					<HiXMark
						className="h-8 w-8 p-1"
						onClick={() => {
							setIsVisible(!isVisible);
						}}
					/>
				</div>
			</aside>

			{isVisible && (
				// Overlay
				<div
					className="overlay h-screen w-full bg-black bg-opacity-70 fixed top-0 left-0 z-30 transition-opacity delay-1000 duration-750 ease-in overflow-hidden"
					onTouchStart={() => setIsVisible(false)}
				></div>
			)}
		</>
	);
}

export default Sidebar;
