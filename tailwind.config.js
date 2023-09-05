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
			error: "#ff6f6f",
			trans_black: "rgba(0, 0, 0, .5)"
		},
		aspectRatio: {
			'4/3': '4 / 3',
			'square': '1 / 1'
		}
	},
	plugins: []
}
