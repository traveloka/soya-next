import React from "react";
import applyReducers from "../applyReducers";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

describe("applyReducers", () => {
  let context, Component, ComponentWithProvider, ReducersAppliedComponent;
  const reducers = {
    unique: jest.fn()
  };
  const createMockStore = (soya = true) => ({
    addReducer: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn(),
    replaceReducer: jest.fn(),
    soya,
    subscribe: jest.fn()
  });

  beforeEach(() => {
    context = {
      store: createMockStore()
    };
    Component = () => <div />;
    Component.getInitialProps = () => ({ init: true });
    ReducersAppliedComponent = applyReducers(reducers)(Component);
    ComponentWithProvider = () => (
      <Provider store={context.store}>
        <ReducersAppliedComponent />
      </Provider>
    );
  });

  it("should throw error if store is not using soya enhancer", async () => {
    try {
      await ReducersAppliedComponent.getInitialProps({
        store: createMockStore(false)
      });
    } catch (e) {
      expect(e.message).toBe(
        "applyReducers must be used with Soya's redux enhancer"
      );
    }

    context.store = createMockStore(false);
    expect(() => {
      render(<ComponentWithProvider />);
    }).toThrow("applyReducers must be used with Soya's redux enhancer");
  });

  it("should return as is if no arguments is specified", () => {
    expect(applyReducers()(Component)).toEqual(Component);
  });

  it("should apply reducers in getInitialProps lifecycle", async () => {
    const addReducerMock = context.store.addReducer.mock;
    const props = await ReducersAppliedComponent.getInitialProps(context);
    expect(addReducerMock.calls.length).toBe(1);
    expect(Object.keys(addReducerMock.calls[0][0])).toEqual(["unique"]);
    expect(props.init).toBeTruthy();
  });

  it("should apply reducers in constructor", () => {
    const addReducerMock = context.store.addReducer.mock;
    render(<ComponentWithProvider />);
    expect(addReducerMock.calls.length).toBe(1);
    expect(Object.keys(addReducerMock.calls[0][0])).toEqual(["unique"]);
  });
});
