import React from "react";
import PropTypes from "prop-types";
import TestUtils from "react-dom/test-utils";
import { Cookies } from "react-cookie";
import LocaleContext from "../../i18n/LocaleContext";
import BaseProvider from "../BaseProvider";
import { withCookies } from "react-cookie";
import { localeShape } from "../../constants/PropTypes";

describe("<BaseProvider />", () => {
  let rootContext;
  const ContextChecker = withCookies(({ cookies }) => (
    <LocaleContext.Consumer>
      {context => ((rootContext = ({ ...context, cookies })), null)}
    </LocaleContext.Consumer>
  ));

  afterEach(() => {
    rootContext = undefined;
  });

  it("should add cookies, defaultLocale, locale, and siteLocales to child context", () => {
    const tree = TestUtils.renderIntoDocument(
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
