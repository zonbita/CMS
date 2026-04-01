import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Keep off in this demo CMS to avoid extra experimental requirements.
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dhfoods.com.vn",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
