/**
 * @jest-environment node
 */
import setupTest from "./utils/withStoreSetup";

describe("withStore - server", () => {
  it("should add store to page props", async () => {
    const { PageWithStore } = setupTest();
    const props = await PageWithStore.getInitialProps({} as any);
    expect(props).toHaveProperty("init");
    expect(props).toHaveProperty("store");
    expect(props).toMatchSnapshot();
  });
});
