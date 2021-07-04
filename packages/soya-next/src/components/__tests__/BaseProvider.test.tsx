import React from "react";
import { Cookies, withCookies } from "react-cookie";
import { render, screen } from "@testing-library/react";
import LocaleContext from "../../i18n/LocaleContext";
import BaseProvider from "../BaseProvider";

describe("<BaseProvider />", () => {
  function setupTest() {
    const ContextChecker = withCookies(({ cookies }) => (
      <LocaleContext.Consumer>
        {context => (
          <div data-testid={"context-props"}>
            {JSON.stringify({ ...context, cookies }, null, 2)}
          </div>
        )}
      </LocaleContext.Consumer>
    ));

    return { ContextChecker };
  }

  it("should add cookies, defaultLocale, locale, and siteLocales to child context", () => {
    const { ContextChecker } = setupTest();
    render(
      <BaseProvider
        cookies={new Cookies()}
        defaultLocale={"id-id"}
        locale={{ language: "en", country: "id" }}
        siteLocales={["id-id", "en-id"]}
      >
        <ContextChecker />
      </BaseProvider>
    );
    expect(screen.getByTestId("context-props").textContent).toMatchSnapshot();
  });
});
