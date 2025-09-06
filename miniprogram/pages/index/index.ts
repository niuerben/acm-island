// pages/index/index.ts

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contestList: [] as Array<{}>,
    addContestName: '',
    addContestTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loadContestList()
  },

  onContestName(e:any) {
    this.setData({
      addContestName: e.detail.value
    })
  },
  onContestTime(e:any) {
    this.setData({
      addContestTime: e.detail.value
    })
  },
  onContestList() {
    console.log('开始上传数据库日历表')
    const db = wx.cloud.database()
    db.collection('contestLib') 
      .add({
        data: {
          contestName: this.data.addContestName,
          contestTime: this.data.addContestTime
        }
      })
      .then(res => {
        this.loadContestList()
        console.log(res)
        wx.showToast({title: '提交成功', icon: 'success'})
      })
      .catch(err =>{
        wx.showToast({title: '提交失败', icon: 'error'})
        console.error(err)
      })
  },

  loadContestList() {
    console.log('开始获取数据库日历表')
    const db = wx.cloud.database()
    db.collection('contestLib')
      .get()
      .then(res => {
        console.log('获取数据库数据包', res.data)
        const contestList = res.data.map(item => ({
          ...item,

        }))
        this.setData({contestList})
      })
  },
  deleteContestList(e:any) {
    const id = e.currentTarget.dataset.id
    const db = wx.cloud.database()
    console.log('id为', id)
    db.collection('contestLib').doc(id).remove()
      .then(res => {
        wx.showToast({ title: '删除成功', icon: 'success' });
        console.log(res)
        this.loadContestList(); // 删除后刷新列表
      })
      .catch(err => {
        wx.showToast({ title: '删除失败', icon: 'error' });
        console.error('删除失败', err);
      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})