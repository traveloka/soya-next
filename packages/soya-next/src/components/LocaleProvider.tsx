import React from "react";
import LocaleContext from "../i18n/LocaleContext";
import type { SoyaNextLocaleContext } from "../types";

export interface LocaleProviderProps extends SoyaNextLocaleContext {
  children: React.ReactNode;
}
export interface LocaleProviderState extends SoyaNextLocaleContext {}

class LocaleProvider extends React.Component<
  LocaleProviderProps,
  LocaleProviderState
> {
  constructor(props: LocaleProviderProps) {
    super(props);
    this.state = {
      defaultLocale: props.defaultLocale,
      siteLocales: props.siteLocales,
      locale: props.locale,
    };
  }

  static getDerivedStateFromProps(
    props: LocaleProviderProps,
    state: LocaleProviderState
  ) {
    if (props.locale !== state.locale) {
      return { locale: props.locale };
    }
    return null;
  }

  render() {
    return (
      <LocaleContext.Provider value={this.state}>
        {React.Children.only(this.props.children)}
      </LocaleContext.Provider>
    );
  }
}

export default LocaleProvider;
