// INFO: status & statusCode fields are used inside decodeParam util.
declare interface URIError extends Error {
  status?: number;
  statusCode?: number;
}

declare var __NEXT_DATA__: import("next/dist/next-server/lib/utils").NEXT_DATA;
declare var store: import("./src/types").SoyaNextStore;

//
// ### Caution
//
// Please **do not use** this type. This is only for
// global augmentation purpose only.
//
declare type __$SoyaNextLocaleContext =
  import("./src/types").SoyaNextLocaleContext;
declare type __$SoyaNextConfig = import("./src/types").SoyaNextConfig;

declare namespace Express {
  export interface Request extends __$SoyaNextLocaleContext {
    redirects?: __$SoyaNextConfig["redirects"];
  }
}
