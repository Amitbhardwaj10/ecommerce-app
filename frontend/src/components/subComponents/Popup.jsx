import React, { useState } from "react";

const Popup = () => {
	const [showPopup, setShowPopup] = useState(false);

	const togglePopup = () => {
		setShowPopup(!showPopup);
	};

	return (
		<div>
			<button
				onClick={togglePopup}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Open Popup
			</button>

			{showPopup && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					{/* Overlay */}
					<div
						className="fixed inset-0 bg-gray-900 opacity-50"
						onClick={togglePopup}
					></div>

					{/* Popup Content */}
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto z-10 relative">
						<button
							onClick={togglePopup}
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
						>
							&times;
						</button>
						<h2 className="text-xl font-semibold mb-4">Popup Title</h2>
						<p className="text-gray-700">This is your awesome popup content!</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Popup;
