import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import SearchBar from "../subComponents/SearchBar";

function Layout() {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	return (
		<>
			<Navbar onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />

			<Sidebar
				isVisible={isSidebarVisible}
				setIsVisible={setIsSidebarVisible}
			/>

			<main>
				<div className="md:hidden sticky bg-[#edf6f9] top-0 place-items-center h-16 w-full rounded-lg flex justify-center px-2">
					{<SearchBar />}
				</div>
				<Outlet />
			</main>

			<Footer />
		</>
	);
}

export default Layout;
