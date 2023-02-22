var e = getApp(), t = require("../../utils/request.js");

Page({
    data: {
        logo: "",
        yuedu: !0
    },
    onLoad: function(e) {
        var a = this, o = decodeURIComponent(e.scene);
        console.log("scene", o, e), o > 0 && wx.setStorageSync("inviter", o), wx.login({
            success: function(e) {
                a.setData({
                    code: e.code
                });
            }
        }), t.post("friend.setup/details", {}, function(e) {
            console.log("data", e), a.setData({
                logo: e.data.logo
            });
        }, !1, function() {});
    },
    onReady: function() {},
    torich: function(e) {
        var t = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/richTxt/richTxt?type=" + t
        });
    },
    querenyuedu: function() {
        this.setData({
            yuedu: !this.data.yuedu
        });
    },
    isyuedu: function() {
        this.data.yuedu && wx.showToast({
            title: "请阅读并同意《用户协议》《隐私政策》",
            duration: 2e3,
            icon: "none"
        });
    },
    getPhoneNumber: function(a) {
        var o = a.detail;
        if (console.log("phoneData", a), o.code) {
            var n = o.code;
            console.log(this.data.code, n, e.globalData.store_id), t.post("friend.user/new_applet_decode", {
                loginCode: this.data.code,
                code: n,
                store_id: e.globalData.store_id
            }, function(e) {
                console.log("data", e), "200" == e.status ? (wx.setStorageSync("userId", e.data.user_id), 
                wx.setStorageSync("userSex", e.data.user_sex), wx.setStorageSync("authenticate", e.data.user_authenticate), 
                wx.setStorageSync("userImg", e.data.user_img), wx.setStorageSync("shuaxin", 1), 
                0 != e.data.user_status ? wx.switchTab({
                    url: "/pages/mine/mine"
                }) : wx.navigateTo({
                    url: "/pages/register/register-first"
                })) : wx.showToast({
                    title: e.message,
                    duration: 2e3,
                    icon: "none"
                });
            }, !1, function() {});
        } else t.post("friend.user/applet_decode", {
            encryptedData: o.encryptedData,
            iv: o.iv,
            code: this.data.code,
            store_id: e.globalData.store_id
        }, function(e) {
            console.log("data", e), "200" == e.status ? (wx.setStorageSync("userId", e.data.user_id), 
            wx.setStorageSync("userSex", e.data.user_sex), wx.setStorageSync("authenticate", e.data.user_authenticate), 
            wx.setStorageSync("userImg", e.data.user_img), wx.setStorageSync("shuaxin", 1), 
            0 != e.data.user_status ? wx.switchTab({
                url: "/pages/mine/mine"
            }) : wx.navigateTo({
                url: "/pages/register/register-first"
            })) : wx.showToast({
                title: e.message,
                duration: 2e3,
                icon: "none"
            });
        }, !1, function() {});
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});