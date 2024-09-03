const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack")
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        open: true,// 自动打开浏览器
        port: 8080,// 指定端口号
        host: "127.0.0.1",// 指定host
    },
    // 关闭编译时的特征标志
    chainWebpack: (config) => {
        config.plugin('define').tap((definitions) => {
            Object.assign(definitions[0], {
                __VUE_OPTIONS_API__: 'true',
                __VUE_PROD_DEVTOOLS__: 'false',
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
            })
            return definitions
        })
    },
    // 配置Jquery
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery",
                "windows.$": "jquery",
                Popper: ["popper.js", "default"]
            })
        ]
    },
})