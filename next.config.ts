import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "animoox-media-bucket.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "daqnioq8w8j1r.cloudfront.net",
      },
    ],
  },
}

export default nextConfig
