/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // static mode, 저게 없으면 Dynamic Mode
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
