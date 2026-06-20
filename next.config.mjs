/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // statik HTML çıktısı için
  eslint: {
    // Derleme (build) sırasında ESLint hataları/uyarıları olsa bile derlemeyi durdurmaz
    ignoreDuringBuilds: true,
  },typescript: {
    // Derleme (build) sırasında TypeScript hataları olsa bile üretimi durdurmaz, projeyi ayağa kaldırır
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
