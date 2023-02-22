getApp();

var t = require("../../utils/request.js");

Page({
    data: {
        userInfo: {},
        hobby_name: [],
        personality_name: [],
        isclect: !1,
        isguanzhu: !1,
        userId: "",
        authenticate: "",
        xcxname: "",
        userImgList: []
    },
    onLoad: function(n) {
        var a = this, e = wx.getAccountInfoSync();
        console.log("accountInfo", e);
        var o = decodeURIComponent(n.scene);
        console.log("scene", o, n), n.id ? a.setData({
            user_id: n.id
        }, function() {
            console.log("onLoad2");
        }) : a.setData({
            user_id: o
        }, function() {
            console.log("onLoad1");
        }), t.post("friend.setup/details", {}, function(t) {
            console.log("data", t), a.setData({
                xcxname: t.data.name
            });
        }, !1, function() {});
    },
    showhead: function(t) {
        if (!(this.data.userImgList.length <= 0)) {
            for (var n = [], a = 0; a < this.data.userImgList.length; a++) n.push(this.data.userImgList[a].img_url);
            wx.previewImage({
                current: n[0],
                urls: n
            });
        }
    },
    fortune_action: function() {
        this.data.userId > 0 ? wx.navigateTo({
            url: "/pages/mianfeihongxian/mianfeihongxian?type=1&jieshaoId=" + this.data.user_id
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
    getUserInfo: function() {
        var n = this;
        t.post("friend.user/details", {
            user_id: n.data.user_id
        }, function(t) {
            if (console.log("data", t), wx.hideToast(), "200" == t.status) {
                var a = t.data, e = [];
                a.category_list.hobby_name && a.category_list.hobby_name.length > 0 && (e = a.category_list.hobby_name.split(","));
                var o = [];
                a.category_list.personality_name && a.category_list.personality_name.length > 0 && (o = a.category_list.personality_name.split(","));
                var s = [];
                if (a.album_list.length > 0) for (var i = 0; i < a.album_list.length; i++) 2 == a.album_list[i].status && s.push(a.album_list[i]);
                n.setData({
                    userInfo: a,
                    userImgList: s,
                    hobby_name: e,
                    personality_name: o
                });
            } else wx.showToast({
                title: t.message,
                duration: 2e3,
                icon: "none"
            });
        }, !1, function() {});
    },
    guanzhu: function() {
        var n = this;
        n.data.userId > 0 && (t.post("friend.user_visit/add", {
            user_id: n.data.userId,
            visit_user_id: n.data.user_id
        }, function(t) {
            console.log("data", t);
        }, !1, function() {
            wx.hideToast();
        }), t.post("friend.user_follow/details", {
            user_id: n.data.userId,
            follow_user_id: n.data.user_id
        }, function(t) {
            console.log("data", t), "200" == t.status ? n.setData({
                isguanzhu: !0,
                user_follow_id: t.data.id
            }) : n.setData({
                isguanzhu: !1
            });
        }, !1, function() {
            wx.hideToast();
        }));
    },
    toguanzhu: function() {
        var n = this;
        n.data.userId > 0 ? t.post("friend.user_follow/add", {
            user_id: n.data.userId,
            follow_user_id: n.data.user_id
        }, function(t) {
            console.log("data", t), "200" == t.status && n.guanzhu();
        }, !1, function() {}) : wx.showModal({
            title: "温馨提示",
            content: "您还没有登录，是否先去登录？",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "/pages/login/login"
                }) : t.cancel;
            }
        });
    },
    deguanzhu: function() {
        var n = this;
        n.data.userId > 0 ? t.post("friend.user_follow/del", {
            user_follow_id: n.data.user_follow_id
        }, function(t) {
            wx.hideToast(), console.log("data", t), "200" == t.status && n.guanzhu();
        }, !1, function() {}) : wx.showModal({
            title: "温馨提示",
            content: "您还没有登录，是否先去登录？",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "/pages/login/login"
                }) : t.cancel;
            }
        });
    },
    gochat: function() {
        this.data.userId > 0 ? wx.navigateTo({
            url: "/pages/userChart/userChart?id=" + this.data.user_id + "&name=" + this.data.userInfo.nickname
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
    totousu: function() {
        this.data.userId > 0 ? wx.navigateTo({
            url: "/pages/tousu/tousu?id=" + this.data.user_id
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
    onReady: function() {},
    tologin: function() {
        wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    togeren: function() {
        wx.switchTab({
            url: "/pages/mine/mine"
        });
    },
    go_kefu: function() {
        wx.navigateTo({
            url: "/pages/lxkefu/lxkefu"
        });
    },
    onShow: function(t) {
        console.log("onShow", t);
        var n = this;
        n.setData({
            userId: wx.getStorageSync("userId"),
            authenticate: wx.getStorageSync("authenticate")
        }, function() {
            n.getUserInfo(), n.guanzhu();
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});