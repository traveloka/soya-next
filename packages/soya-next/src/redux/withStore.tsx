import React from "react";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import { NEXT_STATICS } from "../constants/Statics";

import type { Cookies } from "react-cookie";
import type { PreloadedState } from "redux";
import type {
  SoyaNextPage,
  SoyaNextPageContext,
  SoyaNextStore,
} from "../types";
import type { ConfigureStoreFn } from "./createConfigureStore";

export interface WithStoreInjectedProps {
  store: SoyaNextStore;
}

export interface WithStoreProps<TState> {
  // INFO: cookies may be injected from `createBasePage` method.
  cookies?: Cookies;
  reduxState?: PreloadedState<TState>;
  store?: SoyaNextStore;
}

export default function withStore(configureStore: ConfigureStoreFn) {
  return <
    TProps extends WithStoreInjectedProps,
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
      Omit<TProps, keyof WithStoreInjectedProps> & WithStoreProps<TState>
    > {
      public store: SoyaNextStore;

      static displayName = getDisplayName("withStore", Page);

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
        props: Omit<TProps, keyof WithStoreInjectedProps> &
          WithStoreProps<TState>
      ) {
        super(props);
        this.store =
          typeof window !== "undefined"
            ? configureStoreIfNeeded(props.reduxState, {
                cookies: props.cookies,
              } as unknown as TExtraArgs)
            : props.store!;
      }

      render() {
        const { reduxState, store, ...props } = this.props;

        return <Page {...(props as TProps)} store={this.store} />;
      }
    };

    return hoistStatics(WithStore, Page, NEXT_STATICS);
  };
}
