/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",    // REQUIRED for Netlify functions + Supabase
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
