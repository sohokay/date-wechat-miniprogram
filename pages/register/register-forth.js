getApp();

var e = require("../../utils/request.js");

Page({
    data: {
        zstjArr: [],
        isShowm: !1,
        chooseitem: {},
        chooseType: 1,
        shengri: "请选择",
        age1: 0,
        age2: 100,
        hei1: 100,
        hei2: 250,
        wei1: 0,
        wei2: 200
    },
    onLoad: function(t) {
        var a = this;
        e.post("friend.requirement/index", {}, function(e) {
            console.log("data", e), "200" == e.status ? a.setData({
                zstjArr: e.data
            }, function() {}) : wx.showToast({
                title: e.message,
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
    chooseItemc: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.zstjArr, i = a[t];
        console.log(t, e, a, i), this.setData({
            chooseitem: i,
            isShowm: !0,
            chooseType: t
        });
    },
    changeChoose: function(e) {
        for (var t = this.data.chooseitem, a = e.currentTarget.dataset.index2, i = 0; i < t.list.length; i++) t.list[i].selected = !1;
        t.list[a].selected = !0, this.setData({
            chooseitem: t
        });
    },
    changeChoose2: function(e) {
        var t = this.data.chooseitem, a = e.currentTarget.dataset.index2;
        t.list[a].selected ? t.list[a].selected = !t.list[a].selected : t.list[a].selected = !0, 
        this.setData({
            chooseitem: t
        });
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
    sureChoose: function() {
        var e = this.data.zstjArr, t = this.data.chooseitem;
        e[this.data.chooseType] = t, this.setData({
            zstjArr: e,
            isShowm: !1
        });
    },
    bindBirthdayChange: function(e) {
        var t = e.detail.value;
        this.setData({
            shengri: t
        });
    },
    nextUrl: function() {
        var e = this.data.zstjArr, t = JSON.parse(wx.getStorageSync("userzhuce"));
        if ("" != this.data.wei2) {
            for (var a = 0; a < e.length; a++) {
                var i = "";
                if (1 == e[a].type || 3 == e[a].type) for (var s = 0; s < e[a].list.length; s++) e[a].list[s].selected && (t[e[a].name] = e[a].list[s].id, 
                i = e[a].list[s].id);
                if (2 == e[a].type) {
                    for (var o = [], n = 0; n < e[a].list.length; n++) e[a].list[n].selected && o.push(e[a].list[n].id);
                    t[e[a].name] = JSON.stringify(o), i = o;
                }
                console.log("isNull", i);
            }
            var l = [ this.data.age1, this.data.age2 ], h = [ this.data.wei1, this.data.wei2 ], r = [ this.data.hei1, this.data.hei2 ];
            t.age_ask = JSON.stringify(l), t.height_ask = JSON.stringify(r), t.weight_ask = JSON.stringify(h);
            var c = wx.getStorageSync("inviter");
            c > 0 && (t.inviter = c), console.log("userzhuce", t), wx.setStorageSync("userzhuce", JSON.stringify(t)), 
            wx.navigateTo({
                url: "/pages/register/register"
            });
        } else wx.showToast({
            title: "请填写最高体重",
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