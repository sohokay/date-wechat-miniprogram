var e, t = require("../../@babel/runtime/helpers/interopRequireDefault"), o = require("../../@babel/runtime/helpers/defineProperty"), n = t(require("../../@babel/runtime/regenerator")), i = require("../../@babel/runtime/helpers/asyncToGenerator"), a = getApp(), s = require("../../utils/request.js");

Page((o(e = {
    data: {
        newstop: {},
        newslist: [],
        choosexueli: "",
        imglist: [],
        xueliarr: [],
        xinziarr: []
    },
    onLoad: function(e) {
        this.setData({
            id: e.id
        }), wx.setNavigationBarTitle({
            title: "投诉编号" + e.id + "用户"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {}
}, "onShow", function() {}), o(e, "addimg", function() {
    var e = this, t = e.data.imglist;
    wx.chooseImage({
        count: 9 - t.length,
        sizeType: [ "original", "compressed" ],
        sourceType: [ "album", "camera" ],
        success: function(o) {
            var n = o.tempFilePaths;
            console.log("路径", n), 0 == t.length ? e.setData({
                imglist: n
            }) : (t = t.concat(n), e.setData({
                imglist: t
            }));
        }
    });
}), o(e, "deleteimg", function(e) {
    var t = this, o = e.currentTarget.dataset.index, n = t.data.imglist;
    wx.showModal({
        title: "提示",
        content: "确定删除该图片吗？",
        success: function(e) {
            e.confirm ? (n.splice(o, 1), t.setData({
                imglist: n
            })) : e.cancel;
        }
    });
}), o(e, "formSubmit", function(e) {
    var t = this;
    return i(n.default.mark(function o() {
        var i, r, l, c, u, d;
        return n.default.wrap(function(o) {
            for (;;) switch (o.prev = o.next) {
              case 0:
                if (i = t, (r = e.detail.value).content) {
                    o.next = 5;
                    break;
                }
                return wx.showToast({
                    title: "请填写内容",
                    duration: 2e3,
                    icon: "none"
                }), o.abrupt("return");

              case 5:
                if (0 != i.data.imglist) {
                    o.next = 8;
                    break;
                }
                return wx.showToast({
                    title: "请选择图片",
                    duration: 2e3,
                    icon: "none"
                }), o.abrupt("return");

              case 8:
                if (l = i.data.imglist, c = [], [], 0 != l.length) for (wx.showToast({
                    icon: "loading",
                    title: "等待上传",
                    duration: 2e3
                }), u = function(e) {
                    new Promise(function(t) {
                        wx.uploadFile({
                            url: a.globalData.siteroot + "upload/image",
                            fileType: "image",
                            name: "file",
                            filePath: l[e],
                            header: {
                                "content-type": "multipart/form-data"
                            },
                            formData: {
                                store_id: a.globalData.store_id
                            },
                            success: function(e) {
                                var o = JSON.parse(e.data);
                                console.log("data", o), c.push(o.data.id), t(c);
                            }
                        });
                    }).then(function(e) {
                        console.log(e), console.log("上传成功", c), c.length == l.length && (r.img = JSON.stringify(e), 
                        r.user_id = wx.getStorageSync("userId"), r.complaint_user_id = i.data.id, console.log("value", r), 
                        s.post("friend.user_complaint/add", r, function(e) {
                            console.log(e), "200" == e.status && wx.showModal({
                                title: "温馨提示",
                                content: e.message,
                                showCancel: !1,
                                confirmColor: "#FB250D",
                                success: function(e) {
                                    e.confirm ? (wx.navigateBack({
                                        delta: 1
                                    }), console.log("用户点击确定")) : e.cancel && console.log("用户点击取消");
                                }
                            });
                        }));
                    });
                }, d = 0; d < l.length; d++) u(d);
                console.log(i.data.imglist);

              case 13:
              case "end":
                return o.stop();
            }
        }, o);
    }))();
}), o(e, "onUnload", function() {}), o(e, "onPullDownRefresh", function() {}), o(e, "confirm", function(e) {
    console.log(e);
    var t = e.detail.value;
    if (t.username) if (t.experience) if (t.age) if (t.education_background) if (t.personal_advantage) if (t.job_expectations) if (t.work_experience) if (t.education_experience) if (t.project_experience) if (t.phone) if (t.xinzi) {
        s.post("EnterpriseService/job_information_submit", t, function(e) {
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
}), o(e, "onReachBottom", function() {}), o(e, "onShareAppMessage", function() {}), 
e));