getApp();

var t = require("../../utils/request.js");

Page({
    data: {
        kefu: {}
    },
    onLoad: function(n) {
        var o = this;
        t.post("friend.matchmaker/service", {}, function(t) {
            console.log("data", t), wx.hideToast(), o.setData({
                kefu: t.data
            });
        }, !1, function() {});
    },
    copy: function(t) {
        wx.setClipboardData({
            data: this.data.kefu.weixin,
            success: function(t) {
                wx.showToast({
                    title: "微信号已复制"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});