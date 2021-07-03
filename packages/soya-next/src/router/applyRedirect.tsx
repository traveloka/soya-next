import React from "react";
import Router from "next/router";
import hoistStatics from "hoist-non-react-statics";
import { stringify as stringifyQs } from "querystring";
import pathToRegexp from "path-to-regexp";
import getBaseUrl from "../utils/getBaseUrl";
import getDisplayName from "../utils/getDisplayName";
import decodeParam from "../utils/decodeParam";
import ensureRedirect from "../utils/ensureRedirect";
import parseRedirectionPath from "../utils/parseRedirectionPath";
import { toPath, trimPath } from "../utils/locale";
import { NEXT_STATICS } from "../constants/Statics";

import type { Key } from "path-to-regexp";
import type {
  SoyaNextPage,
  SoyaNextPageContext,
  SoyaNextRedirectConfig,
} from "../types";

export interface WithApplyRedirectProps {
  method?: string;
  redirects?: Record<string, SoyaNextRedirectConfig>;
}

export default function applyRedirect<TProps extends object>(
  Page: SoyaNextPage<TProps>
) {
  const WithApplyRedirect = class WithApplyRedirect extends React.Component<
    TProps & WithApplyRedirectProps
  > {
    static displayName = getDisplayName("applyRedirect", Page);

    static async getInitialProps(ctx: SoyaNextPageContext) {
      const {
        defaultLocale,
        locale,
        method,
        redirects = {},
        siteLocales,
      } = typeof window !== "undefined"
        ? window.__NEXT_DATA__.props
        : ctx.req || {};
      if (typeof window !== "undefined") {
        for (const from of Object.keys(redirects)) {
          const {
            method: redirectMethod,
            page,
            to,
          } = ensureRedirect(redirects[from]);
          if (redirectMethod.toLowerCase() === method.toLowerCase()) {
            const baseUrl = getBaseUrl(ctx.req);
            const keys: Key[] = [];
            const regexp = pathToRegexp(from, keys);
            const match = regexp.exec(
              trimPath(
                ctx.asPath || "",
                baseUrl.origin,
                defaultLocale,
                siteLocales
              )
            );
            if (match !== null) {
              const localeSegment = toPath(locale, defaultLocale);
              const params = keys.reduce<Record<string, any>>(
                (params, key, index) => {
                  const param = match[index + 1];
                  // istanbul ignore else
                  if (param) {
                    params[key.name] = decodeParam(param);
                  }
                  return params;
                },
                {}
              );
              const redirectionPath =
                localeSegment + parseRedirectionPath(to, params);
              Router.push(
                `${page || ""}?${stringifyQs(ctx.query)}`,
                redirectionPath
              );
              return {};
            }
          }
        }
      }
      const props = Page.getInitialProps && (await Page.getInitialProps(ctx));
      return {
        ...props,
        method,
        redirects,
      };
    }

    render() {
      // Don't pass `method` and `redirects` prop to the page.
      // Previously, it was using delete operator.
      const { method, redirects, ...props } = this.props;
      return <Page {...(props as TProps)} />;
    }
  };

  return hoistStatics(WithApplyRedirect, Page, NEXT_STATICS);
}
