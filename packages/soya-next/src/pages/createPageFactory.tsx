import { compose } from "react-apollo";
import createBasePage from "./createBasePage";
import createConfigureStore from "../redux/createConfigureStore";
import { withApolloClientFactory } from "./withApolloClient";
import withReduxStore from "./withReduxStore";

import type { AnyAction, ReducersMapObject } from "redux";
import type { Connect } from "react-redux";
import type { SoyaNextPage } from "../types";
import type {
  ConfigureApolloClientFn,
  WithApolloClientInjectedProps,
  WithApolloClientProps,
} from "../apollo/withClient";
import type {
  CreateBasePageInjectedProps,
  CreateBasePageProps,
} from "../pages/createBasePage";
import type {
  WithReduxStoreInjectedProps,
  WithReduxStoreProps,
} from "../pages/withReduxStore";

export interface CreatePageFactoryInjectedPageProps
  extends CreateBasePageInjectedProps,
    WithApolloClientInjectedProps<any>,
    WithReduxStoreInjectedProps {}

export interface CreatePageFactoryPageProps
  extends CreateBasePageProps,
    WithApolloClientProps<any>,
    WithReduxStoreProps {}

export type CreatePageFn = (
  reducers: ReducersMapObject<any, AnyAction>,
  ...connectArgs: Partial<Parameters<Connect>>
) => <TProps extends CreatePageFactoryInjectedPageProps>(
  Page: SoyaNextPage<TProps>
) => SoyaNextPage<
  Omit<TProps, keyof CreatePageFactoryInjectedPageProps> &
    CreatePageFactoryPageProps
>;

export default function createPageFactory(
  configureClient: ConfigureApolloClientFn,
  configureStore = createConfigureStore()
): CreatePageFn {
  return (reducers, ...connectArgs) =>
    compose(
      createBasePage,
      withReduxStore(configureStore)(reducers, ...connectArgs),
      withApolloClientFactory(
        Page => Page,
        ctx => ({ store: ctx.store })
      )(configureClient)
    );
}
