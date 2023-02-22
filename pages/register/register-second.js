getApp();

var t = require("../../utils/request.js");

Page({
    data: {
        zstjArr: [],
        isShowm: !1,
        chooseitem: {},
        chooseType: 1,
        shengri: "请选择",
        description: ""
    },
    onLoad: function(e) {
        var s = this;
        t.post("friend.category/index", {
            classify: "2,3"
        }, function(t) {
            console.log("data", t), "200" == t.status ? s.setData({
                zstjArr: t.data
            }, function() {}) : wx.showToast({
                title: t.message,
                duration: 2e3,
                icon: "none"
            });
        }, !1, function() {});
    },
    cancle: function() {
        this.setData({
            isShowm: !1
        });
    },
    chooseItemc: function(t) {
        var e = t.currentTarget.dataset.index, s = this.data.zstjArr, i = s[e];
        console.log(e, t, s, i), this.setData({
            chooseitem: i,
            isShowm: !0,
            chooseType: e
        });
    },
    changeChoose: function(t) {
        for (var e = this.data.chooseitem, s = t.currentTarget.dataset.index2, i = 0; i < e.list.length; i++) e.list[i].selected = !1;
        e.list[s].selected = !0, this.setData({
            chooseitem: e
        });
    },
    changeChoose2: function(t) {
        var e = this.data.chooseitem, s = t.currentTarget.dataset.index2;
        e.list[s].selected ? e.list[s].selected = !e.list[s].selected : e.list[s].selected = !0, 
        this.setData({
            chooseitem: e
        });
    },
    sureChoose: function() {
        var t = this.data.zstjArr, e = this.data.chooseitem;
        t[this.data.chooseType] = e, this.setData({
            zstjArr: t,
            isShowm: !1
        });
    },
    bindBirthdayChange: function(t) {
        var e = t.detail.value;
        this.setData({
            shengri: e
        });
    },
    neixin: function(t) {
        console.log(t.detail.value);
        this.setData({
            description: t.detail.value
        });
    },
    nextUrl: function() {
        var t = this.data.zstjArr, e = JSON.parse(wx.getStorageSync("userzhuce"));
        if ("" != this.data.description) {
            for (var s = 0; s < t.length; s++) {
                var i = "";
                if (1 == t[s].type || 3 == t[s].type) for (var o = 0; o < t[s].list.length; o++) t[s].list[o].selected && (e[t[s].name] = t[s].list[o].id, 
                i = t[s].list[o].id);
                if (2 == t[s].type) {
                    for (var n = [], a = 0; a < t[s].list.length; a++) t[s].list[a].selected && n.push(t[s].list[a].id);
                    e[t[s].name] = JSON.stringify(n), i = n;
                }
                if (console.log("isNull", i), "" == i) return void wx.showToast({
                    title: "请选择" + t[s].title,
                    duration: 2e3,
                    icon: "none"
                });
            }
            e.description = this.data.description, console.log("userzhuce", e), wx.setStorageSync("userzhuce", JSON.stringify(e)), 
            wx.navigateTo({
                url: "/pages/register/register-third"
            });
        } else wx.showToast({
            title: "请输入内心独白",
            duration: 2e3,
            icon: "none"
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