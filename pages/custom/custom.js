var t = getApp(), n = require("../../utils/request.js");

Page({
    data: {
        urls: "",
        imgurl: ""
    },
    onLoad: function(n) {
        this.setData({
            urls: t.globalData.siteroot2
        });
    },
    go_kefu: function() {
        wx.navigateTo({
            url: "/pages/wodehongniang/wodehongniang?type=1"
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        n.post("friend.setup/details", {}, function(n) {
            console.log("data", n), "200" == n.status && t.setData({
                imgurl: n.data.tel_bg_url
            });
        }, !1, function() {}), wx.getStorageSync("userId") && n.post("friend.pull_strings/index", {
            page: 1,
            user_id: wx.getStorageSync("userId"),
            status: 1,
            is_read: 1,
            limit: 10
        }, function(t) {
            console.log("data", t), n.post("friend.feedback/index", {
                user_id: wx.getStorageSync("userId"),
                page: 1,
                is_read: 1,
                limit: 10
            }, function(n) {
                console.log("data2", n);
                var e = 0;
                if ("200" == t.status && (e += t.data.length), "200" == n.status && (e += n.data.length), 
                console.log("yigong", e), 0 == e) wx.removeTabBarBadge({
                    index: 3
                }); else {
                    var o = JSON.stringify(e);
                    wx.setTabBarBadge({
                        index: 3,
                        text: o
                    });
                }
            }, !1, function() {});
        }, !1, function() {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});