import PropTypes from "prop-types";
import React from "react";
import { localeShape } from "../constants/PropTypes";
import LocaleContext from "../i18n/LocaleContext";

class LocaleProvider extends React.Component {
  static propTypes = {
    defaultLocale: PropTypes.string,
    siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
    locale: localeShape,
    children: PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      defaultLocale: props.defaultLocale,
      siteLocales: props.siteLocales,
      locale: props.locale
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.locale !== state.locale) {
      return { locale: props.locale };
    }
    return null;
  }

  render() {
    return (
      <LocaleContext.Provider value={this.state}>
        {React.Children.only(this.props.children)}
      </LocaleContext.Provider>
    );
  }
}

export default LocaleProvider;
