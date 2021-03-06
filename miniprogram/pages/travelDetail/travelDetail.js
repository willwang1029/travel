// miniprogram/pages/travelDetail/travelDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    travelId:"",
    queryResult:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      travelId: options.id,
      createId:"",
      createName: ""
    }) 
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('travel_info').where({
      _id: this.data.travelId
    }).get({
      success: res => {
        this.setData({
          //queryResult: JSON.stringify(res.data, null, 2)
          queryResult:res.data[0],
          //title:res.data.title
          createId:res.data[0].create_id,          
        })
        db.collection('user').where({
          _id: this.data.createId
        }).get({
          success: cres => {
            this.setData({
              //queryResult: JSON.stringify(res.data, null, 2)
              
              //title:res.data.title
              createName: cres.data[0].name
            })


            console.log('[数据库] [查询记录] 成功: ', cres)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })

        
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})