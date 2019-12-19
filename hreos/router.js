// 路由模块  是负责路由的分发，不做处理业务
const fs = require('fs');
const urlModel = require('url');
const path = require('path');
// 引入控制器模块
let Ctrl = require('./controller')
// 封装一个路由方法
function router(req, res) {
    let url = req.url;
    let method = req.method;
    let pathname = urlModel.parse(url, true).pathname;
    let query = urlModel.parse(url, true).query
    req.query = query;
    // 给req添加一个pathname属性来储存pathname的值
    req.pathname = pathname;
    if (method == 'GET' && (pathname == '/' || pathname == '/index.html')) {
        Ctrl.showIndexPage(req, res)
    } else if (method == 'GET' && pathname == '/add.html') {
        Ctrl.showAddPage(req, res)
    } else if (method == 'GET' && pathname == '/edit.html') {
        Ctrl.showEditPage(req, res)
    } else if (method == 'GET' && pathname == '/info.html') {
        Ctrl.showInfoPage(req, res)
    } else if (method == 'GET' && pathname.startsWith('/node_modules')) {
        Ctrl.loadStaticResource(req, res)
    } else {
        res.end('404')
    }
}
// 暴露出去
module.exports = router;