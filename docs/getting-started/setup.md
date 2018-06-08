[soya-next]: packages/soya-next
[soya-next-cli]: packages/soya-next-cli
[soya-next-scripts]: packages/soya-next-scripts
[soya-next-server]: packages/soya-next-server

# Setup

## Installation

There are 3 packages that you need to install:

* [soya-next][soya-next] - A set of utility functions for React applications built on top of Next.js
* [soya-next-scripts][soya-next-scripts] - A CLI which contains configuration and scripts used by [soya-next-cli][soya-next-cli]
* [soya-next-server][soya-next-server] - Production server for Soya Next

Both packages have their own dependencies that need to be installed, run the following to install them:

```bash
npm install --save config express next react react-cookie react-dom react-redux redux
```

Then, to install **soya-next**, **soya-next-scripts**, and **soya-next-server**, run the following:

```bash
npm install --save soya-next soya-next-server
```

```bash
npm install --save-dev soya-next-scripts
```

## Configuration

You won't need to do any configuration because everything is already configured in [soya-next-scripts](https://github.com/traveloka/soya-next/tree/master/packages/soya-next-scripts).
Simply add the following into your `package.json` scripts section:

```json
{
  "analyze": "BUNDLE_ANALYZE=both soya-next-scripts build",
  "analyze:browser": "BUNDLE_ANALYZE=browser soya-next-scripts build",
  "analyze:server": "BUNDLE_ANALYZE=server soya-next-scripts build",
  "build": "soya-next-scripts build",
  "dev": "soya-next-scripts dev",
  "eject": "soya-next-scripts eject",
  "start": "soya-next-server",
  "test": "soya-next-scripts test"
}
```

You're ready to create your first React application in Soya Next now.
