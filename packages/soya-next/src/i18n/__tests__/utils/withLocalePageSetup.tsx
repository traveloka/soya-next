import React from "react";
import withLocale, { WithLocalePageInjectedProps } from "../../withLocalePage";
import type { NextPage } from "next";

interface PageProps extends WithLocalePageInjectedProps {
  init?: boolean;
}

export default function setupLocalePageTest() {
  const commonProps = {
    asPath: "/",
    query: {},
    pathname: "/",
    AppTree: () => null,
  };
  const context = {
    locale: {
      language: "id",
      country: "id",
    },
    defaultLocale: "id-id",
    siteLocales: ["id-id", "en-id"],
  };

  const Page: NextPage<PageProps> = props => (
    <div data-testid={"component-locale-props"}>
      {JSON.stringify(props, null, 2)}
    </div>
  );
  Page.getInitialProps = () => ({ init: true });

  const PageWithLocale = withLocale(Page);

  return { commonProps, context, Page, PageWithLocale };
}
