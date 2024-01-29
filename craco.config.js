const CracoModuleFederation = require("@kne/craco-module-federation");
const { CracoReadmePlugin } = require("@kne/modules-dev");
const aliasConfig = require("./webstorm.webpack.config");

process.env.CI = false;

module.exports = {
  webpack: {
    alias: aliasConfig.resolve.alias, configure: (webpackConfig) => {
      const definePlugin = webpackConfig.plugins.find((plugin) => plugin.constructor.name === "DefinePlugin");
      Object.assign(definePlugin.definitions["process.env"], { EXCEED_COMPONENTS_VERSION: `"${process.env.EXCEED_COMPONENTS_VERSION}"` });
      return webpackConfig;
    }
  }, plugins: [{
    plugin: CracoReadmePlugin
  }, {
    plugin: CracoModuleFederation
  }]
};
