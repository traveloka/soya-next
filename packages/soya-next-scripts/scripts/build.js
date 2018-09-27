process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
process.env.NODE_ENV = process.env.NODE_ENV || "production";

require("../../soya-next/config/default");

process.on("unhandledRejection", err => {
  throw err;
});

const { appDir } = require("../config/paths");
const build = require("next/dist/build").default;
const buildSoya = require("./utils/build-soya");
// @remove-on-eject-begin
const { PHASE_PRODUCTION_BUILD } = require("next/constants");
const loadConfig = require("next/dist/server/config").default;
const conf = require("../next.config")(loadConfig(PHASE_PRODUCTION_BUILD, appDir));
// @remove-on-eject-end

build(
  appDir
  // @remove-on-eject-begin
  , conf
  // @remove-on-eject-end
)
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
