import React from "react";
import withLocale from "../withLocaleComponent";
import LocaleProvider from "../../components/LocaleProvider";
import { render } from "@testing-library/react";

describe("withLocale", () => {
  let context, Component, ComponentWithLocale;

  beforeEach(() => {
    context = {
      locale: {
        language: "id",
        country: "id"
      },
      defaultLocale: "id-id",
      siteLocales: ["id-id", "en-id"]
    };
    Component = props => {
      expect(props).toMatchSnapshot();
      return <div data-testid={"component-locale"} />;
    };
    ComponentWithLocale = withLocale(Component);
  });

  it("should add default locale, locale, and site locales to component props", async () => {
    const { findByTestId } = render(
      <LocaleProvider {...context}>
        <ComponentWithLocale />
      </LocaleProvider>
    );
    expect(await findByTestId("component-locale")).toBeTruthy();
  });

  it("should override locale context with locale props", async () => {
    const locale = { language: "en", country: "id" };
    const { findByTestId } = render(
      <LocaleProvider {...context}>
        <ComponentWithLocale locale={locale} />
      </LocaleProvider>
    );
    expect(await findByTestId("component-locale")).toBeTruthy();
  });

  it("should accept locale string props", async () => {
    const { findByTestId } = render(
      <LocaleProvider {...context}>
        <ComponentWithLocale locale="en-id" />
      </LocaleProvider>
    );
    expect(await findByTestId("component-locale")).toBeTruthy();
  });
});
