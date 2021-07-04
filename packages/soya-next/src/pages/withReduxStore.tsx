import React from "react";
import hoistStatics from "hoist-non-react-statics";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import applyReducers from "../redux/applyReducers";
import withStore from "../redux/withStore";

import type { AnyAction, ReducersMapObject } from "redux";
import type { Connect } from "react-redux";
import type { SoyaNextPage } from "../types";
import type { WithApplyReducersProps } from "../redux/applyReducers";
import type { ConfigureStoreFn } from "../redux/createConfigureStore";
import type { WithStoreInjectedProps } from "../redux/withStore";

export interface WithReduxStoreInjectedProps extends WithStoreInjectedProps {}
export interface WithReduxStoreProps extends WithApplyReducersProps {}

export default function withReduxStore(configureStore: ConfigureStoreFn) {
  return (
      reducers?: ReducersMapObject<any, AnyAction>,
      ...connectArgs: Partial<Parameters<Connect>>
    ) =>
    <TProps extends WithReduxStoreInjectedProps>(
      Page: SoyaNextPage<TProps>
    ) => {
      const EnhancedPage = compose(
        applyReducers(reducers),
        // TODO: Find a clean way to declare type for variadic connectArgs
        // tuple. Actually, below casting is to satisfy typescript compiler while
        // we get optional args from above `Partial<Parameters<Connect>>`.
        connect(...(connectArgs as Parameters<Connect>))
      )(Page) as SoyaNextPage<TProps & WithApplyReducersProps>;

      const WithReduxStore = class WithReduxStore extends React.Component<
        TProps & WithReduxStoreProps
      > {
        render() {
          const { store, ...props } = this.props;
          return (
            <Provider store={store}>
              <EnhancedPage {...(props as TProps)} />
            </Provider>
          );
        }
      };

      return withStore(configureStore)(
        hoistStatics(WithReduxStore, EnhancedPage)
      );
    };
}
