// Rule:
// 1. This file is used for modifying global scope classes/functions/interfaces/variables.
// 2. For module augmentation inside specific vendor, please add it inside vendor.d.ts.
// 3. This file forbids top level `import`/`export` since this file
// should not be treated as a module. You may use import type (https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#import-types)
// to import external type here (Not `import type { x } from 'y', but this one: `type A = import('./y').x`)

// INFO: status & statusCode fields are used inside decodeParam util.
declare interface URIError extends Error {
  status?: number;
  statusCode?: number;
}

declare var __NEXT_DATA__: import("next/dist/next-server/lib/utils").NEXT_DATA;
