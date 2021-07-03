import React from "react";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import { NEXT_STATICS } from "../constants/Statics";

import type { ApolloClient } from "apollo-client";
import type { Cookies } from "react-cookie";
import type { SoyaNextPage, SoyaNextPageContext } from "../types";

export type ConfigureApolloClientFn = <TApolloState = any, TOptions = any>(
  apolloState?: TApolloState,
  options?: TOptions
) => ApolloClient<TApolloState>;

export interface WithApolloClientInjectedProps<TApolloState> {
  client: ApolloClient<TApolloState>;
}
export interface WithApolloClientProps<TApolloState = any> {
  apolloState?: TApolloState;
  cookies?: Cookies;
}

export default function withClient(configureClient: ConfigureApolloClientFn) {
  return <
    TProps extends WithApolloClientInjectedProps<TApolloState>,
    TApolloState = any,
    TOptions = any
  >(
    Page: SoyaNextPage<TProps>
  ) => {
    function configureClientIfNeeded(
      preloadedState?: TApolloState,
      options?: TOptions
    ) {
      if (typeof window === "undefined") {
        return configureClient(preloadedState, options);
      }
      if (!window.apolloClient) {
        window.apolloClient = configureClient(preloadedState, options);
      }
      return window.apolloClient;
    }

    // TODO: remove class expression when the issue has been resolved
    // from typescript side.
    // - https://github.com/microsoft/TypeScript/issues/35822
    // - https://github.com/microsoft/TypeScript/issues/28040
    // error TS4060: Return type of exported function has or is using private name 'WithClient'
    const WithClient = class WithClient extends React.Component<
      Omit<TProps, keyof WithApolloClientInjectedProps<TApolloState>> &
        WithApolloClientProps<TApolloState>
    > {
      public client: ApolloClient<TApolloState>;

      static displayName = getDisplayName("withClient", Page);

      static async getInitialProps(ctx: SoyaNextPageContext) {
        let apolloState: TApolloState = {} as TApolloState;
        const client = configureClientIfNeeded(apolloState, {
          cookies: ctx.cookies,
        } as unknown as TOptions);
        const props =
          Page.getInitialProps &&
          (await Page.getInitialProps({ ...ctx, client }));
        if (typeof window === "undefined") {
          // Extract query data from the Apollo's store
          apolloState = client.cache.extract();
        }
        return {
          ...props,
          apolloState,
        };
      }

      constructor(
        props: Omit<TProps, keyof WithApolloClientInjectedProps<TApolloState>> &
          WithApolloClientProps<TApolloState>
      ) {
        super(props);
        this.client = configureClientIfNeeded(props.apolloState, {
          cookies: props.cookies,
        } as unknown as TOptions);
      }

      render() {
        // Don't pass apolloState into Page,
        // previously using delete operator.
        const { apolloState, ...props } = this.props;

        return <Page {...(props as TProps)} client={this.client} />;
      }
    };

    return hoistStatics(WithClient, Page, NEXT_STATICS);
  };
}
