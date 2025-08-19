import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'moparinsiders.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'hips.hearstapps.com',
      },
      {
        protocol: 'https',
        hostname: 'imgd.aeplcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.motor1.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jdpower.com',
      },
      {
        protocol: 'https',
        hostname: 'pictures.dealer.com',
      }
    ],
  }
};

export default nextConfig;
