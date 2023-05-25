/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "encrypted-tbn0.gstatic.com",
				pathname: "/*"
			},
			{
				protocol: "https",
				hostname: "i0.wp.com",
				pathname: "/lifeinmichigan.com/wp-content/gallery/jeff-fest-2022/*"
			}
		]
	},
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://api.onewiththeriverbed.com/:path*"
			}
		]
	}
}

module.exports = nextConfig
