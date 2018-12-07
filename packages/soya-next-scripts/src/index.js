const spawn = require("cross-spawn");
const script = process.argv[2];
const args = process.argv.slice(3);

const run = script => {
  const { status } = spawn.sync(
    "node",
    [require.resolve(script)].concat(args),
    { stdio: "inherit" }
  );
  process.exit(status);
};

switch (script) {
  case "build":
  case "dev":
  case "export":
  case "test": {
    run(`../scripts/${script}`);
    break;
  }
  default:
    // eslint-disable-next-line no-console
    console.log(`Unknown script "${script}".`);
    break;
}
