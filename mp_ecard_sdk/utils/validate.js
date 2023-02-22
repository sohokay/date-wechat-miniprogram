Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = function(e, t) {
    switch (t) {
      case "signature":
        return /^\S{74}={2}$/.test(e);

      case "appid":
        return "string" == typeof e && /^\d{4}$/.test(e);

      case "uid":
        return e;

      case "sms_phone":
        return /^1\d{10}$/.test(e);

      case "sms_verifyCode":
        return /^\d{4}$/.test(e);

      case "idcard":
        return function(e) {
            if (!e || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(e)) return !1;
            if (!{
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江 ",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北 ",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏 ",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外"
            }[e.substr(0, 2)]) return !1;
            if (18 === e.length) {
                e = e.split("");
                for (var t = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], r = 0, s = 0; s < 17; s++) r += e[s] * t[s];
                var n = [ 1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2 ][r % 11];
                if ("x" === e[17] || "X" === e[17]) return n === e[17].toUpperCase();
                if (n !== parseInt(e[17])) return !1;
            }
            return !0;
        }(e);

      case "idname":
        return e && !e.match(/[A-z0-9]/g);

      case "idaddress":
        return !!e;

      case "end_path":
        return /^\//.test(e);

      case "token":
        return /^[a-zA-Z0-9-]{36}$/.test(e);
    }
};

exports.default = e;