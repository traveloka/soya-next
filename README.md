# Soya Next

[![Build Status](https://travis-ci.org/traveloka/soya-next.svg?branch=master)](https://travis-ci.org/traveloka/soya-next)
[![Coverage Status](https://coveralls.io/repos/github/traveloka/soya-next/badge.svg?branch=master)](https://coveralls.io/github/traveloka/soya-next?branch=master)

> An opinionated configured Next.js framework.

## Packages

| Name                                                      | Version                                                                                                                                 | Description                                                                                              |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [soya-next](packages/soya-next/README.md)                 | [![NPM Version](https://img.shields.io/npm/v/soya-next.svg?style=flat-square)](https://www.npmjs.com/package/soya-next)                 | A set of utility functions for React applications built on top of Next.js                                |
| [soya-next-cli](packages/soya-next-cli/README.md)         | [![NPM Version](https://img.shields.io/npm/v/soya-next-cli.svg?style=flat-square)](https://www.npmjs.com/package/soya-next-cli)         | A CLI to help bootstrap Soya Next projects quickly                                                       |
| [soya-next-scripts](packages/soya-next-scripts/README.md) | [![NPM Version](https://img.shields.io/npm/v/soya-next-scripts.svg?style=flat-square)](https://www.npmjs.com/package/soya-next-scripts) | A CLI which contains configuration and scripts used by [soya-next-cli](packages/soya-next-cli/README.md) |
| [soya-next-server](packages/soya-next-server/README.md)   | [![NPM Version](https://img.shields.io/npm/v/soya-next-server.svg?style=flat-square)](https://www.npmjs.com/package/soya-next-server)   | Production server for Soya Next                                                                          |

## Features

- Assets import
- Custom routing
- CSS Modules
- Gzip compression
- [Locale-specific URLs](https://support.google.com/webmasters/answer/182192?hl=en&ref_topic=2370587#locale-specific-urls) (Subdirectories with gTLD)
- On-the-fly ESLint
- Redux (Automatic code splitting)
- SASS/SCSS
- Universal cookie
- Universal runtime environment configuration

## Quick Start Guide

This is a quick start to help you bootstrap **Soya Next** projects in no time.
It should cover everything in the [Getting Started](docs/getting-started/README.md) section.

```bash
npm install -g soya-next-cli

soya-next-cli path/to/app
cd path/to/app
npm start
```

That's all!
Open http://localhost:3000 in your browser to see your app running.

## User Guide

- [Analyzing Dependencies](docs/user-guide/analyzing-dependencies.md)
- [Configure Redux Store](docs/user-guide/configure-redux-store.md)
- [Custom Babel Configuration](docs/user-guide/custom-babel-configuration.md)
- [Custom Document](docs/user-guide/custom-document.md)
- [Custom Marlint Configuration](docs/user-guide/custom-marlint-configuration.md)
- [Custom Routing](docs/user-guide/custom-routing.md)
- [Universal Environment Configuration](docs/user-guide/universal-environment-configuration.md)

## Migration Guide

- [0.4.x to 0.5.x](docs/migration-guide/0.4.x-to-0.5.x.md)
- [0.5.x to 0.7.x](docs/migration-guide/0.5.x-to-0.7.x.md)

## API Reference

Read the full API documentation [here](docs/api/README.md).

## Examples

- [Apollo](examples/apollo)
- [Authentication](examples/auth)
- [CSS Modules](examples/css-modules)
- [CSS Modules with SCSS](examples/css-modules-with-scss)
- [Custom Routes](examples/custom-routes)
- [Internationalization](examples/i18n)
- [Internationalization with Redux](examples/i18n-with-redux)
- [Redirection](examples/redirection)
- [TodoMVC](examples/todomvc)
- [TypeScript](examples/typescript)

## Contributing

Please see the [Contributing Guide](CONTRIBUTING.md).

## License

[MIT](LICENSE.md)
