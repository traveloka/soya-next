import React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import { localeShape } from "../constants/PropTypes";
import { ensurePath } from "../utils/locale";
import { NEXT_STATICS } from "../constants/Statics";

export default Page => {
  class WithLocale extends React.Component {
    static displayName = getDisplayName("withLocale", Page);

    static propTypes = {
      defaultLocale: PropTypes.string,
      siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired),
      locale: localeShape
    };

    static async getInitialProps({ asPath, ...ctx }) {
      const context = process.browser ? window.__NEXT_DATA__.props : ctx.req;
      const { defaultLocale, siteLocales } = context;
      if (process.browser) {
        if (ctx.query.locale) {
          const [language, country] = ctx.query.locale.split("-");
          if (siteLocales.indexOf(`${language}-${country}`) !== -1) {
            context.locale = { language, country };
          }
        }
      }
      const props =
        Page.getInitialProps &&
        (await Page.getInitialProps({
          ...ctx,
          asPath: ensurePath(asPath, context.locale, defaultLocale),
          defaultLocale,
          siteLocales,
          locale: context.locale
        }));
      return {
        ...props,
        defaultLocale,
        siteLocales,
        locale: context.locale
      };
    }

    render() {
      return <Page {...this.props} />;
    }
  }
  return hoistStatics(WithLocale, Page, NEXT_STATICS);
};
