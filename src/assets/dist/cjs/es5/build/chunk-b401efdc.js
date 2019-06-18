"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getElementOffset(t, e, o) { void 0 === e && (e = { isRight: !1, isTop: !1 }), void 0 === o && (o = document.documentElement); var i = {}, l = t.getBoundingClientRect(), n = o.scrollLeft, f = o.scrollTop; return e.isRight ? i.right = o.scrollWidth - l.left - l.width : i.left = l.left + n, e.isTop ? i.bottom = f + l.top : i.top = f + l.top + l.height, i; }
exports.a = getElementOffset;
function setElementOffset(t, e) { var o = t.style; e.left ? (o.left = e.left + "px", o.right = "initial") : o.right && (o.right = e.right + "px", o.left = "initial"), e.top ? (o.top = e.top + "px", o.bottom = "initial", o.transform = "") : o.bottom && (o.top = e.bottom + "px", o.bottom = "initial", o.transform = "translateY(-100%)"); }
exports.b = setElementOffset;
