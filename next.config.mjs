/** @type {import('next').NextConfig} */
const nextConfig = {
  eactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Derleme (build) sırasında ESLint hataları/uyarıları olsa bile derlemeyi durdurmaz
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
export default nextConfig;
