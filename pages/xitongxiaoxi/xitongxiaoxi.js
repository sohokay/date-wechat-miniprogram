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
        userId: ""
    },
    onLoad: function(e) {
        this.setData({
            userId: wx.getStorageSync("userId")
        }), this.getfrendslist();
    },
    preview: function(e) {
        console.log(e.currentTarget.dataset.src);
        var t = e.currentTarget.dataset.src, a = e.currentTarget.dataset.index, n = this.data.listInfo;
        wx.previewImage({
            current: t,
            urls: n[a].img_list
        });
    },
    getfrendslist: function() {
        var t = this;
        e.post("friend.information/index", {
            praise_user_id: wx.getStorageSync("userId"),
            user_id: wx.getStorageSync("userId"),
            page: t.data.page + 1,
            limit: 10
        }, function(e) {
            if (console.log("data", e), "200" == e.status) {
                var a, n = t.data.listInfo;
                "200" == e.status && (0 == n.length ? t.setData({
                    listInfo: e.data,
                    page: t.data.page + 1
                }) : (a = n.concat(e.data), t.setData({
                    listInfo: a,
                    page: t.data.page + 1
                }))), wx.hideToast();
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
                var a = e.data, n = [];
                a.category_list.hobby_name.length > 0 && (n = a.category_list.hobby_name.split(","));
                var s = [];
                a.category_list.personality_name.length > 0 && (s = a.category_list.personality_name.split(",")), 
                t.setData({
                    userInfo: a,
                    hobby_name: n,
                    personality_name: s,
                    isuncharts: !0
                });
            } else t.setData({
                isuncharts: !1
            });
        }, !1, function() {});
    },
    huifuPinglun: function(e) {
        var t = e.currentTarget.dataset.dyid, a = e.currentTarget.dataset.reid, n = e.currentTarget.dataset.name;
        this.setData({
            dynamic_id: t,
            reply_user_id: a,
            replyText: n,
            comment: "",
            releaseFocus: !0
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