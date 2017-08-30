import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import spawn from 'cross-spawn';
import createEslintConfig from './utils/createEslintConfig';
import createJestConfig from './utils/createJestConfig';
import { appDir } from '../config/paths';

process.on('unhandledRejection', err => {
  throw err;
});

const ownDependencies = [
  'chalk',
  'cross-spawn',
  'inquirer',
];
const devDependencies = [
  'babel-eslint',
  'eslint',
  'eslint-config-marlint',
  'eslint-loader',
  'eslint-plugin-babel',
  'eslint-plugin-flowtype',
  'eslint-plugin-jsx-a11y',
  'eslint-plugin-react',
  'file-loader',
  'jest',
  'node-sass',
  'sass-loader',
  'url-loader',
  'webpack-bundle-analyzer',
];
const ownDir = path.resolve(__dirname, '..');

const checkFiles = files => {
  const exists = files.reduce((exists, file) => {
    if (fs.existsSync(path.join(appDir, file))) {
      exists.push(file);
    }
    return exists;
  }, []);

  if (exists.length > 0) {
    console.log();
    console.error(`Files already exists in ${appDir}.`);
    exists.forEach(exist => {
      console.error(`  ${exist}`);
    });
    console.log();
    console.error('Please move or delete them and retry this command.');
    console.log();
    process.exit(1);
  }

  console.log();
};

const copyFiles = (dirs, files) => {
  console.log(`Copying files into ${appDir}.`);

  dirs.forEach(dir => {
    if (!fs.existsSync(path.join(appDir, dir))) {
      fs.mkdirSync(path.join(appDir, dir));
    }
  });

  files.forEach(file => {
    let content = fs.readFileSync(path.join(ownDir, file), 'utf8');
    content = `${content
      .replace(
        /([\n\r])?\s*\/\/ @remove-on-eject-begin([\s\S]*?)\/\/ @remove-on-eject-end\s?/gm,
        '$1'
      )
      .trim()}\n`;
    console.log(chalk.green(`+ ${file}`));
    fs.writeFileSync(path.join(appDir, file), content, 'utf8');
  });

  console.log();
};

const shouldUseYarn = () => {
  const { status } = spawn.sync('which', ['yarn'], { stdio: 'ignore' });
  return status === 0;
};

const sortDependencies = unsortedDependencies => (
  Object
    .keys(unsortedDependencies)
    .sort()
    .reduce((sortedDependencies, dependency) => {
      sortedDependencies[dependency] = unsortedDependencies[dependency];
      return sortedDependencies;
    }, {})
);

const updateDependencies = (appPackage, ownPackage) => {
  console.log('Updating dependencies.');

  Object
    .keys(ownPackage.dependencies)
    .filter(dependency => (
      devDependencies.indexOf(dependency) === -1 &&
      !appPackage.dependencies[dependency]
    ))
    .forEach(dependency => {
      if (
        dependency !== ownPackage.name &&
        ownDependencies.indexOf(dependency) === -1
      ) {
        console.log(chalk.green(`+ ${dependency}`));
      }
      appPackage.dependencies[dependency] = ownPackage.dependencies[dependency];
    });
  console.log();

  console.log('Updating dev dependencies.');
  appPackage.devDependencies = appPackage.devDependencies || {};
  devDependencies
    .filter(devDependency => !appPackage.devDependencies[devDependency])
    .forEach(devDependency => {
      if (ownDependencies.indexOf(devDependency) === -1) {
        console.log(chalk.green(`+ ${devDependency}`));
      }
      appPackage.devDependencies[devDependency] = ownPackage.dependencies[devDependency];
    });

  appPackage.dependencies = sortDependencies(appPackage.dependencies);
  appPackage.devDependencies = sortDependencies(appPackage.devDependencies);

  console.log();
};

const removeDependencies = ownPackage => {
  const cmd = shouldUseYarn() ? 'yarn' : 'npm';
  const args = ['remove', ownPackage.name, ...ownDependencies];

  console.log('Removing dependencies.');
  const { status } = spawn.sync(cmd, args, { stdio: 'inherit' });
  if (status !== 0) {
    process.exit(status);
  }
  console.log();
};

const updateScripts = (appPackage, ownPackage) => {
  console.log('Updating scripts.');

  console.log(chalk.red(`- ${appPackage.scripts.eject}`));
  delete appPackage.scripts.eject;

  Object.keys(appPackage.scripts).forEach(scriptName => {
    Object.keys(ownPackage.bin).forEach(binName => {
      const regex = new RegExp(`${binName} (\\w+)`, 'g');
      if (!regex.test(appPackage.scripts[scriptName])) {
        return;
      }
      console.log(chalk.red(`- ${appPackage.scripts[scriptName]}`));
      appPackage.scripts[scriptName] = appPackage.scripts[scriptName].replace(
        regex,
        'node scripts/$1.js'
      );
      console.log(chalk.green(`+ ${appPackage.scripts[scriptName]}`));
    });
  });

  console.log();
};

const addEslintConfig = appPackage => {
  console.log('Adding Eslint configuration.');
  appPackage.eslintConfig = createEslintConfig(appPackage.eslintConfig);
  console.log();
};

const addJestConfig = appPackage => {
  console.log('Adding Jest configuration.');
  appPackage.jest = createJestConfig(appPackage.jest);
  console.log();
};

inquirer.prompt({
  type: 'confirm',
  name: 'shouldEject',
  message: 'Are you sure you want to eject? This action is permanent.',
  default: false,
})
  .then(({ shouldEject }) => {
    if (!shouldEject) {
      console.log('Eject aborted.');
      return;
    }

    console.log('Ejecting.');

    const dirs = ['config', 'pages', 'scripts', 'scripts/utils'];
    const files = ['next.config.js'].concat(dirs.reduce((files, dir) => (
      files.concat(
        fs.readdirSync(path.join(ownDir, dir))
          .map(file => path.join(dir, file))
          .filter(file => fs.lstatSync(path.join(ownDir, file)).isFile())
      )
    ), []));

    checkFiles(files);
    copyFiles(dirs, files);

    const appPackage = require(path.join(appDir, 'package.json'));
    const ownPackage = require(path.join(ownDir, 'package.json'));

    updateDependencies(appPackage, ownPackage);
    updateScripts(appPackage, ownPackage);
    addEslintConfig(appPackage);
    addJestConfig(appPackage);

    fs.writeFileSync(
      path.join(appDir, 'package.json'),
      `${JSON.stringify(appPackage, null, 2)}\n`
    );

    removeDependencies(ownPackage);

    console.log('Ejected successfully.');
  });
