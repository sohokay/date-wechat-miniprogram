getApp();

var e = require("../../utils/request.js");

Page({
    data: {
        iszuixin: !0,
        isxueli: !1,
        isnianling: !1,
        isxingbie: !1,
        isgengduo: !1,
        isshaixuan: !0,
        page: 0,
        limit: 5,
        shaixuanlist: [],
        userList: [],
        is_up: 1,
        sex: "",
        sextxt: "性别",
        age1: 0,
        age2: 100,
        hei1: 0,
        hei2: 360,
        wei1: 0,
        wei2: 200,
        banne: [],
        sousuo: "",
        tempId: [],
        height: "",
        xcxname: "",
        scrollHeight: "",
        birth_place: "",
        region: "籍贯",
        district: "",
        region2: "现居住地"
    },
    onLoad: function(t) {
        var i = this;
        i.getfenlei(), e.post("friend.subscribe_message/index", {
            type: 2
        }, function(e) {
            console.log("data", e), i.setData({
                tempId: e.data
            });
        }, !1, function() {}), wx.getSystemInfo({
            success: function(e) {
                i.setData({
                    height: e.statusBarHeight
                });
            }
        }), e.post("friend.setup/details", {}, function(e) {
            console.log("data", e), i.setData({
                xcxname: e.data.name
            }), wx.setNavigationBarTitle({
                title: e.data.name
            });
        }, !1, function() {});
    },
    getfenlei: function() {
        var e = this, t = wx.getStorageSync("userSex"), i = "", a = "性别";
        console.log("sextype", t);
        var s = {
            status: "200",
            message: "获取成功",
            data: [ {
                id: "2",
                classify: "1",
                type: "1",
                is_query: "2",
                title: "婚史",
                name: "marriage_history",
                pid: "0",
                sort: "0",
                create_time: "",
                update_time: "",
                delete_time: "",
                classify_name: "自身条件",
                type_name: "单选",
                list: [ {
                    id: "32",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "未婚",
                    name: "",
                    pid: "2",
                    sort: "0",
                    create_time: "2021-07-07 08:56:07",
                    update_time: "2021-07-09 17:15:13",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "34",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "短婚未育",
                    name: "",
                    pid: "2",
                    sort: "0",
                    create_time: "2021-07-09 17:15:24",
                    update_time: "2021-07-09 17:16:00",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "35",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "离异",
                    name: "",
                    pid: "2",
                    sort: "0",
                    create_time: "2021-07-09 17:15:48",
                    update_time: "2021-07-09 17:15:48",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "36",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "丧偶",
                    name: "",
                    pid: "2",
                    sort: "0",
                    create_time: "2021-07-09 17:16:12",
                    update_time: "2021-07-09 17:16:12",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                } ]
            }, {
                id: "3",
                classify: "1",
                type: "1",
                is_query: "2",
                title: "生肖",
                name: "zodiac_sign",
                pid: "0",
                sort: "0",
                create_time: "",
                update_time: "",
                delete_time: "",
                classify_name: "自身条件",
                type_name: "单选",
                list: [ {
                    id: "33",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "鼠",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-07 08:56:10",
                    update_time: "2021-07-09 17:16:31",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "37",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "牛",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-09 17:16:38",
                    update_time: "2021-07-09 17:16:38",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "38",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "虎",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-09 17:16:45",
                    update_time: "2021-07-09 17:16:45",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "39",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "兔",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-09 17:16:51",
                    update_time: "2021-07-09 17:16:51",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "40",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "龙",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-09 17:16:57",
                    update_time: "2021-07-09 17:16:57",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "41",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "蛇",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-09 17:17:03",
                    update_time: "2021-07-09 17:17:03",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "42",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "马",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-09 17:17:08",
                    update_time: "2021-07-09 17:17:08",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "43",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "羊",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-09 17:17:16",
                    update_time: "2021-07-09 17:17:16",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "44",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "猴",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-09 17:17:22",
                    update_time: "2021-07-09 17:17:22",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "45",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "鸡",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-09 17:17:27",
                    update_time: "2021-07-09 17:17:27",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "46",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "狗",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-09 17:17:32",
                    update_time: "2021-07-09 17:17:32",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "47",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "猪",
                    name: "",
                    pid: "3",
                    sort: "0",
                    create_time: "2021-07-09 17:17:37",
                    update_time: "2021-07-09 17:17:37",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                } ]
            }, {
                id: "4",
                classify: "1",
                type: "1",
                is_query: "2",
                title: "星座",
                name: "constellation",
                pid: "0",
                sort: "0",
                create_time: "",
                update_time: "",
                delete_time: "",
                classify_name: "自身条件",
                type_name: "单选",
                list: [ {
                    id: "48",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "白羊座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:19:36",
                    update_time: "2021-07-09 17:19:36",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "49",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "金牛座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:19:46",
                    update_time: "2021-07-09 17:19:46",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "50",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "双子座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:19:57",
                    update_time: "2021-07-09 17:19:57",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "51",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "巨蟹座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:20:10",
                    update_time: "2021-07-09 17:20:10",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "52",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "狮子座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:20:19",
                    update_time: "2021-07-09 17:20:19",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "53",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "处女座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:20:28",
                    update_time: "2021-07-09 17:20:28",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "54",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "天秤座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:20:37",
                    update_time: "2021-07-09 17:20:37",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "55",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "天蝎座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:20:49",
                    update_time: "2021-07-09 17:20:49",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "56",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "射手座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:21:00",
                    update_time: "2021-07-09 17:21:00",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "57",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "摩羯座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:21:08",
                    update_time: "2021-07-09 17:21:08",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "58",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "水瓶座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:21:18",
                    update_time: "2021-07-09 17:21:18",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "59",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "双鱼座",
                    name: "",
                    pid: "4",
                    sort: "0",
                    create_time: "2021-07-09 17:21:28",
                    update_time: "2021-07-09 17:21:28",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                } ]
            }, {
                id: "5",
                classify: "1",
                type: "1",
                is_query: "2",
                title: "学历",
                name: "education",
                pid: "0",
                sort: "0",
                create_time: "",
                update_time: "",
                delete_time: "",
                classify_name: "自身条件",
                type_name: "单选",
                list: [ {
                    id: "60",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "无",
                    name: "",
                    pid: "5",
                    sort: "0",
                    create_time: "2021-07-09 17:21:45",
                    update_time: "2021-07-09 17:21:45",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "61",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "小学",
                    name: "",
                    pid: "5",
                    sort: "0",
                    create_time: "2021-07-09 17:22:01",
                    update_time: "2021-07-09 17:22:01",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "62",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "初中",
                    name: "",
                    pid: "5",
                    sort: "0",
                    create_time: "2021-07-09 17:22:07",
                    update_time: "2021-07-09 17:22:07",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "63",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "中专",
                    name: "",
                    pid: "5",
                    sort: "0",
                    create_time: "2021-07-09 17:22:13",
                    update_time: "2021-07-09 17:22:13",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "64",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "高中",
                    name: "",
                    pid: "5",
                    sort: "0",
                    create_time: "2021-07-09 17:22:18",
                    update_time: "2021-07-09 17:22:18",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "65",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "大专",
                    name: "",
                    pid: "5",
                    sort: "0",
                    create_time: "2021-07-09 17:22:29",
                    update_time: "2021-07-09 17:22:29",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "66",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "本科",
                    name: "",
                    pid: "5",
                    sort: "0",
                    create_time: "2021-07-09 17:22:34",
                    update_time: "2021-07-09 17:22:34",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "67",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "硕士",
                    name: "",
                    pid: "5",
                    sort: "0",
                    create_time: "2021-07-09 17:22:39",
                    update_time: "2021-07-09 17:22:39",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "68",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "博士",
                    name: "",
                    pid: "5",
                    sort: "0",
                    create_time: "2021-07-09 17:22:43",
                    update_time: "2021-07-09 17:22:43",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "69",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "博士后",
                    name: "",
                    pid: "5",
                    sort: "0",
                    create_time: "2021-07-09 17:22:49",
                    update_time: "2021-07-09 17:22:49",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                } ]
            }, {
                id: "6",
                classify: "1",
                type: "3",
                is_query: "2",
                title: "籍贯",
                name: "birth_place",
                pid: "0",
                sort: "0",
                create_time: "",
                update_time: "",
                delete_time: "",
                classify_name: "自身条件",
                type_name: "地址",
                list: []
            }, {
                id: "7",
                classify: "1",
                type: "3",
                is_query: "2",
                title: "现居地区",
                name: "district",
                pid: "0",
                sort: "0",
                create_time: "",
                update_time: "",
                delete_time: "",
                classify_name: "自身条件",
                type_name: "地址",
                list: []
            }, {
                id: "8",
                classify: "2",
                type: "1",
                is_query: "2",
                title: "年薪",
                name: "yearly_salary",
                pid: "0",
                sort: "0",
                create_time: "",
                update_time: "",
                delete_time: "",
                classify_name: "经济条件",
                type_name: "单选",
                list: [ {
                    id: "70",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "4万以内",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-07-09 17:23:55",
                    update_time: "2021-09-07 11:02:28",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "71",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "4万-6万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-07-09 17:24:32",
                    update_time: "2021-09-07 11:02:59",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "72",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "6万-8万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-07-09 17:25:32",
                    update_time: "2021-09-07 11:03:14",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "73",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "8万-10万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-07-09 17:25:43",
                    update_time: "2021-09-07 11:04:35",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "74",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "10万-20万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-07-09 17:25:57",
                    update_time: "2021-09-07 14:08:36",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "75",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "20万-30万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-07-09 17:26:39",
                    update_time: "2021-09-07 14:08:43",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "76",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "30万-50万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-07-09 17:26:54",
                    update_time: "2021-09-06 16:34:36",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "77",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "50万-80万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-07-09 17:27:04",
                    update_time: "2021-09-07 14:07:21",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "260",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "80万-100万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-09-06 16:35:00",
                    update_time: "2021-09-07 14:07:42",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "293",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "100万-150万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-09-07 14:09:07",
                    update_time: "2021-09-07 14:09:07",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "294",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "150万-200万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-09-07 14:09:16",
                    update_time: "2021-09-07 14:09:16",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "295",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "200万-300万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-09-07 14:09:27",
                    update_time: "2021-09-07 14:09:27",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "296",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "300万-500万",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-09-07 14:09:36",
                    update_time: "2021-09-07 14:09:36",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "297",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "500万以上",
                    name: "",
                    pid: "8",
                    sort: "0",
                    create_time: "2021-09-07 14:09:50",
                    update_time: "2021-09-07 14:09:50",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                } ]
            }, {
                id: "11",
                classify: "2",
                type: "1",
                is_query: "2",
                title: "单位性质",
                name: "unit_nature",
                pid: "0",
                sort: "0",
                create_time: "",
                update_time: "",
                delete_time: "",
                classify_name: "经济条件",
                type_name: "单选",
                list: [ {
                    id: "222",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "上市公司",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:15:09",
                    update_time: "2021-07-13 11:15:09",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "223",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "世界500强",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:15:18",
                    update_time: "2021-07-13 11:15:18",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "224",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "个体工商户",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:15:28",
                    update_time: "2021-07-13 11:15:28",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "225",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "事业单位-在编",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:15:34",
                    update_time: "2021-09-06 16:58:52",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "226",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "国企-在编",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:15:42",
                    update_time: "2021-09-06 16:58:20",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "227",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "外资企业",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:15:48",
                    update_time: "2021-07-13 11:15:48",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "228",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "学生",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:15:55",
                    update_time: "2021-07-13 11:15:55",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "229",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "待业",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:16:01",
                    update_time: "2021-07-13 11:16:01",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "230",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "政府机关",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:16:07",
                    update_time: "2021-07-13 11:16:07",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "231",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "私企",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:16:13",
                    update_time: "2021-07-13 11:16:13",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "232",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "自有公司",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:16:23",
                    update_time: "2021-07-13 11:16:23",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "233",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "自由职业",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:16:28",
                    update_time: "2021-07-13 11:16:28",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "234",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "其他",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-07-13 11:16:35",
                    update_time: "2021-07-13 11:16:35",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "287",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "国企-不在编",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-09-06 16:58:33",
                    update_time: "2021-09-06 16:58:33",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "288",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "事业单位-不在编",
                    name: "",
                    pid: "11",
                    sort: "0",
                    create_time: "2021-09-06 16:58:44",
                    update_time: "2021-09-06 16:58:44",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                } ]
            }, {
                id: "14",
                classify: "2",
                type: "1",
                is_query: "2",
                title: "购房情况",
                name: "house_purchase",
                pid: "0",
                sort: "0",
                create_time: "",
                update_time: "",
                delete_time: "",
                classify_name: "经济条件",
                type_name: "单选",
                list: [ {
                    id: "169",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "与父母同住",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-07-13 11:00:46",
                    update_time: "2021-07-13 11:00:46",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "170",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "有婚房无贷款",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-07-13 11:01:09",
                    update_time: "2021-07-13 11:01:09",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "171",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "有婚房有贷款",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-07-13 11:01:28",
                    update_time: "2021-07-13 11:01:28",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "172",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "住亲朋家",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-07-13 11:01:44",
                    update_time: "2021-07-13 11:01:44",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "173",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "住单位房",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-07-13 11:01:58",
                    update_time: "2021-07-13 11:01:58",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "174",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "婚后购房",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-07-13 11:02:10",
                    update_time: "2021-07-13 11:02:10",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "175",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "已购房无贷款",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-07-13 11:02:23",
                    update_time: "2021-07-13 11:02:23",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "176",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "已购房有贷款",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-07-13 11:02:38",
                    update_time: "2021-07-13 11:02:38",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "177",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "租房",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-07-13 11:02:47",
                    update_time: "2021-07-13 11:02:47",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "178",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "需要时可购置",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-07-13 11:03:00",
                    update_time: "2021-07-13 11:03:00",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "298",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "房子买在老家",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-10-13 14:10:14",
                    update_time: "2021-10-13 14:10:29",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                }, {
                    id: "299",
                    classify: "1",
                    type: "1",
                    is_query: "1",
                    title: "自建房",
                    name: "",
                    pid: "14",
                    sort: "0",
                    create_time: "2021-10-13 14:10:22",
                    update_time: "2021-10-13 14:10:22",
                    delete_time: "",
                    classify_name: "自身条件",
                    type_name: "单选"
                } ]
            } ]
        };
        "200" == s.status && (t && (1 == t ? (i = 2, a = "女") : (i = 1, a = "男")), e.setData({
            shaixuanlist: s.data,
            userList: [],
            age1: 0,
            sex: i,
            sextxt: a,
            age2: 100,
            hei1: 100,
            hei2: 250,
            wei1: 0,
            wei2: 200,
            page: 0,
            iszuixin: !0,
            is_up: 1,
            birth_place: "",
            region: "籍贯",
            district: "",
            region2: "现居住地"
        }, function() {
            e.getUserList(), e.cancleBox();
        }));
    },
    cancleBox: function(e) {
        this.setData({
            isxueli: !1,
            isnianling: !1,
            isxingbie: !1,
            isgengduo: !1,
            isshaixuan: !0
        });
    },
    zuixin: function() {
        var e = this;
        e.cancleBox();
        var t = 1;
        e.data.iszuixin && (t = ""), e.setData({
            iszuixin: !e.data.iszuixin,
            is_up: t,
            userList: [],
            page: 0
        }, function() {
            e.getUserList();
        });
    },
    choosesex: function(e) {
        var t = this, i = e.currentTarget.dataset.type, a = "性别", s = "";
        1 == i ? (a = "男", s = 1) : 2 == i && (a = "女", s = 2), t.setData({
            page: 0,
            userList: [],
            sex: s,
            sextxt: a
        }, function() {
            t.cancleBox(), t.getUserList();
        });
    },
    bindRegionChange: function(e) {
        var t = this;
        console.log(e), t.setData({
            birth_place: e.detail.code[2],
            region: e.detail.value[2],
            userList: [],
            page: 0
        }, function() {
            t.getUserList();
        });
    },
    bindRegionChange2: function(e) {
        var t = this;
        console.log(e), t.setData({
            district: e.detail.code[2],
            region2: e.detail.value[2],
            userList: [],
            page: 0
        }, function() {
            t.getUserList();
        });
    },
    searchUser: function() {
        var e = this;
        e.setData({
            page: 0,
            userList: []
        }, function() {
            e.cancleBox(), e.getUserList();
        });
    },
    changeChoose: function(e) {
        for (var t = this.data.shaixuanlist, i = e.currentTarget.dataset.index, a = e.currentTarget.dataset.index2, s = 0; s < t[i].list.length; s++) t[i].list[s].selected = !1;
        console.log(i, a, t), t[i].list[a].selected = !0, this.setData({
            shaixuanlist: t
        });
    },
    changeChoose2: function(e) {
        var t = this.data.shaixuanlist, i = e.currentTarget.dataset.index, a = e.currentTarget.dataset.index2;
        console.log(i, a, t), t[i].list[a].selected ? t[i].list[a].selected = !t[i].list[a].selected : t[i].list[a].selected = !0, 
        this.setData({
            shaixuanlist: t
        });
    },
    getUserList: function() {
        for (var t = this, i = t.data.userList, a = t.data.shaixuanlist, s = {}, n = 0; n < a.length; n++) {
            var l = "";
            if (1 == a[n].type) for (var _ = 0; _ < a[n].list.length; _++) a[n].list[_].selected && (s[a[n].name] = a[n].list[_].id, 
            l = a[n].list[_].id);
            if (2 == a[n].type) {
                for (var m = [], d = 0; d < a[n].list.length; d++) a[n].list[d].selected && m.push(a[n].list[d].id);
                s[a[n].name] = JSON.stringify(m), l = m;
            }
            console.log("isNull", l);
        }
        console.log("userzhuce", s), s.page = t.data.page + 1, s.limit = t.data.limit, s.birthday_start = t.data.age1, 
        s.birthday_end = t.data.age2, s.height_start = t.data.hei1, s.height_end = t.data.hei2, 
        s.weight_start = t.data.wei1, s.weight_end = t.data.wei2, s.sex = t.data.sex, s.birth_place = t.data.birth_place, 
        s.district = t.data.district, e.post("friend.user/index", s, function(e) {
            var a;
            console.log("data", e), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), 
            "200" == e.status ? (0 == i.length ? t.setData({
                userList: e.data
            }, function() {}) : (a = i.concat(e.data), t.setData({
                userList: a
            }, function() {})), wx.hideToast()) : wx.showToast({
                title: e.message,
                duration: 2e3,
                icon: "none"
            });
        }, !1, function() {});
    },
    ageask1: function(e) {
        console.log(e.detail.value);
        this.setData({
            age1: e.detail.value
        });
    },
    ageask2: function(e) {
        console.log(e.detail.value);
        this.setData({
            age2: e.detail.value
        });
    },
    heiask1: function(e) {
        console.log(e.detail.value);
        this.setData({
            hei1: e.detail.value
        });
    },
    heiask2: function(e) {
        console.log(e.detail.value);
        this.setData({
            hei2: e.detail.value
        });
    },
    weiask1: function(e) {
        console.log(e.detail.value);
        this.setData({
            wei1: e.detail.value
        });
    },
    weiask2: function(e) {
        console.log(e.detail.value);
        this.setData({
            wei2: e.detail.value
        });
    },
    sousuotxt: function(e) {
        console.log(e.detail.value);
        this.setData({
            sousuo: e.detail.value
        });
    },
    onPullDownRefresh: function() {
        this.getfenlei(), wx.showNavigationBarLoading(), console.log("正在下拉刷新");
    },
    chooseTap: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.tap;
        "xb" == t ? this.setData({
            isshaixuan: !1,
            isxingbie: !0
        }) : "nl" == t ? this.setData({
            isshaixuan: !1,
            isnianling: !0
        }) : "xl" == t ? this.setData({
            isshaixuan: !1,
            isxueli: !0
        }) : "gd" == t && this.setData({
            isshaixuan: !1,
            isgengduo: !0
        });
    },
    touserInfo: function(e) {
        var t = e.currentTarget.dataset.id;
        console.log("tempId", this.data.tempId), wx.requestSubscribeMessage({
            tmplIds: this.data.tempId,
            success: function(e) {
                return console.log("requestSubscribeMessage", e), "requestSubscribeMessage:ok" == e.errMsg ? (wx.navigateTo({
                    url: "/pages/userdetail/userdetail?id=" + t
                }), !0) : (wx.navigateTo({
                    url: "/pages/userdetail/userdetail?id=" + t
                }), !1);
            },
            fail: function(e) {
                console.log("requestSubscribeMessage", e);
            }
        });
    },
    userlist: function(e) {
        var t = e.currentTarget.dataset.sex;
        wx.navigateTo({
            url: "/pages/userList/userList?sex=" + t
        });
    },
    guanliList: function(e) {
        var t = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/guanliList/guanliList?type=" + t
        });
    },
    navitoother: function(e) {
        var t = e.currentTarget.dataset.type, i = e.currentTarget.dataset.url, a = e.currentTarget.dataset.appid, s = e.currentTarget.dataset.node;
        console.log("跳转", t, i, a), 1 == t && wx.navigateTo({
            url: i
        }), 2 == t && wx.navigateToMiniProgram({
            appId: a,
            path: i,
            extraData: {},
            envVersion: "release",
            success: function(e) {
                console.log("成功");
            }
        }), 3 == t && (console.log(s), wx.setStorageSync("node", s), wx.navigateTo({
            url: "/pages/node/node"
        }));
    },
    tosearch: function(e) {
        var t = this.data.sousuo;
        wx.navigateTo({
            url: "/pages/userList/userList?sousuo=" + t
        });
    },
    onReachBottom: function() {
        var e = this;
        console.log("触底"), e.setData({
            page: e.data.page + 1
        }, function() {
            e.getUserList();
        });
    },
    onShow: function() {
        var t = wx.getStorageSync("shuaxin"), i = this;
        console.log("shuaxin", t), 1 == t && (i.getfenlei(), wx.setStorageSync("shuaxin", 0)), 
        e.post("friend.banner/index", {}, function(e) {
            console.log("data", e), i.setData({
                banne: e.data
            });
        }, !1, function() {}), wx.getStorageSync("userId") && e.post("friend.pull_strings/index", {
            page: 1,
            user_id: wx.getStorageSync("userId"),
            status: 1,
            is_read: 1,
            limit: 10
        }, function(t) {
            console.log("data", t), e.post("friend.feedback/index", {
                user_id: wx.getStorageSync("userId"),
                page: 1,
                is_read: 1,
                limit: 10
            }, function(e) {
                console.log("data2", e);
                var i = 0;
                if ("200" == t.status && (i += t.data.length), "200" == e.status && (i += e.data.length), 
                console.log("yigong", i), 0 == i) wx.removeTabBarBadge({
                    index: 3
                }); else {
                    var a = JSON.stringify(i);
                    wx.setTabBarBadge({
                        index: 3,
                        text: a
                    });
                }
            }, !1, function() {});
        }, !1, function() {});
    },
    onPageScroll: function(e) {
        this.setData({
            scrollHeight: e.scrollTop
        });
    },
    onShareAppMessage: function() {}
});