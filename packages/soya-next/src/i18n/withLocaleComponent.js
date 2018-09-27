import React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import { localeShape } from "../constants/PropTypes";
import LocaleContext from "./LocaleContext";

export default Component => {
  class WithLocale extends React.Component {
    static displayName = getDisplayName("withLocale", Component);

    static propTypes = {
      locale: PropTypes.oneOfType([localeShape, PropTypes.string])
    };

    render() {
      return (
        <LocaleContext.Consumer>
          {context => {
            let locale = this.props.locale || context.locale;
            if (typeof locale === "string") {
              const [language, country] = locale.split("-");
              locale = { country, language };
            }
            return <Component {...this.props} {...context} locale={locale} />;
          }}
        </LocaleContext.Consumer>
      );
    }
  }

  return hoistStatics(WithLocale, Component);
};
