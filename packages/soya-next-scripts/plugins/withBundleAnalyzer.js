const withBundleAnalyzer = require("@next/bundle-analyzer");

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { webpack } = withBundleAnalyzer({ enabled: Boolean(process.env.BUNDLE_ANALYZE) })(nextConfig);
      const newConfig = webpack(config, options);
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(newConfig, options);
      }
      return newConfig;
    }
  });
