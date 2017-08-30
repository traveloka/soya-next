require('../config/setDefault');

process.on('unhandledRejection', err => {
  throw err;
});

process.env.BABEL_ENV = process.env.BABEL_ENV || 'production';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// @remove-on-eject-begin
const conf = require('../next.config');
// @remove-on-eject-end
const build = require('next/dist/server/build').default;

const { appDir } = require('../config/paths');
const buildSoya = require('./utils/build-soya');
build(
  appDir
  // @remove-on-eject-begin
  , conf
  // @remove-on-eject-end
)
  .then(
    () => buildSoya(),
    err => {
      if (err.code !== 'MODULE_NOT_FOUND') {
        throw err;
      }
    }
  )
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
