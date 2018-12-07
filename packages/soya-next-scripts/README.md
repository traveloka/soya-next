# Soya Next Scripts

[![NPM Version](https://img.shields.io/npm/v/soya-next-scripts.svg?style=flat-square)](https://www.npmjs.com/package/soya-next-scripts)

> A CLI which contains configuration and scripts used by [soya-next-cli](../soya-next-cli).

## Installation

To install it, run the following:

```bash
npm install --save soya-next-scripts
```

> Note: If you're starting a new project, consider using [soya-next-cli](../soya-next-cli) instead for easier setup.

## Usage

To start your development server, run the following:

```bash
soya-next-scripts dev
```

To build for production, run the following:

```bash
soya-next-scripts build
```

To start your production server, run the following:

```bash
soya-next-scripts start
```

To analyze output bundles, run the following:

```bash
# Build and analyze the back end server bundle
BUNDLE_ANALYZE=server soya-next-scripts build

# Build and analyze the front end browser bundle
BUNDLE_ANALYZE=browser soya-next-scripts build

# Build and analyze both server and browser
BUNDLE_ANALYZE=both soya-next-scripts build
```

To run unit tests, run the following:

```bash
soya-next-scripts test
```
