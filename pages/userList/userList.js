getApp();

var t = require("../../utils/request.js");

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
        hei1: 0,
        hei2: 360,
        wei1: 0,
        wei2: 200,
        birth_place: "",
        region: "籍贯",
        district: "",
        region2: "现居住地"
    },
    onLoad: function(e) {
        var a = this;
        console.log(e), e.sex && a.setData({
            sex: e.sex,
            keyword: ""
        }, function() {
            a.getfenlei();
        }), e.sousuo && a.setData({
            keyword: e.sousuo
        }, function() {
            a.getfenlei();
        }), t.post("friend.setup/details", {}, function(t) {
            console.log("data", t), a.setData({
                xcxname: t.data.name
            }), wx.setNavigationBarTitle({
                title: t.data.name
            });
        }, !1, function() {});
    },
    getfenlei: function() {
        var e = this;
        t.post("friend.category/index", {
            is_query: 2
        }, function(t) {
            console.log("data", t), "200" == t.status ? e.setData({
                shaixuanlist: t.data,
                userList: [],
                age1: 0,
                age2: 100,
                hei1: 100,
                hei2: 250,
                wei1: 0,
                wei2: 200,
                page: 0,
                iszuixin: !0,
                is_up: 1,
                birth_place: "",
                region: "籍贯",
                district: "",
                region2: "现居住地"
            }, function() {
                e.getUserList(), e.cancleBox();
            }) : wx.showToast({
                title: t.message,
                duration: 2e3,
                icon: "none"
            });
        }, !1, function() {});
    },
    cancleBox: function(t) {
        this.setData({
            isxueli: !1,
            isnianling: !1,
            isxingbie: !1,
            isgengduo: !1,
            isshaixuan: !0
        });
    },
    zuixin: function() {
        var t = this;
        t.cancleBox();
        var e = 1;
        t.data.iszuixin && (e = ""), t.setData({
            iszuixin: !t.data.iszuixin,
            is_up: e,
            userList: [],
            page: 0
        }, function() {
            t.getUserList();
        });
    },
    choosesex: function(t) {
        var e = this, a = t.currentTarget.dataset.type, i = "性别", s = "";
        1 == a ? (i = "男", s = 1) : 2 == a && (i = "女", s = 2), e.setData({
            page: 0,
            userList: [],
            sex: s,
            sextxt: i
        }, function() {
            e.cancleBox(), e.getUserList();
        });
    },
    bindRegionChange: function(t) {
        var e = this;
        console.log(t), e.setData({
            birth_place: t.detail.code[2],
            region: t.detail.value[2],
            userList: [],
            page: 0
        }, function() {
            e.getUserList();
        });
    },
    bindRegionChange2: function(t) {
        var e = this;
        console.log(t), e.setData({
            district: t.detail.code[2],
            region2: t.detail.value[2],
            userList: [],
            page: 0
        }, function() {
            e.getUserList();
        });
    },
    searchUser: function() {
        var t = this;
        t.setData({
            page: 0,
            userList: []
        }, function() {
            t.cancleBox(), t.getUserList();
        });
    },
    changeChoose: function(t) {
        for (var e = this.data.shaixuanlist, a = t.currentTarget.dataset.index, i = t.currentTarget.dataset.index2, s = 0; s < e[a].list.length; s++) e[a].list[s].selected = !1;
        console.log(a, i, e), e[a].list[i].selected = !0, this.setData({
            shaixuanlist: e
        });
    },
    changeChoose2: function(t) {
        var e = this.data.shaixuanlist, a = t.currentTarget.dataset.index, i = t.currentTarget.dataset.index2;
        console.log(a, i, e), e[a].list[i].selected ? e[a].list[i].selected = !e[a].list[i].selected : e[a].list[i].selected = !0, 
        this.setData({
            shaixuanlist: e
        });
    },
    getUserList: function() {
        for (var e = this, a = e.data.userList, i = e.data.shaixuanlist, s = {}, n = 0; n < i.length; n++) {
            var o = "";
            if (1 == i[n].type) for (var l = 0; l < i[n].list.length; l++) i[n].list[l].selected && (s[i[n].name] = i[n].list[l].id, 
            o = i[n].list[l].id);
            if (2 == i[n].type) {
                for (var u = [], r = 0; r < i[n].list.length; r++) i[n].list[r].selected && u.push(i[n].list[r].id);
                s[i[n].name] = JSON.stringify(u), o = u;
            }
            console.log("isNull", o);
        }
        console.log("userzhuce", s), s.page = e.data.page + 1, s.limit = e.data.limit, s.birthday_start = e.data.age1, 
        s.birthday_end = e.data.age2, s.height_start = e.data.hei1, s.height_end = e.data.hei2, 
        s.weight_start = e.data.wei1, s.weight_end = e.data.wei2, s.sex = e.data.sex, s.keyword = e.data.keyword, 
        s.birth_place = e.data.birth_place, s.district = e.data.district, t.post("friend.user/index", s, function(t) {
            var i;
            console.log("data", t), "200" == t.status ? 0 == a.length ? e.setData({
                userList: t.data
            }) : (i = a.concat(t.data), e.setData({
                userList: i
            })) : wx.showToast({
                title: t.message,
                duration: 2e3,
                icon: "none"
            }), wx.hideToast();
        }, !1, function() {});
    },
    ageask1: function(t) {
        console.log(t.detail.value);
        this.setData({
            age1: t.detail.value
        });
    },
    ageask2: function(t) {
        console.log(t.detail.value);
        this.setData({
            age2: t.detail.value
        });
    },
    heiask1: function(t) {
        console.log(t.detail.value);
        this.setData({
            hei1: t.detail.value
        });
    },
    heiask2: function(t) {
        console.log(t.detail.value);
        this.setData({
            hei2: t.detail.value
        });
    },
    weiask1: function(t) {
        console.log(t.detail.value);
        this.setData({
            wei1: t.detail.value
        });
    },
    weiask2: function(t) {
        console.log(t.detail.value);
        this.setData({
            wei2: t.detail.value
        });
    },
    chooseTap: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.tap;
        "xb" == e ? this.setData({
            isshaixuan: !1,
            isxingbie: !0
        }) : "nl" == e ? this.setData({
            isshaixuan: !1,
            isnianling: !0
        }) : "xl" == e ? this.setData({
            isshaixuan: !1,
            isxueli: !0
        }) : "gd" == e && this.setData({
            isshaixuan: !1,
            isgengduo: !0
        });
    },
    touserInfo: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/userdetail/userdetail?id=" + e
        });
    },
    onReachBottom: function() {
        var t = this;
        console.log("触底"), t.setData({
            page: t.data.page + 1
        }, function() {
            t.getUserList();
        });
    },
    onShareAppMessage: function() {}
});