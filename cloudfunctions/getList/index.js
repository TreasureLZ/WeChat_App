// 云函数入口文件
const cloud = require('wx-server-sdk')
// 使用当前云环境
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
// 获取云数据库对象
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    // 获取微信用户的 openID
    const openID = cloud.getWXContext().OPENID
    // 查询当前用户的所有待办数据
    const fetchResult = await db
        .collection('todo')
        .where({
            _openid: openID,
            checked: false,
        })
        .get()
    return fetchResult
}