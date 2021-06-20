import Router from "next/router";
import { render } from "@testing-library/react";
import setupTest from "./utils/applyRedirectSetup";

jest.mock("next/router");

describe("applyRedirect - browser", () => {
  beforeEach(() => {
    // @ts-ignore
    Router.push.mockClear();
  });

  it("should redirect", async () => {
    const { NEXT_DATA, RedirectAppliedPage } = setupTest();
    window.__NEXT_DATA__ = NEXT_DATA as any;

    await RedirectAppliedPage.getInitialProps({ asPath: "/old/path" } as any);
    expect(Router.push).toBeCalled();
    // @ts-ignore
    expect(Router.push.mock.calls[0][0]).toBe("/new-page?");
    // @ts-ignore
    expect(Router.push.mock.calls[0][1]).toBe("/new/path");
  });

  it("should redirect with query", async () => {
    const { NEXT_DATA, RedirectAppliedPage } = setupTest();
    const locale = {
      language: "en",
      country: "id",
    };
    window.__NEXT_DATA__ = {
      ...NEXT_DATA,
      props: {
        ...NEXT_DATA.props,
        locale,
      },
    } as any;
    const query = {
      locale: `${locale.language}-${locale.country}`,
    };

    await RedirectAppliedPage.getInitialProps({
      asPath: "/old/path",
      query,
    } as any);
    expect(Router.push).toBeCalled();
    // @ts-ignore
    expect(Router.push.mock.calls[0][0]).toBe("/new-page?locale=en-id");
    // @ts-ignore
    expect(Router.push.mock.calls[0][1]).toBe("/en/new/path");
  });

  it("should redirect with params", async () => {
    const { NEXT_DATA, RedirectAppliedPage } = setupTest();
    window.__NEXT_DATA__ = NEXT_DATA as any;

    await RedirectAppliedPage.getInitialProps({ asPath: "/old/path/1" } as any);
    expect(Router.push).toBeCalled();
    // @ts-ignore
    expect(Router.push.mock.calls[0][0]).toBe("/new-page2?");
    // @ts-ignore
    expect(Router.push.mock.calls[0][1]).toBe("/new/path/1");
  });

  it("should not redirect", async () => {
    const { NEXT_DATA, RedirectAppliedPage } = setupTest();
    window.__NEXT_DATA__ = NEXT_DATA as any;

    await RedirectAppliedPage.getInitialProps({ asPath: "/path" } as any);
    expect(Router.push).not.toBeCalled();
    await RedirectAppliedPage.getInitialProps({
      asPath: "/old/post/path",
    } as any);
    expect(Router.push).not.toBeCalled();
  });

  it("should render with initial props", async () => {
    const { NEXT_DATA, RedirectAppliedPage } = setupTest();
    window.__NEXT_DATA__ = NEXT_DATA as any;
    const props = await RedirectAppliedPage.getInitialProps({
      asPath: "/path",
    } as any);

    const { getByTestId } = render(<RedirectAppliedPage {...props} />);
    expect(getByTestId("applied-redirect-page").textContent).toMatchSnapshot();
  });
});
