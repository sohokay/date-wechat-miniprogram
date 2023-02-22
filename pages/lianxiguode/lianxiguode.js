getApp();

var t = require("../../utils/request.js");

Page({
    data: {
        page: 0,
        listInfo: []
    },
    onLoad: function(t) {
        this.setData({
            userId: wx.getStorageSync("userId")
        }, function() {});
    },
    onReady: function() {},
    getchartsList: function() {
        var a = this;
        a.data.userId > 0 && t.post("friend.pull_strings/index", {
            page: a.data.page + 1,
            user_id: wx.getStorageSync("userId"),
            limit: 10
        }, function(t) {
            if (console.log("data", t), "200" == t.status) {
                var n, e = a.data.listInfo;
                "200" == t.status && (0 == e.length ? a.setData({
                    listInfo: t.data,
                    page: a.data.page + 1
                }) : (n = e.concat(t.data), a.setData({
                    listInfo: n,
                    page: a.data.page + 1
                }))), wx.hideToast();
            }
        }, !1, function() {});
    },
    onShow: function() {
        var t = this, a = wx.getStorageSync("userId");
        t.setData({
            page: 0,
            userId: a,
            listInfo: []
        }, function() {
            t.getchartsList();
        });
    },
    gochat: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/userChart/userChart?id=" + a
        });
    },
    onHide: function() {},
    go_system_msg: function() {
        this.data.userId > 0 ? wx.navigateTo({
            url: "/pages/xitongxiaoxi/xitongxiaoxi"
        }) : wx.showModal({
            title: "温馨提示",
            content: "您还没有登录，是否先去登录？",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "/pages/login/login"
                }) : t.cancel;
            }
        });
    },
    go_friends: function() {
        this.data.userId > 0 ? wx.navigateTo({
            url: "/pages/lianxiguode/lianxiguode"
        }) : wx.showModal({
            title: "温馨提示",
            content: "您还没有登录，是否先去登录？",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "/pages/login/login"
                }) : t.cancel;
            }
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getchartsList();
    },
    onShareAppMessage: function() {}
});