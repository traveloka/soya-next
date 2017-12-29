import React from 'react';
import PropTypes from 'prop-types';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import getDisplayName from '../utils/getDisplayName';

export default configureStore => Page => {
  const configureStoreIfNeeded = (preloadedState, extraArgument) => {
    if (typeof window === 'undefined') {
      return configureStore(preloadedState, extraArgument);
    }
    if (typeof window.store === 'undefined') {
      window.store = configureStore(preloadedState, extraArgument);
    }
    return window.store;
  };

  class WithStore extends React.Component {
    static displayName = getDisplayName('WithStore', Page);

    static propTypes = {
      reduxState: PropTypes.object.isRequired,
      store: PropTypes.oneOfType([
        PropTypes.object,
        storeShape,
      ]).isRequired,
    };

    static async getInitialProps(ctx) {
      const store = configureStoreIfNeeded(undefined, { cookies: ctx.cookies });
      const props = Page.getInitialProps && await Page.getInitialProps({ ...ctx, store });
      return {
        ...props,
        reduxState: store.getState(),
        store,
      };
    }

    constructor(props) {
      super(props);
      this.store = !process.browser ? props.store : configureStoreIfNeeded(props.reduxState, { cookies: props.cookies });
    }

    render() {
      const { ...props } = this.props;
      delete props.reduxState;
      delete props.store;

      return (
        <Page {...props} store={this.store} />
      );
    }
  }

  return WithStore;
};
