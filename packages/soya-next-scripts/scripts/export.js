process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
process.env.NODE_ENV = process.env.NODE_ENV || "production";

require("soya-next/config/default");

process.on("unhandledRejection", err => {
  throw err;
});

const { appDir } = require("soya-next-server/paths");
const { join } = require("path");
const nextExport = require("next/dist/export").default;
const { PHASE_EXPORT } = require("next/constants");
const fs = require('fs')
const loadConfig = fs.existsSync("next-server/dist/server/config") ?
  require("next-server/dist/server/config").default :
  require("next/dist/next-server/server/config").default;
const defaultConf = require("../next.config");
const userConf = loadConfig(PHASE_EXPORT, appDir);
const conf = defaultConf(userConf);
const printAndExit = (message, code = 1) => {
  if (code === 0) {
    console.log(message);
  } else {
    console.error(message);
  }
  process.exit(code);
};

nextExport(appDir, { silent: false, outdir: join(appDir, "out") }, conf)
  .then(() => {
    printAndExit("Export successful", 0);
  })
  .catch(err => {
    printAndExit(err);
  });
