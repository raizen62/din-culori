import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For static export (recommended for hostico.ro)
  // Uncomment these lines when ready to deploy:
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
