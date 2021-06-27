import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import enhancer from "./storeEnhancer";
import middleware from "./middleware";

import type {
  Action,
  AnyAction,
  PreloadedState,
  ReducersMapObject,
} from "redux";
import type { SoyaNextStoreExt, SoyaNextThunkCompatStoreExt } from "../types";

export default function createConfigureStore(
  globalReducers?: ReducersMapObject<any, AnyAction>
) {
  return <
    TState = any,
    TAction extends Action<any> = AnyAction,
    TExtraArgs = any
  >(
    preloadedState?: PreloadedState<TState>,
    extraArgument?: TExtraArgs
  ) =>
    createStore<
      TState,
      TAction,
      SoyaNextStoreExt<TState, TAction> &
        SoyaNextThunkCompatStoreExt<TState, TAction, TExtraArgs>,
      any
    >(
      globalReducers
        ? combineReducers(globalReducers)
        : () => preloadedState || {},
      preloadedState,
      composeWithDevTools<any, any>(
        applyMiddleware(thunk.withExtraArgument(extraArgument), middleware),
        enhancer(globalReducers)
      )
    );
}
