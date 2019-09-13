const withBundleAnalyzer = require("@next/bundle-analyzer");

module.exports = withBundleAnalyzer({ enabled: Boolean(process.env.BUNDLE_ANALYZE) });
