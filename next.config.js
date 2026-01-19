import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Ensure trailing slashes are handled consistently
  trailingSlash: false,

  // Output directory
  distDir: '.next',
};

export default nextConfig;
