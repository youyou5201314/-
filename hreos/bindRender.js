// 自定义用户模块
// 第一步 引入模块
const template = require('art-template');
const path = require('path');
// 第二步 使用方法处理
function bindRender(req, res) {
    res.render = function (filename, obj) {
        let str = template(path.join(__dirname, './views/' + filename + '.html'), obj)
        res.end(str);
    }
    res.json = function (obj) {
        this.end(JSON.stringify(obj))
    }
}
// 第三步 暴露方法给外部使用
module.exports = bindRender;