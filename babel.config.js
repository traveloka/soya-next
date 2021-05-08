"use strict";

module.exports = function babelConfig(api) {
  const ignore = api.env("test") ? [] : ["**/__tests__/**"];

  return {
    presets: ["next/babel"],
    comments: false,
    ignore,
  };
};
