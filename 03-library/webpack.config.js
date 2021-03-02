const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  mode: "none",
  entry: {
    "zfmath": "./src/index.js",
    "zfmath.min": "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: "zfmath", //导出库的名字
    libraryTarget: "umd", // 以何种方式导出 var commonjs commonjs2 this window umd支持多种
    libraryExport: "default", //取出哪个导出， 因为一个文件中会有多个导出
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min.js$/, //针对入口的名字 压缩zfmath.min.js
      }),
    ],
  },
};
