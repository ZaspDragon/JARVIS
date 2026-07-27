/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.JARVIS_DEPLOY_TARGET === "github-pages";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGitHubPages
    ? {
        basePath: "/JARVIS",
        assetPrefix: "/JARVIS/",
      }
    : {}),
};

export default nextConfig;
