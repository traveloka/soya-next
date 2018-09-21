import React from "react";
import PropTypes from "prop-types";
import { localeShape } from "../constants/PropTypes";

const LocaleContext = React.createContext({
  defaultLocale: null,
  siteLocales: null,
  locale: null
});

LocaleContext.Provider.propTypes = {
  value: PropTypes.shape({
    defaultLocale: PropTypes.string,
    siteLocales: PropTypes.arrayOf(PropTypes.string),
    defaultLocale: localeShape
  })
};

export default LocaleContext;
