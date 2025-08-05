import { HiBars3CenterLeft } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiMiniChevronDown } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./subComponents/SearchBar";
import Dropdown from "./subComponents/Dropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import userImage from "../assets/user.png";
import { useSelector } from "react-redux";

function Navbar({ onToggleSidebar }) {
	const { categories } = useCategories();
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const cartItemsQuantity = useSelector((state) => state.cart.cartItems.length);
	const navigate = useNavigate();

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownRef]);

	return (
		<>
			<header className="flex items-center w-full h-16 sticky top-0 text-[#ffffffde] bg-primary hover:shadow-[#535353] shadow-sm z-10">
				<nav className="w-full flex justify-between items-center">
					<div className="left-div flex items-center">
						<HiBars3CenterLeft
							className="menu-icon h-8 w-8 md:h-11 md:w-11 p-1 lg:hidden"
							onClick={() => {
								onToggleSidebar();
							}}
						/>

						<div className="logo-div pl-1 sm:px-3 flex items-center justify-center">
							{/* <img className="logo" src={logo} alt="logo" /> */}
							<Link to="/" className="sm:text-lg lg:text-xl text-white">
								Quick Shop
							</Link>
						</div>
						<div className="items-div">
							<ul className="lg:flex justify-center items-center gap-2 hidden">
								{categories.map((item) => (
									<NavLink
										key={item.id}
										to={`products/category/${item.category.toLowerCase()}`}
										className={({ isActive }) =>
											`relative px-4 py-8 before:w-full before:h-[3px] before:absolute before:bottom-3 before:left-1/2 before:translate-x-[-50%] before:bg-current transition-all ease-in hover:text-cyan-400 ${
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

					<div
						className="right-div flex mr-4 md:mx-4 gap-5 items-center justify-between"
						ref={dropdownRef}
					>
						{/* search bar component */}
						<div className="hidden md:flex justify-center flex-grow mx-4">
							<SearchBar />
						</div>

						<div
							className="flex gap-1 items-center cursor-pointer relative"
							onClick={() => setShowDropdown(!showDropdown)}
						>
							{isLoggedIn ? (
								<img className="w-6 h-6" src={userImage} alt="avatar" />
							) : (
								<HiOutlineUserCircle className="h-6 w-6" />
							)}

							<small>Profile</small>
							<HiMiniChevronDown className="sm:block hidden h-6 w-6" />
							{/* dropdown component */}
							{showDropdown && <Dropdown />}
						</div>

						{/* Hide Wishlist if user is not logged in after login it should be visible then! */}
						{isLoggedIn && (
							<div className="flex gap-1 items-center cursor-pointer">
								<HiOutlineHeart className="h-6 w-6" />
								<small className="sm:block hidden">Wishlist</small>
							</div>
						)}

						<div
							className="flex gap-2 items-center cursor-pointer"
							onClick={() => navigate("/checkout/cart")}
						>
							<div className="relative inline-block">
								<HiOutlineShoppingCart className="h-6 w-6" />
								{cartItemsQuantity > 0 && (
									<span className="absolute w-4 h-4 top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-primary bg-white rounded-full transform translate-x-1/2 -translate-y-1/2">
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
