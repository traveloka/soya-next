process.env.BABEL_ENV = process.env.BABEL_ENV || "development";
process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("soya-next/config/default");

process.on("unhandledRejection", err => {
  // eslint-disable-next-line no-console
  console.error(err);
});

const dev = true;
const includeSoyaLegacy = process.argv.indexOf("--include-soya-legacy") !== -1;
const build = includeSoyaLegacy
  ? require("./utils/build-soya")
  : () => Promise.resolve();

build({ dev }).then(() => {
  const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
  const server = require("soya-next-server/server");
  const conf = require("../next.config");

  server({ conf, dev, phase: PHASE_DEVELOPMENT_SERVER });
});
