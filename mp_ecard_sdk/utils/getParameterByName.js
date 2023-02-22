Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = function(e, t) {
    e = e.replace(/[\[\]]/g, "\\$&");
    var r = new RegExp("[?&]".concat(e, "(=([^&#]*)|&|#|$)")).exec(t);
    return r ? r[2] ? decodeURIComponent(r[2].replace(/\+/g, " ")) : "" : null;
};

exports.default = e;