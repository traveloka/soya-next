import createBasePage from "./createBasePage";
import { withApolloClientFactory } from "./withApolloClient";

import type { ConfigureApolloClientFn } from "../apollo/withClient";

export default function createApolloPageFactory(
  configureClient: ConfigureApolloClientFn
) {
  return withApolloClientFactory(createBasePage)(configureClient);
}
