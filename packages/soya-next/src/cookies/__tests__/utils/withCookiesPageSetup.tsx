import React from "react";
import withCookies from "../../withCookiesPage";
import type { SoyaNextPage } from "../../../types";

export default function setupWithCookiesPageTest() {
  const Page: SoyaNextPage = props => (
    <div data-testid={"with-cookies-props"}>
      {JSON.stringify(props, null, 2)}
    </div>
  );
  Page.getInitialProps = () => ({ init: true });

  const PageWithCookies = withCookies(Page);

  return { Page, PageWithCookies };
}
