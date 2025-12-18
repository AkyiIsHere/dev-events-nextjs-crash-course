import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // to enable caching
  cacheComponents: true,
  // for cloudinary image upload
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ]
  },
  /* config options here */
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  // reactStrictMode: false
};

export default nextConfig;
