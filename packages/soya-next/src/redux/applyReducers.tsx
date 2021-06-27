import React from "react";
import hoistStatics from "hoist-non-react-statics";
import getDisplayName from "../utils/getDisplayName";
import { NEXT_STATICS } from "../constants/Statics";
import { ReactReduxContext } from "react-redux";

import type { AnyAction, ReducersMapObject } from "redux";
import type {
  SoyaNextPage,
  SoyaNextPageContext,
  SoyaNextStore,
} from "../types";

export interface WithApplyReducersInjectedProps {
  store?: SoyaNextStore;
}
export interface WithApplyReducersProps {
  store?: SoyaNextStore;
}

/**
 * Registers reducers to a component to enable code splitting.
 *
 * **Note**: Ensure `applyReducers([reducers])` is rendered within `createPage` hierarchy.
 * @param [reducers] An object of reducers which will be registered into a component.
 * Make sure each reducers has unique name within your application reducers.
 * @returns A higher order React component class that loads or unloads
 * registered reducers dynamically within the component lifecycle.
 */
export default function applyReducers(
  reducers?: ReducersMapObject<any, AnyAction>
) {
  return <TProps extends WithApplyReducersInjectedProps>(
    Component: SoyaNextPage<TProps>
  ) => {
    if (typeof reducers === "undefined") {
      return Component;
    }

    function ApplyReducers(
      props: Omit<TProps, keyof WithApplyReducersInjectedProps> &
        WithApplyReducersProps
    ) {
      const flag = React.useRef(true);
      const context = React.useContext(ReactReduxContext);
      const store = props.store || (context.store as SoyaNextStore);

      if (flag.current) {
        if (!store.soya) {
          throw new Error(
            "applyReducers must be used with Soya's redux enhancer"
          );
        }
        store.addReducer(reducers!);
        flag.current = false;
      }

      return <Component {...(props as TProps)} />;
    }
    ApplyReducers.displayName = getDisplayName("applyReducers", Component);
    ApplyReducers.getInitialProps = async (ctx: SoyaNextPageContext) => {
      if (!ctx.store?.soya) {
        throw new Error(
          "applyReducers must be used with Soya's redux enhancer"
        );
      }
      ctx.store.addReducer(reducers);
      return (
        Component.getInitialProps && (await Component.getInitialProps(ctx))
      );
    };

    return hoistStatics(ApplyReducers, Component, NEXT_STATICS);
  };
}
