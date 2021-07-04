import React from "react";
import { render } from "@testing-library/react";
import setupTest from "./utils/withLocalePageSetup";

describe("withLocalePage - Browser", () => {
  it("should add default locale, locale, and site locales to page props", async () => {
    const { commonProps, context, PageWithLocale } = setupTest();
    window.__NEXT_DATA__ = {
      props: context,
    } as any;
    const props = await PageWithLocale.getInitialProps(commonProps);
    const { getByTestId } = render(<PageWithLocale {...props} />);
    const componentLocalePropsDiv = getByTestId("component-locale-props");
    expect(componentLocalePropsDiv.textContent).toMatchSnapshot();
  });

  it("should update locale if supported", async () => {
    const { commonProps, context, PageWithLocale } = setupTest();
    window.__NEXT_DATA__ = {
      props: context,
    } as any;
    const props = await PageWithLocale.getInitialProps({
      ...commonProps,
      query: {
        locale: "en-id",
      },
    });
    const { getByTestId } = render(<PageWithLocale {...props} />);
    const componentLocalePropsDiv = getByTestId("component-locale-props");
    expect(componentLocalePropsDiv.textContent).toMatchSnapshot();
  });

  it("should not update locale if unsupported", async () => {
    const { commonProps, context, PageWithLocale } = setupTest();
    window.__NEXT_DATA__ = {
      props: context,
    } as any;
    const props = await PageWithLocale.getInitialProps({
      ...commonProps,
      query: {
        locale: "en-sg",
      },
    });
    const { getByTestId } = render(<PageWithLocale {...props} />);
    const componentLocalePropsDiv = getByTestId("component-locale-props");
    expect(componentLocalePropsDiv.textContent).toMatchSnapshot();
  });
});
