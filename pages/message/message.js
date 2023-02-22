getApp();

var t = require("../../utils/request.js");

Page({
    data: {
        page: 0,
        listInfo: [],
        tempId: []
    },
    onLoad: function(e) {
        var a = this;
        a.setData({
            userId: wx.getStorageSync("userId")
        }, function() {}), t.post("friend.subscribe_message/index", {
            type: 2
        }, function(t) {
            console.log("data", t), a.setData({
                tempId: t.data
            });
        }, !1, function() {});
    },
    onReady: function() {},
    getchartsList: function() {
        var e = this;
        e.data.userId > 0 && (t.post("friend.pull_strings/index", {
            page: 1,
            user_id: wx.getStorageSync("userId"),
            status: 1,
            is_read: 1,
            limit: 10
        }, function(a) {
            console.log("data", a), t.post("friend.feedback/index", {
                user_id: wx.getStorageSync("userId"),
                page: 1,
                is_read: 1,
                limit: 10
            }, function(t) {
                console.log("data2", t);
                var n = 0;
                if ("200" == a.status && (n += a.data.length), "200" == t.status ? (e.setData({
                    new_sysmsg_count: t.data.length
                }), n += t.data.length) : e.setData({
                    new_sysmsg_count: 0
                }), console.log("yigong", n), 0 == n) wx.removeTabBarBadge({
                    index: 3
                }); else {
                    var s = JSON.stringify(n);
                    wx.setTabBarBadge({
                        index: 3,
                        text: s
                    });
                }
            }, !1, function() {});
        }, !1, function() {}), t.post("friend.pull_strings/index", {
            page: e.data.page + 1,
            user_id: wx.getStorageSync("userId"),
            lately: 1,
            limit: 10
        }, function(t) {
            if (console.log("data", t), "200" == t.status) {
                var a, n = e.data.listInfo;
                "200" == t.status && (0 == n.length ? e.setData({
                    listInfo: t.data,
                    page: e.data.page + 1
                }) : (a = n.concat(t.data), e.setData({
                    listInfo: a,
                    page: e.data.page + 1
                }))), wx.hideToast();
            }
        }, !1, function() {}));
    },
    onShow: function() {
        var t = this, e = wx.getStorageSync("userId");
        t.setData({
            page: 0,
            userId: e,
            listInfo: []
        }, function() {
            t.getchartsList();
        });
    },
    gochat: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name;
        wx.requestSubscribeMessage({
            tmplIds: this.data.tempId,
            success: function(t) {
                return console.log("requestSubscribeMessage", t), "requestSubscribeMessage:ok" == t.errMsg ? (wx.navigateTo({
                    url: "/pages/userChart/userChart?id=" + e + "&name=" + a
                }), !0) : (wx.navigateTo({
                    url: "/pages/userChart/userChart?id=" + e + "&name=" + a
                }), !1);
            },
            fail: function(t) {
                console.log("requestSubscribeMessage", t);
            }
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
    go_my_msg: function() {
        this.data.userId > 0 ? wx.navigateTo({
            url: "/pages/mytongzhi/mytongzhi"
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