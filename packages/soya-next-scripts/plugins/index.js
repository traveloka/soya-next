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

  const {
    SourceMaps = { enable: true },
    Resolver = { enable: true },
    AssetsImport = { enable: true },
    BundleAnalyzer = { enable: true },
    Document = { enable: true },
    App = { enable: true },
    CSSModules = { enable: true },
    CSS = { enable: true },
    Config = { enable: true },
    Marlint = { enable: true },
    SASSModules = { enable: true },
    SASS = { enable: true },
    forceTrailingSlashOverride = { enable: true },
  } = config.soyaNextPlugins || {};

  if (forceTrailingSlashOverride.enable) {
    nextConfig.trailingSlash = true;
  }

  const plugins = [
    { fn: withSourceMaps, config: SourceMaps },
    { fn: withResolver, config: Resolver },
    { fn: withAssetsImport, config: AssetsImport },
    { fn: withBundleAnalyzer, config: Document },
    { fn: withDocument, config: BundleAnalyzer },
    { fn: withApp, config: App },
    { fn: withCSSModules, config: CSSModules },
    { fn: withCSS, config: CSS },
    { fn: withConfig, config: Config },
    { fn: withMarlint, config: Marlint },
    { fn: withSASSModules, config: SASSModules },
    { fn: withSASS, config: SASS },
  ];

  return compose(...plugins.filter((p) => p.config.enable).map((p) => p.fn))(
    Object.assign({}, nextConfig, { assetPrefix })
  );
};
