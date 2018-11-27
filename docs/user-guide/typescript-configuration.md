# Typescript with Soya Next

As current version of soya next allows extension of `next.config.js`, now we can build soya-next application that understand typescript.

## Installation

**Dependencies :**

```
yarn add @zeit/next-typescript
```

On your project folder root, add `next.config.js`

```js
const withTypescript = require('@zeit/next-typescript');
module.exports = withTypescript();
```

and add `tsconfig.json`

```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "jsx": "preserve",
    "lib": ["dom", "es2017"],
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "preserveConstEnums": true,
    "removeComments": false,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "target": "esnext"
  }
}
```

and modify `.babelrc` to use next-typescript preset

```json
{
  "presets": ["next/babel", "@zeit/next-typescript/babel"],
  ...
}
```

## Testing with Jest

**Dependencies :**

```
yarn add --dev ts-jest @types/jest
```

Update your jest configuration to resolve typescript and use ts-jest plugin

```json
// package.json
{
  ...

  jest: {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "testMatch": [
      "**/__tests__/**/*.(js?(x)|ts?(x))",
      "**/?(*).(spec|test).(js?(x)|ts?(x))"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
  },
  ...
}
```

## Custom module resolver

If you use `babel-plugin-module-resolver`, you need to add `.ts` and `.tsx` extensions resolve to the plugins configuration in `.babelrc`

```json
{
  ...

  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./src"],
        "extensions": [".js", ".jsx", ".es", ".es6", ".mjs", ".ts", ".tsx"]
      }
    ],
    ...
  ],

  ...
}
```

also update your jest configuration

```json
// package.json
{
  ...

  jest: {
    ...
    "roots": [
      "<rootDir>/src"
    ],
    "moduleDirectories": [
      "node_modules",
      "./src"
    ],
    ...
  }

  ...
}
```