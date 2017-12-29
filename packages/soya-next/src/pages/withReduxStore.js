import React from "react";
import hoistStatics from "hoist-non-react-statics";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import { storeShape } from "react-redux/lib/utils/PropTypes";
import applyReducers from "../redux/applyReducers";
import withStore from "../redux/withStore";

export default configureStore => (reducers, ...connectArgs) => Page => {
  const EnhancedPage = compose(
    applyReducers(reducers),
    connect(...connectArgs)
  )(Page);

  class WithReduxStore extends React.Component {
    static propTypes = {
      store: storeShape.isRequired
    };

    render() {
      const { store, ...props } = this.props;
      return (
        <Provider store={store}>
          <EnhancedPage {...props} />
        </Provider>
      );
    }
  }

  return withStore(configureStore)(hoistStatics(WithReduxStore, EnhancedPage));
};
