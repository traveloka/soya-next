require('../config/setDefault');

process.on('unhandledRejection', err => {
  throw err;
});

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

const jest = require('jest');
const argv = process.argv.slice(2);
// @remove-on-eject-begin
const createJestConfig = require('../lib/utils/createJestConfig').default;
const { join } = require('path');
const { appDir } = require('../config/paths');
const appPackage = require(join(appDir, 'package.json'));
argv.push(
  '--config',
  JSON.stringify(createJestConfig(appPackage.jest))
);
// @remove-on-eject-end
jest.run(argv);
