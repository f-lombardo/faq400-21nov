"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getElementOffset(t, e, i) { if (void 0 === e && (e = { isRight: !1, isTop: !1 }), void 0 === i && (i = document.documentElement), t) {
    var o = {}, l = t.getBoundingClientRect(), n = i.scrollLeft, f = i.scrollTop;
    return e.isRight ? o.right = i.scrollWidth - l.left - l.width : o.left = l.left + n, e.isTop ? o.bottom = f + l.top : o.top = f + l.top + l.height, o;
} }
exports.a = getElementOffset;
function setElementOffset(t, e) { var i = t.style; e.left ? (i.left = e.left + "px", i.right = "initial") : e.right && (i.right = e.right + "px", i.left = "initial"), e.top ? (i.top = e.top + "px", i.bottom = "initial", i.transform = "") : e.bottom && (i.top = e.bottom + "px", i.bottom = "initial", i.transform = "translateY(-100%)"); }
exports.b = setElementOffset;
