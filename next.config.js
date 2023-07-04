path = require("path");
webpack = require("webpack");

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
      "localhost:3000",
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
    config.plugins.push(resolveFfmpegPlugin);
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.FLUENTFFMPEG_COV": false,
      })
    );

    config.module.exprContextCritical = false;

    //  return modified config
    return config;
  },
  // swcMinify: false,
  httpAgentOptions: {
    keepAlive: false,
  },
};

// fix https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/573
const resolveFfmpegPlugin = new webpack.EnvironmentPlugin({
  name: "resolveFfmpeg",
  setup(build) {
    build.onResolve({ filter: /lib-cov\/fluent-ffmpeg/ }, (args) => {
      const actualPath = path.join(args.resolveDir, "lib", "fluent-ffmpeg.js");
      return { path: actualPath };
    });
  },
});
