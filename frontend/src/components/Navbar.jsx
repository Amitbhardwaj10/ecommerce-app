import { HiBars3CenterLeft } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiMiniChevronDown } from "react-icons/hi2";

import { useEffect, useRef, useState } from "react";
import SearchBar from "./subComponents/SearchBar";
import Dropdown from "./subComponents/Dropdown";
import { NavLink } from "react-router-dom";
import useCategories from "../hooks/useCategories";

function Navbar({ onToggleSidebar }) {
	const { categories } = useCategories();
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef();

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
			<header className="flex items-center w-full h-16 sticky top-0 text-[#ffffffde] hover:shadow-[#535353] shadow-sm z-10">
				<nav className="w-full flex justify-between items-center">
					<div className="left-div flex items-center">
						<HiBars3CenterLeft
							className="menu-icon h-11 w-11 p-1 lg:hidden"
							onClick={() => {
								onToggleSidebar();
							}}
						/>

						<div className="logo-div pl-1 sm:px-3 flex items-center justify-center">
							{/* <img className="logo" src={logo} alt="logo" /> */}
							<a href="/" className="text-xl mb-1">
								QuickShop
							</a>
						</div>
						<div className="items-div">
							<ul className="lg:flex justify-center items-center gap-2 hidden">
								{categories.map((item) => (
									<NavLink
										key={item.id}
										to={`products/category/${item.id}`}
										className={({ isActive }) =>
											`relative px-4 py-8 before:hidden before:w-full before:hover:block before:bg-current before:h-[3px] before:absolute before:bottom-2 before:left-1/2 before:translate-x-[-50%] ${
												isActive ? "text-cyan-600 font-bold" : ""
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
						className="right-div flex mr-4 md:mx-8 gap-5 items-center justify-between"
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
							<HiOutlineUserCircle className="h-6 w-6" />
							<small className="">Profile</small>
							<HiMiniChevronDown className="sm:block hidden h-6 w-6" />

							{/* dropdown component */}
							{showDropdown && <Dropdown />}
						</div>

						{/* Hide Wishlist if user is not logged in after login it should be visible then! */}
						{/* <div className="flex gap-1 items-center cursor-pointer">
							<HiOutlineHeart className="h-6 w-6" />
							<small ">Wishlist</small>
						</div> */}

						<div className="flex gap-1 items-center cursor-pointer">
							<HiOutlineShoppingCart className="h-6 w-6" />
							<small className="sm:block hidden">Cart</small>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
}

export default Navbar;
