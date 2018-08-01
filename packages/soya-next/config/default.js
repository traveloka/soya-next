const config = require("config");
let basePath;
if (config.basePath) {
  if (typeof config.basePath === "string") {
    basePath = config.basePath;
  } else {
    basePath = config.basePath && config.basePath.test;
  }
}
config.assetPrefix = config.assetPrefix || basePath || "";
config.frameguard = config.frameguard || { action: "sameorigin" };
config.server = config.server || {};
config.server.host = config.server.host || "0.0.0.0";
config.server.port = config.server.port || 3000;
config.server.distDir = config.server.distDir || ".next";
config.server.generateEtags = config.server.generateEtags || true;
config.server.poweredByHeader = config.server.poweredByHeader || true;
config.server.useFileSystemPublicRoutes =
  config.server.useFileSystemPublicRoutes || true;
