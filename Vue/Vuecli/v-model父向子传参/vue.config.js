const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        open: true,// 自动打开浏览器
        port: 8086,// 指定端口号
        host: "127.0.0.1",// 指定host
    },
})
