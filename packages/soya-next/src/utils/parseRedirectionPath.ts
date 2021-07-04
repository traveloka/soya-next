import pathToRegexp from "path-to-regexp";

export default function parseRedirectionPath(path: string, params?: object) {
  return pathToRegexp.compile(path)(params);
}
