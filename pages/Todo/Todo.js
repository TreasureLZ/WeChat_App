// pages/Todo/Todo.js
Component({
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 确定时间
        bindDateChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
              date: e.detail.value
            })
        },
        // 生成一个uuid
        getUUID(randomLength = 12) {
            return Math.random().toString().substr(2, randomLength) + Date.now().toString(36)
        },
        // 监听输入框按键
        keyInput(e) {
            this.setData({
                inputedValue: e.detail.value
            })
        },
        // 点击提交按钮
        inputSubmit() {
            // 设置新条目的id
            const newID = this.getUUID()
            const newItem = {
                id: newID,
                content: this.data.inputedValue,
                checked: false,
                pushed: false
            }
            if (this.data.inputedValue == undefined || this.data.inputedValue === "") {
                wx.showToast({
                    title: '请先输入再提交哦！',
                    icon: 'none',
                    duration: 1500
                })
                return;
            }
            this.setData({
                inputedValue: "",
            })
            // 将newItem提交到云数据库
            this.uploadData(newItem)
            // 订阅服务
            // this.subscribe()
            // 发送邮件服务
            // getApp().cloud().callFunction({
            //     name: 'sendEmail',
            //     data: {
            //         content: newItem.content
            //     },
            // })
            // 导航栏跳转
            wx.switchTab({
              url: '/pages/index/index',
              success: function(e){
                var page = getCurrentPages().pop()
                if (page == undefined || page == null) return;
                page.onLoad()
              }
            })
            // 关闭所有页面，打开url
            // wx.reLaunch({
            //     url: '/pages/index/index',
            // })
        },
        // 向用户申请推送服务
        subscribe() {
            const templateId = 'fMowwV4guupnMSVaF42ylysF_u-sNAdxdjN7uzXwV1c'
            wx.requestSubscribeMessage({
                tmplIds: [templateId],
                success(res) {
                    console.log('订阅成功 ', res)
                },
                fail(err) {
                    console.log('订阅失败 ', err)
                }
            })
        },
        async uploadData(item) {
            const db = await getApp().database()
            db.collection('todo').add({
                data: item
            })
        },
    }
})