/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/upload/:slug",
        destination: "http://localhost:9090/upload/:slug",
      },
    ];
  },
};

export default nextConfig;
