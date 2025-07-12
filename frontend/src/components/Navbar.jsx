import { HiBars3CenterLeft } from "react-icons/hi2";
import Sidebar from "./Sidebar";
import { useState } from "react";

function Navbar() {
	const navItems = ["Men", "Women", "jewelery", "electronics"];
	const [isVisible, setIsVisible] = useState(false);

	return (
		<>
			<header className="flex items-center w-full h-20 sticky top-0">
				<nav className="w-full flex justify-between items-center">
					<div className="left-div flex items-center">
						<HiBars3CenterLeft
							id="menuIcon"
							className="h-11 w-11 p-1 sm:hidden"
							onClick={() => {
								setIsVisible(!isVisible);
							}}
						/>

						<div className="logo-div pl-1 sm:px-3 flex items-center justify-center">
							{/* <img className="logo" src={logo} alt="logo" /> */}
							<a href="/" className="text-xl mb-1">
								QuickShop
							</a>
						</div>
					</div>

					<div className="center-div">
						<ul className="sm:flex sm:justify-center sm:items-center sm:gap-3 hidden">
							{navItems.map((item, index) => (
								<a key={index} href={item.toLowerCase()}>
									<li>{item}</li>
								</a>
							))}
						</ul>
					</div>

					<div className="right-div"></div>
				</nav>
			</header>

			{isVisible && <Sidebar />}
		</>
	);
}

export default Navbar;
