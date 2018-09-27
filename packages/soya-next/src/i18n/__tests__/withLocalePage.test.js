import React from "react";
import { shallow } from "enzyme";
import withLocale from "../withLocalePage";

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
    Page = () => <div />;
    Page.getInitialProps = () => ({ init: true });
    PageWithLocale = withLocale(Page);
  });

  describe("server", () => {
    it("should add default locale, locale, and site locales to page props", async () => {
      const props = await PageWithLocale.getInitialProps({
        ...commonProps,
        req: context
      });
      const wrapper = shallow(<PageWithLocale {...props} />);
      expect(wrapper.find(Page).props()).toMatchSnapshot();
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
      const wrapper = shallow(<PageWithLocale {...props} />);
      expect(wrapper.find(Page).props()).toMatchSnapshot();
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
      const wrapper = shallow(<PageWithLocale {...props} />);
      expect(wrapper.find(Page).props()).toMatchSnapshot();
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
      const wrapper = shallow(<PageWithLocale {...props} />);
      expect(wrapper.find(Page).props()).toMatchSnapshot();
    });
  });
});
