import React from "react";
import { compose } from "redux";
import hoistStatics from "hoist-non-react-statics";
import BaseProvider from "../components/BaseProvider";
import applyRedirect from "../router/applyRedirect";
import withCookies from "../cookies/withCookiesPage";
import withLocale from "../i18n/withLocalePage";

export default Page => {
  const BasePage = props => (
    <BaseProvider
      cookies={props.cookies}
      locale={props.locale}
      defaultLocale={props.defaultLocale}
      siteLocales={props.siteLocales}
    >
      <Page {...props} />
    </BaseProvider>
  );

  return compose(
    withLocale,
    applyRedirect,
    withCookies
  )(hoistStatics(BasePage, Page));
};
