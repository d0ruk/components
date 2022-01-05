const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC = resolve(__dirname, "src");

module.exports = {
  entry: [resolve(SRC, "index.jsx")],
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [SRC],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "components example",
    }),
  ],
};
