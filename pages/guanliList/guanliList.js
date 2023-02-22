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
        userId: "",
        page: 0,
        type: "",
        tempId: []
    },
    onLoad: function(e) {
        var a = this;
        a.setData({
            type: e.type
        }, function() {
            var t = e.type;
            1 == t ? (wx.setNavigationBarTitle({
                title: "我们恋爱了"
            }), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#ee5e78"
            })) : 2 == t ? (wx.setNavigationBarTitle({
                title: "我们结婚了"
            }), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#7f51ec"
            })) : 3 == t ? (wx.setNavigationBarTitle({
                title: "线下活动"
            }), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#fe9a13"
            })) : (wx.setNavigationBarTitle({
                title: "美食玩乐"
            }), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#5a93ff"
            })), a.getfrendslist();
        }), t.post("friend.subscribe_message/index", {
            type: 2
        }, function(t) {
            console.log("data", t), a.setData({
                tempId: t.data
            });
        }, !1, function() {});
    },
    preview: function(t) {
        console.log(t.currentTarget.dataset.src);
        var e = t.currentTarget.dataset.src, a = t.currentTarget.dataset.index, n = this.data.listInfo;
        wx.previewImage({
            current: e,
            urls: n[a].img_list
        });
    },
    getfrendslist: function() {
        var e = this;
        t.post("friend.dynamic/index", {
            type: e.data.type,
            page: e.data.page + 1,
            limit: 10
        }, function(t) {
            if (console.log("data", t), "200" == t.status) {
                var a, n = e.data.listInfo;
                "200" == t.status && (0 == n.length ? e.setData({
                    listInfo: t.data,
                    page: e.data.page + 1
                }) : (a = n.concat(t.data), e.setData({
                    listInfo: a,
                    page: e.data.page + 1
                }))), wx.hideToast();
            } else wx.hideToast(), e.setData({
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
    guanliList: function(t) {
        var e = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/guanliList/guanliList?type=" + e
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
                var a = t.data, n = [];
                a.category_list.hobby_name.length > 0 && (n = a.category_list.hobby_name.split(","));
                var i = [];
                a.category_list.personality_name.length > 0 && (i = a.category_list.personality_name.split(",")), 
                e.setData({
                    userInfo: a,
                    hobby_name: n,
                    personality_name: i,
                    isuncharts: !0
                });
            } else e.setData({
                isuncharts: !1
            });
        }, !1, function() {});
    },
    huifuPinglun: function(t) {
        var e = t.currentTarget.dataset.dyid, a = t.currentTarget.dataset.reid, n = t.currentTarget.dataset.name;
        this.setData({
            dynamic_id: e,
            reply_user_id: a,
            replyText: n,
            comment: "",
            releaseFocus: !0
        });
    },
    dianzan: function(e) {
        var a = this, n = e.currentTarget.dataset.dyid, i = e.currentTarget.dataset.index, s = a.data.listInfo;
        a.data.userId > 0 ? t.post("friend.user_dynamic/praise_add", {
            dynamic_id: n,
            user_id: a.data.userId
        }, function(t) {
            console.log("data", t), "200" == t.status && (s[i].praise_status = 2, a.setData({
                listInfo: s
            }));
        }, !1, function() {}) : wx.showToast({
            title: "请填写发表内容",
            duration: 2e3,
            icon: "none"
        });
    },
    dianzanq: function(e) {
        var a = this, n = e.currentTarget.dataset.dyid, i = e.currentTarget.dataset.index, s = a.data.listInfo;
        a.data.userId > 0 ? t.post("friend.user_dynamic/praise_del", {
            dynamic_id: n,
            user_id: a.data.userId
        }, function(t) {
            console.log("data", t), "200" == t.status && (s[i].praise_status = 1, a.setData({
                listInfo: s
            }));
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
    onShareAppMessage: function() {}
});