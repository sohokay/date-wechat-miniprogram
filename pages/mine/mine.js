var e = require("../../mp_ecard_sdk/main"), t = (getApp(), require("../../utils/request.js"));

Page({
    data: {
        grids: [ {
            url: "/pages/wodehongniang/wodehongniang?type=2",
            icon: "../../images/wdhn.png",
            text: "我的红娘"
        }, {
            url: "shiming/index",
            icon: "../../images/smrz.png",
            text: "实名认证"
        }, {
            url: "/pages/guanzhu/guanzhu?type=1",
            icon: "../../images/wdsc.png",
            text: "我的收藏"
        }, {
            url: "/pages/wodedongtai/wodedongtai",
            icon: "../../images/wddt.png",
            text: "我的动态"
        }, {
            url: "/pages/mianfeihongxian/mianfeihongxian?type=2",
            icon: "../../images/mfhx.png",
            text: "免费红线"
        }, {
            url: "/pages/gongzhonghao/gongzhonghao",
            icon: "../../images/gzh.png",
            text: "公众号"
        }, {
            url: "/pages/lxkefu/lxkefu",
            icon: "../../images/lxkf.png",
            text: "联系客服"
        }, {
            url: "/pages/setting/setting",
            icon: "../../images/sz.png",
            text: "设置"
        } ],
        isLogin: !1,
        userinfo: {},
        EidToken: "",
        userId: "",
        isshiming: !1,
        authenticate: "",
        tempId: [],
        height: ""
    },
    onLoad: function(e) {
        var n = this;
        wx.getSystemInfo({
            success: function(e) {
                n.setData({
                    height: e.statusBarHeight
                });
            }
        }), t.post("friend.subscribe_message/index", {
            type: 1
        }, function(e) {
            console.log("data", e), n.setData({
                tempId: e.data
            });
        }, !1, function() {});
    },
    goSDK: function() {
        var n = this;
        n.data.userId > 0 ? 2 == n.data.authenticate ? wx.showToast({
            title: "您已经实名",
            duration: 2e3,
            icon: "none"
        }) : t.get("friend.user/getIdentityToken", {}, function(t) {
            if (console.log("data", t), wx.hideToast(), "200" == t.code) {
                if (!(t.data.EidToken.length > 0)) return void wx.showToast({
                    title: "无法获取实名认证参数",
                    duration: 2e3,
                    icon: "none"
                });
                n.setData({
                    isshiming: !0,
                    EidToken: t.data.EidToken
                });
                var a = t.data.EidToken;
                (0, e.startEid)({
                    data: {
                        token: a
                    },
                    verifyDoneCallback: function(e) {
                        var t = e.token, n = e.verifyDone;
                        console.log("收到核身完成的res:", e), console.log("核身的token是:", t), console.log("是否完成核身:", n);
                    }
                });
            }
        }, !1, function() {}) : wx.showModal({
            title: "温馨提示",
            content: "您还没有登录，是否先去登录？",
            success: function(e) {
                e.confirm ? wx.navigateTo({
                    url: "/pages/login/login"
                }) : e.cancel;
            }
        });
    },
    getUserInfo: function() {
        var e = this;
        t.post("friend.user/details", {}, function(t) {
            wx.hideToast(), "200" == t.status && t.data.nickname.length > 0 ? (wx.setStorageSync("userSex", t.data.sex), 
            wx.setStorageSync("authenticate", t.data.authenticate), wx.setStorageSync("userImg", t.data.img_url), 
            e.setData({
                userinfo: t.data,
                authenticate: t.data.authenticate,
                isLogin: !0
            })) : e.setData({
                isLogin: !1
            });
        }, !1, function() {}), t.post("friend.pull_strings/index", {
            page: 1,
            user_id: wx.getStorageSync("userId"),
            status: 1,
            is_read: 1,
            limit: 10
        }, function(e) {
            console.log("data", e), t.post("friend.feedback/index", {
                user_id: wx.getStorageSync("userId"),
                page: 1,
                is_read: 1,
                limit: 10
            }, function(t) {
                console.log("data2", t);
                var n = 0;
                if ("200" == e.status && (n += e.data.length), "200" == t.status && (n += t.data.length), 
                console.log("yigong", n), 0 == n) wx.removeTabBarBadge({
                    index: 3
                }); else {
                    var a = JSON.stringify(n);
                    wx.setTabBarBadge({
                        index: 3,
                        text: a
                    });
                }
            }, !1, function() {});
        }, !1, function() {});
    },
    toVip: function() {
        wx.navigateTo({
            url: "/pages/vip/vip"
        });
    },
    onReady: function() {},
    onShow: function(e) {
        var n = this;
        wx.getStorageSync("userId") ? n.setData({
            userId: wx.getStorageSync("userId"),
            authenticate: wx.getStorageSync("authenticate")
        }, function() {
            n.data.isshiming ? t.get("friend.user/getIdentityCredential", {
                eid_token: n.data.EidToken,
                user_id: n.data.userId
            }, function(e) {
                n.getUserInfo(), n.setData({
                    isshiming: !1
                });
            }, !1, function() {}) : n.getUserInfo();
        }) : n.setData({
            isLogin: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    tologin: function() {
        console.log("tempId", this.data.tempId), wx.requestSubscribeMessage({
            tmplIds: this.data.tempId,
            success: function(e) {
                return console.log("requestSubscribeMessage", e), "requestSubscribeMessage:ok" == e.errMsg ? (wx.navigateTo({
                    url: "/pages/login/login"
                }), !0) : (wx.navigateTo({
                    url: "/pages/login/login"
                }), !1);
            },
            fail: function(e) {
                console.log("requestSubscribeMessage", e);
            }
        });
    },
    tobianji: function() {
        console.log("tempId", this.data.tempId), wx.requestSubscribeMessage({
            tmplIds: this.data.tempId,
            success: function(e) {
                return console.log("requestSubscribeMessage", e), "requestSubscribeMessage:ok" == e.errMsg ? (wx.navigateTo({
                    url: "/pages/bianji/bianji"
                }), !0) : (wx.navigateTo({
                    url: "/pages/bianji/bianji"
                }), !1);
            },
            fail: function(e) {
                console.log("requestSubscribeMessage", e);
            }
        });
    },
    tourl: function(e) {
        var t = e.currentTarget.dataset.item;
        console.log("url", t);
        this.data.userId > 0 ? wx.navigateTo({
            url: t
        }) : wx.showModal({
            title: "温馨提示",
            content: "您还没有登录，是否先去登录？",
            success: function(e) {
                e.confirm ? wx.navigateTo({
                    url: "/pages/login/login"
                }) : e.cancel;
            }
        });
    },
    tourl2: function(e) {
        var t = e.currentTarget.dataset.item;
        console.log("url", t);
        this.data.userId > 0 ? 0 == this.data.userinfo.vip_title.length ? wx.showModal({
            title: "温馨提示",
            content: "您还没有开通会员是否去开通会员？",
            success: function(e) {
                e.confirm ? wx.navigateTo({
                    url: "/pages/vip/vip"
                }) : e.cancel;
            }
        }) : wx.navigateTo({
            url: t
        }) : wx.showModal({
            title: "温馨提示",
            content: "您还没有登录，是否先去登录？",
            success: function(e) {
                e.confirm ? wx.navigateTo({
                    url: "/pages/login/login"
                }) : e.cancel;
            }
        });
    },
    hongniang: function() {
        wx.navigateTo({
            url: "/pages/wodehongniang/wodehongniang"
        });
    },
    onShareAppMessage: function() {}
});