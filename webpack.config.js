const { resolve } = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env={}) => {
  const isProd = env.prod;
  const entry = { index: "./src/index" };

  if (!isProd) {
    entry["play"] = "./playground";
  }

  return {
    context: __dirname,
    mode: "development",
    entry,
    output: {
      filename: "[name].js",
      path: resolve(__dirname, "build")
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          include: [resolve(__dirname, "src"), /playground/],
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                ["@babel/preset-env", {
                  "targets": {
                    "browsers": "last 3 versions"
                  }
                }],
                "@babel/preset-react"
              ],
              plugins: [
                // "@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-object-rest-spread",
              ]
            }
          }
        },
      ]
    },
    plugins: [].concat(isProd
      ? [new CleanWebpackPlugin([resolve(__dirname, "build")])]
      : [new HtmlWebpackPlugin({
        template: "./index.html",
        title: "components playground",
      }),
      new webpack.HotModuleReplacementPlugin()]
    ),
    resolve: {
      extensions: [".js", ".json", ".jsx"],
    },
    devtool: isProd ? "hidden-source-map" : "source-map",
    devServer: {
      hotOnly: true,
      compress: true,
      historyApiFallback: true,
      stats: { modules: false },
      overlay: true,
    },
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
    },
  }
}