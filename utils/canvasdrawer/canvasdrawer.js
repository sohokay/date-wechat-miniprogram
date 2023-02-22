var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
    }
    return t;
};

Component({
    properties: {
        painting: {
            type: Object,
            value: {
                view: []
            },
            observer: function(t, e) {
                this.data.isPainting || (JSON.stringify(t) !== JSON.stringify(e) ? t && t.width && t.height && (this.setData({
                    showCanvas: !0,
                    isPainting: !0
                }), this.readyPigment()) : t && "same" !== t.mode && this.triggerEvent("getImage", {
                    errMsg: "canvasdrawer:samme params"
                }));
            }
        }
    },
    data: {
        showCanvas: !1,
        width: 100,
        height: 100,
        tempFileList: [],
        isPainting: !1
    },
    ctx: null,
    cache: {},
    ready: function() {
        wx.removeStorageSync("canvasdrawer_pic_cache"), this.cache = wx.getStorageSync("canvasdrawer_pic_cache") || {}, 
        this.ctx = wx.createCanvasContext("canvasdrawer", this);
    },
    methods: {
        readyPigment: function() {
            var t = this, e = this.data.painting, i = e.width, a = e.height, s = e.views;
            this.setData({
                width: i,
                height: a
            });
            var n = setInterval(function() {
                t.ctx && (clearInterval(n), t.ctx.clearActions(), t.ctx.save(), t.getImagesInfo(s));
            }, 100);
        },
        getImagesInfo: function(t) {
            for (var e = this, i = [], a = 0; a < t.length; a++) "image" === t[a].type && i.push(this.getImageInfo(t[a].url));
            for (var s = [], n = 0; n < Math.ceil(i.length / 8); n++) !function(t) {
                s.push(new Promise(function(e, a) {
                    Promise.all(i.splice(8 * t, 8)).then(function(t) {
                        e(t);
                    }).catch(function(t) {
                        a(t);
                    });
                }));
            }(n);
            Promise.all(s).then(function(t) {
                for (var i = [], a = 0; a < t.length; a++) i = i.concat(t[a]);
                e.setData({
                    tempFileList: i
                }), e.startPainting();
            });
        },
        startPainting: function() {
            for (var e = this, i = this.data, a = i.tempFileList, s = i.painting.views, n = 0, r = 0; n < s.length; n++) if ("image" === s[n].type) this.drawImage(t({}, s[n], {
                url: a[r]
            })), r++; else if ("text" === s[n].type) {
                if (!this.ctx.measureText) return wx.showModal({
                    title: "提示",
                    content: "当前微信版本过低，无法使用 measureText 功能，请升级到最新微信版本后重试。"
                }), void this.triggerEvent("getImage", {
                    errMsg: "canvasdrawer:version too low"
                });
                this.drawText(s[n]);
            } else "rect" === s[n].type && this.drawRect(s[n]);
            this.ctx.draw(!1, function() {
                wx.setStorageSync("canvasdrawer_pic_cache", e.cache);
                var t = wx.getSystemInfoSync().system;
                /ios/i.test(t) ? e.saveImageToLocal() : setTimeout(function() {
                    e.saveImageToLocal();
                }, 800);
            });
        },
        drawImage: function(t) {
            this.ctx.save();
            var e = t.url, i = t.top, a = void 0 === i ? 0 : i, s = t.left, n = void 0 === s ? 0 : s, r = t.width, o = void 0 === r ? 0 : r, h = t.height, c = void 0 === h ? 0 : h, g = t.borderRadius, d = void 0 === g ? 0 : g, l = t.deg, v = void 0 === l ? 0 : l;
            d ? (this.ctx.beginPath(), this.ctx.arc(n + d, a + d, d, 0, 2 * Math.PI, !1), this.ctx.clip(), 
            this.ctx.drawImage(e, n, a, o, c)) : 0 !== v ? (this.ctx.translate(n + o / 2, a + c / 2), 
            this.ctx.rotate(v * Math.PI / 180), this.ctx.drawImage(e, -o / 2, -c / 2, o, c)) : this.ctx.drawImage(e, n, a, o, c), 
            this.ctx.restore();
        },
        drawText: function(e) {
            this.ctx.save();
            var i = e.MaxLineNumber, a = void 0 === i ? 2 : i, s = e.breakWord, n = void 0 !== s && s, r = e.color, o = void 0 === r ? "black" : r, h = e.content, c = void 0 === h ? "" : h, g = e.fontSize, d = void 0 === g ? 16 : g, l = e.top, v = void 0 === l ? 0 : l, x = e.left, w = void 0 === x ? 0 : x, f = e.lineHeight, m = void 0 === f ? 20 : f, u = e.textAlign, p = void 0 === u ? "left" : u, I = e.width, T = e.bolder, y = void 0 !== T && T, P = e.textDecoration, b = void 0 === P ? "none" : P;
            if (this.ctx.beginPath(), this.ctx.setTextBaseline("top"), this.ctx.setTextAlign(p), 
            this.ctx.setFillStyle(o), this.ctx.setFontSize(d), n) {
                for (var S = "", L = v, M = 1, F = 0; F < c.length; F++) if (S += [ c[F] ], this.ctx.measureText(S).width > I) {
                    if (M === a && F !== c.length) {
                        S = S.substring(0, S.length - 1) + "...", this.ctx.fillText(S, w, L), this.drawTextLine(w, L, b, o, d, S), 
                        S = "";
                        break;
                    }
                    this.ctx.fillText(S, w, L), this.drawTextLine(w, L, b, o, d, S), S = "", L += m, 
                    M++;
                }
                this.ctx.fillText(S, w, L), this.drawTextLine(w, L, b, o, d, S);
            } else this.ctx.fillText(c, w, v), this.drawTextLine(w, v, b, o, d, c);
            this.ctx.restore(), y && this.drawText(t({}, e, {
                left: w + .3,
                top: v + .3,
                bolder: !1,
                textDecoration: "none"
            }));
        },
        drawTextLine: function(t, e, i, a, s, n) {
            "underline" === i ? this.drawRect({
                background: a,
                top: e + 1.2 * s,
                left: t - 1,
                width: this.ctx.measureText(n).width + 3,
                height: 1
            }) : "line-through" === i && this.drawRect({
                background: a,
                top: e + .6 * s,
                left: t - 1,
                width: this.ctx.measureText(n).width + 3,
                height: 1
            });
        },
        drawRect: function(t) {
            this.ctx.save();
            var e = t.background, i = t.top, a = void 0 === i ? 0 : i, s = t.left, n = void 0 === s ? 0 : s, r = t.width, o = void 0 === r ? 0 : r, h = t.height, c = void 0 === h ? 0 : h;
            this.ctx.setFillStyle(e), this.ctx.fillRect(n, a, o, c), this.ctx.restore();
        },
        getImageInfo: function(t) {
            var e = this;
            return new Promise(function(i, a) {
                e.cache[t] ? i(e.cache[t]) : new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/).test(t) ? wx.getImageInfo({
                    src: t,
                    complete: function(s) {
                        "getImageInfo:ok" === s.errMsg ? (e.cache[t] = s.path, i(s.path)) : (e.triggerEvent("getImage", {
                            errMsg: "canvasdrawer:download fail"
                        }), a(new Error("getImageInfo fail")));
                    }
                }) : (e.cache[t] = t, i(t));
            });
        },
        saveImageToLocal: function() {
            var t = this, e = this.data, i = e.width, a = e.height;
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: i,
                height: a,
                canvasId: "canvasdrawer",
                complete: function(e) {
                    "canvasToTempFilePath:ok" === e.errMsg ? (t.setData({
                        showCanvas: !1,
                        isPainting: !1,
                        tempFileList: []
                    }), t.triggerEvent("getImage", {
                        tempFilePath: e.tempFilePath,
                        errMsg: "canvasdrawer:ok"
                    })) : t.triggerEvent("getImage", {
                        errMsg: "canvasdrawer:fail"
                    });
                }
            }, this);
        }
    }
});