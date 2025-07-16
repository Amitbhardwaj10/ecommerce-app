import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/subComponents/SearchBar";
import Home from "./pages/Home";

function App() {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);

	return (
		<>
			<Navbar onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />

			<Sidebar
				isVisible={isSidebarVisible}
				setIsVisible={setIsSidebarVisible}
			/>
			<div className="md:hidden sticky bg-[#edf6f9] top-0 place-items-center h-16 w-full rounded-lg flex justify-center px-2">
				{<SearchBar />}
			</div>

			<Home />
		</>
	);
}

export default App;
