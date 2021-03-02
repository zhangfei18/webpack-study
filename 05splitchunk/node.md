# webpack 5

看源码：

webpack会把文件中所有的引用，都会改成相对于项目根目录的相对路径

分割：

①entry分割 多入口分割

②按需加载 
遇到import（注意是方法调用的import不是在代码最顶部的import）就会把import单独放到一个代码块里，这个代码快就会单独生成一个文件， 
首次加载的时候只需要加载main.js，当遇到import语句的时候， 会向服务器发送一个jsonp请求， 请求被分割出去的异步代码，然后合并到原来的modules， 然后去加载这个模块， 并把模块的exports导出对象向后传递。 

③插件
webpack.optimize.CommonsChunkPlugin
在webpack4中用下面的优化向来代替:↓↓↓
 optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: "initial",
          minSize: 0,
          minChunks: 2
        },
        vender: {
          priority: 1,
          test: /node_modules/,
          chunks: "initial",
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },