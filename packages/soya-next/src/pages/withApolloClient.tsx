import React from "react";
import Head from "next/head";
import hoistStatics from "hoist-non-react-statics";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import withClient from "../apollo/withClient";
import { NEXT_STATICS } from "../constants/Statics";

import type { SoyaNextPage, SoyaNextPageContext } from "../types";
import type {
  ConfigureApolloClientFn,
  WithApolloClientInjectedProps,
} from "../apollo/withClient";

export function withApolloClientFactory<
  TProps extends WithApolloClientInjectedProps<TApolloState>,
  TApolloState = any
>(
  enhancer: (Page: SoyaNextPage<any>) => SoyaNextPage<TProps> = Page =>
    Page as any,
  rootContext: (ctx: SoyaNextPageContext) => Record<string, any> = _ctx => ({}),
  ssr = false
) {
  return (configureClient: ConfigureApolloClientFn) =>
    (Page: SoyaNextPage<TProps>) => {
      const EnhancedPage = enhancer(
        hoistStatics(
          ({ client, ...props }: TProps) => (
            <ApolloProvider client={client}>
              <Page {...(props as TProps)} />
            </ApolloProvider>
          ),
          Page
        )
      );

      if (!ssr) {
        return withClient(configureClient)(EnhancedPage);
      }

      // TODO: remove class expression when the issue has been resolved
      // from typescript side.
      // - https://github.com/microsoft/TypeScript/issues/35822
      // - https://github.com/microsoft/TypeScript/issues/28040
      // error TS4060: Return type of exported function has or is using private name 'WithApolloClient'
      const WithApolloClient = class WithApolloClient extends React.Component<TProps> {
        static async getInitialProps(ctx: SoyaNextPageContext) {
          const props =
            EnhancedPage.getInitialProps &&
            (await EnhancedPage.getInitialProps(ctx));
          if (typeof window === "undefined") {
            if (ctx.res?.writableEnded || ctx.res?.finished) {
              // When redirecting, the response is finished.
              // No point in continuing to render
              return;
            }

            // Provide the `url` prop data in case a graphql query uses it
            const url = { query: ctx.query, pathname: ctx.pathname };
            try {
              // Run all GraphQL queries
              const app = (
                <EnhancedPage
                  url={url}
                  {...(props as TProps)}
                  client={ctx.client}
                />
              );
              await getDataFromTree(app, {
                ...rootContext(ctx),
                router: {
                  query: ctx.query,
                  pathname: ctx.pathname,
                  asPath: ctx.asPath,
                },
              });
            } catch (error) {
              // Prevent Apollo Client GraphQL errors from crashing SSR.
              // Handle them in components via the data.error prop:
              // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
            }
            // getDataFromTree does not call componentWillUnmount
            // head side effect therefore need to be cleared manually
            Head.rewind();
          }
          return props;
        }

        render() {
          return <EnhancedPage {...(this.props as TProps)} />;
        }
      };

      return withClient(configureClient)(
        // TODO: resolve as any later
        hoistStatics(WithApolloClient as any, EnhancedPage, NEXT_STATICS)
      );
    };
}

export default withApolloClientFactory();
