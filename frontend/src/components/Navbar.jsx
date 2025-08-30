import {
	HiBars3CenterLeft,
	HiOutlineUserCircle,
	HiOutlineShoppingCart,
	HiMiniChevronDown,
	HiOutlineHeart,
	HiOutlineArrowLeft,
} from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import userImage from "../assets/user.png";
import { useSelector } from "react-redux";
import SearchBar from "./subComponents/SearchBar";
import Dropdown from "./subComponents/Dropdown";

function Navbar({ onToggleSidebar, showBackButton, pageTitle }) {
	const { categories } = useCategories();
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const cartItemsQuantity = useSelector((state) => state.cart.cartItems.length);
	const navigate = useNavigate();
	const Logo = "Quick Shop";

	// function to hide dropdown if clicks anywhere
	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<>
			<header className="sticky top-0 z-40 w-full h-16 bg-primary text-[#ffffffde] shadow-sm flex items-center">
				<nav className="w-full mx-auto px-2 sm:px-4 flex justify-between items-center">
					{/* Left: Hamburger, Logo, Nav Links */}
					<div className="flex items-center min-w-0">
						{showBackButton ? (
							<>
								<button
									onClick={() => navigate(-1)}
									className="lg:hidden flex items-center justify-center w-10 h-10 text-white cursor-pointer"
									aria-label="Go back"
								>
									<HiOutlineArrowLeft className="w-6 h-6" />
								</button>

								{pageTitle && (
									<h1 className="text-lg truncate lg:hidden">{pageTitle}</h1>
								)}

								{!pageTitle && (
									<div className="lg:hidden" onClick={() => navigate("/")}>
										{Logo}
									</div>
								)}

								<div className="hidden lg:flex pl-1 sm:px-3 items-center justify-center min-w-0">
									<Link
										to="/"
										className="truncate font-bold sm:text-lg lg:text-xl text-white"
									>
										{Logo}
									</Link>
								</div>
							</>
						) : (
							<>
								<HiBars3CenterLeft
									className="menu-icon h-8 w-8 md:h-11 md:w-11 p-1 lg:hidden cursor-pointer"
									onClick={onToggleSidebar}
									aria-label="Toggle sidebar menu"
								/>
								<div className="logo-div pl-1 sm:px-3 flex items-center justify-center min-w-0">
									<Link
										to="/"
										className="truncate font-bold sm:text-lg lg:text-xl text-white"
									>
										{Logo}
									</Link>
								</div>
							</>
						)}

						<div className="items-div min-w-0 flex-1 hidden lg:block">
							<ul className="flex flex-wrap items-center xl-gap-2 overflow-x-auto max-w-full">
								{categories.map((item) => (
									<NavLink
										key={item.id}
										to={"/products"}
										className={({ isActive }) =>
											`relative px-4 py-8 whitespace-nowrap before:w-full before:h-[3px] before:absolute before:bottom-3 before:left-1/2 before:-translate-x-1/2 before:bg-current transition-all ease-in hover:text-cyan-400 ${
												isActive
													? "before:opacity-100 text-cyan-400 font-semibold"
													: "before:opacity-0"
											}`
										}
									>
										{item.category}
									</NavLink>
								))}
							</ul>
						</div>
					</div>

					{/* SearchBar */}
					<div className="hidden md:flex flex-1 justify-center mx-4 min-w-0">
						<SearchBar />
					</div>

					{/* Right: Profile, Wishlist, Cart */}
					<div
						className="right-div flex mr-4 md:mx-4 gap-5 items-center justify-between"
						ref={dropdownRef}
					>
						<div
							className="flex gap-1 items-center cursor-pointer relative"
							onClick={() => setShowDropdown(!showDropdown)}
							tabIndex={0}
							aria-haspopup="true"
							aria-expanded={showDropdown}
							aria-label="User profile menu"
						>
							{isLoggedIn ? (
								<img
									className="w-6 h-6 rounded-full object-cover"
									src={userImage}
									alt="avatar"
								/>
							) : (
								<HiOutlineUserCircle className="h-6 w-6" />
							)}
							<small>Profile</small>
							<HiMiniChevronDown className="sm:block hidden h-6 w-6" />
							{showDropdown && <Dropdown />}
						</div>
						{isLoggedIn && (
							<div
								className="flex gap-1 items-center cursor-pointer"
								onClick={() => navigate("/wishlist")}
								role="button"
								tabIndex={0}
								aria-label="Go to wishlist"
							>
								<HiOutlineHeart className="h-6 w-6" />
								<small className="sm:block hidden">Wishlist</small>
							</div>
						)}
						<div
							className="flex gap-2 items-center cursor-pointer relative"
							onClick={() => navigate("/checkout/cart")}
							role="button"
							tabIndex={0}
							aria-label="Go to cart"
						>
							<div className="relative inline-block">
								<HiOutlineShoppingCart className="h-6 w-6" />
								{cartItemsQuantity > 0 && (
									<span
										className="absolute w-[18px] h-[18px] top-0.5 right-0.5 text-center text-[11px] leading-[18px] font-bold text-primary bg-white rounded-full border border-primary"
										style={{ transform: "translate(50%,-50%)" }}
									>
										{cartItemsQuantity}
									</span>
								)}
							</div>
							<span className="sm:block hidden">Cart</span>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
}

export default Navbar;
