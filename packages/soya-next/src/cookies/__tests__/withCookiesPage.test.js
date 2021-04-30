import React from "react";
import { Cookies } from "react-cookie";
import withCookies from "../withCookiesPage";
import { render } from "@testing-library/react";

describe("withCookiesPage", () => {
  let Page, PageWithCookies;

  beforeEach(() => {
    Page = props => {
      expect(props).toMatchSnapshot();
      return (
        <>{props.init ? <div data-testid={"props-init"}>init</div> : <></>}</>
      );
    };
    Page.getInitialProps = () => ({ init: true });
    PageWithCookies = withCookies(Page);
  });

  afterEach(() => {
    delete process.browser;
  });

  describe("browser", () => {
    beforeEach(() => {
      process.browser = true;
    });

    it("should add cookie to page props", async () => {
      const props = await PageWithCookies.getInitialProps({});
      const { findByTestId } = render(
        <PageWithCookies {...props} cookies={new Cookies()} />
      );

      const propsInit = await findByTestId("props-init");
      expect(propsInit).toBeTruthy();
    });
  });

  describe("server", () => {
    beforeEach(() => {
      process.browser = false;
    });

    it("should add cookie to page props", async () => {
      global.MOCK_IS_NODE = true;
      const props = await PageWithCookies.getInitialProps({
        req: {
          universalCookies: new Cookies("key=value")
        }
      });
      const { findByTestId } = render(<PageWithCookies {...props} />);
      const propsInit = await findByTestId("props-init");
      expect(propsInit).toBeTruthy();
      delete global.MOCK_IS_NODE;
    });
  });
});
