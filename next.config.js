/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      process.env.NODE_ENV === 'development'
        ? { protocol: 'http', hostname: '124.49.161.33' }
        : { protocol: 'https', hostname: 'file.pregen.co' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/api/:path*`
            : `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
