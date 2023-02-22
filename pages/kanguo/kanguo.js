getApp();

var e = require("../../utils/request.js");

Page({
    data: {
        iszuixin: !0,
        isxueli: !1,
        isnianling: !1,
        isxingbie: !1,
        isgengduo: !1,
        isshaixuan: !0,
        page: 0,
        limit: 10,
        shaixuanlist: [],
        userList: [],
        is_up: 1,
        sex: "",
        sextxt: "性别",
        age1: 0,
        age2: 100,
        hei1: 100,
        hei2: 250,
        wei1: 0,
        wei2: 200,
        tempId: []
    },
    onLoad: function(t) {
        var a = this;
        a.setData({
            type: t.type
        }, function() {
            a.getUserList();
        }), e.post("friend.subscribe_message/index", {
            type: 2
        }, function(e) {
            console.log("data", e), a.setData({
                tempId: e.data
            });
        }, !1, function() {});
    },
    getUserList: function() {
        var t = this, a = t.data.userList, s = {};
        (s = {
            visit_user_id: wx.getStorageSync("userId")
        }).page = t.data.page + 1, s.limit = t.data.limit, e.post("friend.user_visit/index", s, function(e) {
            var s;
            console.log("data", e), "200" == e.status ? 0 == a.length ? t.setData({
                userList: e.data
            }) : (s = a.concat(e.data), t.setData({
                userList: s
            })) : wx.showToast({
                title: e.message,
                duration: 2e3,
                icon: "none"
            }), wx.hideToast();
        }, !1, function() {});
    },
    ageask1: function(e) {
        console.log(e.detail.value);
        this.setData({
            age1: e.detail.value
        });
    },
    ageask2: function(e) {
        console.log(e.detail.value);
        this.setData({
            age2: e.detail.value
        });
    },
    heiask1: function(e) {
        console.log(e.detail.value);
        this.setData({
            hei1: e.detail.value
        });
    },
    heiask2: function(e) {
        console.log(e.detail.value);
        this.setData({
            hei2: e.detail.value
        });
    },
    weiask1: function(e) {
        console.log(e.detail.value);
        this.setData({
            wei1: e.detail.value
        });
    },
    weiask2: function(e) {
        console.log(e.detail.value);
        this.setData({
            wei2: e.detail.value
        });
    },
    chooseTap: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.tap;
        "xb" == t ? this.setData({
            isshaixuan: !1,
            isxingbie: !0
        }) : "nl" == t ? this.setData({
            isshaixuan: !1,
            isnianling: !0
        }) : "xl" == t ? this.setData({
            isshaixuan: !1,
            isxueli: !0
        }) : "gd" == t && this.setData({
            isshaixuan: !1,
            isgengduo: !0
        });
    },
    touserInfo: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.requestSubscribeMessage({
            tmplIds: this.data.tempId,
            success: function(e) {
                return console.log("requestSubscribeMessage", e), "requestSubscribeMessage:ok" == e.errMsg ? (wx.navigateTo({
                    url: "/pages/userdetail/userdetail?id=" + t
                }), !0) : (wx.navigateTo({
                    url: "/pages/userdetail/userdetail?id=" + t
                }), !1);
            },
            fail: function(e) {
                console.log("requestSubscribeMessage", e);
            }
        });
    },
    onReachBottom: function() {
        var e = this;
        console.log("触底"), e.setData({
            page: e.data.page + 1
        }, function() {
            e.getUserList();
        });
    },
    onShareAppMessage: function() {}
});