import React from "react";
import Products from "./Products";
import Toast from "../components/subComponents/Toast";
import { useSelector } from "react-redux";

function Home() {
	const show = useSelector((state) => state.toast.show);

	return (
		<>
			{show && <Toast />}

			<div className="w-full">
				<Products />
			</div>
		</>
	);
}

export default Home;
