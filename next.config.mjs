/** @type {import('next').NextConfig} */
const nextConfig = {
  eactStrictMode: true,
  swcMinify: true,
  output: 'export', // statik HTML çıktısı için
  trailingSlash: true,
  eslint: {
    // Derleme (build) sırasında ESLint hataları/uyarıları olsa bile derlemeyi durdurmaz
    ignoreDuringBuilds: true,
  },typescript: {
    // Derleme (build) sırasında TypeScript hataları olsa bile üretimi durdurmaz, projeyi ayağa kaldırır
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
