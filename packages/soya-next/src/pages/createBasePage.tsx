import React from "react";
import { compose } from "redux";
import hoistStatics from "hoist-non-react-statics";
import BaseProvider from "../components/BaseProvider";
import applyRedirect from "../router/applyRedirect";
import withCookies from "../cookies/withCookiesPage";
import withLocale from "../i18n/withLocalePage";

import type { NonReactStatics } from "hoist-non-react-statics";
import type { SoyaNextPage } from "../types";
import type {
  WithCookiesPageInjectedProps,
  WithCookiesPageProps,
} from "../cookies/withCookiesPage";
import type {
  WithLocalePageInjectedProps,
  WithLocalePageProps,
} from "../i18n/withLocalePage";
import type { WithApplyRedirectProps } from "../router/applyRedirect";

export interface CreateBasePageInjectedProps
  extends WithLocalePageInjectedProps,
    WithCookiesPageInjectedProps {}

export interface CreateBasePageProps
  extends WithLocalePageProps,
    WithApplyRedirectProps,
    WithCookiesPageProps {}

export default function createBasePage<
  TProps extends CreateBasePageInjectedProps
>(Page: SoyaNextPage<TProps>) {
  const BasePage: React.VoidFunctionComponent<
    React.PropsWithChildren<TProps & CreateBasePageProps>
  > = props => (
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
  )(hoistStatics(BasePage, Page)) as typeof BasePage &
    NonReactStatics<SoyaNextPage<TProps>, {}>;
}
