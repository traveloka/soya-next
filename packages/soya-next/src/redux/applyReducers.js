import React from "react";
import hoistStatics from "hoist-non-react-statics";
import { storeShape } from "react-redux/lib/utils/PropTypes";
import getDisplayName from "../utils/getDisplayName";
import { NEXT_STATICS } from "../constants/Statics";

export default reducers => Component => {
  if (typeof reducers === "undefined") {
    return Component;
  }

  class ApplyReducers extends React.Component {
    static displayName = getDisplayName("applyReducers", Component);

    static async getInitialProps(ctx) {
      if (!ctx.store.soya) {
        throw new Error(
          "applyReducers must be used with Soya's redux enhancer"
        );
      }
      ctx.store.addReducer(reducers);
      return (
        Component.getInitialProps && (await Component.getInitialProps(ctx))
      );
    }

    static contextTypes = {
      store: storeShape.isRequired
    };

    constructor(props, context) {
      super(props, context);
      this.store = props.store || context.store;
      if (!this.store.soya) {
        throw new Error(
          "applyReducers must be used with Soya's redux enhancer"
        );
      }
      this.store.addReducer(reducers);
    }

    render() {
      return <Component {...this.props} />;
    }
  }
  return hoistStatics(ApplyReducers, Component, NEXT_STATICS);
};
