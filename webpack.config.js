const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const SRC = resolve(__dirname, "src");
const EXAMPLES = resolve(__dirname, "examples");

module.exports = () => {
  const isProd = process.env.NODE_ENV === "production";
  const entry = { index: resolve(SRC, "index.js") };
  if (!isProd) entry["play"] = "./playground.jsx";

  return {
    context: __dirname,
    entry,
    output: {
      filename: "[name].js",
      library: {
        type: "umd",
        name: "_components",
      },
      clean: true,
    },
    target: "browserslist",
    module: {
      rules: [
        {
          test: /.jsx?$/,
          include: [SRC, /playground/],
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /.svg$/,
          type: "asset/source",
        },
        {
          test: /.sample?$/,
          include: [EXAMPLES],
          use: {
            loader: "raw-loader",
            options: {
              esModule: false,
            },
          },
        },
      ],
    },
    plugins: [].concat(
      isProd
        ? [
            new BundleAnalyzerPlugin({
              openAnalyzer: false,
              analyzerMode: "static",
              reportFilename: "bundle.html",
            }),
          ]
        : [
            new HtmlWebpackPlugin({
              template: "./index.html",
              title: "components playground",
              chunks: ["play"],
            }),
          ]
    ),
    resolve: {
      extensions: [".js", ".json", ".jsx"],
    },
    devtool: isProd ? "hidden-source-map" : "inline-source-map",
    devServer: {
      compress: true,
      historyApiFallback: true,
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
    externals: isProd
      ? {
          react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React",
          },
          "styled-components": {
            commonjs: "styled-components",
            commonjs2: "styled-components",
            amd: "styled",
            root: "styled",
          },
        }
      : {},
  };
};
