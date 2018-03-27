const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { webpack } = withBundleAnalyzer({
        analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: 'static',
            reportFilename: '../../bundles/server.html'
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html'
          }
        }
      });
      const newConfig = webpack(config, options);

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(newConfig, options);
      }

      return newConfig;
    }
  });
