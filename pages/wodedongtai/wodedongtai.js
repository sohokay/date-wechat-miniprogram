getApp();

var t = require("../../utils/request.js");

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
        tempId: []
    },
    onLoad: function(e) {
        var a = this;
        a.setData({
            userId: wx.getStorageSync("userId")
        }), a.getfrendslist(), t.post("friend.subscribe_message/index", {
            type: 2
        }, function(t) {
            console.log("data", t), a.setData({
                tempId: t.data
            });
        }, !1, function() {});
    },
    preview: function(t) {
        console.log(t.currentTarget.dataset.src);
        var e = t.currentTarget.dataset.src, a = t.currentTarget.dataset.index, s = this.data.listInfo;
        wx.previewImage({
            current: e,
            urls: s[a].img_list
        });
    },
    getfrendslist: function() {
        var e = this;
        t.post("friend.user_dynamic/index", {
            praise_user_id: wx.getStorageSync("userId"),
            user_id: wx.getStorageSync("userId"),
            page: e.data.page + 1,
            limit: 10
        }, function(t) {
            if (console.log("data", t), "200" == t.status) {
                var a, s = e.data.listInfo;
                "200" == t.status && (0 == s.length ? e.setData({
                    listInfo: t.data,
                    page: e.data.page + 1
                }) : (a = s.concat(t.data), e.setData({
                    listInfo: a,
                    page: e.data.page + 1
                }))), wx.hideToast();
            } else e.setData({
                isuncharts: !1
            });
        }, !1, function() {});
    },
    onReady: function() {},
    bindapply: function(t) {
        console.log("picker发送选择改变，携带值为", t), this.setData({
            apply_index: t.detail.value
        });
    },
    fasonghongxian: function() {
        var e = this;
        apply_words[apply_index];
        t.post("friend.pull_strings/add", {
            inviter_user_id: e.data.id,
            user_id: wx.getStorageSync("userId")
        }, function(t) {
            if (console.log("data", t), "200" == t.status) {
                var a = t.data, s = [];
                a.category_list.hobby_name.length > 0 && (s = a.category_list.hobby_name.split(","));
                var n = [];
                a.category_list.personality_name.length > 0 && (n = a.category_list.personality_name.split(",")), 
                e.setData({
                    userInfo: a,
                    hobby_name: s,
                    personality_name: n,
                    isuncharts: !0
                });
            } else e.setData({
                isuncharts: !1
            });
        }, !1, function() {});
    },
    huifuPinglun: function(t) {
        var e = t.currentTarget.dataset.dyid, a = t.currentTarget.dataset.reid, s = t.currentTarget.dataset.name;
        this.setData({
            dynamic_id: e,
            reply_user_id: a,
            replyText: s,
            comment: "",
            releaseFocus: !0
        });
    },
    dianzan: function(e) {
        var a = this, s = e.currentTarget.dataset.dyid, n = e.currentTarget.dataset.index, i = a.data.listInfo;
        a.data.userId > 0 ? t.post("friend.user_dynamic/praise_add", {
            dynamic_id: s,
            user_id: a.data.userId
        }, function(t) {
            if (wx.hideToast(), console.log("data", t), "200" == t.status) {
                i[n].praise_status = 2;
                var e = wx.getStorageSync("userImg"), s = wx.getStorageSync("userId");
                i[n].praise_list.push({
                    user_id: s,
                    user_img: e
                }), console.log("listInfo", i), a.setData({
                    listInfo: i
                });
            }
        }, !1, function() {}) : wx.showModal({
            title: "温馨提示",
            content: "您还没有登录，是否先去登录？",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "/pages/login/login"
                }) : t.cancel;
            }
        });
    },
    dianzanq: function(e) {
        var a = this, s = e.currentTarget.dataset.dyid, n = e.currentTarget.dataset.index, i = a.data.listInfo;
        a.data.userId > 0 ? t.post("friend.user_dynamic/praise_del", {
            dynamic_id: s,
            user_id: a.data.userId
        }, function(t) {
            if (wx.hideToast(), console.log("data", t), "200" == t.status) {
                i[n].praise_status = 1;
                for (var e = wx.getStorageSync("userId"), s = 0; s < i[n].praise_list.length; s++) i[n].praise_list[s].user_id == e && i[n].praise_list.splice(s, 1);
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
        var e = this, a = e.data.comment;
        if (a.length > 0) {
            if (!(e.data.userId > 0)) return void wx.showToast({
                title: "请先登录",
                duration: 2e3,
                icon: "none"
            });
            t.post("friend.user_dynamic/reply_add", {
                content: a,
                dynamic_id: e.data.dynamic_id,
                user_id: wx.getStorageSync("userId"),
                reply_user_id: e.data.reply_user_id
            }, function(t) {
                console.log("data", t), "200" == t.status && (wx.showToast({
                    title: "发表成功，请等待审核",
                    duration: 2e3,
                    icon: "none"
                }), e.setData({
                    releaseFocus: !1
                }));
            }, !1, function() {});
        } else wx.showToast({
            title: "请填写发表内容",
            duration: 2e3,
            icon: "none"
        });
    },
    touserInfo: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.requestSubscribeMessage({
            tmplIds: this.data.tempId,
            success: function(t) {
                return console.log("requestSubscribeMessage", t), "requestSubscribeMessage:ok" == t.errMsg ? (wx.navigateTo({
                    url: "/pages/userdetail/userdetail?id=" + e
                }), !0) : (wx.navigateTo({
                    url: "/pages/userdetail/userdetail?id=" + e
                }), !1);
            },
            fail: function(t) {
                console.log("requestSubscribeMessage", t);
            }
        });
    },
    go_add_dynamic: function(t) {
        this.data.userId > 0 ? wx.navigateTo({
            url: "/pages/fabudongtai/fabudongtai"
        }) : wx.showToast({
            title: "请先登录",
            duration: 2e3,
            icon: "none"
        });
    },
    onShow: function() {
        this.setData({
            userId: wx.getStorageSync("userId")
        });
    },
    onHide: function() {},
    comment_input: function(t) {
        this.setData({
            comment: t.detail.value
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getfrendslist();
    },
    guanliList: function(t) {
        var e = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/guanliList/guanliList?type=" + e
        });
    },
    hongniang: function() {
        wx.navigateTo({
            url: "/pages/lxkefu/lxkefu"
        });
    },
    onShareAppMessage: function() {}
});