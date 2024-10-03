/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin()

const nextConfig = {

    async redirects() {
        return [
            {
                source: '/pt/blog',
                destination: '/en/blog',
                permanent: true,
            },

        ]
    },

    eslint: {
        ignoreDuringBuilds: true,
    },

    reactStrictMode: true,
    images: {
        domains: ['unsplash.com', 'plus.unsplash.com', 'images.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'https://plus.unsplash.com/',
                port: '',
                // pathname: '/account123/**',
            },
        ],
    }

};



export default withNextIntl(nextConfig);
