const { mergeWithRules } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "nitex",
    projectName: "app-nav-bar",
    webpackConfigEnv,
    argv,
  });

  const mergedConfig = mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: "replace",
      },
    },
  })(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      port: 9003,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
  });

  console.log(mergedConfig.module.rules);

  return mergedConfig;
};
