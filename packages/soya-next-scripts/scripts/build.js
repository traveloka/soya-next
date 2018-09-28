process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
process.env.NODE_ENV = process.env.NODE_ENV || "production";

require("soya-next/config/default");

process.on("unhandledRejection", err => {
  throw err;
});

// @remove-on-eject-begin
const conf = require("../next.config");
// @remove-on-eject-end
const build = require("next/dist/build").default;

const { appDir } = require("../config/paths");
const buildSoya = require("./utils/build-soya");
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
