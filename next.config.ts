import { type NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/i18n-request.ts");

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://cdn.dummyjson.com/**")],
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/dashboard",
				permanent: false,
			},
		];
	},
};

export default withNextIntl(nextConfig);
