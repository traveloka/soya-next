import React from "react";
import PropTypes from "prop-types";
import { Cookies, CookiesProvider } from "react-cookie";
import { localeShape } from "../constants/PropTypes";
import LocaleProvider from "../components/LocaleProvider";

class BaseProvider extends React.Component {
  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    defaultLocale: PropTypes.string,
    siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
    locale: localeShape,
    children: PropTypes.element.isRequired
  };

  render() {
    const {
      cookies,
      defaultLocale,
      siteLocales,
      locale,
      children
    } = this.props;
    return (
      <CookiesProvider cookies={cookies}>
        <LocaleProvider
          defaultLocale={defaultLocale}
          siteLocales={siteLocales}
          locale={locale}
        >
          {React.Children.only(children)}
        </LocaleProvider>
      </CookiesProvider>
    );
  }
}

export default BaseProvider;
