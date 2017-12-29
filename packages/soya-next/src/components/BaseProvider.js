import React from 'react';
import PropTypes from 'prop-types';
import { Cookies, CookiesProvider } from 'react-cookie';
import { localeShape } from '../constants/PropTypes';

class BaseProvider extends React.Component {
  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    defaultLocale: PropTypes.string,
    siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
    locale: localeShape,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    defaultLocale: PropTypes.string,
    siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
    locale: localeShape,
  };

  getChildContext() {
    return {
      defaultLocale: this.props.defaultLocale,
      siteLocales: this.props.siteLocales,
      locale: this.props.locale,
    };
  }

  render() {
    return (
      <CookiesProvider cookies={this.props.cookies}>
        {React.Children.only(this.props.children)}
      </CookiesProvider>
    );
  }
}

export default BaseProvider;
