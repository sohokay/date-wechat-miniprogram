getApp();

var e = require("../../utils/request.js");

Page({
    data: {
        type: ""
    },
    onLoad: function(t) {
        var i = this;
        e.post("friend.agreement_notice/details", {
            type: t.type
        }, function(e) {
            console.log("data", e);
            var t = i.formatRichText(e.data.content);
            i.setData({
                node: t
            });
        }, !1, function() {}), e.post("friend.setup/details", {}, function(e) {
            console.log("data", e), i.setData({
                xcxname: e.data.name
            }), wx.setNavigationBarTitle({
                title: e.data.name
            });
        }, !1, function() {});
    },
    formatRichText: function(e) {
        var t = e.replace(/<img[^>]*>/gi, function(e, t) {
            return e = (e = (e = e.replace(/style="[^"]+"/gi, "").replace(/style='[^']+'/gi, "")).replace(/width="[^"]+"/gi, "").replace(/width='[^']+'/gi, "")).replace(/height="[^"]+"/gi, "").replace(/height='[^']+'/gi, "");
        });
        return t = (t = (t = t.replace(/style="[^"]+"/gi, function(e, t) {
            return e = e.replace(/width:[^;]+;/gi, "max-width:100%;").replace(/width:[^;]+;/gi, "max-width:100%;");
        })).replace(/<br[^>]*\/>/gi, "")).replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});