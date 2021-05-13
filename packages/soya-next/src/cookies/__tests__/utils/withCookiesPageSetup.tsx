import React from "react";
import withCookies from "../../withCookiesPage";
import type { NextPage } from "next";

export default function setupWithCookiesPageTest() {
  const Page: NextPage = props => (
    <div data-testid={"with-cookies-props"}>
      {JSON.stringify(props, null, 2)}
    </div>
  );
  Page.getInitialProps = () => ({ init: true });

  const PageWithCookies = withCookies(Page);

  return { Page, PageWithCookies };
}
