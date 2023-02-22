var e = require("../@babel/runtime/helpers/interopRequireDefault"), o = e(require("./utils/validate")), t = e(require("./constants/log"));

module.exports = {
    initEid: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "https://eid.faceid.qq.com";
        wx.eidBaseUrl = e, wx.onAppShow(function(e) {
            if (console.log("!!!!!!监听onshow事件", e), 1038 === e.scene) {
                var o = e.referrerInfo, n = o.appId, r = o.extraData;
                if ("wx0e2cb0b052a91c92" === n && r) {
                    var a = r.verifyDone, i = r.token;
                    a && wx.handleEidVerifyDone ? wx.eidTokenToCallback && wx.eidTokenToCallback === i && (wx.eidTokenToCallback = "", 
                    wx.reportLogToEid({
                        token: i,
                        event: t.default.navigateBackFromEid,
                        errMsg: "从EID核身完成返回，token:".concat(i, ",verifyDone:").concat(a)
                    }), console.log("!!!!!!执行回调"), wx.handleEidVerifyDone(r)) : wx.reportLogToEid({
                        token: i,
                        event: t.default.navigateBackFromEidFail,
                        errMsg: "核验未完成或者没有处理核验完成的函数，token:".concat(i, ",verifyDone:").concat(a)
                    });
                }
            }
        });
        var o = wx.getSystemInfoSync(), n = o.version;
        wx.reportLogToEid = function(e) {
            var o = e.token, t = void 0 === o ? "" : o, r = e.event, a = void 0 === r ? "" : r, i = e.errCode, d = void 0 === i ? "" : i, c = e.errMsg, l = void 0 === c ? "" : c, s = e.data, v = void 0 === s ? "" : s, f = new Date(), u = {
                Token: t,
                SourceType: "mp_sdk",
                SourceVersion: "1.0.4",
                EnvVersion: n,
                Timestamp: f.getTime(),
                Event: a,
                ErrorCode: "number" == typeof d ? d.toString() : d,
                ErrorMsg: l,
                Data: v
            };
            console.log("开始上报日志：", u), wx.request({
                url: "".concat(wx.eidBaseUrl, "/api/common/ReportEvent"),
                method: "POST",
                data: u,
                success: function(e) {
                    console.log("上报日志完成：", "payload:", u, "res:", e);
                }
            });
        };
    },
    startEid: function(e) {
        var n = e.data, r = e.verifyDoneCallback;
        if (!n || !r) return wx.reportLogToEid({
            token: a,
            event: t.default.startEidFail,
            errMsg: "传入的参数有误"
        }), void wx.showModal({
            title: "提示",
            content: "传入的参数有误",
            showCancel: !1
        });
        var a = n.token;
        if (!(0, o.default)(a, "token")) return wx.reportLogToEid({
            token: a,
            event: t.default.startEidFail,
            errMsg: "传入的token有误，token:".concat(a)
        }), void wx.showModal({
            title: "提示",
            content: "传入的token有误",
            showCancel: !1
        });
        wx.handleEidVerifyDone = function(e) {
            var o = e.token;
            wx.navigateBack({
                success: function() {
                    wx.reportLogToEid({
                        token: o,
                        event: t.default.EidVerifyDone,
                        errMsg: "验证完成，token：".concat(o)
                    }), r({
                        token: o,
                        verifyDone: !0
                    });
                }
            });
        }, wx.navigateTo({
            url: "/mp_ecard_sdk/index/index?token=".concat(a)
        });
    }
};