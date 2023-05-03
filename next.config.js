/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		formats: ['image/webp', 'image/avif'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'scontent.cdninstagram.com',
				port: ''
			}
		]
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		})

		return config
	}
}

module.exports = nextConfig
