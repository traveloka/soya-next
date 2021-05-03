import React from "react";
import withLocale from "../withLocalePage";
import { render } from "@testing-library/react";

describe("withLocalePage", () => {
  let context, commonProps, Page, PageWithLocale;

  beforeEach(() => {
    commonProps = {
      asPath: "/",
      query: {}
    };
    context = {
      locale: {
        language: "id",
        country: "id"
      },
      defaultLocale: "id-id",
      siteLocales: ["id-id", "en-id"]
    };
    Page = props => {
      expect(props).toMatchSnapshot();
      return <div data-testid={"component-locale"} />;
    };
    Page.getInitialProps = () => ({ init: true });
    PageWithLocale = withLocale(Page);
  });

  describe("server", () => {
    it("should add default locale, locale, and site locales to page props", async () => {
      const props = await PageWithLocale.getInitialProps({
        ...commonProps,
        req: context
      });
      const { findByTestId } = render(<PageWithLocale {...props} />);
      const componentLocale = await findByTestId("component-locale");
      expect(componentLocale).toBeTruthy();
    });
  });

  describe("browser", () => {
    beforeEach(() => {
      process.browser = true;
    });

    afterEach(() => {
      delete process.browser;
    });

    it("should add default locale, locale, and site locales to page props", async () => {
      window.__NEXT_DATA__ = {
        props: context
      };
      const props = await PageWithLocale.getInitialProps(commonProps);
      const { findByTestId } = render(<PageWithLocale {...props} />);
      const componentLocale = await findByTestId("component-locale");
      expect(componentLocale).toBeTruthy();
    });

    it("should update locale if supported", async () => {
      window.__NEXT_DATA__ = {
        props: context
      };
      const props = await PageWithLocale.getInitialProps({
        ...commonProps,
        query: {
          locale: "en-id"
        }
      });
      const { findByTestId } = render(<PageWithLocale {...props} />);
      const componentLocale = await findByTestId("component-locale");
      expect(componentLocale).toBeTruthy();
    });

    it("should not update locale if unsupported", async () => {
      window.__NEXT_DATA__ = {
        props: context
      };
      const props = await PageWithLocale.getInitialProps({
        ...commonProps,
        query: {
          locale: "en-sg"
        }
      });
      const { findByTestId } = render(<PageWithLocale {...props} />);
      const componentLocale = await findByTestId("component-locale");
      expect(componentLocale).toBeTruthy();
    });
  });
});
