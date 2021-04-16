import React from "react";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import { NEXT_STATICS } from "../constants/Statics";
import { ReactReduxContext, Provider } from "react-redux";

export default reducers => Component => {
  if (typeof reducers === "undefined") {
    return Component;
  }

  function ApplyReducers(props) {
    const flag = React.useRef(true);
    const context = React.useContext(ReactReduxContext);
    const store = props.store || context.store;

    if (flag.current) {
      if (!store.soya) {
        throw new Error(
          "applyReducers must be used with Soya's redux enhancer"
        );
      }
      store.addReducer(reducers);
      flag.current = false;
    }

    return (
      <Component {...props} />
    );
  }
  ApplyReducers.displayName = getDisplayName("applyReducers", Component);
  ApplyReducers.getInitialProps = async (ctx) => {
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

  return hoistStatics(ApplyReducers, Component, NEXT_STATICS);
};
