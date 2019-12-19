// 引入模块
const http = require('http');
let bindRender = require('./bindRender');
let router = require('./router')
// 创建服务器
const app = http.createServer()
// 监听端口
app.listen(3005, () => {
    console.log('server is running at http://127.0.0.1:3005');
})
// 注册监听用户请求的事件
// req和res这两个对象在服务器端和客户端通讯的时候非常重要
app.on('request', (req, res) => {
    // 调用bindRender方法
    bindRender(req, res);
    // 调用路由
    router(req, res)
});
//