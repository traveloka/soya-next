import React from "react";
import Router from "next/router";
import { shallow } from "enzyme";
import applyRedirect from "../applyRedirect";

jest.mock("next/router");

describe("applyRedirect", () => {
  let Page, RedirectAppliedPage;

  beforeEach(() => {
    Router.push.mockClear();
    Page = () => <div />;
    Page.getInitialProps = () => ({ init: true });
    RedirectAppliedPage = applyRedirect(Page);
    window.__NEXT_DATA__ = {
      props: {
        defaultLocale: "id-id",
        locale: {
          language: "id",
          country: "id"
        },
        method: "GET",
        redirects: {
          "/old/path": {
            page: "/new-page",
            to: "/new/path"
          },
          "/old/path/:param1": {
            page: "/new-page2",
            to: "/new/path/:param1"
          },
          "/old/post/path": {
            method: "POST",
            page: "/new-post-page",
            to: "/new/post/path"
          }
        },
        siteLocales: ["id-id", "en-id"]
      }
    };
  });

  describe("browser", () => {
    beforeEach(() => {
      process.browser = true;
    });

    afterEach(() => {
      delete process.browser;
    });

    it("should redirect", async () => {
      await RedirectAppliedPage.getInitialProps({ asPath: "/old/path" });
      expect(Router.push).toBeCalled();
      expect(Router.push.mock.calls[0][0]).toBe("/new-page?");
      expect(Router.push.mock.calls[0][1]).toBe("/new/path");
    });

    it("should redirect with query", async () => {
      const locale = {
        language: "en",
        country: "id"
      };
      window.__NEXT_DATA__.props.locale = locale;
      const query = {
        locale: `${locale.language}-${locale.country}`
      };
      await RedirectAppliedPage.getInitialProps({ asPath: "/old/path", query });
      expect(Router.push).toBeCalled();
      expect(Router.push.mock.calls[0][0]).toBe("/new-page?locale=en-id");
      expect(Router.push.mock.calls[0][1]).toBe("/en/new/path");
    });

    it("should redirect with params", async () => {
      await RedirectAppliedPage.getInitialProps({ asPath: "/old/path/1" });
      expect(Router.push).toBeCalled();
      expect(Router.push.mock.calls[0][0]).toBe("/new-page2?");
      expect(Router.push.mock.calls[0][1]).toBe("/new/path/1");
    });

    it("should not redirect", async () => {
      await RedirectAppliedPage.getInitialProps({ asPath: "/path" });
      expect(Router.push).not.toBeCalled();
      await RedirectAppliedPage.getInitialProps({ asPath: "/old/post/path" });
      expect(Router.push).not.toBeCalled();
    });

    it("should render with initial props", async () => {
      const props = await RedirectAppliedPage.getInitialProps({
        asPath: "/path"
      });
      const wrapper = shallow(<RedirectAppliedPage {...props} />);
      expect(wrapper.find(Page).props()).toMatchSnapshot();
    });
  });

  describe("server", () => {
    it("should not redirect", async () => {
      await RedirectAppliedPage.getInitialProps({
        req: {},
        asPath: "/old/path"
      });
      expect(Router.push).not.toBeCalled();
    });
  });
});
