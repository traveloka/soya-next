const { stringify, parse } = require("querystring");
const { extname, join, normalize } = require("path");

module.exports = page => (config, { buildId, isServer }) => {
  const entry = config.entry;
  config.entry = async () => {
    const entries = await entry();    
    const names = Object.keys(entries);
    const name = names.find(
      name => name === join("pages", `${page}`)
    );
    if (Array.isArray(entries[name])) {
      const newEntries = [];
      let replaced = false;
      entries[name].forEach(item => {
        if (item.startsWith("next-client-pages-loader")) {
          const options = parse(item.split("?")[1]);
          const ext = extname(options.absolutePagePath);
          if (
            normalize(options.absolutePagePath) !==
            join("private-next-pages", page + ext)
          ) {
            options.absolutePagePath = join("soya-next-scripts", "pages", page);
          }
          newEntries.push(`next-client-pages-loader?${stringify(options)}!`);
        } else {
          const ext = extname(item);
          if (normalize(item) !== join("private-next-pages", page + ext)) {
            newEntries.push(join("soya-next-scripts", "pages", page));
            replaced = true;
          }
        }
      })
      if (replaced) {
        entries[name] = newEntries;
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
