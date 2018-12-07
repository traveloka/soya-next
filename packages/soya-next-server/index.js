#! /usr/bin/env node

process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
process.env.NODE_ENV = process.env.NODE_ENV || "production";

require("soya-next/config/default");

process.on("unhandledRejection", err => {
  // eslint-disable-next-line no-console
  console.error(err);
});

const { PHASE_PRODUCTION_SERVER } = require("next/constants");

require("./server")({ dev: false, phase: PHASE_PRODUCTION_SERVER });
