import { S3_BUCKET_PATH } from './lib/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: S3_BUCKET_PATH,
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
