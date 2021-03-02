const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "boundle.js",
  },
  modules: {
    rules: [
      {
        test: /\.test$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "px2rem",
            options: {
              remunit: 75,
              remPrecesion: 8,
            },
          },
        ],
      },
    ],
  },
};
