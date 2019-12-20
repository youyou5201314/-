// 引入模块
const fs = require('fs');
const path = require('path')
const moment = require('moment')
// 数据处理 使用对象方法来处理 这样方便暴露
module.exports = {
    // 获取英雄数据
    getAllHero(callback) {
        fs.readFile(path.join(__dirname, './heros.json'), 'utf8', (err, data) => {
            if (err) return callback(err);
            callback(null, data)
        })
    },
    getOneHero(id, callback) {
        this.getAllHero((err, data) => {
            if (err) return callback(err);
            // 因为读取到的数据是一个字符串形式的数组，要转换成一个数组
            let heroAll = JSON.parse(data);
            let obj;
            heroAll.some(item => { //item表示的是数组中的每一项
                if (id == item.id) {
                    obj = item;
                }
            })
            callback(null, obj)
        })
    },
    // 添加英雄
    addHeroInfo(hero, callback) {
        this.getAllHero((err, data) => {
            if (err) return callback(false)
            let heroArr = JSON.parse(data)
            // 添加的数据没有id,没有data
            hero.data = moment().format('YYYY-MM-DD HH:mm:ss')//添加英雄时间
            hero.id = (+heroArr[heroArr.length - 1].id + 1).toString();
            heroArr.push(hero)
            // 将这个写回JSON中
            fs.writeFile(path.join(__dirname, './heros.json'), JSON.stringify(heroArr), err => {
                if (err) return callback(false)
                callback(true)
            })
        })
    },
    // 编辑英雄
    editHeroInfo(hero, callback) {
        // 获取所有的英雄
        this.getAllHero((err, data) => {
            if (err) return callback(false)
            let heroArr = JSON.parse(data)
            hero.data = moment().format('YYY-MM-DD HH:mm:ss');
            // 需要在所有的数据中找到我们编辑的这条数据匹配
            heroArr.some((item, index) => {
                if (hero.id == item.id) {
                    // 将原来这条数据删除，然后将我们修改的数据重新加载进来
                    heroArr.splice(index, 1, hero);
                    return;
                }
            })
            // 将新的数据写回到JSON中
            fs.writeFile(path.join(__dirname, './heros.json'), JSON.stringify(heroArr), err => {
                if (err) return callback(false);
                callback(true)
            })
        })
    },
    // 删除英雄数据
    deleteHeroInfo(id, callback) {
        this.getAllHero((err, data) => {
            if (err) return callback(false)
            let heroArr = JSON.parse(data);
            heroArr.some((item, index) => {
                if (id === item.id) {
                    heroArr.splice(index, 1)
                }
            })
            fs.writeFile(path.join(__dirname, './heros.json'),JSON.stringify(heroArr), err => {
                if (err) return callback(false)
                callback(true)
            })
        })
    }
}