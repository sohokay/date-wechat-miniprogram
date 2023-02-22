var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../utils/getParameterByName")), a = e(require("../constants/log"));

Component({
    options: {
        styleIsolation: "page-apply-shared"
    },
    data: {
        token: "",
        appName: "",
        isAgree: !!wx.getStorageSync("isAgree"),
        showAuth: !1,
        showWebView: !1,
        redirectUri: "",
        isNavigating: !1
    },
    methods: {
        onLoad: function(e) {
            var t = this, a = e.token;
            this.setData({
                token: a,
                isAgree: !!wx.getStorageSync("isAgree"),
                redirectUri: "".concat(wx.eidBaseUrl, "/api/v1/Redirect?token=").concat(a)
            }, function() {
                t.setData({
                    showWebView: !0
                }), t.getConfig(a);
            });
        },
        getConfig: function(e) {
            var t = this;
            wx.request({
                url: "".concat(wx.eidBaseUrl, "/api/v1/GetConfig?token=").concat(e),
                method: "GET",
                success: function(o) {
                    if (wx.reportLogToEid({
                        token: e,
                        event: a.default.getConfig,
                        errCode: o.data ? o.data.ErrorCode : "",
                        errMsg: o.data ? o.data.ErrorMsg : ""
                    }), o.data && 0 === o.data.ErrorCode) {
                        var i = o.data.Data.AppName;
                        t.setData({
                            appName: i
                        });
                    } else {
                        var r = o.data.ErrorMsg;
                        wx.showModal({
                            title: "提示",
                            content: r,
                            showCancel: !1,
                            success: function() {
                                wx.navigateBack();
                            }
                        });
                    }
                },
                fail: function(t) {
                    console.log("网络失败，请点击重新尝试", t), wx.reportLogToEid({
                        token: e,
                        event: a.default.getConfigFail,
                        errCode: "",
                        errMsg: t.errMsg
                    }), wx.showModal({
                        title: "提示",
                        content: "网络失败，请点击重新尝试",
                        showCancel: !1,
                        success: function() {
                            wx.navigateBack();
                        }
                    });
                }
            });
        },
        handleWebViewLoad: function(e) {
            console.log("webview load", e.detail.src);
            var o = this.data.token, i = (0, t.default)("success", e.detail.src);
            i && this.setData({
                showWebView: !1,
                showAuth: !0
            }), wx.reportLogToEid({
                token: o,
                event: a.default.webViewResult,
                errMsg: "success参数为".concat(i)
            });
        },
        handleWebViewError: function(e) {
            console.log("webview error", e), this.setData({
                showWebView: !1,
                showAuth: !0
            });
            var t = this.data.token;
            wx.reportLogToEid({
                token: t,
                event: a.default.webViewError,
                errMsg: e.detail.src
            });
        },
        changeAgree: function() {
            var e = !this.data.isAgree;
            this.setData({
                isAgree: e
            }, function() {
                wx.setStorageSync("isAgree", e);
            });
        },
        navigateToEid: function() {
            var e = this.data.token;
            this.setData({
                isNavigating: !0
            });
            var t = this;
            wx.navigateToMiniProgram({
                appId: "wx0e2cb0b052a91c92",
                path: "pages/huiyan/index",
                extraData: {
                    useHuiyan: !0,
                    huiyanToken: e
                },
                success: function() {
                    wx.eidTokenToCallback = e;
                },
                complete: function(o) {
                    t.setData({
                        isNavigating: !1
                    }), wx.reportLogToEid({
                        token: e,
                        event: a.default.navigateToEid,
                        errMsg: o.errMsg
                    });
                }
            });
        }
    }
});