import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Toast from "../subComponents/Toast";

function Layout() {
	const { show } = useSelector((state) => state.toast);
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const location = useLocation();
	const hideFooterRoutes = [
		"/checkout/cart",
		"/checkout/payment",
		"/auth/login",
		"/auth/signup",
	];
	return (
		<>
			{show && <Toast />}
			<Navbar onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />

			<Sidebar
				isVisible={isSidebarVisible}
				setIsVisible={setIsSidebarVisible}
			/>

			<main>
				<Outlet />
			</main>

			{!hideFooterRoutes.includes(location.pathname) && <Footer />}
		</>
	);
}

export default Layout;
