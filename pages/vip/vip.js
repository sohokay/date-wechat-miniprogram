getApp();

var t = require("../../utils/request.js");

Page({
    data: {
        userinfo: {}
    },
    onLoad: function(t) {
        this.getData();
    },
    show_popup: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            popup: {
                show: !0,
                title: this.data.vipInfo.data.content[e].text,
                content: this.data.vipInfo.data.content[e].content
            }
        });
    },
    cancel_popup: function() {
        this.setData({
            "popup.show": !1
        });
    },
    getData: function() {
        this.setData({
            vipInfo: {
                code: 200,
                message: "请求成功",
                data: {
                    name: "VIP会员",
                    year: 1,
                    price: 365,
                    rebuy_price: .9,
                    rebuy_text: "会员期内续期9折，各项权益叠加",
                    rebuy_btn: "立即续期9折",
                    buy_btn: "立即开通",
                    text_top: "限时特惠",
                    bottom_text: "VIP专属服务",
                    middle_text: "快速提高80%脱单率",
                    content: {
                        vip_discount: {
                            icon: "vip_discount.png",
                            text: "会员期内红线6折",
                            content: "365会员期内购买红线一律6折",
                            value: -1,
                            current: -1,
                            used: !1
                        },
                        vip_readline: {
                            icon: "ic_redline.png",
                            text: "免费赠送3条红线",
                            content: "赠送3条红线，总价值90元",
                            value: 3,
                            current: -1,
                            used: !1
                        },
                        vip_label: {
                            icon: "vip_label.png",
                            text: "专属会员身份标识",
                            content: "会员专属的身份标识，更容易被发现，优先为你上墙、置顶，让更多的会员看到您",
                            value: -1,
                            current: -1,
                            used: !0
                        },
                        vip_activity: {
                            icon: "vip_activity.png",
                            text: "58元活动1元参加5次",
                            content: "5次活动机会，总价值300元 ，1元参与58元以下的相亲记举办的活动，参与活动联系客服报名",
                            value: 5,
                            current: -1,
                            price: 5800,
                            used: !1
                        },
                        vip_toutiao: {
                            icon: "vip_toutiao.png",
                            text: "免费上头条N次",
                            content: "在公众号（本地粉丝10000+）上推送头条文章",
                            value: -1,
                            current: -1,
                            used: !0
                        },
                        vip_wechat: {
                            icon: "vip_wechat.png",
                            text: "免费朋友圈转发N次",
                            content: "在所有红娘微信朋友圈（微信好友8000+）转发会员资料，提高曝光度",
                            value: -1,
                            current: -1,
                            used: !0
                        },
                        vip_collect: {
                            icon: "vip_collect.png",
                            text: "解锁访客记录/收藏我",
                            content: "可查看访问过我和收藏了我的会员，提高50%牵线成功率",
                            value: -1,
                            current: -1,
                            used: !0
                        },
                        vip_tuijian: {
                            icon: "vip_tuijian.png",
                            text: "专属牵线名额",
                            content: "可牵线自己中意的嘉宾",
                            value: 4,
                            current: -1,
                            used: !0
                        }
                    }
                }
            }
        });
    },
    go_buy: function() {
        this.data.userId > 0 ? wx.navigateTo({
            url: "/pages/wodehongniang/wodehongniang"
        }) : wx.showModal({
            title: "温馨提示",
            content: "您还没有登录，是否先去登录？",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "/pages/login/login"
                }) : t.cancel;
            }
        });
    },
    go_rebuy: function() {},
    onReady: function() {},
    onShow: function() {
        var t = this;
        wx.getStorageSync("userId") && t.setData({
            userId: wx.getStorageSync("userId"),
            authenticate: wx.getStorageSync("authenticate")
        }, function() {
            t.getUserInfo();
        });
    },
    getUserInfo: function() {
        var e = this;
        t.post("friend.user/details", {}, function(t) {
            wx.hideToast(), "200" == t.status && t.data.nickname.length > 0 && (wx.setStorageSync("userSex", t.data.sex), 
            wx.setStorageSync("authenticate", t.data.authenticate), e.setData({
                userinfo: t.data
            }));
        }, !1, function() {});
    },
    onHide: function() {
        wx.setBackgroundColor({
            backgroundColor: "#f6f6f6"
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onPageScroll: function(t) {
        t.scrollTop >= 5 ? wx.setBackgroundColor({
            backgroundColor: "#f6f6f6"
        }) : wx.setBackgroundColor({
            backgroundColor: "#FC4529"
        });
    },
    onShareAppMessage: function() {}
});