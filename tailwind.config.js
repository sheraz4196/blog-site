/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				georgia: "'georgia',sans-serif",
				apple_system:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
			},

			colors: {
				"muted-1": "rgb(115,138,148)",
				"muted-2": "rgb(11,12,14)",
				"muted-3": "#434952",
				"muted-4": "#90a2aa",
				"muted-5": "#efefef",
				ternary: "#045895",
				secondary: "#ea6125",
				primary: "#26a6ed",
			},
			spacing: {
				"custom-450": "450px",
			},
		},
	},
	plugins: [],
};
