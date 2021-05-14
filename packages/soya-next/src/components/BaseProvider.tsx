import React from "react";
import { Cookies, CookiesProvider } from "react-cookie";
import LocaleProvider from "./LocaleProvider";
import type { SoyaNextLocaleContext } from "../types";

export interface BaseProviderProps extends SoyaNextLocaleContext {
  children: React.ReactNode;
  cookies?: Cookies;
}

class BaseProvider extends React.Component<BaseProviderProps> {
  render() {
    const {
      cookies,
      defaultLocale,
      siteLocales,
      locale,
      children,
    } = this.props;
    return (
      <CookiesProvider cookies={cookies}>
        <LocaleProvider
          defaultLocale={defaultLocale}
          siteLocales={siteLocales}
          locale={locale}
        >
          {React.Children.only(children)}
        </LocaleProvider>
      </CookiesProvider>
    );
  }
}

export default BaseProvider;
