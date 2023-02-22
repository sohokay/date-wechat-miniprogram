Page({
    data: {
        node: ""
    },
    onLoad: function(n) {
        var o = wx.getStorageSync("node");
        this.setData({
            node: o
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});