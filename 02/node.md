# 打包第三方库
piugins:[
    //缺点：这种注入模式相当于每个模块注册了一个私有的变量， 全局下是获取不到的
    new webpack.ProvidePlugin({// 此插件会自动向所有的模块注入一个_变量， 引用的就是lodash模块
        _: 'lodash'
    })
]
ProvidePlugin会将代码打包进产出后的文件中。
怎么样能全局获取到呢？
## expose-loader : 
该loader向全局对象暴露变量， 变量就叫$

index.js
如果想给加载的模块配置loader就这样， 用!分隔
格式：
require("expose-loader?libraryName!./file.js");
let $ = require('expose-loader?$!jquery');

## externals
如果我们想引用一个库， 但是又不想让webpack打包，并且又不想影响我们在程序中已CMD AMD window/global全局方式进行引用，那就可以通过配置externals
①先使用script将cdn引入
externals:{
    'jquery': 'jQuery', // key是jquery是一个包的名字， value是全局的名字
}
②html-webpack-externals-plugin
外链CDN
new htmlWebpackExternalsPlugin({
    externals:[
        module: 'react',// 包名
        entry: '...',//CDN的路径
        global: 'React'//从全局对象的哪个属性上获取导出的这个值
    ]
})

# watch
监听文件
watch: true,
watchOptions:{
    ignored: /node_modules/, //不监听的文件夹
    aggregateTimeout: 300,//文件改变后等多场时间再去改变
    poll: 1000// 每秒的轮训次数
}
# 添加商标
new webpack.banner

# 静态资源拷贝
copy-webpack-plugin
new copyWebpackPlugin([{
    from: path.join(), //从哪拷
    to: ,//拷贝到哪 
}])
# 服务器代理
devServer在内部其实就是一个express服务器
devServer:{
        contentBase: path.join(__dirname, 'dist'),//这是产出文件的根目录
        port: 8080,
        host: 'localhost',
        before(app){ // 配置代理服务器， 简单的模拟一下接口， 其实before就是一个钩子， 此钩子会在服务器启动运行之前执行    
            app.get('/api/users', function(req, res){
                console.log(req.url);
                res.json([{id: 1, name: 'zf'}])
            })
        }
        <!-- proxy: {
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {"^/api": ""}
            }
        } -->
}, 

# webpack-dev-middleware 中间件


# resolve
定义了一些查找文件的规则
resolve:{
    extensions: [''],
    alias: {// 设置别名
        'bootstrap': path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css')
    },
    modules: ["文件夹1", "文件夹2"], //减少查找的路径 添加额外的查找路径
    mainFileds: [], // package.json中查找的字段
    mainFiles: [], // 包中查找的文件
    
}
resolveLoaders:{// 指定如何查找loader
     modules: ["文件夹1", "文件夹2"], //减少查找的路径 添加额外的查找路径
}

# noParse
哪些文件不需要解析， 因为这类的文件不需要进行解析并差查看其里面依赖了哪些文件。
module:{
    noParse: /jquery|lodash/,
    rules: []
}

# webpack.DefinePlugin
定义一些常亮
new webpack.DefinePlugin({
    PRODUCTION: JSON.stringfy(true),
    VERSION: '1',
    EXPRESSION: "1+2",
    COPYRIGHT:{
        AUTHOR: JSON.stringfy("珠峰培训")
    }
})

# InnorePlugin
用于忽略某些特定的模块， 让webpack不把这些指定的模块打包进去
new webpack.IgnorePlugin(/^\.\/locale/, /moments$/)


# 区分环境变量

”scripts“: {
    build: 'webpack',
    build-dev: 'webpack --env=development',
    build-online: 'webpack --env=production',
}
module.exports = (env)=>{
    return {
        配置参数
    }
}
console.log(process.env.NODE_ENV)

压缩时一定要把devTool关掉 

# 拆分配置
webpack-merge
const {smart} = require('webpack-merge')
# 优化图片
image-webpack-plugin

# 多入口
多个入口js文件
多个入口html文件
借助glob
const glob = require('glob');
const entryFiles = glob.sync('./src/entries/*.js');
const entry = {};
const htmlWebpackPlugins = [];
entryFiles.forEach((entryFile)=>{
    let entryName = path.basename(entryFile, '.js');
    entry[entryName] = entryFile
    htmlWebpackPlugins.push(`该有的配置（记得修改chunks）`)
})
# 日志优化

stats: ''//自带， 写入配置项即可
    normal 标准输出
    minimal 发生错误和新的编译输出
    none 没有输出
    verbose 全部输出
    errors-only 只在错误时输出
friendly-errors-webpack-plugin
new FriendlyErrorsWebpackPlugin()

# 费时分析 speed-measure-webpack-plugin   
let smw = new speed-measure-webpack-plugin();

module.exports = smw.wrap({

})
# 性能分析 webpack-bundle-analyzer
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
new BundleAnalyzer();// 默认会自动打开浏览器
手动配置
new BundleAnalyzer({
    analyzerMode: 'disabled',// 不启动展示打包报告的http服务器
    gegerateStatsFile: true//是否生成stas.json文件
})
配置scripts
{
    "scripts": {
        "generateAnalyzFile": "webpack --profile --json > stats.json",//生成分析文件
        "analyz": "webpack-bundle-analyzer --port 8888 ./dist/stas.json"//启动展示打包报告的http服务器
    }
}
