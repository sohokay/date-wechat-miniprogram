getApp();

var e = require("../../utils/request.js");

Page({
    data: {
        ispowerdialog: !1,
        aid: 0,
        painting: {},
        shareImage: "",
        type: "",
        jieshaoId: ""
    },
    onLoad: function(e) {
        var a = this;
        console.log(e), a.setData({
            type: e.type,
            jieshaoId: e.jieshaoId
        }, function() {
            a.eventDraw();
        });
    },
    onPullDownRefresh: function() {
        this.eventDraw();
    },
    eventDraw: function() {
        wx.showLoading({
            title: "绘制分享海报中",
            mask: !0
        });
        var a = this, t = a.data.type, i = "", o = "";
        console.log(t), 1 == t ? (i = a.data.jieshaoId, o = "friend.user/code1", wx.setNavigationBarTitle({
            title: "帮TA介绍"
        })) : (i = wx.getStorageSync("userId"), o = "friend.user/inviter"), e.post(o, {
            user_id: i
        }, function(e) {
            console.log("data", e), a.setData({
                painting: e.data
            });
        }, !1, function() {});
    },
    eventSave: function() {
        var e = this;
        wx.saveImageToPhotosAlbum({
            filePath: this.data.shareImage,
            success: function(e) {
                wx.showToast({
                    title: "海报保存成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(a) {
                "saveImageToPhotosAlbum:fail:auth denied" !== a.errMsg && "saveImageToPhotosAlbum:fail auth deny" !== a.errMsg || e.toggleOpenDialog();
            }
        });
    },
    toggleOpenDialog: function() {
        this.setData({
            ispowerdialog: !0
        });
    },
    cancelOpenDialog: function() {
        this.setData({
            ispowerdialog: !1
        });
    },
    eventGetImage: function(e) {
        wx.hideLoading();
        var a = e.detail, t = a.tempFilePath;
        "canvasdrawer:ok" === a.errMsg && this.setData({
            shareImage: t
        });
    }
});