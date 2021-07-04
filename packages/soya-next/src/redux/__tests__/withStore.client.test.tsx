import React from "react";
import { render } from "@testing-library/react";
import setupTest from "./utils/withStoreSetup";

describe("withStore - browser", () => {
  it("should add store to page props", async () => {
    const { PageWithStore } = setupTest();
    const props = await PageWithStore.getInitialProps({} as any);
    const { getByTestId } = render(
      <PageWithStore {...props} store={{ soya: true } as any} />
    );
    const propsStore = getByTestId("props-store");
    const propsInit = getByTestId("props-init");
    expect(propsStore).toBeInTheDocument();
    expect(propsInit).toBeInTheDocument();
    expect(propsStore).toMatchSnapshot();
    expect(propsInit).toMatchSnapshot();
  });
});
