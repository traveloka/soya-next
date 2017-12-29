import createBasePage from "./createBasePage";
import { withApolloClientFactory } from "./withApolloClient";

export default configureClient =>
  withApolloClientFactory(createBasePage)(configureClient);
