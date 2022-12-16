/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {},
		colors: {
			sand: "#DCD7C9",
			charcoal: "#2C3639",
			white: "#FFFFFF",
			trans_black: "rgba(0, 0, 0, .5)"
		}
	},
	plugins: []
}
