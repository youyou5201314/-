// 引入模块
const fs = require('fs');
const path = require('path');
let heroData = require('./modelData');
// 处理方法
// 因为需要很多方法来处理 所以暴露也需要很多方法
// 使用对象来暴露方法 将暴露方法放在对象中
module.exports = {
    // 显示首页
    showIndexPage(req, res) {
        heroData.getAllHero((err, data) => {
            if (err) return res.end(JSON.stringify({
                code: 201,
                msg: '数据获取失败',
            }))
            let heroArr = JSON.parse(data);
            res.render('index', { data: heroArr })
        })
    },
    // 显示添加页面
    showAddPage(req, res) {
        res.render('add', {})
    },
    // 显示编辑页面
    showEditPage(req, res) {
        res.render('edit', {});
    },
    // 显示详情页面
    showInfoPage(req, res) {
        let id = req.query.id;
        heroData.getOneHero(id, (err, data) => {
            if (err) return res.end(JSON.stringify({
                code: 201,
                msg: '你查找的英雄不存在',
            }))
            res.render('info', data)
        })
    },
    loadStaticResource(req, res) {
        fs.readFile(path.join(__dirname, req.pathname), (err, data) => {
            if (err) return console.log(err.message);
            if (req.pathname.endsWith('.css')) {
                res.writeHeader(200, {
                    'Content-type': 'text/css;charset=utf-8;'
                })
            }
            res.end(data)
        })
    }
}
//暴露出去
// module.exports = obj;