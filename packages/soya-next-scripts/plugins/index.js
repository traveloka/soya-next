const config = require("config");
const withAssetsImport = require("next-assets-import");
const withBundleAnalyzer = require("./withBundleAnalyzer");
const withCSS = require("./withCSS");
const withCSSModules = require("./withCSSModules");
const withConfig = require("next-config");
const withDocument = require("./withDocument");
const withExtractStyles = require("./withExtractStyles");
const withMarlint = require("./withMarlint");
const withResolver = require("./withResolver");
const withSASS = require("./withSASS");
const withSASSModules = require("./withSASSModules");
const compose = require("lodash/flowRight");

module.exports = (nextConfig = {}) =>
  compose(
    withResolver,
    withAssetsImport,
    withBundleAnalyzer,
    withDocument,
    withExtractStyles,
    withCSSModules,
    withCSS,
    withConfig,
    withMarlint,
    withSASSModules,
    withSASS
  )(
    Object.assign(
      {
        assetPrefix: config.assetPrefix,
        distDir: config.server.distDir,
        generateEtags: config.server.generateEtags,
        poweredByHeader: config.server.poweredByHeader,
        useFileSystemPublicRoutes: config.server.useFileSystemPublicRoutes
      },
      nextConfig
    )
  );
