export default ({
  testMatch = ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  ...jestConfig
} = {}) => ({
  testMatch,
  ...jestConfig,
});
