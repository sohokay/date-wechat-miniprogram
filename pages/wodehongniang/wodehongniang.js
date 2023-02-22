getApp();

var t = require("../../utils/request.js");

Page({
    data: {},
    onLoad: function(n) {
        var e = this, o = "";
        1 == n.type ? (o = "friend.matchmaker/exclusive", wx.setNavigationBarTitle({
            title: "私人订制"
        })) : o = "friend.matchmaker/details", t.post(o, {
            user_id: wx.getStorageSync("userId")
        }, function(t) {
            "200" == t.status ? e.setData({
                hongniang: t.data
            }) : wx.showToast({
                title: t.message,
                duration: 2e3,
                icon: "none"
            });
        }, !1, function() {});
    },
    copy: function(t) {
        wx.setClipboardData({
            data: this.data.hongniang.weixin,
            success: function(t) {
                wx.showToast({
                    title: "微信号已复制"
                });
            }
        });
    },
    onReady: function() {},
    register: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});