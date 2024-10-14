const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 配置入口文件
    entry: './src/index.ts',
    // 配置打包的出口位置
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'js/bundle.js'
    },
    // 开发模式
    mode: 'development',
    // 配置loader
    module: {
        rules: [
            // 使用ts-loader插件，把ts或tsx转为js
            // .jsx 使用jsx语法写react模版的文件
            // .tsx 使用ts语法写react模版的文件
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    // 配置缩写，导入时可以缩写后缀，添加查找顺序
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    // 配置插件
    plugins: [
        new HtmlWebpackPlugin({
            // 以 ./public/index.html 为模版，把打包好的js插入到html的body标签中
            template: './public/index.html',
            inject: 'body'
        })
    ],
    // 配置服务启动
    devServer: {
        port: 5000,
        open: true
    }
}