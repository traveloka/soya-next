import React from "react";
import { compose } from "redux";
import Link, { LinkProps } from "next/link";
import { withRouter } from "next/router";
import withLocale, {
  WithLocaleComponentInjectedProps,
} from "../i18n/withLocaleComponent";
import { toPath } from "../utils/locale";
import { convertLegacyUrlObjectToWhatwgUrl, resolveUrl } from "../utils/url";
import type { WithRouterProps } from "next/dist/client/with-router";

export interface LocaleLinkInjectedProps
  extends LinkProps,
    WithLocaleComponentInjectedProps,
    WithRouterProps {
  children: React.ReactNode;
}
export interface LocaleLinkProps extends LinkProps {
  locale?: WithLocaleComponentInjectedProps["locale"];
}

/**
 * Soya Next - Locale Link
 * ---
 *
 * A locale aware `<Link />` component for routing.
 *
 * **Note**: Please ensure that `<LocaleLink />` is rendered
 * within `createPage` hierarchy.
 */
export class LocaleLink extends React.Component<LocaleLinkInjectedProps> {
  getAs(asPath: NonNullable<LinkProps["as"]>) {
    if (typeof asPath === "string") {
      return asPath;
    }

    return convertLegacyUrlObjectToWhatwgUrl(asPath).pathname;
  }

  getHref(href: NonNullable<LinkProps["href"]>) {
    if (typeof href === "string") {
      return href;
    }

    return convertLegacyUrlObjectToWhatwgUrl(href).pathname;
  }

  render() {
    const { children, defaultLocale, locale, router, siteLocales, ...props } =
      this.props;
    let { as, href } = props;

    const { language, country } = locale || {};
    const localeSegment = toPath(locale, defaultLocale);

    href = href ? this.getHref(href) : "";
    as = as ? this.getAs(as) : "";
    const sep = href.indexOf("?") === -1 ? "?" : "&";

    return (
      <Link
        {...props}
        as={localeSegment + resolveUrl(router.pathname, as || href)}
        href={`${resolveUrl(
          router.pathname,
          href
        )}${sep}locale=${language}-${country}`}
      >
        {children}
      </Link>
    );
  }
}

/**
 * Soya Next - Locale Link
 * ---
 * A locale aware `<Link />` component for routing.
 *
 * **Note**: Please ensure that `<LocaleLink />` is rendered
 * within `createPage` hierarchy.
 */
export default compose<React.ComponentType<LocaleLinkProps>>(
  withLocale,
  withRouter
)(LocaleLink);
