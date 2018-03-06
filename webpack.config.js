const { resolve } = require("path");
const { name } = require("./package.json");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env={}) => {
  const isProd = env.prod;
  const entry = { index: "./src/index" };
  const output =  {
    filename: "[name].js",
    path: resolve(__dirname, "build")
  };

  if (!isProd) {
    entry["play"] = "./playground";
  } else {
    output["library"] = name,
    output["libraryTarget"] = "commonjs2"
  }

  return {
    context: __dirname,
    mode: "development",
    entry,
    output,
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
        chunks: ["play"]
      }),
      new webpack.HotModuleReplacementPlugin()]
    ),
    resolve: {
      extensions: [".js", ".json", ".jsx"],
      alias: {
        "~": resolve(__dirname, "src")
      }
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