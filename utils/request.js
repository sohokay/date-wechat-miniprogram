var e = getApp(), t = require("underscore"), o = [], n = {}, a = [], i = !1;

module.exports = {
    getRequestOptions: function(o, a) {
        return (o = t.extend({
            method: "GET",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                client: "XCX"
            },
            success: function(e) {
                try {
                    o.isLoginInvalid = !1;
                    void 0 === (e = e.data).code ? e.status : e.code;
                    var t = null;
                    void 0 !== e.info && (t = e.info), void 0 !== e && (t = e), o.callback.apply(a, [ t, e ]);
                } catch (e) {
                    console.error(e.stack);
                }
            },
            fail: function(e) {
                console.error(e), o.isLoginInvalid = !1, o.failAfter && o.failAfter.apply(a, [ e ]), 
                console.error(e, o.url);
            },
            complete: function(e) {
                o.isLoginInvalid && i || (setTimeout(function() {
                    o.isShowLoading, delete n[o.requestId];
                }, o.delay), o.completeAfter && o.completeAfter.call(a, e, o));
            }
        }, o)).isShowLoading = !1 !== o.isShowLoading, o.loadingText = o.loadingText || "请稍后...", 
        o.delay = o.delay || 500, o.data = o.data || {}, o.data.store_id = e.globalData.store_id, 
        o.data.id = wx.getStorageSync("userId"), o.requestId = o.requestId || t.uniqueId("RQ"), 
        n[o.requestId] = 1, o;
    },
    get: function(o, n, a, i, s) {
        s = s || {};
        var l = this.getRequestOptions(t.extend({
            url: e.globalData.siteroot + o,
            data: n,
            callback: a
        }, s), i);
        return l.isShowLoading && wx.showToast({
            icon: "loading",
            title: l.loadingText,
            duration: 2e3
        }), wx.request(l), l.requestId;
    },
    post: function(o, n, a, i, s) {
        s = s || {};
        var l = this.getRequestOptions(t.extend({
            url: e.globalData.siteroot + o,
            data: n,
            callback: a,
            method: "POST"
        }, s), i);
        return l.isShowLoading && wx.request(l), l.requestId;
    },
    upload: function(o, a, i, s, l, r, d) {
        d = d || {}, wx.showToast({
            title: "上传中...",
            icon: "loading",
            duration: 2e3
        });
        var c = t.extend({
            url: o,
            filePath: a,
            name: i,
            formData: s,
            success: function(t) {
                if (t = JSON.parse(t.data), c.isLoginInvalid = !1, 1 == t.code) l.apply(r, [ t.data, t ]); else if (2 == t.code) {
                    c.isLoginInvalid = !0;
                    wx.showToast({
                        title: "登录中",
                        icon: "loading",
                        duration: 1e4,
                        success: function() {
                            e.getNewToken(function(e) {
                                wx.uploadFile(c);
                            });
                        }
                    }), setTimeout(function() {
                        delete n[c.requestId], c.completeAfter && c.completeAfter.apply(r, [ {
                            statusCode: 0,
                            errMsg: "请求超时",
                            data: null
                        } ]);
                    }, 1e4);
                } else wx.showModal({
                    content: t.info,
                    showCancel: !1
                });
            },
            fail: function(e) {
                console.error(e), wx.showModal({
                    content: e.errMsg,
                    showCancel: !1
                });
            },
            complete: function(e) {
                c.isLoginInvalid || (setTimeout(function() {
                    delete n[c.requestId];
                }, c.delay), c.completeAfter && c.completeAfter.apply(r, [ e ]));
            }
        }, d);
        return c.delay = c.delay || 1e3, c.formData = c.formData || {}, c.formData.store_id = e.globalData.store_id, 
        c.formData.id = wx.getStorageSync("userId"), c.requestId = t.uniqueId("RQ"), n[c.requestId] = 1, 
        wx.uploadFile(c), c.requestId;
    },
    isLoading: function(e) {
        return !!e && void 0 !== n[e];
    },
    addLoginInvalidListener: function(e, t) {
        (t = void 0 !== t && t) ? o.unshift(e) : o.push(e);
    },
    removeLoginInvalidListener: function(e) {
        var n = t.indexOf(o, e);
        n >= 0 && o.splice(n, 1);
    },
    _fireLoginInvalidListener: function() {
        for (var e in o) o[e].apply(this);
    },
    login: function(t) {
        if (a.push(t), !i) {
            var o = function(e, t) {
                for (var o = 0; o < a.length; o++) {
                    var n = a[o];
                    "complete" === e ? n.complete.apply(null, t) : n.success.apply(null, t);
                }
            }, n = function(e) {
                1 != (e = e.data || e).code ? (!function(e) {
                    i = !1, o("complete", [ e ]), a.splice(0, a.length);
                }(e), wx.showModal({
                    content: e.info,
                    showCancel: !1
                })) : (wx.setStorageSync("user_info", e.data), wx.setStorageSync("utoken", e.utoken), 
                i = !1, o("success", [ e.utoken, e.data ]), a.splice(0, a.length));
            };
            i = !0, wx.showToast({
                title: "登录中",
                icon: "loading",
                duration: 1e4
            }), e.getUserInfo(function(e) {
                console.log("res", e), e.code = e.nickName ? 1 : 0, e.info = e.nickName ? "登录成功" : "请稍后重试~", 
                n(e), wx.showToast({
                    title: "登录成功",
                    icon: "success",
                    duration: 2e3
                });
            });
        }
    }
};