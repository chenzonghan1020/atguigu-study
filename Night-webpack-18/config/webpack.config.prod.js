const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    // 配置入口
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '../build'), //出口路径
        filename: './js/build.js',
        publicPath: "/"
    },
    // 开发环境
    mode: "production",
    // 配置loader
    module: {
        rules: [{
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, {
                loader: "css-loader" // translates CSS into CommonJS
            },{
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        'postcss-preset-env',
                        {
                          // 其他选项
                        },
                      ],
                    ],
                  },
                },
              }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }, {
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 4 * 1024,
                    name: "imgs/[hash:10].[ext]"
                },
            }, ],
        }, {
            test: /\.html$/i,
            loader: 'html-loader',
        },{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          } ]
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
    }), new MiniCssExtractPlugin({
        filename: 'css/[name].css'
    })],
    // 压缩css
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
      },
    // 服务器配置
    devServer: {
        port: 8848,
        host: '127.0.0.1',
        open: true,
        compress: true, //启动gzip压缩
        quiet: true, //启动静默模式
    }
}