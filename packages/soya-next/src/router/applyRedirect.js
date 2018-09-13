import React from "react";
import Router from "next/router";
import hoistStatics from "hoist-non-react-statics";
import { stringify as stringifyQs } from "querystring";
import pathToRegexp from "path-to-regexp";
import getDisplayName from "../utils/getDisplayName";
import decodeParam from "../utils/decodeParam";
import ensureRedirect from "../utils/ensureRedirect";
import parseRedirectionPath from "../utils/parseRedirectionPath";
import { toPath, trimPath } from "../utils/locale";
import { NEXT_STATICS } from "../constants/Statics";

export default Page =>
  hoistStatics(
    class extends React.Component {
      static displayName = getDisplayName("ApplyRedirect", Page);

      static async getInitialProps(ctx) {
        const { defaultLocale, locale, method, redirects = {}, siteLocales } =
          ctx.req || window.__NEXT_DATA__.props;
        if (!ctx.req) {
          for (const from of Object.keys(redirects)) {
            const { method: redirectMethod, page, to } = ensureRedirect(
              redirects[from]
            );
            if (redirectMethod.toLowerCase() === method.toLowerCase()) {
              const keys = [];
              const regexp = pathToRegexp(from, keys);
              const match = regexp.exec(
                trimPath(ctx.asPath, defaultLocale, siteLocales)
              );
              if (match !== null) {
                const localeSegment = toPath(locale, defaultLocale);
                const params = keys.reduce((params, key, index) => {
                  const param = match[index + 1];
                  // istanbul ignore else
                  if (param) {
                    params[key.name] = decodeParam(param);
                  }
                  return params;
                }, {});
                const redirectionPath =
                  localeSegment + parseRedirectionPath(to, params);
                Router.push(
                  `${page}?${stringifyQs(ctx.query)}`,
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
          redirects
        };
      }

      render() {
        const props = { ...this.props };
        delete props.method;
        delete props.redirects;
        return <Page {...props} />;
      }
    },
    Page,
    NEXT_STATICS
  );
