import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	async redirects() {
		return [
			{
				source: "/",
				destination: "/dashboard",
				permanent: true,
			},
		];
	},
	images: {
		localPatterns: [{ pathname: "/api/images/**" }, { pathname: "/static/**" }],
		formats: ["image/webp", "image/avif"],
	},
	output: "standalone",
};
export default nextConfig;
