import { createStore, applyMiddleware } from "redux";
import middleware from "../middleware";

import type { Action, AnyAction } from "redux";
import type { ThunkAction, ThunkMiddleware } from "redux-thunk";

jest.useFakeTimers();

describe("Middleware", () => {
  function setupTest() {
    const thunk: ThunkMiddleware =
      ({ dispatch, getState }) =>
      next =>
      action =>
        typeof action === "function"
          ? action(dispatch, getState)
          : next(action);
    const fetchData: () => ThunkAction<any, any, any, AnyAction> =
      () => async dispatch => {
        const res = await new Promise<object>(resolve => {
          setTimeout(() => {
            resolve({ data: true });
          }, 1000);
        });
        dispatch({
          type: "FETCH_DATA",
          ...res,
        });
      };
    const fetchDataSoya: () => Action<"FETCH_DATA_SOYA"> = () => ({
      type: "FETCH_DATA_SOYA",
      soya: {
        load: () =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve({ data: true });
            }, 1000);
          }),
      },
    });
    const reducer = (state: number[] = [], action: AnyAction) => {
      switch (action.type) {
        case "FETCH_DATA":
          if (action.data) {
            return state.concat(state.length);
          }
          return state;
        case "FETCH_DATA_SOYA":
          if (action.soya.data) {
            return state.concat(state.length);
          }
          return state;
        default:
          return state;
      }
    };

    return {
      fetchData,
      fetchDataSoya,
      reducer,
      store: applyMiddleware(thunk, middleware)(createStore)(reducer),
    };
  }

  it("should throw an error if non-string query id", () => {
    expect(() => {
      const { store } = setupTest();

      store.dispatch({
        type: "NON_STRING_QUERY_ID",
        soya: {
          id: [],
        },
      });
    }).toThrow("Expected soya action id to be a string.");
  });

  it("should throw an error if load is not a function", () => {
    expect(() => {
      const { store } = setupTest();

      store.dispatch({
        type: "NON_FUNCTION_LOAD",
        soya: {
          id: "1",
          load: "function",
        },
      });
    }).toThrow("Expected soya action load to be a function.");
  });

  it("should dispatch action normally", async () => {
    const { fetchData, store } = setupTest();

    await new Promise<void>(resolve => {
      for (let i = 1; i <= 5; i++) {
        store.dispatch(fetchData());
        jest.runTimersToTime(i * 200);
      }
      jest.runAllTimers();
      resolve();
    });
    expect(store.getState().length).toBe(5);
  });

  it("should only dispatch once per query id per running request", async () => {
    const { fetchDataSoya, store } = setupTest();

    await new Promise<void>(resolve => {
      for (let i = 1; i <= 5; i++) {
        store.dispatch(fetchDataSoya());
        jest.runTimersToTime(i * 200);
      }
      jest.runAllTimers();
      resolve();
    });
    expect(store.getState().length).toBe(1);
  });
});
