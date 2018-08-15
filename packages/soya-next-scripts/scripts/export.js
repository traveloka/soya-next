process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
process.env.NODE_ENV = process.env.NODE_ENV || "production";

require("soya-next/config/default");

process.on("unhandledRejection", err => {
  throw err;
});

const { appDir } = require("../config/paths");
const { join } = require("path");
const _export = require("next/dist/server/export").default;
// @remove-on-eject-begin
const { PHASE_EXPORT } = require("next/constants");
const { loadConfig } = require("next/dist/server/config");
const conf = require("../next.config")(loadConfig(PHASE_EXPORT, appDir));
// @remove-on-eject-end

_export(
  appDir,
  {
    silent: false,
    outdir: join(appDir, "out"),
  }
  // @remove-on-eject-begin
  , conf
  // @remove-on-eject-begin
);

