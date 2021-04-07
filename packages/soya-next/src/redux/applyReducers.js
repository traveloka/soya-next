import React from "react";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import { NEXT_STATICS } from "../constants/Statics";
import { ReactReduxContext } from "react-redux";

export default reducers => Component => {
  if (typeof reducers === "undefined") {
    return Component;
  }

  function ApplyReducers(props) {
    const [loaded, setLoaded] = React.useState(false);
    const context = React.useContext(ReactReduxContext);
    const store = props.store || context.store;

    React.useEffect(() => {
      if (!store.soya) {
        throw new Error(
          "applyReducers must be used with Soya's redux enhancer"
        );
      }
      store.addReducer(reducers);
      setLoaded(true);
    }, [])

    if (!loaded) {
      return <></>;
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
