import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'l5wjt4vbfy.ufs.sh',
        port: '',
      },
    ],
  },
};

export default nextConfig;
