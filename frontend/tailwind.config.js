/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		animation: {
			pop: "popIn 0.3s ease-out",
			spin: "spin 1s linear infinite;",
		},
		keyframes: {
			popIn: {
				"0%": { opacity: 0, transform: "scale(0.5)" },
				"100%": { opacity: 1, transform: "scale(1)" },
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
