import { compose } from "redux";
import createBasePage from "./createBasePage";
import withReduxStore from "./withReduxStore";
import createConfigureStore from "../redux/createConfigureStore";

import type { AnyAction, ReducersMapObject } from "redux";
import type { Connect } from "react-redux";
import type { SoyaNextPage } from "../types";
import type { ConfigureStoreFn } from "../redux/createConfigureStore";
import type {
  CreateBasePageInjectedProps,
  CreateBasePageProps,
} from "./createBasePage";
import type {
  WithReduxStoreInjectedProps,
  WithReduxStoreProps,
} from "./withReduxStore";

export interface CreateReduxPageInjectedProps
  extends CreateBasePageInjectedProps,
    WithReduxStoreInjectedProps {}

export interface CreateReduxPageProps
  extends CreateBasePageProps,
    WithReduxStoreProps {}

export type ReduxPageFactoryFn = (
  reducers?: ReducersMapObject<any, AnyAction>,
  ...connectArgs: Partial<Parameters<Connect>>
) => <TProps extends CreateReduxPageInjectedProps>(
  Page: SoyaNextPage<TProps>
) => SoyaNextPage<
  Omit<TProps, keyof CreateReduxPageInjectedProps> & CreateReduxPageProps
>;

export function createReduxPageFactory(
  configureStore: ConfigureStoreFn
): ReduxPageFactoryFn {
  return (reducers, ...connectArgs) =>
    compose(
      createBasePage,
      withReduxStore(configureStore)(reducers, ...connectArgs)
    );
}

export default createReduxPageFactory(createConfigureStore());
