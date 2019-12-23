// model层就是专门用来和数据库打交道的
const mysql = require('mysql')
// 创建数据库连接对象
let conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database:'hero',
    dateStrings: true,
})
// 开启连接
conn.connect()
// 处理数据方面的业务
module.exports = {
    // 获取所用英雄的数据
    getAllHeroData(callback) {
        // 使用sql语句查询所有的英雄数据
        let sql = 'select * from heros'
        conn.query(sql, (err, result) => {
            if (err) return callback(err)
            callback(null, result)
        })
    },
    // 根据id获取单个英雄数据
    getOneHeroInfo(id, callback) {
        let sql = 'select * from heros where id=?'
        conn.query(sql, [id], (err, result) => {
            if(err) return callback(err)
            callback(null, result)
        })
    },
    // 删除英雄
    deleteOneHero(id, callback) {
        let sql = 'delete from heros where id=?'
        conn.query(sql, [id], (err, result) => {
            if (err) return callback(false)
            callback(true)
        })
    },
    // 添加英雄数据
    addHeroInfo(hero, callback) {
        let sql = 'insert into heros set ?'
        conn.query(sql, [hero], (err, result) => {
            if (err) return callback(false)
            callback(true)
        })
    },
    // 更新英雄数据
    updateHeroInfo(hero, callback) {
        let { id } = hero
        delete hero.id
        let sql = 'update heros set ? where id=?'
        conn.query(sql, [hero, id], (err, result) => {
            if (err) return callback(false)
            callback(true)
        })
    }
}