const path = require("path");

module.exports = {
  mode: "none",
  entry: {
    index: "./src/index.js",
    other: "./src/other.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {//分离公共代码
          chunks: "initial",
          minSize: 0,
          minChunks: 2,
          name: false,
        },
        vendor: {//分离第三方库
          priority: 1,//权重
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial", // 指定分割的类型，initial:直接通过 import 或者 require 导入的模块将会被split; async:动态按需导入的模块将会被分割 ; all:以上两者
          minSize: 0,//
          minChunks: 1,//模块超过多少k就要开始拆分
          name(module, chunks, cacheGroupKey) {
            // chunks: 就是该模块被引用的chunk
            // cacheGroupKey : vender
            let moduleFileName = module
              .identifier()
              .split("/")
              .reduceRight((item) => item);
            moduleFileName = path.basename(moduleFileName, path.extname(moduleFileName));
            const allChunksNames = chunks.map((item) => item.name).join("~");
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
        },
      },
    },
  },
};
