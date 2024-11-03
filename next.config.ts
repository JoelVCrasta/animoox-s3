import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "animoox-media-bucket.s3.amazonaws.com",
      },
    ],
  },
}

export default nextConfig
