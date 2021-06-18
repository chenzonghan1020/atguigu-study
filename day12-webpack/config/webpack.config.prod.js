const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    // 入口路径配置
    entry: "./src/js/index.js",
    // 出口路劲配置
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "./js/build.js",
        publicPath:'/'
    },
    // 生产环境
    mode: "production",
    // 配置loader
    module: {
        rules: [{
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, {
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
                    name: 'imgs/[hash:10].[ext]'
                }
            }]
        }, {
            test: /\.html$/i,
            loader: 'html-loader',
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }]
    },
    optimization: {
    minimizer: [
        new CssMinimizerPlugin(),
    ],
},
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: {
            //去除空格
            collapseWhitespace: true,
            //去除注释
            removeComments: true,
            //移除默认属性
            removeRedundantAttributes: true,
            //移除script的type属性
            removeScriptTypeAttributes: true,
            //移除link的type属性
            removeStyleLinkTypeAttributes: true,
            //使用doctype
            useShortDoctype: true
        }
    }),new MiniCssExtractPlugin({
        filename:'css/[name].css'
    })],
    devServer: {
        port: 8848, //设置端口号
        host: "127.0.0.1", //打开地址
        open: true, //是否自动刷新
        compress: true, //是否开启自动压缩
        quiet: true //开启静谧模式 只有三行
    }
}