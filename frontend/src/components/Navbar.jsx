import { HiBars3CenterLeft } from "react-icons/hi2";
import Sidebar from "./Sidebar";
import { useState } from "react";

function Navbar() {
	const navItems = ["Men", "Women", "Jewelery", "Electronics"];
	const [isVisible, setIsVisible] = useState(false);

	return (
		<>
			<header className="flex items-center w-full h-20 sticky top-0 hover:shadow-[#535353] shadow-sm z-10">
				<nav className="w-full flex justify-between items-center">
					<div className="left-div flex items-center">
						<HiBars3CenterLeft
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
						<ul className="sm:flex justify-center items-center gap-4 hidden">
							{navItems.map((item, index) => (
								<a
									key={index}
									href={item.toLowerCase()}
									className=" before:hidden before:w-full before:hover:block before:bg-current before:h-[3px] before:absolute py-8 before:bottom-0 before:left-1/2 before:translate-x-[-50%] relative px-4"
								>
									<li>{item}</li>
								</a>
							))}
						</ul>
					</div>

					<div className="right-div"></div>
				</nav>
			</header>

			{/* sideBar */}
			<Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />
		</>
	);
}

export default Navbar;
