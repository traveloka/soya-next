import type { UrlObject } from "url";

export const completeLegacyUrlObject: UrlObject = {
  auth: "user:password",
  hash: "#tag",
  host: "localhost:8090",
  hostname: "localhost",
  pathname: "/login",
  port: 8090,
  protocol: "https:",
  search: "?locale=en-id",
};

export const emptyLegacyUrlObject: UrlObject = {};
