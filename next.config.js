/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: 'http', hostname: '124.49.161.33' }],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
