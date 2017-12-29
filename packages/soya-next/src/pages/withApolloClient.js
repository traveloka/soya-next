import React from "react";
import Head from "next/head";
import hoistStatics from "hoist-non-react-statics";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import withClient from "../apollo/withClient";

export const withApolloClientFactory = (
  enhancer = Page => Page,
  rootContext = ctx => ({})
) => configureClient => Page => {
  const EnhancedPage = enhancer(
    hoistStatics(
      ({ client, ...props }) => (
        <ApolloProvider client={client}>
          <Page {...props} />
        </ApolloProvider>
      ),
      Page
    )
  );

  class WithApolloClient extends React.Component {
    static async getInitialProps(ctx) {
      const props =
        EnhancedPage.getInitialProps &&
        (await EnhancedPage.getInitialProps(ctx));
      if (!process.browser) {
        if (ctx.res && ctx.res.finished) {
          // When redirecting, the response is finished.
          // No point in continuing to render
          return;
        }

        // Provide the `url` prop data in case a graphql query uses it
        const url = { query: ctx.query, pathname: ctx.pathname };
        try {
          // Run all GraphQL queries
          const app = <EnhancedPage client={ctx.client} url={url} {...props} />;
          await getDataFromTree(app, {
            ...rootContext(ctx),
            router: {
              query: ctx.query,
              pathname: ctx.pathname,
              asPath: ctx.asPath
            }
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
      return <EnhancedPage {...this.props} />;
    }
  }

  return withClient(configureClient)(WithApolloClient);
};

export default withApolloClientFactory();
