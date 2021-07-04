import React from "react";
import applyReducers from "../applyReducers";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import type { SoyaNextPage } from "../../types";

interface ComponentProps {
  init?: boolean;
}

describe("applyReducers", () => {
  function setupTest() {
    const createMockStore = (soya = true) => ({
      addReducer: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(),
      replaceReducer: jest.fn(),
      soya,
      subscribe: jest.fn(),
    });

    const reducers = {
      unique: jest.fn(),
    };
    const context = {
      store: createMockStore(),
    };
    const Component: SoyaNextPage<ComponentProps> = props => (
      <div data-testid={"component-props"}>{JSON.stringify(props)}</div>
    );
    Component.getInitialProps = () => ({ init: true });
    const ReducersAppliedComponent = applyReducers(reducers)(Component);
    const ComponentWithProvider = () => (
      <Provider store={context.store as any}>
        <ReducersAppliedComponent />
      </Provider>
    );

    return {
      context,
      createMockStore,
      reducers,
      Component,
      ComponentWithProvider,
      ReducersAppliedComponent,
    };
  }

  it("should throw error if store is not using soya enhancer", async () => {
    const {
      context,
      createMockStore,
      ComponentWithProvider,
      ReducersAppliedComponent,
    } = setupTest();
    try {
      await ReducersAppliedComponent.getInitialProps?.({
        store: createMockStore(false),
      } as any);
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
    const { Component } = setupTest();
    expect(applyReducers()(Component)).toEqual(Component);
  });

  it("should apply reducers in getInitialProps lifecycle", async () => {
    const { context, ReducersAppliedComponent } = setupTest();
    const addReducerMock = context.store.addReducer.mock;
    const props = await ReducersAppliedComponent.getInitialProps?.(
      context as any
    );
    expect(addReducerMock.calls.length).toBe(1);
    expect(Object.keys(addReducerMock.calls[0][0])).toEqual(["unique"]);
    expect(props?.init).toBeTruthy();
  });

  it("should apply reducers in constructor", () => {
    const { context, ComponentWithProvider } = setupTest();
    const addReducerMock = context.store.addReducer.mock;
    render(<ComponentWithProvider />);
    expect(addReducerMock.calls.length).toBe(1);
    expect(Object.keys(addReducerMock.calls[0][0])).toEqual(["unique"]);
  });
});
