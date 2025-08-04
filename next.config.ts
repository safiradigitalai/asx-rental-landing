import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'moparinsiders.com', 'upload.wikimedia.org', 'hips.hearstapps.com', 'imgd.aeplcdn.com', 'cdn.motor1.com'],
    formats: ['image/webp', 'image/avif'],
  }
};

export default nextConfig;
