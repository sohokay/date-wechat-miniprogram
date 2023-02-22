getApp();

var t = require("../../utils/request.js");

Page({
    data: {
        zstjArr: [],
        isShowm: !1,
        chooseitem: {},
        chooseType: 1,
        shengri: "请选择"
    },
    onLoad: function(e) {
        var s = this;
        t.post("friend.category/index", {
            classify: "4"
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
        var e = t.currentTarget.dataset.index, s = this.data.zstjArr, o = s[e];
        console.log(e, t, s, o), this.setData({
            chooseitem: o,
            isShowm: !0,
            chooseType: e
        });
    },
    changeChoose: function(t) {
        for (var e = this.data.chooseitem, s = t.currentTarget.dataset.index2, o = 0; o < e.list.length; o++) e.list[o].selected = !1;
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
    nextUrl: function() {
        for (var t = this.data.zstjArr, e = JSON.parse(wx.getStorageSync("userzhuce")), s = 0; s < t.length; s++) {
            var o = "";
            if (1 == t[s].type || 3 == t[s].type) for (var i = 0; i < t[s].list.length; i++) t[s].list[i].selected && (e[t[s].name] = t[s].list[i].id, 
            o = t[s].list[i].id);
            if (2 == t[s].type) {
                for (var n = [], a = 0; a < t[s].list.length; a++) t[s].list[a].selected && n.push(t[s].list[a].id);
                e[t[s].name] = JSON.stringify(n), o = n;
            }
            if (console.log("isNull", o), "" == o) return void wx.showToast({
                title: "请选择" + t[s].title,
                duration: 2e3,
                icon: "none"
            });
        }
        console.log("userzhuce", e), wx.setStorageSync("userzhuce", JSON.stringify(e)), 
        wx.navigateTo({
            url: "/pages/register/register-forth"
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