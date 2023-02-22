var e, o = require("../../@babel/runtime/helpers/interopRequireDefault"), n = require("../../@babel/runtime/helpers/defineProperty"), t = o(require("../../@babel/runtime/regenerator")), i = require("../../@babel/runtime/helpers/asyncToGenerator"), a = getApp(), s = require("../../utils/request.js");

Page((n(e = {
    data: {
        newstop: {},
        newslist: [],
        choosexueli: "",
        imglist: [],
        xueliarr: [],
        xinziarr: []
    },
    onLoad: function(e) {},
    bindPickerChangexueli: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            choosexueli: e.detail.value
        });
    },
    bindPickerChangexinzi: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            choosexinzi: e.detail.value
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {}
}, "onShow", function() {}), n(e, "addimg", function() {
    var e = this, o = e.data.imglist;
    wx.chooseImage({
        count: 9 - o.length,
        sizeType: [ "original", "compressed" ],
        sourceType: [ "album", "camera" ],
        success: function(n) {
            var t = n.tempFilePaths;
            console.log("路径", t), 0 == o.length ? e.setData({
                imglist: t
            }) : (o = o.concat(t), e.setData({
                imglist: o
            }));
        }
    });
}), n(e, "deleteimg", function(e) {
    var o = this, n = e.currentTarget.dataset.index, t = o.data.imglist;
    wx.showModal({
        title: "提示",
        content: "确定删除该图片吗？",
        success: function(e) {
            e.confirm ? (t.splice(n, 1), o.setData({
                imglist: t
            })) : e.cancel;
        }
    });
}), n(e, "formSubmit", function(e) {
    var o = this;
    return i(t.default.mark(function n() {
        var i, l, c, r, u, d;
        return t.default.wrap(function(n) {
            for (;;) switch (n.prev = n.next) {
              case 0:
                if (i = o, (l = e.detail.value).content) {
                    n.next = 5;
                    break;
                }
                return wx.showToast({
                    title: "请填写内容",
                    duration: 2e3,
                    icon: "none"
                }), n.abrupt("return");

              case 5:
                if (c = i.data.imglist, r = [], [], l.user_id = wx.getStorageSync("userId"), wx.showToast({
                    icon: "loading",
                    title: "等待上传",
                    duration: 2e3
                }), 0 != c.length) for (u = function(e) {
                    new Promise(function(o) {
                        wx.uploadFile({
                            url: a.globalData.siteroot + "upload/image",
                            fileType: "image",
                            name: "file",
                            filePath: c[e],
                            header: {
                                "content-type": "multipart/form-data"
                            },
                            formData: {
                                store_id: a.globalData.store_id
                            },
                            success: function(e) {
                                var n = JSON.parse(e.data);
                                console.log("data", n), r.push(n.data.id), o(r);
                            }
                        });
                    }).then(function(e) {
                        console.log(e), console.log("上传成功", r), r.length == c.length && (l.img = JSON.stringify(e), 
                        console.log("value", l), s.post("friend.user_dynamic/add", l, function(e) {
                            console.log(e), "200" == e.status ? wx.showModal({
                                title: "温馨提示",
                                content: e.message,
                                showCancel: !1,
                                confirmColor: "#FB250D",
                                success: function(e) {
                                    e.confirm ? (wx.navigateBack({
                                        delta: 1
                                    }), console.log("用户点击确定")) : e.cancel && console.log("用户点击取消");
                                }
                            }) : wx.showToast({
                                title: e.message,
                                duration: 2e3,
                                icon: "none"
                            });
                        }));
                    });
                }, d = 0; d < c.length; d++) u(d); else s.post("friend.user_dynamic/add", l, function(e) {
                    console.log(e), "200" == e.status ? wx.showModal({
                        title: "温馨提示",
                        content: e.message,
                        showCancel: !1,
                        confirmColor: "#FB250D",
                        success: function(e) {
                            e.confirm ? (wx.navigateBack({
                                delta: 1
                            }), console.log("用户点击确定")) : e.cancel && console.log("用户点击取消");
                        }
                    }) : wx.showToast({
                        title: e.message,
                        duration: 2e3,
                        icon: "none"
                    });
                });
                console.log(i.data.imglist);

              case 12:
              case "end":
                return n.stop();
            }
        }, n);
    }))();
}), n(e, "onUnload", function() {}), n(e, "onPullDownRefresh", function() {}), n(e, "confirm", function(e) {
    console.log(e);
    var o = e.detail.value;
    if (o.username) if (o.experience) if (o.age) if (o.education_background) if (o.personal_advantage) if (o.job_expectations) if (o.work_experience) if (o.education_experience) if (o.project_experience) if (o.phone) if (o.xinzi) {
        s.post("EnterpriseService/job_information_submit", o, function(e) {
            console.log("data", e), "0000" == e.retCode && wx.showModal({
                title: "温馨提示",
                content: e.retDesc,
                showCancel: !1,
                confirmColor: "#881579",
                success: function(e) {
                    e.confirm ? (wx.navigateBack({
                        delta: 1
                    }), console.log("用户点击确定")) : e.cancel && console.log("用户点击取消");
                }
            });
        }, !1, function() {});
    } else wx.showToast({
        title: "请选择薪资范围",
        duration: 2e3,
        icon: "none"
    }); else wx.showToast({
        title: "请填写联系方式",
        duration: 2e3,
        icon: "none"
    }); else wx.showToast({
        title: "请填写项目经历",
        duration: 2e3,
        icon: "none"
    }); else wx.showToast({
        title: "请填写教育经历",
        duration: 2e3,
        icon: "none"
    }); else wx.showToast({
        title: "请填写工作经历",
        duration: 2e3,
        icon: "none"
    }); else wx.showToast({
        title: "请填写岗位",
        duration: 2e3,
        icon: "none"
    }); else wx.showToast({
        title: "请填写个人优势",
        duration: 2e3,
        icon: "none"
    }); else wx.showToast({
        title: "请选择最高学历",
        duration: 2e3,
        icon: "none"
    }); else wx.showToast({
        title: "请填写年龄",
        duration: 2e3,
        icon: "none"
    }); else wx.showToast({
        title: "请填写工作经验",
        duration: 2e3,
        icon: "none"
    }); else wx.showToast({
        title: "请填写姓名",
        duration: 2e3,
        icon: "none"
    });
}), n(e, "onReachBottom", function() {}), n(e, "onShareAppMessage", function() {}), 
e));