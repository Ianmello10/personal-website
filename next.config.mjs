/** @type {import('next').NextConfig} */
import createMDX from "@next/mdx";

const withMDX = createMDX({});
const nextConfig = {
	transpilePackages: ["next-mdx-remote", 'three'],
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

	async redirects() {
		return [
			{
				source: "/pt/blog",
				destination: "/en/blog",
				permanent: true,
			},
		];
	},

	eslint: {
		ignoreDuringBuilds: true,
	},

	reactStrictMode: true,
	images: {
		domains: ["unsplash.com", "plus.unsplash.com", "images.unsplash.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "https://plus.unsplash.com/",
				port: "",
				// pathname: '/account123/**',
			},
		],
	},
};

export default withMDX(nextConfig);
