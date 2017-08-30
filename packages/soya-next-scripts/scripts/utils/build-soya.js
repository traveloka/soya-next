const config = require('config');
const webpack = require('webpack');
const { join } = require('path');
const { appDir } = require('../../config/paths');

module.exports = ({ dev = false } = {}) => {
  try {
    const legacyConfig = Object.assign({
      absoluteProjectDir: appDir,
      assetHostPath: `${config.server.host}:${config.server.port}/assets/`,
      debug: dev,
      hotReload: dev,
      minifyJs: !dev,
      port: config.server.port,
      precompileClient: false,
      NODE_ENV: process.env.NODE_ENV,
    }, config.legacy);

    const Precompiler = require('soya/lib/precompile/Precompiler').default;
    const precompiler = new Precompiler(legacyConfig);
    precompiler.precompile();

    const WebpackCompiler = require('soya/lib/compiler/webpack/WebpackCompiler').default;
    const compiler = webpack(WebpackCompiler.createServerBuildConfig(webpack, legacyConfig));
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          return reject(err);
        }
        if (legacyConfig.precompileClient && !dev) {
          require(join(appDir, 'build/server', 'index.js'));
        }
        const jsonStats = stats.toJson();
        if (jsonStats.errors.length > 0) {
          const error = new Error(jsonStats.errors[0]);
          error.errors = jsonStats.errors;
          error.warnings = jsonStats.warnings;
          return reject(error);
        }
        resolve(jsonStats);
      });
    });
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      return Promise.reject(err);
    }
    return Promise.resolve(null);
  }
};
