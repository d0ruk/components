const isProd = process.env.NODE_ENV === "production";

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        displayName: !isProd,
        ssr: false,
        pure: true,
      },
    ],
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-runtime",
  ],
};
