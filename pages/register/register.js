getApp();

var e = require("../../utils/request.js");

Page({
    data: {
        tempId: [],
        logo: ""
    },
    onLoad: function(o) {
        var t = this;
        e.post("friend.setup/details", {}, function(e) {
            console.log("data", e), t.setData({
                logo: e.data.logo
            });
        }, !1, function() {}), e.post("friend.subscribe_message/index", {
            type: 1
        }, function(e) {
            console.log("data", e), t.setData({
                tempId: e.data
            });
        }, !1, function() {});
    },
    onReady: function() {},
    register: function() {
        var o = this, t = JSON.parse(wx.getStorageSync("userzhuce"));
        console.log("userzhuce", t), e.post("friend.user/edit", t, function(e) {
            var t = o;
            console.log("tempId", t.data.tempId), wx.requestSubscribeMessage({
                tmplIds: t.data.tempId,
                success: function(e) {
                    return console.log("requestSubscribeMessage", e), "requestSubscribeMessage:ok" == e.errMsg ? (wx.switchTab({
                        url: "/pages/mine/mine"
                    }), !0) : (wx.switchTab({
                        url: "/pages/mine/mine"
                    }), !1);
                },
                fail: function(e) {
                    console.log("requestSubscribeMessage", e);
                }
            });
        }, !1, function() {});
    },
    go_protocol: function() {
        wx.navigateTo({
            url: "/pages/richTxt/richTxt?type=2"
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});