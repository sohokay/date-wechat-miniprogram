getApp();

var t = require("../../utils/request.js");

Page({
    data: {
        inviter_user_id: "",
        apply_words: [ "你好，可以交个朋友吗", "你好, 我对你蛮感兴趣的", "你好, 可以聊聊吗？" ],
        apply_index: 1,
        reject_words: [ "抱歉，我觉得我们不太合适", "不好意思啊，您不是我的理想类型", "我不想和你认识" ],
        reject_index: 1,
        accept_words: [ "很高兴认识你", "嗯，我们可以聊聊", "我还是蛮喜欢你这类型的" ],
        accept_index: 1,
        isclect: !1,
        userId: "",
        isuncharts: !0,
        quecharts: !1,
        quehui: 1,
        qianxianid: "",
        timedingshi: "",
        qianxiantime: "",
        xcxname: "",
        tempId: []
    },
    onLoad: function(e) {
        var a = this, i = e.id;
        t.post("friend.subscribe_message/index", {
            type: 2
        }, function(t) {
            console.log("data", t), a.setData({
                tempId: t.data
            });
        }, !1, function() {}), a.setData({
            inviter_user_id: i,
            userId: wx.getStorageSync("userId"),
            name: e.name
        }, function() {
            a.getusercharts();
        }), t.post("friend.setup/details", {}, function(t) {
            console.log("data", t), a.setData({
                xcxname: t.data.name
            }), wx.setNavigationBarTitle({
                title: t.data.name
            });
        }, !1, function() {});
    },
    toquecharts: function() {
        this.setData({
            quecharts: !0
        });
    },
    totousu: function() {
        wx.navigateTo({
            url: "/pages/tousu/tousu?id=" + this.data.inviter_user_id
        });
    },
    getusercharts: function() {
        var e = this;
        clearInterval(e.data.timedingshi), t.post("friend.pull_strings/details", {
            inviter_user_id: e.data.inviter_user_id,
            user_id: wx.getStorageSync("userId")
        }, function(a) {
            console.log("data", a), "200" == a.status ? (1 == a.data.status && (e.data.timedingshi = setInterval(function() {
                e.timeover(a.data.expire_time);
            }, 1e3)), a.data.inviter_user_id == wx.getStorageSync("userId") && t.post("friend.pull_strings/edit", {
                pull_strings_id: a.data.id,
                is_read: 2,
                inviter_user_id: wx.getStorageSync("userId")
            }, function(t) {
                console.log("data", t), "200" == t.status || wx.showToast({
                    title: t.message,
                    duration: 2e3,
                    icon: "none"
                });
            }, !1, function() {}), e.setData({
                chartsList: a.data,
                qianxianid: a.data.id,
                isuncharts: !0
            })) : e.setData({
                isuncharts: !1
            });
        }, !1, function() {});
    },
    onReady: function() {},
    timeover: function(t) {
        var e = (t = t) - (new Date().getTime() / 1e3).toFixed(0);
        e <= 0 && (clearInterval(this.data.timedingshi), this.getusercharts());
        var a = Math.floor(e / 60 / 60 / 24), i = Math.floor(e / 60 / 60 % 24), n = Math.floor(e / 60 % 60), s = Math.floor(e % 60);
        parseInt(a) < 10 && (a = "0" + a), parseInt(i) < 10 && (i = "0" + i), parseInt(n) < 10 && (n = "0" + n), 
        parseInt(s) < 10 && (s = "0" + s), console.log(a + ":" + i + ":" + n + ":" + s), 
        this.setData({
            qianxiantime: a + ":" + i + ":" + n + ":" + s
        });
    },
    bindapply: function(t) {
        console.log("picker发送选择改变，携带值为", t), this.setData({
            apply_index: t.detail.value
        });
    },
    bindreject: function(t) {
        console.log("picker发送选择改变，携带值为", t), this.setData({
            reject_index: t.detail.value
        });
    },
    bindaccept: function(t) {
        console.log("picker发送选择改变，携带值为", t), this.setData({
            accept_index: t.detail.value
        });
    },
    quehui: function(t) {
        var e = t.currentTarget.dataset.type;
        this.setData({
            quehui: e
        });
    },
    copy: function(t) {
        var e = t.currentTarget.dataset.weixin;
        console.log(t), wx.setClipboardData({
            data: e,
            success: function(t) {
                wx.showToast({
                    title: "微信号已复制"
                });
            }
        });
    },
    tongyiqianxian: function() {
        wx.showToast({
            title: "正在回复请稍等",
            icon: "none"
        });
        var e = this, a = e.data.quehui, i = "";
        i = 2 == a ? e.data.accept_words[e.data.accept_index] : e.data.reject_words[e.data.reject_index], 
        t.post("friend.pull_strings/edit", {
            pull_strings_id: e.data.qianxianid,
            status: a,
            inviter_user_id: wx.getStorageSync("userId")
        }, function(a) {
            console.log("data", a), "200" == a.status ? (t.post("friend.pull_strings/reply_add", {
                pull_strings_id: e.data.qianxianid,
                inviter_user_id: wx.getStorageSync("userId"),
                content: i
            }, function(t) {
                console.log("data", t), "200" == t.status ? (e.getusercharts(), wx.hideToast()) : wx.showToast({
                    title: t.message,
                    duration: 2e3,
                    icon: "none"
                });
            }, !1, function() {}), wx.hideToast()) : wx.showToast({
                title: a.message,
                duration: 2e3,
                icon: "none"
            });
        }, !1, function() {});
    },
    fasonghongxian: function() {
        var e = this, a = e.data.apply_words[e.data.apply_index];
        wx.showToast({
            title: "正在发送红线请稍等",
            icon: "none"
        }), t.post("friend.pull_strings/add", {
            inviter_user_id: e.data.inviter_user_id,
            user_id: wx.getStorageSync("userId")
        }, function(i) {
            console.log("data", i), "200" == i.status ? (t.post("friend.pull_strings/reply_add", {
                pull_strings_id: i.data,
                user_id: wx.getStorageSync("userId"),
                content: a
            }, function(t) {
                console.log("data", t), "200" == t.status ? (e.getusercharts(), wx.hideToast()) : wx.showToast({
                    title: t.message,
                    duration: 2e3,
                    icon: "none"
                });
            }, !1, function() {}), wx.hideToast()) : wx.showToast({
                title: i.message,
                duration: 2e3,
                icon: "none"
            });
        }, !1, function() {});
    },
    toback: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onShow: function() {},
    onHide: function() {},
    touserInfo: function(t) {
        var e = this;
        console.log("tempId", e.data.tempId), wx.requestSubscribeMessage({
            tmplIds: e.data.tempId,
            success: function(t) {
                return console.log("requestSubscribeMessage", t), "requestSubscribeMessage:ok" == t.errMsg ? (wx.navigateTo({
                    url: "/pages/userdetail/userdetail?id=" + e.data.inviter_user_id
                }), !0) : (wx.navigateTo({
                    url: "/pages/userdetail/userdetail?id=" + e.data.inviter_user_id
                }), !1);
            },
            fail: function(t) {
                console.log("requestSubscribeMessage", t);
            }
        });
    },
    onUnload: function() {
        clearInterval(this.data.timedingshi);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});