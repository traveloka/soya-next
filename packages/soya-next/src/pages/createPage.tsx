import createReduxPage from "./createReduxPage";

import type { AnyAction, ReducersMapObject } from "redux";
import type { Connect } from "react-redux";
import type { CreateReduxPageInjectedProps } from "./createReduxPage";
import type { SoyaNextPage } from "../types";

// For backward compatibility
/**
 * Configures and connects to Redux store, loads reducers dynamically,
 * handles client side URL redirection, and makes cookie, default locale,
 * locale, site locales available as `Page` props, and in the `getInitialProps`
 * lifecycle method.
 *
 * It will also make them available to the component hierarchy below,
 * through the following method calls:
 *
 * - Cookie through `withCookies` calls, imported from `react-cookie`.
 * - Default locale, locale, and site locales through `withLocale` calls,
 * imported from `soya-next/i18n`.
 *
 * @param [connectArgs] react-redux `connect` method arguments.
 * See https://react-redux.js.org/api/connect.
 * @returns An enhanced Page component class.
 */
export default function createPage(
  ...connectArgs: Partial<Parameters<Connect>>
) {
  /**
   * @param Page Page component to be enhanced.
   * @param [reducers] An object of reducers which will be loaded
   * dynamically with the given name. **Note**: Make sure each reducers
   * has unique name within your application reducers.
   */
  return <TProps extends CreateReduxPageInjectedProps>(
    Page: SoyaNextPage<TProps>,
    reducers?: ReducersMapObject<any, AnyAction>
  ) => createReduxPage(reducers, ...connectArgs)(Page);
}
