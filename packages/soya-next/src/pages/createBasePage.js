import React from "react";
import { compose } from "react-apollo";
import hoistStatics from "hoist-non-react-statics";
import BaseProvider from "../components/BaseProvider";
import applyRedirect from "../router/applyRedirect";
import withCookies from "../cookies/withCookiesPage";
import withLocale from "../i18n/withLocalePage";

export default Page =>
  compose(withLocale, applyRedirect, withCookies)(
    hoistStatics(
      props => (
        <BaseProvider
          cookies={props.cookies}
          locale={props.locale}
          defaultLocale={props.defaultLocale}
          siteLocales={props.siteLocales}
        >
          <Page {...props} />
        </BaseProvider>
      ),
      Page
    )
  );
