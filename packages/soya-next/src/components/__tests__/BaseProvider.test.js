import React from "react";
import TestUtils from "react-dom/test-utils";
import { Cookies, withCookies } from "react-cookie";
import LocaleContext from "../../i18n/LocaleContext";
import BaseProvider from "../BaseProvider";

describe("<BaseProvider />", () => {
  let rootContext;
  const ContextChecker = withCookies(({ cookies }) => (
    <LocaleContext.Consumer>
      {context => ((rootContext = { ...context, cookies }), null)}
    </LocaleContext.Consumer>
  ));

  afterEach(() => {
    rootContext = undefined;
  });

  it("should add cookies, defaultLocale, locale, and siteLocales to child context", () => {
    TestUtils.renderIntoDocument(
      <BaseProvider
        cookies={new Cookies()}
        defaultLocale="id-id"
        locale={{ language: "en", country: "id" }}
        siteLocales={["id-id", "en-id"]}
      >
        <ContextChecker />
      </BaseProvider>
    );
    expect(rootContext).toMatchSnapshot();
  });
});
