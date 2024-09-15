/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(gltf)$/,
      use: [
        {
          loader: 'gltf-webpack-loader',
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
