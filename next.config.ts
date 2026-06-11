import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For static export (recommended for hostico.ro)
  // Uncomment these lines when ready to deploy:
  output: 'export',
  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
};

export default nextConfig;
