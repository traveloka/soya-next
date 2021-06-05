import React from "react";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import getBaseUrl from "../utils/getBaseUrl";
import { ensurePath } from "../utils/locale";
import { NEXT_STATICS } from "../constants/Statics";
import type {
  SoyaNextLocaleContext,
  SoyaNextPage,
  SoyaNextPageContext,
} from "../types";

export interface WithLocalePageInjectedProps extends SoyaNextLocaleContext {}
export interface WithLocalePageProps extends SoyaNextLocaleContext {}

export default function withLocalePage<
  TProps extends WithLocalePageInjectedProps
>(Page: SoyaNextPage<TProps>) {
  // TODO: remove class expression when the issue has been resolved
  // from typescript side.
  // - https://github.com/microsoft/TypeScript/issues/35822
  // - https://github.com/microsoft/TypeScript/issues/28040
  // error TS4060: Return type of exported function has or is using private name 'WithLocale'
  const WithLocale = class WithLocale extends React.Component<
    Omit<TProps, keyof WithLocalePageInjectedProps> & WithLocalePageProps
  > {
    static displayName = getDisplayName("withLocale", Page);

    static async getInitialProps({ asPath, ...ctx }: SoyaNextPageContext) {
      const baseUrl = getBaseUrl(ctx.req);
      const context =
        typeof window !== "undefined"
          ? window.__NEXT_DATA__.props
          : ctx.req || {};
      const { defaultLocale, siteLocales } = context;
      if (typeof window !== "undefined") {
        if (ctx.query.locale) {
          const [language, country] = (ctx.query.locale as string).split("-");
          if (siteLocales.indexOf(`${language}-${country}`) !== -1) {
            context.locale = { language, country };
          }
        }
      }
      const props =
        Page.getInitialProps &&
        (await Page.getInitialProps({
          ...ctx,
          asPath: ensurePath(
            asPath || "",
            baseUrl.origin,
            context.locale,
            defaultLocale
          ),
          defaultLocale,
          siteLocales,
          locale: context.locale,
        }));
      return {
        ...props,
        defaultLocale,
        siteLocales,
        locale: context.locale,
      };
    }

    render() {
      return <Page {...(this.props as TProps)} />;
    }
  };
  return hoistStatics(WithLocale, Page, NEXT_STATICS);
}
