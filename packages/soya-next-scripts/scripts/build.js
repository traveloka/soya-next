process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
process.env.NODE_ENV = process.env.NODE_ENV || "production";

require("soya-next/config/default");

process.on("unhandledRejection", err => {
  throw err;
});

const { appDir } = require("../config/paths");
const build = require("next/dist/build").default;
const buildSoya = require("./utils/build-soya");
const { PHASE_PRODUCTION_BUILD } = require("next/constants");
const loadConfig = require("next/dist/server/config").default;

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
