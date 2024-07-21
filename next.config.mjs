// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
// next.config.mjs
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000' // Especifica el puerto si es necesario
      },
      {
        protocol: 'https',
        hostname: 'frontend-ecommerce-production.up.railway.app'
      },
      {
        protocol: 'https',
        hostname: 'ecommerce-fullbackend-production.up.railway.app'
      }
    ],
  },
};
