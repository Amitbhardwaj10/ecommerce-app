import { useEffect, useState } from "react";
import {
	HiOutlineUsers,
	HiXMark,
	HiOutlineShoppingBag,
	HiOutlineHeart,
	HiOutlineClipboardDocumentList,
	HiOutlineSparkles,
	HiOutlinePhone,
	HiChevronDown,
	HiChevronUp,
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import userImage from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../store/features/filters/filterSlice";

function Sidebar({ isVisible, setIsVisible }) {
	const [translate, setTranslate] = useState("-translate-x-full");
	const { categories } = useCategories();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const user = useSelector((state) => state.auth.user);
	const { cartItems } = useSelector((state) => state.cart);
	const { wishlistItems } = useSelector((state) => state.wishlist);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Collapsible state
	const [categoriesOpen, setCategoriesOpen] = useState(true);
	const [showAll, setShowAll] = useState(false);

	useEffect(() => {
		if (isVisible) {
			document.body.classList.add("overflow-hidden");
			setTranslate("translate-x-0");
		} else {
			document.body.classList.remove("overflow-hidden");
			setTranslate("-translate-x-full");
		}
	}, [isVisible]);

	const handleCategoryClick = (category) => {
		dispatch(setCategory([category]));
		navigate("/products");
		setIsVisible(false);
	};

	const displayedCategories = showAll ? categories : categories.slice(0, 5);

	return (
		<>
			<aside
				className={`side-bar w-3/4 sm:w-80 text-white bg-gradient-to-b from-gray-900 via-gray-800 to-black h-screen fixed top-0 left-0 shadow-2xl z-50 transition-transform duration-500 overflow-y-auto ${translate} pb-5`}
			>
				{/* User Section */}
				{isLoggedIn ? (
					<div className="flex flex-col gap-2 mb-4 items-start bg-gray-800/70 p-4 rounded-b-xl">
						<div className="flex items-center gap-3">
							<img
								className="w-10 h-10 rounded-full border border-gray-600"
								src={userImage}
								alt="avatar"
							/>
							<div>
								<p className="font-semibold">Hi, {user.username}</p>
								<p className="text-sm text-gray-400">Welcome back 👋</p>
							</div>
						</div>
					</div>
				) : (
					<div className="auth-box w-full px-4 py-4 mb-5 bg-gray-800/70">
						<div className="flex gap-2 items-center mb-3">
							<HiOutlineUsers className="w-6 h-6" />
							<p className="font-medium">Login or Signup</p>
						</div>

						<div className="flex flex-col gap-3">
							<Link to="/auth/signup" onClick={() => setIsVisible(false)}>
								<button className="text-white w-full bg-blue-800 hover:bg-blue-600 rounded-md px-4 py-2 text-center">
									Sign up
								</button>
							</Link>
							<Link to="/auth/login" onClick={() => setIsVisible(false)}>
								<button className="text-black w-full bg-white hover:bg-gray-200 rounded-md px-4 py-2 text-center">
									Log in
								</button>
							</Link>
						</div>
					</div>
				)}

				{/* Categories (Collapsible) */}
				<div className="categories px-4 mt-3">
					<button
						onClick={() => setCategoriesOpen(!categoriesOpen)}
						className="flex items-center py-3 justify-between w-full text-lg font-semibold mb-2 border-b border-gray-700"
					>
						<span>Categories</span>
						{categoriesOpen ? (
							<HiChevronUp className="w-4 h-4" />
						) : (
							<HiChevronDown className="w-4 h-4" />
						)}
					</button>

					{categoriesOpen && (
						<ul className="flex flex-col gap-y-3 px-3 py-3 border-b border-gray-700">
							{displayedCategories.map((item) => (
								<li
									key={item.id}
									className="cursor-pointer text-sm hover:text-blue-400 transition"
									onClick={() => handleCategoryClick(item.category)}
								>
									{item.category}
								</li>
							))}

							{categories.length > 5 && (
								<button
									onClick={() => setShowAll(!showAll)}
									className="text-sm text-blue-400 hover:underline mt-2 self-start"
								>
									{showAll ? "Show Less" : "Show All"}
								</button>
							)}
						</ul>
					)}
				</div>

				{/* Quick Links */}
				<div className="menuItems px-4 py-1">
					<ul className="flex flex-col gap-4 text-base [&>li]:py-3 [&>li]:border-b [&>li]:border-gray-700">
						<li
							className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition"
							onClick={() => {
								navigate("/checkout/cart");
								setIsVisible(false);
							}}
						>
							<HiOutlineShoppingBag className="w-5 h-5" /> Cart{" "}
							{`(
							${cartItems.length} )`}
						</li>
						<li
							className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition"
							onClick={() => {
								navigate("/wishlist");
								setIsVisible(false);
							}}
						>
							<HiOutlineHeart className="w-5 h-5" /> Wishlist{" "}
							{`(
							${wishlistItems.length} )`}
						</li>
						<li
							className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition"
							onClick={() => {
								navigate("/orders");
								setIsVisible(false);
							}}
						>
							<HiOutlineClipboardDocumentList className="w-5 h-5" /> My Orders
						</li>
						<li
							className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition"
							onClick={() => {
								navigate("#");
								setIsVisible(false);
							}}
						>
							<HiOutlineSparkles className="w-5 h-5" /> Trending
						</li>
						<li
							className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition"
							onClick={() => {
								navigate("/contact");
								setIsVisible(false);
							}}
						>
							<HiOutlinePhone className="w-5 h-5" /> Contact Us
						</li>
					</ul>
				</div>

				{/* Close Button */}
				<div className="absolute top-3 right-3">
					<button
						onClick={() => setIsVisible(false)}
						className="w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center shadow-lg"
					>
						<HiXMark className="h-6 w-6 text-white" />
					</button>
				</div>
			</aside>

			{/* Overlay */}
			{isVisible && (
				<div
					className="overlay h-screen w-full bg-black bg-opacity-70 fixed top-0 left-0 z-40"
					onClick={() => setIsVisible(false)}
				></div>
			)}
		</>
	);
}

export default Sidebar;
