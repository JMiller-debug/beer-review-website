const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

const { heroui } = require("@heroui/react");
module.exports = {
	plugins: [heroui({ addCommonColors: true })],
};

export default config;
