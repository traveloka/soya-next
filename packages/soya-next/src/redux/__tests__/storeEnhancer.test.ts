import { createStore } from "redux";
import storeEnhancer from "../storeEnhancer";

import type { AnyAction } from "redux";

describe("Store Enhancer", () => {
  function setupTest() {
    return {
      store: storeEnhancer()(createStore)(state => state),
      todos: (state: any[] = [], _action: AnyAction) => state,
    };
  }

  it("should expose enhanced API", () => {
    const { store } = setupTest();
    const apis = Object.keys(store);
    expect(apis.length).toBe(7);
    expect(apis).toContain("addReducer");
    expect(apis).toContain("replaceReducer");
    expect(apis).toContain("soya");
  });

  it("should add new todos to store state", () => {
    const { store, todos } = setupTest();
    store.addReducer({ todos });
    expect(store.getState()).toMatchSnapshot();
  });

  it("should replace store start with given reducer function", () => {
    const { store, todos } = setupTest();
    const auth = (state = {}) => state;
    store.addReducer({ auth });
    store.addReducer({ todos });
    store.addReducer(todos);
    store.replaceReducer(auth);
    expect(store.getState()).toMatchSnapshot();
  });

  it("should replace store state with given reducers object", () => {
    const { store, todos } = setupTest();
    const auth = (state = {}) => state;
    store.addReducer({ auth });
    store.addReducer({ todos });
    store.replaceReducer({ auth });
    expect(store.getState()).toMatchSnapshot();
  });

  it("should throw if addReducers arguments are not specified", () => {
    expect(() => {
      const { store } = setupTest();
      // @ts-ignore for testing no arguments
      store.addReducer();
    }).toThrow("Missing nextReducers argument.");
  });

  it("should throw if replaceReducers arguments are not specified", () => {
    expect(() => {
      const { store } = setupTest();
      // @ts-ignore for testing no arguments
      store.replaceReducer();
    }).toThrow("Missing nextReducers argument.");
  });

  it("should throw if there's reducer name conflict", () => {
    expect(() => {
      const { store, todos } = setupTest();
      store.addReducer({ todos });
      store.addReducer({ todos: (state: any) => state });
    }).toThrow("Duplicate reducer name: todos");
  });
});
