// 引入model层
const heroModel = require('./model');
const moment = require('moment')
// 业务逻辑处理
module.exports = {
    // 显示首页
    showIndexPage(req, res) {
        // 获取所有的英雄
        heroModel.getAllHeroData((err, result) => {
            if (err) return res.json({
                code: 201,
                msg: '没有数据',
            })
            // 将数据渲染到页面
            res.render('index', { data: result });
        })
    },
    // 添加英雄页面
    showAddPage(req, res) {
        res.render('add', {})
    },
    // 编辑英雄页面
    showEditPage(req, res) {
        res.render('edit', {})
    },
    // 显示英雄详情页面
    showInfoPage(req, res) {
        res.render('info', {})
    },
    // 渲染所有英雄数据
    getAllHeroInfo(req, res) {
        // 获取所有英雄数据
        heroModel.getAllHeroData((err, result) => {
            if (err) return res.json({
                code: 201,
                msg: '获取英雄失败',
            })
            res.json({
                code: 200,
                msg: '获取英雄成功',
                data: result
            })
        })
    },
    // 渲染单个英雄数据
    getOneHeroInfo(req, res) {
        // 获取到id,根据id获取对饮的英雄数据
        let { id } = req.query;
        heroModel.getOneHeroInfo(id, (err, result) => {
            console.log(result)
            if (err) return res.json({
                code: 201,
                msg: '英雄不存在',
            })
            res.json({
                code: 200,
                msg: '获取成功',
                data: result
            })
        })
    },
    // 删除英雄数据
    deleteOneHero(req, res) {
        // 获取到ID根据id来删除英雄
        let { id } = req.query
        heroModel.deleteOneHero(id, result => {
            if (result) return res.json({
                code: 200,
                msg: '删除成功',
            })
            res.json({
                code: 201,
                msg: '删除失败',
            })
        })
    },
    // 添加英雄信息
    addHeroInfo(req, res) {
        let hero = req.body;
        hero.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        heroModel.addHeroInfo(hero, result => {
            if (result) return res.json({
                code: 200,
                msg: '添加成功'
            })
            res.json({
                code: 201,
                msg: '添加失败'
            })
        })
    },
    // 获取 一个英雄数据
    showOneHeroInfo(req, res) {
        let { id } = req.query
        heroModel.getOneHeroInfo(id, (err, result) => {
            if (err) return res.json({
                code: 201,
                msg: '获取失败'
            })
            res.json({
                code: 200,
                msg: '获取成功',
                data: result
            })
        })
    },
    // 更新英雄数据
    updateHeroInfo(req, res) {
        let hero = req.body
        hero.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        heroModel.updateHeroInfo(hero, result => {
            if (result) return res.json({
                code: 200,
                msg: '更新成功'
            })
            res.json({
                code: 201,
                msg: '更新失败'
            })
        })
    }
}