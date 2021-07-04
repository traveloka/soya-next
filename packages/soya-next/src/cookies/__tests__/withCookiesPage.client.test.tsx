import React from "react";
import { Cookies } from "react-cookie";
import { render } from "@testing-library/react";
import setupTest from "./utils/withCookiesPageSetup";

describe("withCookiesPage - Browser", () => {
  it("should add cookie to page props", async () => {
    const { PageWithCookies } = setupTest();
    const props = await PageWithCookies.getInitialProps({} as any);
    const { getByTestId } = render(
      <PageWithCookies {...props} cookies={new Cookies()} />
    );

    const withCookiesPropsDiv = getByTestId("with-cookies-props");
    expect(withCookiesPropsDiv.textContent).toMatchSnapshot();
  });
});
