process.env.NODE_ENV = "production";
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const config = require("react-scripts/config/webpack.config.prod");

config.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: "report.html",
    defaultSizes: "gzip"
  })
);

config.optimization.runtimeChunk = false;
config.optimization.splitChunks = {
  chunks() {
    return false;
  }
};

require("react-scripts/scripts/build");
