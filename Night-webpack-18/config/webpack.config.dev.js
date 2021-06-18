const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 配置入口
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'build'), //出口路径
        filename: './js/build.js'
    },
    // 开发环境
    mode: "development",
    // 配置loader
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }, {
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 4 * 1024,
                    name: "./imgs/[hash:10].[ext]"
                },
            }, ],
        }, {
            test: /\.html$/i,
            loader: 'html-loader',
        }, ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
    })],
    // 服务器配置
    devServer: {
        port: 8848,
        host: '127.0.0.1',
        open: true,
        compress: true, //启动gzip压缩
        quiet: true, //启动静默模式
    }
}