/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { webpack }) => {
    const prefix = config.assetPrefix ?? config.basePath ?? "";
    config.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: `${prefix}/_next/static/media/`,
            outputPath: `${webpack ? "../" : ""}static/media/`,
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });
    return config;
  },
  env: {
    customKey: "my-value",
  },
  reactStrictMode: true,
  images: {
    domains: ["sangw.in", "localhost", "picsum.photos"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;
