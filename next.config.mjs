/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/JARVIS",
  assetPrefix: "/JARVIS/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
