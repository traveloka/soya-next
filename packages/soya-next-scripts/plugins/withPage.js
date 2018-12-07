const { extname, join, normalize, relative } = require("path");

module.exports = page => (config, { buildId, dir }) => {
  const entry = config.entry;
  config.entry = async () => {
    const entries = await entry();
    const names = Object.keys(entries);
    const name = names.find(
      name => name === join("static", buildId, "pages", `${page}.js`)
    );
    const [pageEntry] = entries[name];
    const ext = extname(pageEntry);
    if (normalize(pageEntry) !== join("pages", page + ext)) {
      entries[name] = [
        relative(dir, require.resolve(join("..", "pages", page)))
      ];
    }
    return entries;
  };
  return config;
};
