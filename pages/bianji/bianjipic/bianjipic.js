var e = require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../@babel/runtime/regenerator")), t = require("../../../@babel/runtime/helpers/asyncToGenerator"), n = require("../../../@babel/runtime/helpers/defineProperty"), o = getApp(), a = require("../../../utils/request.js");

Page({
    data: {
        imglist: []
    },
    onLoad: function(e) {
        this.getUserInfo();
    },
    getUserInfo: function() {
        var e = this;
        a.post("friend.user/details", {}, function(t) {
            "200" == t.status && e.setData({
                imglist: t.data.album_list,
                imgid: t.data.img,
                isLogin: !0
            });
        }, !1, function() {});
    },
    addimg: function() {
        var e = this;
        9 - e.data.imglist.length <= 0 && wx.showToast({
            title: "最多上传9张图片",
            icon: "none",
            duration: 2e3
        }), wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var i, s = t.tempFilePaths;
                console.log("img", s), wx.uploadFile((i = {
                    url: o.globalData.siteroot + "upload/image",
                    fileType: "image",
                    name: "file",
                    filePath: s[0]
                }, n(i, "name", "file"), n(i, "header", {
                    "content-type": "multipart/form-data"
                }), n(i, "formData", {
                    store_id: o.globalData.store_id
                }), n(i, "success", function(t) {
                    var n = JSON.parse(t.data);
                    console.log("imgJson", n), a.post("friend.user/album_add", {
                        img: n.data.id,
                        user_id: wx.getStorageSync("userId")
                    }, function(t) {
                        e.getUserInfo();
                    }, !1, function() {});
                }), i));
            }
        });
    },
    deleteimg: function(e) {
        var t = this, n = e.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "确定删除该图片吗？",
            success: function(e) {
                e.confirm ? a.post("friend.user/album_del", {
                    album_id: n
                }, function(e) {
                    t.getUserInfo();
                }, !1, function() {}) : e.cancel;
            }
        });
    },
    shezhi: function(e) {
        var t = this, n = e.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "确定设为头像吗？",
            success: function(e) {
                e.confirm ? a.post("friend.user/album_cover", {
                    album_id: n
                }, function(e) {
                    t.getUserInfo();
                }, !1, function() {}) : e.cancel;
            }
        });
    },
    formSubmit: function(n) {
        return t(e.default.mark(function t() {
            var n, i, s, r, l;
            return e.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (n = that.data.imglist, i = [], [], 0 != n.length) for (s = wx.getStorageSync("logintag"), 
                    r = function(e) {
                        new Promise(function(t) {
                            wx.uploadFile({
                                url: o.globalData.siteroot + "upcommentimg",
                                fileType: "image",
                                name: "file",
                                filePath: n[e],
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                formData: {
                                    logintag: s,
                                    uniacid: o.globalData.uniacid
                                },
                                success: function(e) {
                                    var n = JSON.parse(e.data);
                                    console.log("data", n), i.push(n.pathfile), t({
                                        picUrl: i
                                    });
                                }
                            });
                        }).then(function(e) {
                            if (console.log(e), console.log("上传成功", i), i.length == n.length) {
                                that.data.goodsList;
                                value.images = JSON.stringify(e.picUrl), value.gyt_id = that.data.id, console.log("value", value), 
                                a.post("Viewingmass/submit_activity", value, function(e) {
                                    console.log(e), "0000" == e.retCode && wx.showModal({
                                        title: "温馨提示",
                                        content: e.retDesc,
                                        showCancel: !1,
                                        confirmColor: "#881579",
                                        success: function(e) {
                                            e.confirm ? (wx.navigateBack({
                                                delta: 1
                                            }), console.log("用户点击确定")) : e.cancel && console.log("用户点击取消");
                                        }
                                    });
                                });
                            }
                        });
                    }, l = 0; l < n.length; l++) r(l);
                    console.log(that.data.imglist);

                  case 5:
                  case "end":
                    return e.stop();
                }
            }, t);
        }))();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});