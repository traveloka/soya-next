import React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import { NEXT_STATICS } from "../constants/Statics";

export default configureStore => Page => {
  const configureStoreIfNeeded = (preloadedState, extraArgument) => {
    if (typeof window === "undefined") {
      return configureStore(preloadedState, extraArgument);
    }
    if (typeof window.store === "undefined") {
      window.store = configureStore(preloadedState, extraArgument);
    }
    return window.store;
  };

  class WithStore extends React.Component {
    static displayName = getDisplayName("withStore", Page);

    static propTypes = {
      reduxState: PropTypes.object.isRequired,
      store: PropTypes.oneOfType([
          PropTypes.object,
          PropTypes.shape({
            subscribe: PropTypes.func.isRequired,
            dispatch: PropTypes.func.isRequired,
            getState: PropTypes.func.isRequired
          })
        ]).isRequired
    };

    static async getInitialProps(ctx) {
      const store = configureStoreIfNeeded(undefined, { cookies: ctx.cookies });
      const props =
        Page.getInitialProps && (await Page.getInitialProps({ ...ctx, store }));
      return {
        ...props,
        reduxState: store.getState(),
        store
      };
    }

    constructor(props) {
      super(props);
      this.store = process.browser
        ? configureStoreIfNeeded(props.reduxState, { cookies: props.cookies })
        : props.store;
    }

    render() {
      const { ...props } = this.props;
      delete props.reduxState;
      delete props.store;

      return <Page {...props} store={this.store} />;
    }
  }

  return hoistStatics(WithStore, Page, NEXT_STATICS);
};
