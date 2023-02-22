var o, e, t, i = require("./mp_ecard_sdk/main"), a = wx.getExtConfigSync ? wx.getExtConfigSync() : {}, n = JSON.stringify(a);

console.log("extConfig", a, n), o = a.siteroot + "/api/", e = a.siteroot, t = a.store_id, 
App({
    data: {
        id: "",
        pintuan_order_id: 0,
        judge: "",
        tong: "",
        name: ""
    },
    onLaunch: function() {
        (0, i.initEid)();
    },
    member_isexist_wx_headimg: function(o) {
        var e = this, t = wx.getStorageSync("logintag");
        wx.request({
            url: e.globalData.siteroot + "member_isexist_wx_headimg",
            data: {
                logintag: t,
                uniacid: e.globalData.uniacid
            },
            method: "GET",
            success: function(o) {
                console.log("**************************"), console.log(o), console.log("**************************"), 
                "0000" == o.data.retCode && (e.data.authorization = 1);
            }
        });
    },
    goto: function(o) {
        wx.navigateTo({
            url: o,
            fail: function() {
                wx.switchTab({
                    url: o
                });
            }
        });
    },
    getUserInfo: function(o) {
        wx.getStorageSync("logintag") ? "function" == typeof o && o(this.globalData.userInfo) : (wx.redirectTo({
            url: "/pages/log/log"
        }), console.log("app logintag为空....... 重新获取"));
    },
    message: function(o) {
        console.log("app.Message();");
        wx.requestSubscribeMessage({
            tmplIds: [ "MNhNPWcUXCz1z458LLPQZMSwjBV2wh2om8YQDzQ2x5o", "w7ab7LzouKED9TNSFbXDgGoRLNYwfob6vuGQdMO0WDc", "aD_6p41RcTdcq8vQ__ymdpYhA24TVF16blgaaeVc8CE" ],
            success: function(o) {
                return console.log(o), "requestSubscribeMessage:ok" == o.errMsg;
            }
        });
    },
    login: function(o) {
        var e = this, t = o.uid ? o.uid : "0", i = o.referee_id ? o.referee_id : "0";
        wx.login({
            success: function(o) {
                wx.request({
                    url: e.globalData.siteroot + "memberlogin",
                    data: {
                        code: o.code,
                        uid: t,
                        referee_id: i,
                        uniacid: e.globalData.uniacid
                    },
                    method: "GET",
                    success: function(o) {
                        console.log("memberlogin接口.........."), console.log(o);
                        var t = o.data.retCode, i = o.data.retDesc, a = o.data.logintag;
                        wx.setStorageSync("logintag", a), "0000" == t ? (wx.setStorageSync("sf", o.data.sf), 
                        console.log("memberlogin:", i)) : (e.login(), console.log("memberlogin:", i));
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            }
        });
    },
    errorTip: function(o, e, t) {
        wx.showToast({
            title: e,
            icon: "none",
            duration: t
        });
    },
    globalData: {
        userInfo: null,
        store_id: t,
        MemberCard: "https://xsddyy.jsybsoft.com/ht.php/MemberCard/",
        Total: "https://xsddyy.jsybsoft.com/ht.php/Total/",
        url_img: "https://xsddyy.jsybsoft.com/Public/wxxcx/",
        uniacid: "1",
        siteroot: o,
        siteroot2: e
    }
});