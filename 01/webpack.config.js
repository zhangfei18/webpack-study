const path = require('path');
module.exports = {
    mode: 'development',// production node
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),//输出的目录只能是绝对目录
        filename: 'bundle.js'
    },
    devServer:{
        compress: true,//默认开启gzip压缩
        contentBase: path.join(__dirname, 'dist'),//这是产出文件的根目录
        port: 8080,
        host: 'localhost'
    }, 
    module:{
        rules:[
            {
                test: '/\.css$/',//如果require或import的文件是css的文件的话
                use: ['style-loader', 'css-loader'],//从右向左
            }
        ]
    }
}