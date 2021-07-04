process.env.BABEL_ENV = process.env.BABEL_ENV || "development";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
// INFO: for backward compatibility with config@^2 since
// array items and objects in config@^3 has been sealed and
// new properties can not be added anymore in runtime.
process.env.ALLOW_CONFIG_MUTATIONS = process.env.ALLOW_CONFIG_MUTATIONS || true;

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
