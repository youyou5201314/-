// 引入模块
const fs = require('fs');
const path = require('path');
const querystring = require('querystring')
let bindRender = require('./bindRender')
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
        // 英雄的id在query中
        let { id } = req.query;
        heroData.getOneHero(id, (err, data) => {
            if (err) return res.end(JSON.stringify({
                code: 201,
                msg: '英雄不存在',
            }))
            res.render('edit', data);
        })
    },
    // 显示详情页面
    showInfoPage(req, res) {
        let { id } = req.query;
        heroData.getOneHero(id, (err, data) => {
            if (err) return res.end(JSON.stringify({
                code: 201,
                msg: '你查找的英雄不存在',
            }))
            res.render('info', data)
        })
    },
    // 添加英雄信息
    addHeroInfo(req, res) {
        // 获取用户调价的数据 定义一个变量暂存
        let str = '';
        // 注册监听数据变化事件
        req.on('data', chunk => {
            str += chunk;
        });
        // 注册事件监听数据是否传输完成
        req.on('end', () => {
            let hero = querystring.parse(str)
            heroData.addHeroInfo(hero, result => {
                if (result) return res.json({
                    code: 200,
                    msg: '添加成功',
                })
                res.json({
                    code: 201,
                    msg: '添加失败',
                })
            })
        })
    },
    // 编辑英雄信息
    editHeroInfo(req, res) {
        // 使用post请求，所以我们需要使用变量暂存数据
        let str = '';
        req.on('data', chunk => {
            str += chunk;
        })
        req.on('end', () => {
            let editHero = querystring.parse(str)
            // 调用数据层中的方法来对数据做进一步操作
            heroData.editHeroInfo(editHero, (result) => {
                if (result) return res.end(JSON.stringify({
                    code: 200,
                    msg: '修改成功',
                }))
                res.end(JSON.stringify({
                    code: 201,
                    msg: '修改失败',
                }))
            })
        })
    },
    // 删除英雄信息
    deleteHeroInfo(req, res) {
        let { id } = req.query;
        heroData.deleteHeroInfo(id, result => {
            console.log(result);
            
            if (result) return res.end(JSON.stringify({
                code: 200,
                msg: '删除成功',
            }))
            res.end(JSON.stringify({
                code: 201,
                msg: '删除失败',
            }))
        })
    },
    // 加载静态资源
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