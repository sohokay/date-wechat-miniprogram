getApp();

var n = require("../../utils/request.js");

Page({
    data: {
        bianjiinfo: {}
    },
    onLoad: function(n) {},
    getbianjiInfo: function() {
        var i = this;
        n.post("friend.user/edit_details", {}, function(n) {
            console.log("data", n), "200" == n.status ? i.setData({
                bianjiinfo: n.data
            }) : wx.showToast({
                title: n.message,
                duration: 2e3,
                icon: "none"
            });
        }, !1, function() {});
    },
    onReady: function() {},
    tobianji: function(n) {
        var i = n.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/bianji/bianjiindex/bianjiindex?type=" + i
        });
    },
    tobianjiPic: function() {
        wx.navigateTo({
            url: "/pages/bianji/bianjipic/bianjipic"
        });
    },
    onShow: function() {
        this.getbianjiInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});