import { compose } from 'redux';
import { connect } from 'react-redux';
import applyReducers from '../redux/applyReducers';

export default (...connectArgs) => (Page, reducers) => compose(
  applyReducers(reducers),
  connect(...connectArgs),
)(Page);
