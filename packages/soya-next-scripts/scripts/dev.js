require("soya-next/config/default");

process.on("unhandledRejection", err => {
  // eslint-disable-next-line no-console
  console.error(err);
});

const express = require("express");
const next = require("next");
const { join } = require("path");
const { createRouter } = require("soya-next/server/router");
const config = require("config");
const { appDir } = require("../config/paths");
const { PHASE_PRODUCTION_BUILD } = require("next/constants");
const loadConfig = require("next/dist/server/config").default;

const defaultConf = require("../next.config");
const userConf = loadConfig(PHASE_PRODUCTION_BUILD, appDir);
const conf = defaultConf(userConf);

const app = next({ dev: true, conf });
const argv = process.argv ? process.argv.slice(2) : [];
const shouldBuildSoyaLegacy = argv.indexOf("--include-soya-legacy") !== -1;
const buildSoya = shouldBuildSoyaLegacy ? require("./utils/build-soya") : null;

app
  .prepare()
  .then(
    () =>
      shouldBuildSoyaLegacy
        ? buildSoya({ dev: true }).then(() => require.resolve("soya"))
        : null
  )
  .then(
    stats =>
      stats ? require(join(appDir, "build/server", "index.js")).default : null,
    err => {
      if (err.code !== "MODULE_NOT_FOUND") {
        throw err;
      }
    }
  )
  .then((soyaMiddleware = null) => {
    const server = express();
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
