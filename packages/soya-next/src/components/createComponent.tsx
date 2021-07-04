import { compose } from "redux";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import applyReducers from "../redux/applyReducers";
import withLocale from "../i18n/withLocaleComponent";

import type { Connect } from "react-redux";
import type { AnyAction, ReducersMapObject } from "redux";
import type {
  WithCookiesPageInjectedProps,
  WithCookiesPageProps,
} from "../cookies/withCookiesPage";
import type {
  WithLocaleComponentInjectedProps,
  WithLocaleComponentProps,
} from "../i18n/withLocaleComponent";
import type { WithApplyReducersProps } from "../redux/applyReducers";

export interface CreateComponentInjectedProps
  extends WithCookiesPageInjectedProps,
    WithLocaleComponentInjectedProps {}

export interface CreateComponentProps
  extends WithCookiesPageProps,
    WithLocaleComponentProps,
    WithApplyReducersProps {}

export default function createComponent(
  ...connectArgs: Partial<Parameters<Connect>>
) {
  return <TProps extends CreateComponentInjectedProps>(
    Component: React.ComponentType<TProps>,
    reducers?: ReducersMapObject<any, AnyAction>
  ) =>
    compose(
      withCookies,
      withLocale,
      applyReducers(reducers),
      connect(...(connectArgs as Parameters<Connect>))
    )(Component) as React.ComponentType<
      Omit<TProps, keyof CreateComponentInjectedProps> & CreateComponentProps
    >;
}
