process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
// INFO: for backward compatibility with config@^2 since
// array items and objects in config@^3 has been sealed and
// new properties can not be added anymore in runtime.
process.env.ALLOW_CONFIG_MUTATIONS = process.env.ALLOW_CONFIG_MUTATIONS || true;

require("soya-next/config/default");

process.on("unhandledRejection", err => {
  throw err;
});

const jest = require("jest");
const argv = process.argv.slice(2);
const createJestConfig = require("../lib/utils/createJestConfig").default;
const { join } = require("path");
const { appDir } = require("soya-next-server/paths");
const appPackage = require(join(appDir, "package.json"));
argv.push("--config", JSON.stringify(createJestConfig(appPackage.jest)));
jest.run(argv);
