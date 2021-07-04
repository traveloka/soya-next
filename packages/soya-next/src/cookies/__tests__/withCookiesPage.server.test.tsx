/**
 * @jest-environment node
 */
import { Cookies } from "react-cookie";
import setupTest from "./utils/withCookiesPageSetup";

describe("withCookiesPage - Server", () => {
  it("should add cookie to page props", async () => {
    const { PageWithCookies } = setupTest();
    const props = await PageWithCookies.getInitialProps({
      req: {
        universalCookies: new Cookies("key=value"),
      },
    } as any);
    expect(props).toMatchSnapshot();
  });
});
