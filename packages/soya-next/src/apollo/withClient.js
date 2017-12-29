import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../utils/getDisplayName';

export default configureClient => Page => {
  const configureClientIfNeeded = (preloadedState, options) => {
    if (!process.browser) {
      return configureClient(preloadedState, options);
    }
    if (!window.apolloClient) {
      window.apolloClient = configureClient(preloadedState, options);
    }
    return window.apolloClient;
  };

  class WithClient extends React.Component {
    static displayName = getDisplayName('WithClient', Page);
    static propTypes = {
      apolloState: PropTypes.object.isRequired
    };

    static async getInitialProps(ctx) {
      let apolloState = {};
      const client = configureClientIfNeeded(apolloState, { cookies: ctx.cookies });
      const props = Page.getInitialProps && await Page.getInitialProps({ ...ctx, client });
      if (!process.browser) {
        // Extract query data from the Apollo's store
        apolloState = client.cache.extract();
      }
      return {
        ...props,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      this.client = configureClientIfNeeded(props.apolloState, { cookies: props.cookies });
    }

    render() {
      const { ...props } = this.props;
      delete props.apolloState;

      return <Page {...this.props} client={this.client} />;
    }
  }

  return WithClient;
};
