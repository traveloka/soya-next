import React from "react";
import PropTypes from "prop-types";
import { localeShape } from "../constants/PropTypes";
import Locale from "./LocaleContext";

class LocaleProvider extends React.Component {
  static propTypes = {
    defaultLocale: PropTypes.string,
    siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
    locale: localeShape,
    children: PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);
    this.locale = {
      defaultLocale: props.defaultLocale,
      siteLocales: props.siteLocales,
      locale: props.locale,
    };
  }

  render() {
    return (
      <Locale.Provider value={this.locale}>
        {React.Children.only(this.props.children)}
      </Locale.Provider>
    );
  }
}

export default LocaleProvider;
