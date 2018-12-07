const config = require("config");
const express = require("express");
const next = require("next");
const loadNextConfig = require("next/dist/server/config").default;
const { join } = require("path");
const { createRouter } = require("soya-next/server/router");
const { appDir } = require("./paths");

const loadDefaultConfig = nextConfig => {
  let assetPrefix = nextConfig.assetPrefix;
  if (!assetPrefix && config.basePath) {
    if (typeof config.basePath === "string") {
      assetPrefix = config.basePath;
    } else {
      assetPrefix = config.basePath && config.basePath.test;
    }
  }
  return Object.assign({}, nextConfig, { assetPrefix });
};

module.exports = ({ conf = loadDefaultConfig, dev, phase }) => {
  const nextConfig = loadNextConfig(phase, appDir);
  const app = next({ conf: conf(nextConfig), dev });
  app
    .prepare()
    .then(() => {
      const server = express();

      !dev && server.use(require("frameguard")(config.server.frameguard));

      const includeSoyaLegacy =
        process.argv.indexOf("--include-soya-legacy") !== -1;
      const soyaMiddleware = includeSoyaLegacy
        ? require(join(appDir, "build", "server", "index.js")).default
        : null;
      if (soyaMiddleware !== null) {
        server.use(soyaMiddleware);
      }

      server.use(
        createRouter(app, {
          basePath: config.basePath,
          routes: config.routes,
          redirects: config.redirects,
          defaultLocale: config.defaultLocale,
          siteLocales: config.siteLocales,
          compression: config.server.compression,
          whoami: config.whoami
        })
      );
      server.listen(config.server.port, config.server.host, err => {
        if (err) {
          throw err;
        }

        if (typeof process.send === "function") {
          process.send("ready");
        }

        // eslint-disable-next-line no-console
        console.log(`> Ready on ${config.server.host}:${config.server.port}`);
      });
    })
    .catch(ex => {
      // eslint-disable-next-line no-console
      console.error(ex.stack);
      process.exit(1);
    });
};
