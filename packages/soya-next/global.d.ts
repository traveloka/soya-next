//
// ### Caution
//
// Please **do not use** this type. This is only for
// global augmentation purpose only.
//
declare type __$SoyaNextLocaleContext =
  import("./src/types").SoyaNextLocaleContext;

// INFO: status & statusCode fields are used inside decodeParam util.
declare interface URIError extends Error {
  status?: number;
  statusCode?: number;
}

declare var __NEXT_DATA__: import("next/dist/next-server/lib/utils").NEXT_DATA;
declare var store: import("./src/types").SoyaNextStore;
declare var apolloClient: import("apollo-client").ApolloClient<any>;

declare namespace Express {
  export interface Request extends __$SoyaNextLocaleContext {
    redirects?: import("./src/types").SoyaNextConfig["redirects"];
  }
}
