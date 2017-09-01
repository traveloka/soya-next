import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import { Cookies } from 'react-cookie';
import { localeShape } from '../constants/PropTypes';
import SoyaProvider from '../components/SoyaProvider';
import applyRedirect from '../router/applyRedirect';
import applyReducers from '../redux/applyReducers';
import withCookies from '../cookies/withCookiesPage';
import withLocale from '../i18n/withLocalePage';
import withStore from '../redux/withStore';

export default configureStore => (...connectArgs) => (Page, reducers) => {
  const EnhancedPage = compose(
    applyReducers(reducers),
    connect(...connectArgs),
  )(Page);

  class SoyaPage extends React.Component {
    static propTypes = {
      cookies: PropTypes.instanceOf(Cookies).isRequired,
      store: storeShape.isRequired,
      defaultLocale: PropTypes.string,
      siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
      locale: localeShape,
    };

    render() {
      const { store, ...props } = this.props;
      return (
        <SoyaProvider
          cookies={this.props.cookies}
          locale={this.props.locale}
          defaultLocale={this.props.defaultLocale}
          siteLocales={this.props.siteLocales}
          store={store}
        >
          <EnhancedPage {...props} />
        </SoyaProvider>
      );
    }
  }

  return compose(
    withLocale,
    applyRedirect,
    withCookies,
    withStore(configureStore),
  )(hoistStatics(SoyaPage, EnhancedPage));
};
