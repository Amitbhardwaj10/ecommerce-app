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

	const pageTitles = {
		"/wishlist": "Wishlist",
		"/checkout/cart": "My Cart",
		"/checkout/payment": "Payment",
	};

	const showBackButton = location.pathname !== "/";
	let pageTitle = pageTitles[location.pathname] || "";

	const categoryPrefix = "/products/category/";
	if (location.pathname.startsWith(categoryPrefix)) {
		const categoryName = location.pathname.slice(categoryPrefix.length);
		const formattedName = categoryName
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
		pageTitle = formattedName;
	}

	return (
		<>
			{show && <Toast />}
			<Navbar
				onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
				showBackButton={showBackButton}
				pageTitle={pageTitle}
			/>

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
