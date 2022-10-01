// 云函数入口文件
const cloud = require('wx-server-sdk')
// 使用当前云环境
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
// 引入nodemailer
const nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
const config = {
    host: 'smtp.qq.com', // 邮箱smtp服务，不同厂家地址不一样
    port: 465, // 邮箱端口，不同厂家可能不一样
    auth: {
        user: '1664573841@qq.com', // 邮箱账号
        pass: 'thqgixmcutsabage' // 邮箱授权码
    }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async (event, context) => {
    // 创建一个邮件对象
    var mail = {
        from: '来自李临波 <1664573841@qq.com>',
        subject: 'Weapp [待办清单] 用户反馈',
        to: '1664573841@qq.com',
        text: event.content
    };
    let res = await transporter.sendMail(mail);
    return res;
}