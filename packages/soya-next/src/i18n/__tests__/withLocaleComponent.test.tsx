import React from "react";
import { render } from "@testing-library/react";
import withLocale, {
  WithLocaleComponentInjectedProps,
} from "../withLocaleComponent";
import LocaleProvider from "../../components/LocaleProvider";

describe("withLocale", () => {
  function setupTest() {
    const context = {
      locale: {
        language: "id",
        country: "id",
      },
      defaultLocale: "id-id",
      siteLocales: ["id-id", "en-id"],
    };
    const Component = (props: WithLocaleComponentInjectedProps) => (
      <div data-testid={"component-locale-props"}>
        {JSON.stringify(props, null, 2)}
      </div>
    );
    const ComponentWithLocale = withLocale(Component);

    return { context, Component, ComponentWithLocale };
  }

  it("should add default locale, locale, and site locales to component props", () => {
    const { context, ComponentWithLocale } = setupTest();
    const { getByTestId } = render(
      <LocaleProvider {...context}>
        <ComponentWithLocale />
      </LocaleProvider>
    );
    const componentLocalePropsDiv = getByTestId("component-locale-props");
    expect(componentLocalePropsDiv.textContent).toMatchSnapshot();
  });

  it("should override locale context with locale props", () => {
    const { context, ComponentWithLocale } = setupTest();
    const locale = { language: "en", country: "id" };
    const { getByTestId } = render(
      <LocaleProvider {...context}>
        <ComponentWithLocale locale={locale} />
      </LocaleProvider>
    );
    const componentLocalePropsDiv = getByTestId("component-locale-props");
    expect(componentLocalePropsDiv.textContent).toMatchSnapshot();
  });

  it("should accept locale string props", () => {
    const { context, ComponentWithLocale } = setupTest();
    const { getByTestId } = render(
      <LocaleProvider {...context}>
        <ComponentWithLocale locale="en-id" />
      </LocaleProvider>
    );
    const componentLocalePropsDiv = getByTestId("component-locale-props");
    expect(componentLocalePropsDiv.textContent).toMatchSnapshot();
  });
});
