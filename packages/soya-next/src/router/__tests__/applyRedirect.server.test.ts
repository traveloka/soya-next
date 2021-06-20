/**
 * @jest-environment node
 */
import Router from "next/router";
import setupTest from "./utils/applyRedirectSetup";

jest.mock("next/router");

describe("applyRedirect - server", () => {
  it("should not redirect", async () => {
    const { RedirectAppliedPage } = setupTest();
    await RedirectAppliedPage.getInitialProps({
      req: {},
      asPath: "/old/path",
    } as any);
    expect(Router.push).not.toBeCalled();
  });
});
