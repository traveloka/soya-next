const config = require("config");
const withApp = require("./withApp");
const withAssetsImport = require("next-assets-import");
const withBundleAnalyzer = require("./withBundleAnalyzer");
const withCSS = require("./withCSS");
const withCSSModules = require("./withCSSModules");
const withConfig = require("next-config");
const withDocument = require("./withDocument");
const withMarlint = require("./withMarlint");
const withResolver = require("./withResolver");
const withSASS = require("./withSASS");
const withSASSModules = require("./withSASSModules");
const withSourceMaps = require("@zeit/next-source-maps");
const compose = require("lodash/flowRight");

module.exports = (nextConfig = {}) => {
  let assetPrefix = nextConfig.assetPrefix;
  if (!assetPrefix && config.basePath) {
    if (typeof config.basePath === "string") {
      assetPrefix = config.basePath;
    } else {
      assetPrefix = config.basePath && config.basePath.test;
    }
  }
  return compose(
    withSourceMaps,
    withResolver,
    withAssetsImport,
    withBundleAnalyzer,
    withDocument,
    withApp,
    withCSSModules,
    withCSS,
    withConfig,
    withMarlint,
    withSASSModules,
    withSASS
  )(Object.assign({}, nextConfig, { assetPrefix }));
};
