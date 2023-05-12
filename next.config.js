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
};
