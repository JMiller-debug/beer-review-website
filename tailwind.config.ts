import { heroui } from "@heroui/theme";

export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	plugins: [
		heroui({
			addCommonColors: true, // <-- this enables HeroUI common colors
			// ...any themes / layout options you use
		}),
	],
};
