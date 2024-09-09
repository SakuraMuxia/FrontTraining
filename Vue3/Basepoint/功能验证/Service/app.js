const express = require('express')
const path = require('path')
const route = require('./data/route.json')
// 创建应用
const app = express()
// 使用内置中间件，托管静态文件
app.use(express.static(path.join(__dirname, 'public')))

// 匹配get
app.get("/route", (req, res) => {
    // 设置响应体
    res.json({
        ok: 200,
        msg: "success",
        data: route
    })
})
// 监听应用
app.listen(10010, () => {
    console.log("Server is running on 10010");
})
