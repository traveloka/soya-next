const { join } = require("path");

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      const entry = config.entry;
      config.entry = async () => {
        const entries = await entry();
        const names = Object.keys(entries);
        const name = names.find(
          name => name === join("static", options.buildId, "pages", `_app.js`)
        );
        const [pageEntry] = entries[name];
        if (pageEntry !== join(".", "pages", `_app.js`)) {
          entries[name] = [require.resolve(join("..", "pages", "_app"))];
        }
        return entries;
      };

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
