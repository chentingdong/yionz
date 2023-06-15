path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
    serverActions: true,
    esmExternals: false,
  },
  reactStrictMode: true,
  output: "standalone",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
      `lh3.googleusercontent.com`,
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe|png|mp4?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve("url-loader"),
        },
      ],
    });

    //  return modified config
    return config;
  },
  // if swc desn't work
  // presets: ["next/babel"],
  httpAgentOptions: {
    keepAlive: false,
  },
};
