// 引入框架
const express = require('express')
// 引入控制器模块
let heroCtrl = require('./controller')
// 创建路由对象
let router = express.Router()
// 路由分发
router.get('/', (req, res) => {
    // 显示英雄索引页面
    heroCtrl.showIndexPage(req, res)
})
    .get('/add', (req, res) => {
        // 显示英雄添加页面
        heroCtrl.showAddPage(req, res)
    })
    .get('/edit', (req, res) => {
        // 显示英雄编辑页面
        heroCtrl.showEditPage(req, res)
    })
    .get('/info', (req, res) => {
        // 显示信息页面
        heroCtrl.showInfoPage(req, res)
    })
    .get('/getAllHeroInfo', (req, res) => {
        // 显示所有英雄信息页面
        heroCtrl.getAllHeroInfo(req, res)
    })
    .get('/getOneHero', (req, res) => {
        // 获取单个英雄信息
        heroCtrl.getOneHeroInfo(req, res)
    })
    .get('/deleteOneHero', (req, res) => {
        // 删除单个英雄
        heroCtrl.deleteOneHero(req, res)
    })
    .post('/addHeroInfo', (req, res) => {
        // 添加英雄
        heroCtrl.addHeroInfo(req, res)
    })
    .get('/showOneHeroInfo', (req, res) => {
        // 显示一个英雄
        heroCtrl.showOneHeroInfo(req, res)
    })
    .post('/updateHeroInfo', (req, res) => {
        heroCtrl.updateHeroInfo(req, res)
    })
// 暴露路由
module.exports = router