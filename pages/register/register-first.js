var t = require("../../@babel/runtime/helpers/defineProperty"), e = getApp(), i = require("../../utils/request.js");

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
        img_url: "",
        img: "",
        birth_place: "",
        region: "请选择",
        district: "",
        region2: []
    },
    onLoad: function(t) {
        var e = this;
        i.get("friend.information/region", {}, function(t) {
            console.log("data", t), "200" == t.code ? e.setData({
                region: t.data.region,
                birth_place: t.data.code,
                region2: t.data.region,
                district: t.data.code
            }, function() {}) : wx.showToast({
                title: t.message,
                duration: 2e3,
                icon: "none"
            });
        }, !1, function() {}), i.post("friend.category/index", {
            classify: 1
        }, function(t) {
            console.log("data", t);
            var i = t.data;
            i.unshift({
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
            }), "200" == t.status ? e.setData({
                zstjArr: i
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
    chooseImage: function() {
        var i = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var o, s = a.tempFilePaths;
                console.log("img", s), wx.uploadFile((o = {
                    url: e.globalData.siteroot + "upload/image",
                    fileType: "image",
                    name: "file",
                    filePath: s[0]
                }, t(o, "name", "file"), t(o, "header", {
                    "content-type": "multipart/form-data"
                }), t(o, "formData", {
                    store_id: e.globalData.store_id
                }), t(o, "success", function(t) {
                    var e = JSON.parse(t.data);
                    console.log(e), i.setData({
                        img_url: e.data.url,
                        img: e.data.id
                    });
                }), o));
            }
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
    nextUrl: function() {
        var t = this.data.zstjArr, e = {};
        if (0 != this.data.weixin.length) if ("" != this.data.height) if ("" != this.data.weight) if ("请选择" != this.data.shengri) if ("请选择" != this.data.region) if ("请选择" != this.data.region2) {
            for (var i = 0; i < t.length; i++) {
                var a = "";
                if (1 == t[i].type) for (var o = 0; o < t[i].list.length; o++) t[i].list[o].selected && (e[t[i].name] = t[i].list[o].id, 
                a = t[i].list[o].id);
                if (2 == t[i].type) {
                    for (var s = [], n = 0; n < t[i].list.length; n++) t[i].list[n].selected && s.push(t[i].list[n].id);
                    e[t[i].name] = JSON.stringify(s), a = s;
                }
                if (console.log("isNull", a), "" == a && 3 != t[i].type) return void wx.showToast({
                    title: "请选择" + t[i].title,
                    duration: 2e3,
                    icon: "none"
                });
            }
            e.img = this.data.img, e.weixin = this.data.weixin, e.birthday = this.data.shengri, 
            e.weight = this.data.weight, e.height = this.data.height, e.birth_place = this.data.birth_place, 
            e.district = this.data.district, console.log("userzhuce", e), wx.setStorageSync("userzhuce", JSON.stringify(e)), 
            wx.navigateTo({
                url: "/pages/register/register-second"
            });
        } else wx.showToast({
            title: "请选择现居住地",
            duration: 2e3,
            icon: "none"
        }); else wx.showToast({
            title: "请选择籍贯",
            duration: 2e3,
            icon: "none"
        }); else wx.showToast({
            title: "请选择生日",
            duration: 2e3,
            icon: "none"
        }); else wx.showToast({
            title: "请填写体重",
            duration: 2e3,
            icon: "none"
        }); else wx.showToast({
            title: "请填写身高",
            duration: 2e3,
            icon: "none"
        }); else wx.showToast({
            title: "请填写牵线号WX",
            duration: 2e3,
            icon: "none"
        });
    },
    onReady: function() {},
    bindRegionChange: function(t) {
        console.log(t), this.setData({
            birth_place: t.detail.code[2],
            region: t.detail.value
        });
    },
    bindRegionChange2: function(t) {
        console.log(t), this.setData({
            district: t.detail.code[2],
            region2: t.detail.value
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});