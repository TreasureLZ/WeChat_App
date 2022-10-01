// index.js
Component({
    /**
     * 组件的初始数据
     */
    data: {
        items: [],
        inputedValue: "",
    },
    /**
     * 生命周期函数
     */
    lifetimes: {
        attached() {
            
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 初始化加载，读入数据
        onLoad(){
            getApp().cloud().callFunction({
                name: 'getList',
                complete: res => {
                    this.setData({
                        items:res.result.data
                    })
                }
            })
        },
        // 状态审核
        checkboxChange(e) {
            let items = JSON.parse(JSON.stringify(this.data.items))
            // 遍历items状态，找到checked状态变化的元素
            for (const [index, item] of items.entries()) {
                if (item.checked !== e.detail.value.includes(item.id)) {
                    // setData动态修改数据元素的一种方式
                    const key = `items[${index}].checked`
                    const checked = !item.checked
                    this.setData({
                        // 注意这里要加括号[] 
                        [key]: checked
                    })
                    // 调用云函数，更新数据库
                    getApp().cloud().callFunction({
                        name: 'updateCheck',
                        data: {
                            id: item.id,
                            checked: checked
                        }
                    })
                    break
                }
            }
        },
    }
})