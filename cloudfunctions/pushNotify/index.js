// 云函数入口文件
const cloud = require('wx-server-sdk')
// 使用当前云环境
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
// 使用云数据库
const db = cloud.database()
const kTableName = 'todo'
// 云函数入口函数
exports.main = async (event, context) => {
    try {
        // 从云开发数据库中查询等待发送的消息列表
        const msgArr = await db
            .collection(kTableName)
            // 查询条件
            .where({
                checked: false,
                pushed: false,
            })
            .get()

        for (const msgData of msgArr.data) {
            // 发送订阅消息
            await cloud.openapi.subscribeMessage.send({
                touser: msgData._openid, // 要发送用户的openid
                page: 'pages/index/index', // 用户通过消息通知点击进入小程序的页面
                lang: 'zh_CN',
                // 订阅消息模板ID
                // 替换为你的模板id!
                templateId: 'fMowwV4guupnMSVaF42ylysF_u-sNAdxdjN7uzXwV1c',
                data: {
                    // 待办的主题
                    thing1: {
                        value: msgData.content === '' ? '无' : sliceBodyStr(msgData.content, 16)
                    },
                    // 待办的详情
                    thing4: {
                        value: '别忘了待办事项哟'
                    },
                }
            })
            // 发送成功后将pushed数据状态重置
            db
                .collection(kTableName)
                .doc(msgData._id)
                .update({
                    data: {
                        pushed: true
                    },
                })
        }
        return msgArr
    } catch (e) {
        return e
    }
}

function sliceBodyStr(str, length) {
    if (str.length <= length) {
        return str
    } else {
        return str.slice(0, length) + '...'
    }
}