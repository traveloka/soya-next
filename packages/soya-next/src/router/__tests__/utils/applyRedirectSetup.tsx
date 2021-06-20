import React from "react";
import type { SoyaNextPage } from "../../../types";

import applyRedirect from "../../applyRedirect";

export default function setupApplyRedirectTest() {
  const Page: SoyaNextPage = props => (
    <div data-testid={"applied-redirect-page"}>
      {JSON.stringify(props, null, 2)}
    </div>
  );
  Page.getInitialProps = () => ({ init: true });

  return {
    Page,
    RedirectAppliedPage: applyRedirect(Page),
    NEXT_DATA: {
      props: {
        defaultLocale: "id-id",
        locale: {
          language: "id",
          country: "id",
        },
        method: "GET",
        redirects: {
          "/old/path": {
            page: "/new-page",
            to: "/new/path",
          },
          "/old/path/:param1": {
            page: "/new-page2",
            to: "/new/path/:param1",
          },
          "/old/post/path": {
            method: "POST",
            page: "/new-post-page",
            to: "/new/post/path",
          },
        },
        siteLocales: ["id-id", "en-id"],
      },
    },
  };
}
