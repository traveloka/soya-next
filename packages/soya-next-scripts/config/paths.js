const { resolve } = require('path');
const { realpathSync } = require('fs');

module.exports = {
  appDir: resolve(realpathSync(process.cwd())),
};
