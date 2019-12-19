// 引入模块
const fs = require('fs');
const path = require('path')
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
    }
}