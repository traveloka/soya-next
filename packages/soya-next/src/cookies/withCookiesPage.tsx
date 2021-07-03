/* global __NEXT_DATA__ */
import React from "react";
import hoistStatics from "hoist-non-react-statics";
import { Cookies } from "react-cookie";
import getDisplayName from "../utils/getDisplayName";
import { NEXT_STATICS } from "../constants/Statics";

import type { SoyaNextPage, SoyaNextPageContext } from "../types";

export interface WithCookiesPageInjectedProps {
  cookies?: Cookies;
}
export interface WithCookiesPageProps {
  cookies?: Cookies;
}

export default function withCookiesPage<
  TProps extends WithCookiesPageInjectedProps
>(Page: SoyaNextPage<TProps>) {
  // TODO: remove class expression when the issue has been resolved
  // from typescript side.
  // - https://github.com/microsoft/TypeScript/issues/35822
  // - https://github.com/microsoft/TypeScript/issues/28040
  // error TS4060: Return type of exported function has or is using private name 'WithCookies'
  const WithCookies = class WithCookies extends React.Component<
    Omit<TProps, keyof WithCookiesPageInjectedProps> & WithCookiesPageProps
  > {
    public cookies?: Cookies;

    static displayName = getDisplayName("withCookies", Page);

    static async getInitialProps(ctx: SoyaNextPageContext) {
      const cookies =
        typeof window !== "undefined" ||
        (typeof __NEXT_DATA__ !== "undefined" && __NEXT_DATA__.nextExport)
          ? new Cookies()
          : ctx.req?.universalCookies;
      const props =
        Page.getInitialProps &&
        (await Page.getInitialProps({ ...ctx, cookies }));
      return {
        ...props,
        cookies,
      };
    }

    constructor(
      props: Omit<TProps, keyof WithCookiesPageInjectedProps> &
        WithCookiesPageProps
    ) {
      super(props);
      this.cookies =
        typeof window !== "undefined" ? new Cookies() : props.cookies;
    }

    render() {
      const { cookies, ...props } = this.props;

      return <Page {...(props as TProps)} cookies={this.cookies} />;
    }
  };

  return hoistStatics(WithCookies, Page, NEXT_STATICS);
}
