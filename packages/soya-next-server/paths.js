const { resolve } = require("path");
const { realpathSync } = require("fs");

exports.appDir = resolve(realpathSync(process.cwd()));
