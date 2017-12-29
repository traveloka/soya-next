import { compose } from "redux";
import createBasePage from "./createBasePage";
import withReduxStore from "./withReduxStore";
import createConfigureStore from "../redux/createConfigureStore";

export const createReduxPageFactory = configureStore => (
  reducers,
  ...connectArgs
) =>
  compose(
    createBasePage,
    withReduxStore(configureStore)(reducers, ...connectArgs)
  );

export default createReduxPageFactory(createConfigureStore());
