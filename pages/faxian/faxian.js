getApp();

var e = require("../../utils/request.js");

Page({
    data: {
        listInfo: [],
        releaseFocus: !1,
        comment: "",
        spacing: 20,
        dynamic_id: "",
        reply_user_id: "",
        replyText: "",
        page: 0,
        userId: "",
        tempId: [],
        height: ""
    },
    onLoad: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(e) {
                a.setData({
                    height: e.statusBarHeight
                });
            }
        }), a.setData({
            userId: wx.getStorageSync("userId")
        }), a.getfrendslist(), e.post("friend.subscribe_message/index", {
            type: 2
        }, function(e) {
            console.log("data", e), a.setData({
                tempId: e.data
            });
        }, !1, function() {}), e.post("friend.setup/details", {}, function(e) {
            console.log("data", e), a.setData({
                xcxname: e.data.name
            }), wx.setNavigationBarTitle({
                title: e.data.name
            });
        }, !1, function() {});
    },
    preview: function(e) {
        console.log(e.currentTarget.dataset.src);
        var t = e.currentTarget.dataset.src, a = e.currentTarget.dataset.index, s = this.data.listInfo;
        wx.previewImage({
            current: t,
            urls: s[a].img_list
        });
    },
    getfrendslist: function() {
        var t = this;
        e.post("friend.user_dynamic/index", {
            praise_user_id: wx.getStorageSync("userId"),
            page: t.data.page + 1,
            limit: 10
        }, function(e) {
            if (console.log("data", e), "200" == e.status) {
                var a, s = t.data.listInfo;
                "200" == e.status && (0 == s.length ? t.setData({
                    listInfo: e.data,
                    page: t.data.page + 1
                }) : (a = s.concat(e.data), t.setData({
                    listInfo: a,
                    page: t.data.page + 1
                })));
            } else t.setData({
                isuncharts: !1
            });
        }, !1, function() {});
    },
    onReady: function() {},
    bindapply: function(e) {
        console.log("picker发送选择改变，携带值为", e), this.setData({
            apply_index: e.detail.value
        });
    },
    fasonghongxian: function() {
        var t = this;
        apply_words[apply_index];
        e.post("friend.pull_strings/add", {
            inviter_user_id: t.data.id,
            user_id: wx.getStorageSync("userId")
        }, function(e) {
            if (console.log("data", e), "200" == e.status) {
                var a = e.data, s = [];
                a.category_list.hobby_name.length > 0 && (s = a.category_list.hobby_name.split(","));
                var n = [];
                a.category_list.personality_name.length > 0 && (n = a.category_list.personality_name.split(",")), 
                t.setData({
                    userInfo: a,
                    hobby_name: s,
                    personality_name: n,
                    isuncharts: !0
                });
            } else t.setData({
                isuncharts: !1
            });
        }, !1, function() {});
    },
    huifuPinglun: function(e) {
        var t = e.currentTarget.dataset.dyid, a = e.currentTarget.dataset.reid, s = e.currentTarget.dataset.name;
        this.setData({
            dynamic_id: t,
            reply_user_id: a,
            replyText: s,
            comment: "",
            releaseFocus: !0
        });
    },
    dianzan: function(t) {
        var a = this, s = t.currentTarget.dataset.dyid, n = t.currentTarget.dataset.index, i = a.data.listInfo;
        a.data.userId > 0 ? e.post("friend.user_dynamic/praise_add", {
            dynamic_id: s,
            user_id: a.data.userId
        }, function(e) {
            if (console.log("data", e), "200" == e.status) {
                i[n].praise_status = 2;
                var t = wx.getStorageSync("userImg"), s = wx.getStorageSync("userId");
                i[n].praise_list.push({
                    user_id: s,
                    user_img: t
                }), console.log("listInfo", i), a.setData({
                    listInfo: i
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
    dianzanq: function(t) {
        var a = this, s = t.currentTarget.dataset.dyid, n = t.currentTarget.dataset.index, i = a.data.listInfo;
        a.data.userId > 0 ? e.post("friend.user_dynamic/praise_del", {
            dynamic_id: s,
            user_id: a.data.userId
        }, function(e) {
            if (console.log("data", e), "200" == e.status) {
                i[n].praise_status = 1;
                for (var t = wx.getStorageSync("userId"), s = 0; s < i[n].praise_list.length; s++) i[n].praise_list[s].user_id == t && i[n].praise_list.splice(s, 1);
                console.log("listInfo", i), a.setData({
                    listInfo: i
                });
            }
        }, !1, function() {}) : wx.showToast({
            title: "请填写发表内容",
            duration: 2e3,
            icon: "none"
        });
    },
    send_comment: function() {
        var t = this, a = t.data.comment;
        if (a.length > 0) {
            if (!(t.data.userId > 0)) return void wx.showToast({
                title: "请先登录",
                duration: 2e3,
                icon: "none"
            });
            e.post("friend.user_dynamic/reply_add", {
                content: a,
                dynamic_id: t.data.dynamic_id,
                user_id: wx.getStorageSync("userId"),
                reply_user_id: t.data.reply_user_id
            }, function(e) {
                console.log("data", e), "200" == e.status && (wx.showToast({
                    title: "发表成功，请等待审核",
                    duration: 2e3,
                    icon: "none"
                }), t.setData({
                    releaseFocus: !1
                }));
            }, !1, function() {});
        } else wx.showToast({
            title: "请填写发表内容",
            duration: 2e3,
            icon: "none"
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
    go_add_dynamic: function(e) {
        if (this.data.userId > 0) {
            e.currentTarget.dataset.id;
            wx.requestSubscribeMessage({
                tmplIds: this.data.tempId,
                success: function(e) {
                    return console.log("requestSubscribeMessage", e), "requestSubscribeMessage:ok" == e.errMsg ? (wx.navigateTo({
                        url: "/pages/fabudongtai/fabudongtai"
                    }), !0) : (wx.navigateTo({
                        url: "/pages/fabudongtai/fabudongtai"
                    }), !1);
                },
                fail: function(e) {
                    console.log("requestSubscribeMessage", e);
                }
            });
        } else wx.showToast({
            title: "请先登录",
            duration: 2e3,
            icon: "none"
        });
    },
    onShow: function() {
        this.setData({
            userId: wx.getStorageSync("userId")
        }), wx.getStorageSync("userId") && e.post("friend.pull_strings/index", {
            page: 1,
            user_id: wx.getStorageSync("userId"),
            status: 1,
            is_read: 1,
            limit: 10
        }, function(t) {
            console.log("data", t), e.post("friend.feedback/index", {
                user_id: wx.getStorageSync("userId"),
                page: 1,
                is_read: 1,
                limit: 10
            }, function(e) {
                console.log("data2", e);
                var a = 0;
                if ("200" == t.status && (a += t.data.length), "200" == e.status && (a += e.data.length), 
                console.log("yigong", a), 0 == a) wx.removeTabBarBadge({
                    index: 3
                }); else {
                    var s = JSON.stringify(a);
                    wx.setTabBarBadge({
                        index: 3,
                        text: s
                    });
                }
            }, !1, function() {});
        }, !1, function() {});
    },
    onHide: function() {},
    comment_input: function(e) {
        this.setData({
            comment: e.detail.value
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getfrendslist();
    },
    guanliList: function(e) {
        var t = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/guanliList/guanliList?type=" + t
        });
    },
    hongniang: function() {
        wx.navigateTo({
            url: "/pages/lxkefu/lxkefu"
        });
    },
    onShareAppMessage: function() {}
});