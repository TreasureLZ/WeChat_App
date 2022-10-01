// app.js
App({
    onLaunch() {
        this.initcloud()
        this.globalData = {
            // 用于存储待办记录的集合名称
            collection: 'Todo',
        }
    },
    // 初始化云开发环境
    initcloud() {
        wx.cloud.init({
            traceUser: true,
            env: "memorandum-1ghswjxtdadb8828"
        })
        // 装载云函数操作对象返回方法
        this.cloud = () => {
            return wx.cloud // 
        }
    },
    // 获取云数据库实例
    async database() {
        return (await this.cloud()).database()
    },
})