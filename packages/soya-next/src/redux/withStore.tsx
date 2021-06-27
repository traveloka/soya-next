import React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import { NEXT_STATICS } from "../constants/Statics";

import type { Cookies } from "react-cookie";
import type { Action, AnyAction, PreloadedState, Store } from "redux";
import type {
  SoyaNextPage,
  SoyaNextPageContext,
  SoyaNextStore,
  SoyaNextStoreExt,
  SoyaNextThunkCompatStoreExt,
} from "../types";

type ConfigureStoreFn = ReturnType<
  typeof import("./createConfigureStore").default
>;

export interface WithStoreInjectedProps<TState> {
  // INFO: Actually, this HOC doesn't inject cookies, but it should come
  // from `createBasePage` method.
  cookies?: Cookies;
  reduxState: PreloadedState<TState>;
  store: SoyaNextStore;
}

export interface WithStoreProps<TState> {
  // INFO: Actually, this HOC doesn't inject cookies, but it should come
  // from `createBasePage` method.
  cookies?: Cookies;
  reduxState?: PreloadedState<TState>;
  store?: SoyaNextStore;
}

export default function withStore(configureStore: ConfigureStoreFn) {
  return <
    TProps extends WithStoreInjectedProps<TState>,
    TState = any,
    TExtraArgs = any
  >(
    Page: SoyaNextPage<TProps>
  ) => {
    function configureStoreIfNeeded(
      preloadedState?: PreloadedState<TState>,
      extraArgument?: TExtraArgs
    ): SoyaNextStore {
      if (typeof window === "undefined") {
        return configureStore(preloadedState, extraArgument);
      }
      if (typeof window.store === "undefined") {
        window.store = configureStore(preloadedState, extraArgument);
      }
      return window.store;
    }

    const WithStore = class WithStore extends React.Component<
      Omit<TProps, keyof WithStoreInjectedProps<TState>> &
        WithStoreProps<TState>
    > {
      public store?: SoyaNextStore;

      static displayName = getDisplayName("withStore", Page);

      static propTypes = {
        reduxState: PropTypes.object.isRequired,
        store: PropTypes.oneOfType([
          PropTypes.object,
          PropTypes.shape({
            subscribe: PropTypes.func.isRequired,
            dispatch: PropTypes.func.isRequired,
            getState: PropTypes.func.isRequired,
          }),
        ]).isRequired,
      };

      static async getInitialProps(ctx: SoyaNextPageContext) {
        const store = configureStoreIfNeeded(undefined, {
          cookies: ctx.cookies,
        } as unknown as TExtraArgs);
        const props =
          Page.getInitialProps &&
          (await Page.getInitialProps({ ...ctx, store }));
        return {
          ...props,
          reduxState: store.getState(),
          store,
        };
      }

      constructor(
        props: Omit<TProps, keyof WithStoreInjectedProps<TState>> &
          WithStoreProps<TState>
      ) {
        super(props);
        this.store =
          typeof window !== "undefined"
            ? configureStoreIfNeeded(props.reduxState, {
                cookies: props.cookies,
              } as unknown as TExtraArgs)
            : props.store;
      }

      render() {
        const { reduxState, store, ...props } = this.props;

        return <Page {...(props as TProps)} store={this.store} />;
      }
    };

    return hoistStatics(WithStore, Page, NEXT_STATICS);
  };
}
