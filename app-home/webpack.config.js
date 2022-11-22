const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "nitex",
    projectName: "home",

    webpackConfigEnv,
    argv,
  });

  const config = merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      port: 9006,
    },
    // eslint-disable-next-line no-undef
    entry: path.resolve(__dirname, "src/index.js"),
    externals: [/^@nitex\/.+/],
    output: { filename: "index.js" },
  });

  // eslint-disable-next-line no-console
  console.log(config);

  return config;
};
