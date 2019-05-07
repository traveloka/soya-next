const { stringify, parse } = require("querystring");
const { extname, join, normalize } = require("path");

module.exports = page => (config, { buildId, isServer }) => {
  const entry = config.entry;
  config.entry = async () => {
    const entries = await entry();
    const names = Object.keys(entries);
    const name = names.find(
      name => name === join("static", buildId, "pages", `${page}.js`)
    );
    if (Array.isArray(entries[name])) {
      const [pageEntry] = entries[name];
      const ext = extname(pageEntry);
      if (normalize(pageEntry) !== join("private-next-pages", page + ext)) {
        entries[name] = [join("soya-next-scripts", "pages", page)];
      }
    } else {
      const options = parse(entries[name].split("?")[1]);
      const ext = extname(options.absolutePagePath);
      if (
        normalize(options.absolutePagePath) !==
        join("private-next-pages", page + ext)
      ) {
        options.absolutePagePath = join("soya-next-scripts", "pages", page);
      }
      entries[name] = `next-client-pages-loader?${stringify(options)}!`;
    }
    return entries;
  };
  return config;
};
