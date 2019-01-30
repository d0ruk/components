const { resolve } = require("path");
const { name } = require("./package.json");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const OUT = resolve(__dirname, "dist");

module.exports = (env = {}) => {
  const isProd = env.prod;
  const entry = { [name]: "./src/index" };
  const output = {
    filename: "[name].js",
    path: OUT,
  };

  if (!isProd) {
    entry["play"] = "./playground";
  } else {
    output["library"] = name;
    output["libraryTarget"] = "commonjs2";
  }

  return {
    context: __dirname,
    mode: isProd ? "production" : "development",
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
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: "last 3 versions",
                    },
                  },
                ],
                "@babel/preset-react",
              ],
              plugins: [
                [
                  "babel-plugin-styled-components",
                  {
                    displayName: !isProd,
                  },
                ],
                "@babel/plugin-proposal-object-rest-spread",
              ],
            },
          },
        },
        {
          test: /.svg$/,
          loader: "svg-inline-loader",
        },
      ],
    },
    plugins: [].concat(
      isProd
        ? [new CleanWebpackPlugin([OUT]), new BundleAnalyzerPlugin()]
        : [
            new HtmlWebpackPlugin({
              template: "./index.html",
              title: "components playground",
              chunks: ["play"],
            }),
            new webpack.HotModuleReplacementPlugin(),
          ]
    ),
    resolve: {
      extensions: [".js", ".json", ".jsx"],
      alias: {
        "~": resolve(__dirname, "src"),
      },
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
    externals: {
      "styled-components": {
        commonjs2: "styled-components",
        umd: "styled-components",
      },
    },
    target: "web",
  };
};
