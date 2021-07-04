import { combineReducers } from "redux";

import type { AnyAction, ReducersMapObject, StoreEnhancer } from "redux";
import type { SoyaNextStoreExt } from "../types";

export default function storeEnhancer(
  globalReducers?: ReducersMapObject<any, AnyAction>
): StoreEnhancer<SoyaNextStoreExt<any, AnyAction>, any> {
  return createStore => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);
    const replaceReducer = store.replaceReducer;
    let soyaReducers: ReducersMapObject<any, AnyAction> = { ...globalReducers };

    return {
      ...store,
      addReducer: nextReducers => {
        if (!nextReducers) {
          throw new Error("Missing nextReducers argument.");
        }

        if (typeof nextReducers === "object") {
          const keys = Object.keys(nextReducers);
          keys.forEach(key => {
            if (soyaReducers[key] && soyaReducers[key] !== nextReducers[key]) {
              throw new Error(`Duplicate reducer name: ${key}`);
            }
            soyaReducers[key] = nextReducers[key];
          });
          replaceReducer(combineReducers(soyaReducers));
        } else {
          replaceReducer(nextReducers);
        }
      },
      replaceReducer: nextReducers => {
        if (!nextReducers) {
          throw new Error("Missing nextReducers argument.");
        }

        if (typeof nextReducers === "object") {
          soyaReducers = {
            ...globalReducers,
            ...nextReducers,
          };
          replaceReducer(combineReducers(soyaReducers));
        } else {
          replaceReducer(nextReducers);
        }
      },
      soya: true,
    };
  };
}
