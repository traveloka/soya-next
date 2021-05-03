import React from "react";
import createConfigureStore from "../createConfigureStore";
import withStore from "../withStore";
import { render } from "@testing-library/react";

describe("withStore", () => {
  let Page, PageWithStore;

  beforeEach(() => {
    Page = props => (
      <>
        {props.store ? <div data-testid={"props-store"}>store</div> : <></>}
        {props.init ? <div data-testid={"props-init"}>init</div> : <></>}
      </>
    );
    Page.getInitialProps = () => ({ init: true });
    PageWithStore = withStore(createConfigureStore())(Page);
  });

  afterEach(() => {
    delete process.browser;
  });

  describe("browser", () => {
    beforeEach(() => {
      process.browser = true;
    });

    it("should add store to page props", async () => {
      const props = await PageWithStore.getInitialProps({});
      const { findByTestId } = render(
        <PageWithStore {...props} store={{ soya: true }} />
      );
      const propsStore = await findByTestId("props-store");
      const propsInit = await findByTestId("props-init");
      expect(propsStore).toBeTruthy();
      expect(propsInit).toBeTruthy();
    });
  });

  describe("server", () => {
    beforeEach(() => {
      process.browser = false;
    });

    it("should add store to page props", async () => {
      delete global.Window;
      const props = await PageWithStore.getInitialProps({});
      const { findByTestId } = render(<PageWithStore {...props} />);
      const propsStore = await findByTestId("props-store");
      const propsInit = await findByTestId("props-init");
      expect(propsStore).toBeTruthy();
      expect(propsInit).toBeTruthy();
    });
  });
});
