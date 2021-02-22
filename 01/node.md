# 核心概念
·Entry: 入口， webpack执行构建的第一步是将从Entry开始， 可抽象成输入。
·Module: 模块， 在webpack例一切皆模块， 一个模块对应着一个文件， webpack会从配置的entry开始递归找出所依赖的模块
·Chunk: 代码块， 一个Chunk有多个模块组合而成， 用于代码合并与分割
·Loader: 模块转换器， 用于把模块袁内容按照需求转换成新内容
·Plugin: 扩展插件， 在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
·Output: 输出结果， 在webpack经过一系列处理并得出最终想要的代码后纯输出结果
`webpack 启动后会从Entry里配置的Module开始递归解析Entry依赖的所有Module。每找到一个Module， 就会根据配置的Loader取找出对应的转换机制， 对Module进行转换后， 在解析出当前Module依赖的Module。这些模块会议Entry为单位进行分组， 一个Entry和其所有依赖的Module被分割到一个组也就是一个Chunk。最后Webpack会把所有的Chunk转换成文件输出。在整个流程中webpack会在恰当的时机执行Plugin里定义的逻辑`

# webpack-dev-server
启动一个本地服务
npm install webpack-dev-server

# Loader
loader是一个函数
·test 匹配处理文件的拓展名
·use  loader名称
·include/exclude 必需处理的文件和屏蔽不需要处理的文件
·options 额外的配置项
# css
npm install style-loader css-loader
## 分离打包后的css， 可以和js并行加载
mini-css-extract-plugin
new mini-css-extract-plugin({
    filename: [name].css,//name是个变量， 默认是main
    chunkFilename: [id].css//用于懒加载使用
})
{
    test: /\.css$/,
    use: [{
        loader: MiniCssExtractPlugin.loader
    }, 'css-loader']
}
或/
{
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader']
}
# 图片
file-loader url-loader :可以打包成base64
{
    test: /\.(png|jpg)$/,
    use: [loader: 'url-loader', options: {//如果加载的图片大小小于10k， 就把这张图片变为base64
        limit: 10*1024
    }]
}
# Plugin
html-webpack-plugin
new html-webpack-plugin({
    template: '',
    filename: '',
    chunk: [], //多入口打包使用, 这里写的啥往html插入的时候就是啥(包括顺序)， 默认是main
    chunkSortMode: '' //chunk之间的引入顺序
})
clean-webpack-plugin :清除打包后的目录

# 压缩
## 压缩js teser-webpack-plugin
## 压缩cs opimize-css-assets-plugin 
记得修改mode 为 production
optimization:{// 放优化的内容
    minimizer: [//放优化的插件
        new TerserWebpackPlugin({
            parallel: true, // 开启多进程压缩
            cache: true , // 使用缓存
        }),
        new OpimizeCssAssetsPlugin({
            
        })
    ]

}

# css和图片存放单独目录
ext 资源后缀名
name 文件名称
path 文件的相对路径
folder 文件所在的相对路径
contenthash 文件的内容hash, 默认是md5生成
hash 代表本次的编译， 每编译一次， hash会变， 一次打包所有产出的资源hash一样
chunkhash  代码块的hash 因为一般来说每个entry， 都会产出一个chunk, 一个chunk的内部有一个模块发生的变化，hash就会变化
contenthash 只要一个模块发生了变化， contenthash 就会变化

{
    test: /\.(png|jpg)$/,
    use: [loader: 'url-loader', options: {//如果加载的图片大小小于10k， 就把这张图片变为base64
        limit: 10*1024,
        outputPath: 'images',// 要把图片拷贝到images下
        publicPath: '/images'
        name: '[name]'
    }]
}

new mini-css-extract-plugin({
    filename: 'css/[name].css',//name是个变量， 默认是main
    <!-- chunkFilename: [id].css//用于懒加载使用 -->
})

# 文件指纹
hash 代表本次的编译， 每编译一次， hash会变， 一次打包所有产出的资源hash一样
chunkhash  代码块的hash 因为一般来说每个entry， 都会产出一个chunk, 一个chunk的内部有一个模块发生的变化，hash就会变化
contenthash 只要一个模块发生了变化， contenthash 就会变化

# 在HTML中使用图片
html-withimg-loader
{
    test: /\.html$/,
    use: 'html-webpack-loader'
}

# 处理css的前缀
postcss   autoprefixer
postcss只是一个简单的laoder, 其全靠autoprefixer处理
 {
        test: /\.css$/,
        use: ['style-loader', 'postcss-loader'],
},
postcss.config.js 文件
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
.browserslistrc 文件
last 10 version
> 1%
IE 6 # sory

# 处理es6/es7

babel-loader @babel/core @babel/preset-env @babel/preset-react
                核心      将es6/7转换为es5    将react代码转换成es5

@babel/plugin-proposal-decorators: 处理装饰器 @babel/plugin-proposal-class=properties 处理类

