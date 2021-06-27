import type { CompressionOptions } from "compression";
import type { IncomingMessage } from "http";
import type { NextComponentType, NextPageContext } from "next";
import type { Cookies } from "react-cookie";
import type {
  Action,
  AnyAction,
  Dispatch,
  Reducer,
  ReducersMapObject,
  Store,
} from "redux";
import type { ThunkDispatch } from "redux-thunk";

//#region Soya-Next Redux Types
/**
 * Soya Next Store Extension
 * ---
 */
export interface SoyaNextStoreExt<TState, TAction extends Action<any>> {
  /**
   * Is using soya redux enhancer?
   */
  soya: boolean;

  /**
   * Add reducer extension method for code-splitting.
   */
  addReducer: (
    nextReducers: Reducer<TState, TAction> | ReducersMapObject<any, AnyAction>
  ) => void;

  /**
   * Custom replaceReducer method for code-splitting.
   */
  replaceReducer: (
    nextReducers: Reducer<TState, TAction> | ReducersMapObject<any, AnyAction>
  ) => void;
}

/**
 * Soya Next Thunk Compatible Store Extension
 * ---
 */
export interface SoyaNextThunkCompatStoreExt<
  TState = any,
  TAction extends Action<any> = AnyAction,
  TExtraArgs = any
> {
  dispatch: Dispatch<TAction> | ThunkDispatch<TState, TExtraArgs, TAction>;
}

/**
 * Soya Next Store
 * ---
 */
export type SoyaNextStore<
  TState = any,
  TAction extends Action<any> = AnyAction,
  TStateExt = any,
  TExtraArgs = any
> = Store<TState & TStateExt, TAction> &
  SoyaNextStoreExt<TState, TAction> &
  SoyaNextThunkCompatStoreExt<TState, TAction, TExtraArgs>;
//#endregion Soya-Next Redux Types

//#region Soya-Next Common Types
/**
 * Soya Legacy Configuration for Soya Next
 * ---
 */
export interface SoyaLegacyConfig {
  absoluteComponentsDir?: string[];
  assetHostPath?: string;
  assetProtocol?: string;
  clientReplace?: Record<string, any>;
  clientResolve?: any[];
  commonFileThreshold?: number;
  componentBrowser?: boolean;
  debug?: boolean;
  defaultImportBase?: string;
  hotReload?: boolean;
  maxRequestBodyLength?: number;
  minifyJs?: boolean;
  port?: number;
  precompileClient?: boolean;
  routerNodeRegistrationAbsolutePath?: string;
  useStyledModules?: boolean;
}

/**
 * Soya Next Configuration - Base Path Object
 * ---
 *
 * It can be accessed through `config.get('basePath')` or `config.basePath`
 * by using `node-config`.
 */
export interface SoyaNextBasePath {
  exclude?: string | string[];
  test?: string;
}

/**
 * Soya Next Configuration - Plugin Config Option
 * ---
 */
export interface SoyaNextPluginConfigOption {
  /**
   * Enable current plugin?
   */
  enable: boolean;
}

/**
 * Soya Next Configuration - Plugin
 * ---
 *
 * It can be accessed through `config.get('soyaNextPlugins')` or `config.soyaNextPlugins`
 * by using `node-config`.
 */
export interface SoyaNextPluginConfig {
  /**
   * `withApp` Plugin
   */
  App?: SoyaNextPluginConfigOption;

  /**
   * `withAssetsImport` (next-assets-import) Plugin
   */
  AssetsImport?: SoyaNextPluginConfigOption;

  /**
   * `withBundleAnalyzer` (@next/bundle-analyzer) Plugin
   */
  BundleAnalyzer?: SoyaNextPluginConfigOption;

  /**
   * `withConfig` (next-config) Plugin
   */
  Config?: SoyaNextPluginConfigOption;

  /**
   * `withCSS` (@zeit/next-css) Plugin
   */
  CSS?: SoyaNextPluginConfigOption;

  /**
   * `withCSSModules (@zeit/next-css) Plugin
   */
  CSSModules?: SoyaNextPluginConfigOption;

  /**
   * `withDocument` Plugin
   */
  Document?: SoyaNextPluginConfigOption;

  /**
   * `withMarlint` (next-eslint with marlint config) Plugin
   */
  Marlint?: SoyaNextPluginConfigOption;

  /**
   * `withResolver` Plugin
   */
  Resolver?: SoyaNextPluginConfigOption;

  /**
   * `withSASS` (@zeit/next-sass) Plugin
   */
  SASS?: SoyaNextPluginConfigOption;

  /**
   * `withSASSModules` (@zeit/next-sass) Plugin
   */
  SASSModules?: SoyaNextPluginConfigOption;

  /**
   * `withSourceMaps` (@zeit/next-source-maps) Plugin
   */
  SourceMaps?: SoyaNextPluginConfigOption;
}

/**
 * Soya Next Configuration - Redirect Object
 * ---
 *
 * It can be accessed through `config.get('redirects')` or `config.redirects`
 * by using `node-config`.
 */
export interface SoyaNextRedirectConfig {
  /**
   * Request method, such as `POST`, `GET`, etc.
   * @example POST
   */
  method?: string;

  /**
   * Page path.
   * @example /new-page
   */
  page?: string;

  /**
   * **Note:** It must match one of the `config.routes` key.
   * @example '/p/:id'
   */
  to: string;
}

/**
 * Soya Next Configuration - Route Object
 * ---
 *
 * It can be accessed through `config.get('routes')` or `config.routes`
 * by using `node-config`.
 */
export interface SoyaNextRouteConfig {
  /**
   * @example POST
   */
  method?: string;

  /**
   * @example '/post'
   */
  page: string;
}

/**
 * Soya Next Configuration - Server Section
 * ---
 *
 * It can be accessed through `config.get('server')` or `config.server`
 * by using `node-config`.
 */
export interface SoyaNextServerConfig {
  /**
   * Express server compression options.
   * @see [compression](https://www.npmjs.com/package/compression#compressionoptions)
   */
  compression?: CompressionOptions;

  /**
   * Server header configuration
   * @example
   * {
   *   'X-Frame-Options': 'SAMEORIGIN'
   * }
   */
  headers?: Record<string, any>;

  /**
   * Server host.
   * @example '0.0.0.0'
   */
  host?: string;

  /**
   * Server port number.
   * @example 3000
   */
  port?: number;
}

/**
 * Soya Next Configuration
 * ---
 *
 * Soya next configuration for `node-config` file (`config/default.js`,
 * `config/production.js`, etc.). You can extend this interface with your
 * own configuration, and then do module-augmenting `config` module
 * with this interface for better autocompletion.
 *
 * @example
 * // Inside your custom type directory, such as `/[your_project_root]/src/@types/config.d.ts`.
 * import type { SoyaNextConfig } from 'soya-next';
 *
 * declare module 'config' {
 *   // You also can extends from other config interfaces.
 *   declare interface IConfig extends SoyaNextConfig {
 *     captchaSiteKey?: string;
 *     // Add your custom config property here.
 *   }
 * }
 *
 * // Using `get` method.
 * const captchaSiteKey: string = config.get('captchaSiteKey');
 *
 * // Old direct value access method.
 * const captchaSiteKey = config.captchaSiteKey || '';
 */
export interface SoyaNextConfig {
  /**
   * Soya next basePath configuration.
   *
   * Used in NextJS `assetPrefix` configuration or soya-next
   * `createRouter` method.
   */
  basePath?: string | SoyaNextBasePath;

  /**
   * Soya next router defaultLocale.
   *
   * **Note:** The value must match one of
   * the `siteLocales` config values.
   * @example 'en-id'
   */
  defaultLocale?: string;

  /**
   * Soya legacy configuration for soya-next.
   *
   * This configuration is not required anymore if you are using the latest
   * soya-next framework. You may need to provide this configuration
   * if you still use the old soya framework alongside with soya-next.
   * @see [https://github.com/traveloka/soya#configurations](https://github.com/traveloka/soya#configurations)
   */
  legacy?: SoyaLegacyConfig;

  /**
   * Soya next server redirects configuration.
   * @example
   * redirects: {
   *   '/post/:id': {
   *     to: '/p/:id', // must target available routes
   *   },
   * }
   */
  redirects?: Record<string, SoyaNextRedirectConfig>;

  /**
   * Soya next server routes configuration.
   * @example
   * routes: {
   *   '/p/:id': {
   *     page: '/post',
   *   },
   * }
   */
  routes?: Record<string, SoyaNextRouteConfig>;

  /**
   * Soya next server configuration.
   */
  server?: SoyaNextServerConfig;

  /**
   * Soya next router siteLocales.
   * @example ['en-id', 'id-id']
   */
  siteLocales?: string[];

  /**
   * Soya next plugin configuration.
   *
   * You can disable/enable specific plugins here.
   * @example
   * {
   *   CSSModules: {
   *     enable: false
   *   }
   * }
   */
  soyaNextPlugins?: SoyaNextPluginConfig;

  /**
   * Soya next `whoami` response object.
   *
   * It is used for `/whoami` response.
   */
  whoami?: Record<string, any>;
}

/**
 * Soya Next Locale
 * ---
 *
 * It contains current active country and language.
 * If you are not using typescript, you may use `localeShape`
 * from `soya-next/prop-types` or `soya-next` package.
 */
export interface SoyaNextLocale {
  country: string;
  language: string;
}

/**
 * Soya Next Locale Context
 * ---
 *
 * It is being used inside `i18n` feature.
 */
export interface SoyaNextLocaleContext {
  defaultLocale?: string;
  siteLocales?: string[];
  locale?: SoyaNextLocale | null;
}

/**
 * Soya Next HTTP Incoming Message
 * ---
 *
 * Custom HTTP `IncomingMessage` interface for
 * soya-next usage.
 */
export interface SoyaNextHttpIncomingMessage
  extends IncomingMessage,
    SoyaNextLocaleContext {
  universalCookies?: Cookies;
}

/**
 * Soya Next Page Context
 * ---
 *
 * Custom soya-next page context. You may use this interface
 * instead of the standard `NextPageContext` interface since
 * this interface contains specific properties for soya-next usage.
 */
export interface SoyaNextPageContext
  extends Omit<NextPageContext, "req">,
    SoyaNextLocaleContext {
  cookies?: Cookies;
  /**
   * `HTTP` request object with specific soya-next properties.
   */
  req?: SoyaNextHttpIncomingMessage;
  store?: SoyaNextStore;
}

/**
 * Soya Next Page
 * ---
 *
 * You can use this type when creating `pages` or `container` (if you are using
 * container pattern).
 * The difference between the `React.ComponentType` and `NextPage` is
 * `NextPage` has special `getInitialProps` method inside it.
 */
export type SoyaNextPage<
  TProps = {},
  TInitialProps = TProps
> = NextComponentType<SoyaNextPageContext, TInitialProps, TProps>;
//#endregion Soya-Next Common Types

// Treat as module by exporting empty object.
export {};
