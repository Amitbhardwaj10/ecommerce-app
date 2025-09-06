/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		animation: {
			pop: "popIn 0.3s ease-out",
			bounce: "bounce 1.5s ease-in-out infinite",
			spin: "spin 1s linear infinite;",
		},
		keyframes: {
			popIn: {
				"0%": { opacity: 0, transform: "scale(0.5)" },
				"100%": { opacity: 1, transform: "scale(1)" },
			},

			bounce: {
				"0%, 100%": { transform: "translateY(0%)" },
				"50%": { transform: "translateY(-40%)" },
			},

			spin: {
				"0%": {
					transform: "rotate(0deg)",
				},
				"100%": {
					transform: "rotate(360deg)",
				},
			},
		},
	},
	plugins: [],
};
