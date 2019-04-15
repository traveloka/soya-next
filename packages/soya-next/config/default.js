const config = require("config");
config.server = config.server || {};
config.server.host = config.server.host || "0.0.0.0";
config.server.port = config.server.port || 3000;
config.server.headers = config.server.headers || {};
config.server.headers["X-Frame-Options"] =
  typeof config.server.headers["X-Frame-Options"] === "undefined"
    ? "sameorigin"
    : config.server.headers["X-Frame-Options"];
