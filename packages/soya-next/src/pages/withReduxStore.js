import PropTypes from "prop-types";
import React from "react";
import hoistStatics from "hoist-non-react-statics";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import applyReducers from "../redux/applyReducers";
import withStore from "../redux/withStore";

export default configureStore => (reducers, ...connectArgs) => Page => {
  const EnhancedPage = compose(
    applyReducers(reducers),
    connect(...connectArgs)
  )(Page);

  class WithReduxStore extends React.Component {
    static propTypes = {
      store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired
      }).isRequired
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
