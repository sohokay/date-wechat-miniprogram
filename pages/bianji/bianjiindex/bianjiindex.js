getApp();

var t = require("../../../utils/request.js");

Page({
    data: {
        zstjArr: [],
        isShowm: !1,
        chooseitem: {},
        chooseType: 1,
        weixin: "",
        height: "",
        weight: "",
        shengri: "请选择",
        description: "",
        age1: "",
        age2: "",
        hei1: "",
        hei2: "",
        wei1: "",
        wei2: "",
        birth_place: "",
        region: "请选择",
        district: "",
        region2: "请选择"
    },
    onLoad: function(e) {
        var i = this, a = e.type;
        i.setData({
            type: a
        }, function() {
            t.post("friend.user/details", {}, function(e) {
                if ("200" == e.status) {
                    var s = e.data, n = {}, o = "";
                    if ("1" == a) n = {
                        classify: "1"
                    }, o = "friend.category/index", i.setData({
                        height: s.height,
                        weight: s.weight,
                        shengri: s.birthday,
                        birth_place: s.category_list.birth_place,
                        region: s.category_list.birth_place_name,
                        district: s.category_list.district,
                        region2: s.category_list.district_name
                    }); else if ("2" == a) n = {
                        classify: "2,3"
                    }, o = "friend.category/index"; else if ("4" == a) n = {
                        classify: "4"
                    }, o = "friend.category/index"; else {
                        if ("5" != a) return void i.setData({
                            description: s.description
                        });
                        o = "friend.requirement/index";
                        var l = s.requirement_list.age_ask.split(","), r = s.requirement_list.height_ask.split(","), h = s.requirement_list.weight_ask.split(",");
                        i.setData({
                            age1: l[0],
                            age2: l[1],
                            hei1: r[0],
                            hei2: r[1],
                            wei1: h[0],
                            wei2: h[1]
                        });
                    }
                    t.post(o, n, function(t) {
                        console.log("data", t);
                        var e = t.data;
                        1 == a && e.unshift({
                            title: "性别",
                            type: 1,
                            name: "sex",
                            list: [ {
                                title: "男",
                                id: "1"
                            }, {
                                title: "女",
                                id: "2"
                            } ]
                        });
                        for (var n = 0; n < e.length; n++) {
                            var o = [];
                            1 == a || 2 == a || 4 == a ? (o = s.category_list).sex = s.sex : o = s.requirement_list;
                            for (var l = 0; l < e[n].list.length; l++) if (1 != e[n].type && 3 != e[n].type || e[n].list[l].id == o[e[n].name] && (e[n].list[l].selected = !0), 
                            2 == e[n].type && o[e[n].name]) {
                                var r = o[e[n].name].split(",");
                                console.log("choosefarr", r);
                                for (var h = 0; h < r.length; h++) e[n].list[l].id == r[h] && (e[n].list[l].selected = !0);
                            }
                        }
                        console.log("zstjArr", e), "200" == t.status ? i.setData({
                            zstjArr: e
                        }, function() {}) : wx.showToast({
                            title: t.message,
                            duration: 2e3,
                            icon: "none"
                        });
                    }, !1, function() {});
                }
            }, !1, function() {});
        });
    },
    cancle: function() {
        this.setData({
            isShowm: !1
        });
    },
    chooseItemc: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.zstjArr, a = i[e];
        console.log(e, t, i, a), this.setData({
            chooseitem: a,
            isShowm: !0,
            chooseType: e
        });
    },
    changeChoose: function(t) {
        for (var e = this.data.chooseitem, i = t.currentTarget.dataset.index2, a = 0; a < e.list.length; a++) e.list[a].selected = !1;
        e.list[i].selected = !0, this.setData({
            chooseitem: e
        });
    },
    changeChoose2: function(t) {
        var e = this.data.chooseitem, i = t.currentTarget.dataset.index2;
        e.list[i].selected ? e.list[i].selected = !e.list[i].selected : e.list[i].selected = !0, 
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
    weixinjt: function(t) {
        console.log(t.detail.value);
        this.setData({
            weixin: t.detail.value
        });
    },
    shengaojt: function(t) {
        var e = t.detail.value;
        e > 350 && (e = "350"), console.log(e), this.setData({
            height: e
        });
    },
    weightjt: function(t) {
        console.log(t.detail.value);
        this.setData({
            weight: t.detail.value
        });
    },
    neixin: function(t) {
        console.log(t.detail.value);
        this.setData({
            description: t.detail.value
        });
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
    nextUrl: function() {
        var e = this.data.zstjArr, i = {};
        if (0 != this.data.type) for (var a = 0; a < e.length; a++) {
            var s = "";
            if (1 == e[a].type || 3 == e[a].type) for (var n = 0; n < e[a].list.length; n++) e[a].list[n].selected && (i[e[a].name] = e[a].list[n].id, 
            s = e[a].list[n].id);
            if (2 == e[a].type) {
                for (var o = [], l = 0; l < e[a].list.length; l++) e[a].list[l].selected && o.push(e[a].list[l].id);
                i[e[a].name] = JSON.stringify(o), s = o;
            }
            if (console.log("isNull", s), "" == s && 5 != this.data.type && 3 != e[a].type) return void wx.showToast({
                title: "请选择" + e[a].title,
                duration: 2e3,
                icon: "none"
            });
        }
        if (0 == this.data.type && (i.description = this.data.description), 1 == this.data.type) {
            if (console.log(this.data.region), "请选择" == this.data.region || null == this.data.region) return void wx.showToast({
                title: "请选择籍贯",
                duration: 2e3,
                icon: "none"
            });
            if ("请选择" == this.data.region2 || null == this.data.region2) return void wx.showToast({
                title: "请选择现居住地",
                duration: 2e3,
                icon: "none"
            });
            i.weixin = this.data.weixin, i.birthday = this.data.shengri, i.weight = this.data.weight, 
            i.height = this.data.height, i.birth_place = this.data.birth_place, i.district = this.data.district;
        }
        if (5 == this.data.type) {
            var r = [ this.data.age1, this.data.age2 ], h = [ this.data.wei1, this.data.wei2 ], d = [ this.data.hei1, this.data.hei2 ];
            i.age_ask = JSON.stringify(r), i.height_ask = JSON.stringify(d), i.weight_ask = JSON.stringify(h);
        }
        t.post("friend.user/edit", i, function(t) {
            wx.navigateBack({
                delta: 1
            }), wx.showToast({
                title: "保存成功",
                icon: "none",
                duration: 2e3
            });
        }, !1, function() {});
    },
    onReady: function() {},
    onShow: function() {},
    bindRegionChange: function(t) {
        console.log(t), this.setData({
            birth_place: t.detail.code[2],
            region: t.detail.value[2]
        });
    },
    bindRegionChange2: function(t) {
        console.log(t), this.setData({
            district: t.detail.code[2],
            region2: t.detail.value[2]
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});