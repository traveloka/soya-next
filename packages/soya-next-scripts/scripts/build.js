process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
process.env.NODE_ENV = process.env.NODE_ENV || "production";
// INFO: for backward compatibility with config@^2 since
// array items and objects in config@^3 has been sealed and
// new properties can not be added anymore in runtime.
process.env.ALLOW_CONFIG_MUTATIONS = process.env.ALLOW_CONFIG_MUTATIONS || true;

require("soya-next/config/default");

process.on("unhandledRejection", err => {
  throw err;
});

const { appDir } = require("soya-next-server/paths");
const build = require("next/dist/build").default;
const buildSoya = require("./utils/build-soya");
const { PHASE_PRODUCTION_BUILD } = require("next/constants");
const fs = require("fs");
const loadConfig = fs.existsSync("next-server/dist/server/config")
  ? require("next-server/dist/server/config").default
  : require("next/dist/next-server/server/config").default;

const defaultConf = require("../next.config");
const userConf = loadConfig(PHASE_PRODUCTION_BUILD, appDir);
const conf = defaultConf(userConf);

build(appDir, conf)
  .then(
    () => buildSoya(),
    err => {
      if (err.code !== "MODULE_NOT_FOUND") {
        throw err;
      }
    }
  )
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    process.exit(1);
  });
