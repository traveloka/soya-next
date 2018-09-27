import React from "react";
import PropTypes from "prop-types";
import { localeShape } from "../constants/PropTypes";

const LocaleContext = React.createContext({
  defaultLocale: "",
  siteLocales: [],
  locale: null
});

LocaleContext.Provider.displayName = "LocaleContext.Provider";
LocaleContext.Consumer.displayName = "LocaleContext.Consumer";

LocaleContext.Provider.propTypes = {
  value: PropTypes.shape({
    defaultLocale: PropTypes.string,
    siteLocales: PropTypes.arrayOf(PropTypes.string),
    locale: localeShape
  })
};

export default LocaleContext;
