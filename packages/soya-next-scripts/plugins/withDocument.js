const { join, normalize } = require("path");

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      if (options.isServer) {
        const entry = config.entry;
        config.entry = () =>
          entry().then(entries => {
            const names = Object.keys(entries);
            const name = names.find(
              name => name === normalize("bundles/pages/_document.js")
            );
            const [documentPageEntry] = entries[name];
            if (documentPageEntry !== "./pages/_document.js") {
              entries[name] = [
                require.resolve("../pages/_document")
              ];
            }
            return entries;
          });
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
