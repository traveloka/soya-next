import type { AnyAction, Dispatch } from "redux";

export default function middleware() {
  const queries: Record<string, any> = {};
  return (next: Dispatch<AnyAction>) =>
    ({ soya, ...action }: any) => {
      if (typeof soya !== "undefined") {
        const { load, id = action.type } = soya;
        if (typeof id !== "string") {
          throw new Error("Expected soya action id to be a string.");
        }
        if (typeof load !== "function") {
          throw new Error("Expected soya action load to be a function.");
        }

        const resolve = (soya: any) => {
          // eslint-disable-next-line callback-return
          next({
            ...action,
            soya,
          });
          delete queries[id];
          return soya;
        };
        const reject = resolve;
        if (!queries[id]) {
          queries[id] = load().then(resolve, reject);
        }
        return queries[id];
      }
      return next(action);
    };
}
