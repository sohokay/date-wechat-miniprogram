Page({
    data: {},
    onLoad: function(n) {},
    logout: function() {
        wx.showModal({
            title: "温馨提示",
            content: "您确定要退出登录吗？",
            success: function(n) {
                n.confirm ? (wx.clearStorageSync(), wx.navigateBack({
                    delta: 1
                })) : n.cancel;
            }
        });
    },
    onReady: function() {},
    torich: function(n) {
        var o = n.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/richTxt/richTxt?type=" + o
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});