import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import SearchBar from "../subComponents/SearchBar";
import { useSelector } from "react-redux";
import Toast from "../subComponents/Toast";

function Layout() {
	const { show } = useSelector((state) => state.toast);
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	return (
		<>
			{show && <Toast />}
			<Navbar onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />

			<Sidebar
				isVisible={isSidebarVisible}
				setIsVisible={setIsSidebarVisible}
			/>

			<div className="md:hidden sticky top-0 place-items-center h-16 w-full rounded-lg flex justify-center px-2">
				{<SearchBar />}
			</div>

			<main>
				<Outlet />
			</main>

			<Footer />
		</>
	);
}

export default Layout;
