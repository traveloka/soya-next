#! /usr/bin/env node

process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
process.env.NODE_ENV = process.env.NODE_ENV || "production";
// INFO: for backward compatibility with config@^2 since
// array items and objects in config@^3 has been sealed and
// new properties can not be added anymore in runtime.
process.env.ALLOW_CONFIG_MUTATIONS = process.env.ALLOW_CONFIG_MUTATIONS || true;

require("soya-next/config/default");

process.on("unhandledRejection", err => {
  // eslint-disable-next-line no-console
  console.error(err);
});

const { PHASE_PRODUCTION_SERVER } = require("next/constants");

require("./server")({ dev: false, phase: PHASE_PRODUCTION_SERVER });
