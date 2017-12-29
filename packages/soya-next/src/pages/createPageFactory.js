import { compose } from "react-apollo";
import createBasePage from "./createBasePage";
import createConfigureStore from "../redux/createConfigureStore";
import { withApolloClientFactory } from "./withApolloClient";
import withReduxStore from "./withReduxStore";

export default (configureClient, configureStore = createConfigureStore()) => (
  reducers,
  ...connectArgs
) =>
  compose(
    createBasePage,
    withReduxStore(configureStore)(reducers, ...connectArgs),
    withApolloClientFactory(Page => Page, ctx => ({ store: ctx.store }))(
      configureClient
    )
  );
