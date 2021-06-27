import createConfigureStore from "../createConfigureStore";

describe("createConfigureStore", () => {
  it("should create basic configureStore", () => {
    const configureStore = createConfigureStore();
    const store = configureStore();
    store.replaceReducer({
      local: (state: any[] = []) => state,
    } as any);
    expect(store.getState()).toMatchSnapshot();
  });

  it("should create configureStore with global reducers", () => {
    const configureStore = createConfigureStore({
      global: (state: any = {}) => state,
    });
    const store = configureStore({});
    store.replaceReducer({
      local: (state: any[] = []) => state,
    } as any);
    expect(store.getState()).toMatchSnapshot();
  });
});
