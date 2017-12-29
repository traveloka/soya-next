import createReduxPage from "./createReduxPage";

// For backward compatibility
export default (...connectArgs) => (Page, reducers) =>
  createReduxPage(reducers, ...connectArgs)(Page);
