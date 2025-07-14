import { useEffect, useState } from "react";
// import { HiXMark } from "react-icons/hi2";

function Sidebar({ isVisible, setIsVisible }) {
	const sidebarItems = ["Men", "Women", "Jewelery", "Electronics"];
	const [translate, setTranslate] = useState("-translate-x-full");

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
				className={`side-bar w-3/4 bg-[#003049] h-svh absolute top-0 left-0 shadow-neutral-800 shadow-xl z-20 transition-transform duration-500 ${translate} ease-in-out`}
			>
				<div className="menuItems">
					<ul className="px-4 py-3 flex flex-col">
						{sidebarItems.map((item, index) => {
							return (
								<a key={index} href={item.toLowerCase()}>
									<li className=" font-medium">{item}</li>
								</a>
							);
						})}
					</ul>
				</div>
				{/* <div className="close-icon w-fit rounded-full absolute top-2 right-2">
					<HiXMark
						className="h-8 w-8 p-1"
						onClick={() => {
							setIsVisible(!isVisible);
						}}
					/>
				</div> */}
			</aside>

			{isVisible && (
				// Overlay
				<div
					className="overlay h-screen w-full bg-slate-900 bg-opacity-95 absolute top-0 left-0 z-10 transition-opacity delay-1000 duration-750 ease-in"
					onClick={() => setIsVisible(false)}
				></div>
			)}
		</>
	);
}

export default Sidebar;
