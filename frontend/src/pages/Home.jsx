import React, { useEffect, useState } from "react";
import Products from "./Products";
import Toast from "../components/subComponents/Toast";
import { useLocation } from "react-router-dom";

function Home() {
	const location = useLocation();
	const [toastMessage, setToastMessage] = useState(location.state?.toast || "");

	useEffect(() => {
		if (location.state?.toast) {
			setToastMessage(location.state.toast);
		}
	}, [location.state]);

	useEffect(() => {
		if (toastMessage) {
			const timer = setTimeout(() => {
				window.history.replaceState({}, document.title);
				setToastMessage("");
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [toastMessage]);

	return (
		<>
			{toastMessage && <Toast message={toastMessage} />}

			<div className="w-full">
				<Products />
			</div>
		</>
	);
}

export default Home;
