const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
module.exports = {
    // 入口路径配置
    entry: "./src/js/index.js",
    // 出口路劲配置
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "./js/build.js"
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
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 3 * 1024,
                    name: './imgs/[hash:10].[ext]'
                }
            }]
        }, {
            test: /\.html$/i,
            loader: 'html-loader',
        }, ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        port: 8848, //设置端口号
        host: "127.0.0.1", //打开地址
        open: true, //是否自动刷新
        compress: true, //是否开启自动压缩
        quiet: true //开启静谧模式 只有三行
    }
}