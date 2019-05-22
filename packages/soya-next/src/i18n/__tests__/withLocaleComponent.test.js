import React from "react";
import { mount } from "enzyme";
import withLocale from "../withLocaleComponent";
import LocaleProvider from "../../components/LocaleProvider";

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
    Component = () => null;
    ComponentWithLocale = withLocale(Component);
  });

  it("should add default locale, locale, and site locales to component props", () => {
    const wrapper = mount(
      <LocaleProvider {...context}>
        <ComponentWithLocale />
      </LocaleProvider>
    );
    expect(wrapper.find(Component).props()).toMatchSnapshot();
  });

  it("should override locale context with locale props", () => {
    const locale = { language: "en", country: "id" };
    const wrapper = mount(
      <LocaleProvider {...context}>
        <ComponentWithLocale locale={locale} />
      </LocaleProvider>
    );
    expect(wrapper.find(Component).props()).toMatchSnapshot();
  });

  it("should accept locale string props", () => {
    const wrapper = mount(
      <LocaleProvider {...context}>
        <ComponentWithLocale locale="en-id" />
      </LocaleProvider>
    );
    expect(wrapper.find(Component).props()).toMatchSnapshot();
  });
});
