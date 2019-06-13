"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mycomponent_core_js_1 = require("../mycomponent.core.js");
var chunk_77ecfe7f_js_1 = require("./chunk-77ecfe7f.js");
var SortMode, TotalMode, PaginatorPos;
!function (e) { e.A = "A", e.D = "D"; }(SortMode || (SortMode = {})), function (e) { e.COUNT = "Count", e.SUM = "Sum", e.AVARAGE = "Avarage"; }(TotalMode || (TotalMode = {})), function (e) { e.TOP = "Top", e.BOTTOM = "Bottom", e.BOTH = "Both"; }(PaginatorPos || (PaginatorPos = {}));
var hookCallback, some, numeral = chunk_77ecfe7f_js_1.a(function (e) { var t, o; t = chunk_77ecfe7f_js_1.b, o = function () { var e, t, o, a, r, n = {}, s = {}, i = { currentLocale: "en", zeroFormat: null, nullFormat: null, defaultFormat: "0,0", scalePercentBy100: !0 }, l = { currentLocale: i.currentLocale, zeroFormat: i.zeroFormat, nullFormat: i.nullFormat, defaultFormat: i.defaultFormat, scalePercentBy100: i.scalePercentBy100 }; function u(e, t) { this._input = e, this._value = t; } return (e = function (o) { var a, r, s, i; if (e.isNumeral(o))
    a = o.value();
else if (0 === o || void 0 === o)
    a = 0;
else if (null === o || t.isNaN(o))
    a = null;
else if ("string" == typeof o)
    if (l.zeroFormat && o === l.zeroFormat)
        a = 0;
    else if (l.nullFormat && o === l.nullFormat || !o.replace(/[^0-9]+/g, "").length)
        a = null;
    else {
        for (r in n)
            if ((i = "function" == typeof n[r].regexps.unformat ? n[r].regexps.unformat() : n[r].regexps.unformat) && o.match(i)) {
                s = n[r].unformat;
                break;
            }
        a = (s = s || e._.stringToNumber)(o);
    }
else
    a = Number(o) || null; return new u(o, a); }).version = "2.0.6", e.isNumeral = function (e) { return e instanceof u; }, e._ = t = { numberToFormat: function (t, o, a) { var r, n, i, l, u, d, c, h, f = s[e.options.currentLocale], m = !1, g = !1, p = "", k = "", y = !1; if (t = t || 0, i = Math.abs(t), e._.includes(o, "(") ? (m = !0, o = o.replace(/[\(|\)]/g, "")) : (e._.includes(o, "+") || e._.includes(o, "-")) && (d = e._.includes(o, "+") ? o.indexOf("+") : t < 0 ? o.indexOf("-") : -1, o = o.replace(/[\+|\-]/g, "")), e._.includes(o, "a") && (n = !!(n = o.match(/a(k|m|b|t)?/)) && n[1], e._.includes(o, " a") && (p = " "), o = o.replace(new RegExp(p + "a[kmbt]?"), ""), i >= 1e12 && !n || "t" === n ? (p += f.abbreviations.trillion, t /= 1e12) : i < 1e12 && i >= 1e9 && !n || "b" === n ? (p += f.abbreviations.billion, t /= 1e9) : i < 1e9 && i >= 1e6 && !n || "m" === n ? (p += f.abbreviations.million, t /= 1e6) : (i < 1e6 && i >= 1e3 && !n || "k" === n) && (p += f.abbreviations.thousand, t /= 1e3)), e._.includes(o, "[.]") && (g = !0, o = o.replace("[.]", ".")), l = t.toString().split(".")[0], u = o.split(".")[1], c = o.indexOf(","), r = (o.split(".")[0].split(",")[0].match(/0/g) || []).length, u ? (e._.includes(u, "[") ? (u = (u = u.replace("]", "")).split("["), k = e._.toFixed(t, u[0].length + u[1].length, a, u[1].length)) : k = e._.toFixed(t, u.length, a), l = k.split(".")[0], k = e._.includes(k, ".") ? f.delimiters.decimal + k.split(".")[1] : "", g && 0 === Number(k.slice(1)) && (k = "")) : l = e._.toFixed(t, 0, a), p && !n && Number(l) >= 1e3 && p !== f.abbreviations.trillion)
        switch (l = String(Number(l) / 1e3), p) {
            case f.abbreviations.thousand:
                p = f.abbreviations.million;
                break;
            case f.abbreviations.million:
                p = f.abbreviations.billion;
                break;
            case f.abbreviations.billion: p = f.abbreviations.trillion;
        } if (e._.includes(l, "-") && (l = l.slice(1), y = !0), l.length < r)
        for (var _ = r - l.length; _ > 0; _--)
            l = "0" + l; return c > -1 && (l = l.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + f.delimiters.thousands)), 0 === o.indexOf(".") && (l = ""), h = l + k + (p || ""), m ? h = (m && y ? "(" : "") + h + (m && y ? ")" : "") : d >= 0 ? h = 0 === d ? (y ? "-" : "+") + h : h + (y ? "-" : "+") : y && (h = "-" + h), h; }, stringToNumber: function (e) { var t, o, a, r = s[l.currentLocale], n = e, i = { thousand: 3, million: 6, billion: 9, trillion: 12 }; if (l.zeroFormat && e === l.zeroFormat)
        o = 0;
    else if (l.nullFormat && e === l.nullFormat || !e.replace(/[^0-9]+/g, "").length)
        o = null;
    else {
        for (t in o = 1, "." !== r.delimiters.decimal && (e = e.replace(/\./g, "").replace(r.delimiters.decimal, ".")), i)
            if (a = new RegExp("[^a-zA-Z]" + r.abbreviations[t] + "(?:\\)|(\\" + r.currency.symbol + ")?(?:\\))?)?$"), n.match(a)) {
                o *= Math.pow(10, i[t]);
                break;
            }
        o *= (e.split("-").length + Math.min(e.split("(").length - 1, e.split(")").length - 1)) % 2 ? 1 : -1, e = e.replace(/[^0-9\.]+/g, ""), o *= Number(e);
    } return o; }, isNaN: function (e) { return "number" == typeof e && isNaN(e); }, includes: function (e, t) { return -1 !== e.indexOf(t); }, insert: function (e, t, o) { return e.slice(0, o) + t + e.slice(o); }, reduce: function (e, t) { if (null === this)
        throw new TypeError("Array.prototype.reduce called on null or undefined"); if ("function" != typeof t)
        throw new TypeError(t + " is not a function"); var o, a = Object(e), r = a.length >>> 0, n = 0; if (3 === arguments.length)
        o = arguments[2];
    else {
        for (; n < r && !(n in a);)
            n++;
        if (n >= r)
            throw new TypeError("Reduce of empty array with no initial value");
        o = a[n++];
    } for (; n < r; n++)
        n in a && (o = t(o, a[n], n, a)); return o; }, multiplier: function (e) { var t = e.toString().split("."); return t.length < 2 ? 1 : Math.pow(10, t[1].length); }, correctionFactor: function () { return Array.prototype.slice.call(arguments).reduce(function (e, o) { var a = t.multiplier(o); return e > a ? e : a; }, 1); }, toFixed: function (e, t, o, a) { var r, n, s, i, l = e.toString().split("."), u = t - (a || 0); return r = 2 === l.length ? Math.min(Math.max(l[1].length, u), t) : u, s = Math.pow(10, r), i = (o(e + "e+" + r) / s).toFixed(r), a > t - r && (n = new RegExp("\\.?0{1," + (a - (t - r)) + "}$"), i = i.replace(n, "")), i; } }, e.options = l, e.formats = n, e.locales = s, e.locale = function (e) { return e && (l.currentLocale = e.toLowerCase()), l.currentLocale; }, e.localeData = function (e) { if (!e)
    return s[l.currentLocale]; if (e = e.toLowerCase(), !s[e])
    throw new Error("Unknown locale : " + e); return s[e]; }, e.reset = function () { for (var e in i)
    l[e] = i[e]; }, e.zeroFormat = function (e) { l.zeroFormat = "string" == typeof e ? e : null; }, e.nullFormat = function (e) { l.nullFormat = "string" == typeof e ? e : null; }, e.defaultFormat = function (e) { l.defaultFormat = "string" == typeof e ? e : "0.0"; }, e.register = function (e, t, o) { if (t = t.toLowerCase(), this[e + "s"][t])
    throw new TypeError(t + " " + e + " already registered."); return this[e + "s"][t] = o, o; }, e.validate = function (t, o) { var a, r, n, s, i, l, u, d; if ("string" != typeof t && (t += "", console.warn && console.warn("Numeral.js: Value is not string. It has been co-erced to: ", t)), (t = t.trim()).match(/^\d+$/))
    return !0; if ("" === t)
    return !1; try {
    u = e.localeData(o);
}
catch (t) {
    u = e.localeData(e.locale());
} return n = u.currency.symbol, i = u.abbreviations, a = u.delimiters.decimal, r = "." === u.delimiters.thousands ? "\\." : u.delimiters.thousands, !(null !== (d = t.match(/^[^\d]+/)) && (t = t.substr(1), d[0] !== n) || null !== (d = t.match(/[^\d]+$/)) && (t = t.slice(0, -1), d[0] !== i.thousand && d[0] !== i.million && d[0] !== i.billion && d[0] !== i.trillion) || (l = new RegExp(r + "{2}"), t.match(/[^\d.,]/g) || (s = t.split(a)).length > 2 || (s.length < 2 ? !s[0].match(/^\d+.*\d$/) || s[0].match(l) : 1 === s[0].length ? !s[0].match(/^\d+$/) || s[0].match(l) || !s[1].match(/^\d+$/) : !s[0].match(/^\d+.*\d$/) || s[0].match(l) || !s[1].match(/^\d+$/)))); }, e.fn = u.prototype = { clone: function () { return e(this); }, format: function (t, o) { var a, r, s, i = this._value, u = t || l.defaultFormat; if (o = o || Math.round, 0 === i && null !== l.zeroFormat)
        r = l.zeroFormat;
    else if (null === i && null !== l.nullFormat)
        r = l.nullFormat;
    else {
        for (a in n)
            if (u.match(n[a].regexps.format)) {
                s = n[a].format;
                break;
            }
        r = (s = s || e._.numberToFormat)(i, u, o);
    } return r; }, value: function () { return this._value; }, input: function () { return this._input; }, set: function (e) { return this._value = Number(e), this; }, add: function (e) { var o = t.correctionFactor.call(null, this._value, e); return this._value = t.reduce([this._value, e], function (e, t, a, r) { return e + Math.round(o * t); }, 0) / o, this; }, subtract: function (e) { var o = t.correctionFactor.call(null, this._value, e); return this._value = t.reduce([e], function (e, t, a, r) { return e - Math.round(o * t); }, Math.round(this._value * o)) / o, this; }, multiply: function (e) { return this._value = t.reduce([this._value, e], function (e, o, a, r) { var n = t.correctionFactor(e, o); return Math.round(e * n) * Math.round(o * n) / Math.round(n * n); }, 1), this; }, divide: function (e) { return this._value = t.reduce([this._value, e], function (e, o, a, r) { var n = t.correctionFactor(e, o); return Math.round(e * n) / Math.round(o * n); }), this; }, difference: function (t) { return Math.abs(e(this._value).subtract(t).value()); } }, e.register("locale", "en", { delimiters: { thousands: ",", decimal: "." }, abbreviations: { thousand: "k", million: "m", billion: "b", trillion: "t" }, ordinal: function (e) { var t = e % 10; return 1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th"; }, currency: { symbol: "$" } }), e.register("format", "bps", { regexps: { format: /(BPS)/, unformat: /(BPS)/ }, format: function (t, o, a) { var r, n = e._.includes(o, " BPS") ? " " : ""; return t *= 1e4, o = o.replace(/\s?BPS/, ""), r = e._.numberToFormat(t, o, a), e._.includes(r, ")") ? ((r = r.split("")).splice(-1, 0, n + "BPS"), r = r.join("")) : r = r + n + "BPS", r; }, unformat: function (t) { return +(1e-4 * e._.stringToNumber(t)).toFixed(15); } }), r = "(" + (r = (o = { base: 1e3, suffixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] }).suffixes.concat((a = { base: 1024, suffixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"] }).suffixes.filter(function (e) { return o.suffixes.indexOf(e) < 0; })).join("|")).replace("B", "B(?!PS)") + ")", e.register("format", "bytes", { regexps: { format: /([0\s]i?b)/, unformat: new RegExp(r) }, format: function (t, r, n) { var s, i, l, u = e._.includes(r, "ib") ? a : o, d = e._.includes(r, " b") || e._.includes(r, " ib") ? " " : ""; for (r = r.replace(/\s?i?b/, ""), s = 0; s <= u.suffixes.length; s++)
        if (i = Math.pow(u.base, s), l = Math.pow(u.base, s + 1), null === t || 0 === t || t >= i && t < l) {
            d += u.suffixes[s], i > 0 && (t /= i);
            break;
        } return e._.numberToFormat(t, r, n) + d; }, unformat: function (t) { var r, n, s = e._.stringToNumber(t); if (s) {
        for (r = o.suffixes.length - 1; r >= 0; r--) {
            if (e._.includes(t, o.suffixes[r])) {
                n = Math.pow(o.base, r);
                break;
            }
            if (e._.includes(t, a.suffixes[r])) {
                n = Math.pow(a.base, r);
                break;
            }
        }
        s *= n || 1;
    } return s; } }), e.register("format", "currency", { regexps: { format: /(\$)/ }, format: function (t, o, a) { var r, n, s = e.locales[e.options.currentLocale], i = { before: o.match(/^([\+|\-|\(|\s|\$]*)/)[0], after: o.match(/([\+|\-|\)|\s|\$]*)$/)[0] }; for (o = o.replace(/\s?\$\s?/, ""), r = e._.numberToFormat(t, o, a), t >= 0 ? (i.before = i.before.replace(/[\-\(]/, ""), i.after = i.after.replace(/[\-\)]/, "")) : t < 0 && !e._.includes(i.before, "-") && !e._.includes(i.before, "(") && (i.before = "-" + i.before), n = 0; n < i.before.length; n++)
        switch (i.before[n]) {
            case "$":
                r = e._.insert(r, s.currency.symbol, n);
                break;
            case " ": r = e._.insert(r, " ", n + s.currency.symbol.length - 1);
        } for (n = i.after.length - 1; n >= 0; n--)
        switch (i.after[n]) {
            case "$":
                r = n === i.after.length - 1 ? r + s.currency.symbol : e._.insert(r, s.currency.symbol, -(i.after.length - (1 + n)));
                break;
            case " ": r = n === i.after.length - 1 ? r + " " : e._.insert(r, " ", -(i.after.length - (1 + n) + s.currency.symbol.length - 1));
        } return r; } }), e.register("format", "exponential", { regexps: { format: /(e\+|e-)/, unformat: /(e\+|e-)/ }, format: function (t, o, a) { var r = ("number" != typeof t || e._.isNaN(t) ? "0e+0" : t.toExponential()).split("e"); return o = o.replace(/e[\+|\-]{1}0/, ""), e._.numberToFormat(Number(r[0]), o, a) + "e" + r[1]; }, unformat: function (t) { var o = e._.includes(t, "e+") ? t.split("e+") : t.split("e-"), a = Number(o[0]), r = Number(o[1]); return r = e._.includes(t, "e-") ? r *= -1 : r, e._.reduce([a, Math.pow(10, r)], function (t, o, a, r) { var n = e._.correctionFactor(t, o); return t * n * (o * n) / (n * n); }, 1); } }), e.register("format", "ordinal", { regexps: { format: /(o)/ }, format: function (t, o, a) { var r = e.locales[e.options.currentLocale], n = e._.includes(o, " o") ? " " : ""; return o = o.replace(/\s?o/, ""), n += r.ordinal(t), e._.numberToFormat(t, o, a) + n; } }), e.register("format", "percentage", { regexps: { format: /(%)/, unformat: /(%)/ }, format: function (t, o, a) { var r, n = e._.includes(o, " %") ? " " : ""; return e.options.scalePercentBy100 && (t *= 100), o = o.replace(/\s?\%/, ""), r = e._.numberToFormat(t, o, a), e._.includes(r, ")") ? ((r = r.split("")).splice(-1, 0, n + "%"), r = r.join("")) : r = r + n + "%", r; }, unformat: function (t) { var o = e._.stringToNumber(t); return e.options.scalePercentBy100 ? .01 * o : o; } }), e.register("format", "time", { regexps: { format: /(:)/, unformat: /(:)/ }, format: function (e, t, o) { var a = Math.floor(e / 60 / 60), r = Math.floor((e - 60 * a * 60) / 60), n = Math.round(e - 60 * a * 60 - 60 * r); return a + ":" + (r < 10 ? "0" + r : r) + ":" + (n < 10 ? "0" + n : n); }, unformat: function (e) { var t = e.split(":"), o = 0; return 3 === t.length ? (o += 60 * Number(t[0]) * 60, o += 60 * Number(t[1]), o += Number(t[2])) : 2 === t.length && (o += 60 * Number(t[0]), o += Number(t[1])), Number(o); } }), e; }, e.exports ? e.exports = o() : t.numeral = o(); });
function hooks() { return hookCallback.apply(null, arguments); }
function setHookCallback(e) { hookCallback = e; }
function isArray(e) { return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e); }
function isObject(e) { return null != e && "[object Object]" === Object.prototype.toString.call(e); }
function isObjectEmpty(e) { if (Object.getOwnPropertyNames)
    return 0 === Object.getOwnPropertyNames(e).length; var t; for (t in e)
    if (e.hasOwnProperty(t))
        return !1; return !0; }
function isUndefined(e) { return void 0 === e; }
function isNumber(e) { return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e); }
function isDate(e) { return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e); }
function map(e, t) { var o, a = []; for (o = 0; o < e.length; ++o)
    a.push(t(e[o], o)); return a; }
function hasOwnProp(e, t) { return Object.prototype.hasOwnProperty.call(e, t); }
function extend(e, t) { for (var o in t)
    hasOwnProp(t, o) && (e[o] = t[o]); return hasOwnProp(t, "toString") && (e.toString = t.toString), hasOwnProp(t, "valueOf") && (e.valueOf = t.valueOf), e; }
function createUTC(e, t, o, a) { return createLocalOrUTC(e, t, o, a, !0).utc(); }
function defaultParsingFlags() { return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], meridiem: null, rfc2822: !1, weekdayMismatch: !1 }; }
function getParsingFlags(e) { return null == e._pf && (e._pf = defaultParsingFlags()), e._pf; }
function isValid(e) { if (null == e._isValid) {
    var t = getParsingFlags(e), o = some.call(t.parsedDateParts, function (e) { return null != e; }), a = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && o);
    if (e._strict && (a = a && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour), null != Object.isFrozen && Object.isFrozen(e))
        return a;
    e._isValid = a;
} return e._isValid; }
function createInvalid(e) { var t = createUTC(NaN); return null != e ? extend(getParsingFlags(t), e) : getParsingFlags(t).userInvalidated = !0, t; }
some = Array.prototype.some ? Array.prototype.some : function (e) { for (var t = Object(this), o = t.length >>> 0, a = 0; a < o; a++)
    if (a in t && e.call(this, t[a], a, t))
        return !0; return !1; };
var momentProperties = hooks.momentProperties = [];
function copyConfig(e, t) { var o, a, r; if (isUndefined(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), isUndefined(t._i) || (e._i = t._i), isUndefined(t._f) || (e._f = t._f), isUndefined(t._l) || (e._l = t._l), isUndefined(t._strict) || (e._strict = t._strict), isUndefined(t._tzm) || (e._tzm = t._tzm), isUndefined(t._isUTC) || (e._isUTC = t._isUTC), isUndefined(t._offset) || (e._offset = t._offset), isUndefined(t._pf) || (e._pf = getParsingFlags(t)), isUndefined(t._locale) || (e._locale = t._locale), momentProperties.length > 0)
    for (o = 0; o < momentProperties.length; o++)
        isUndefined(r = t[a = momentProperties[o]]) || (e[a] = r); return e; }
var updateInProgress = !1;
function Moment(e) { copyConfig(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === updateInProgress && (updateInProgress = !0, hooks.updateOffset(this), updateInProgress = !1); }
function isMoment(e) { return e instanceof Moment || null != e && null != e._isAMomentObject; }
function absFloor(e) { return e < 0 ? Math.ceil(e) || 0 : Math.floor(e); }
function toInt(e) { var t = +e, o = 0; return 0 !== t && isFinite(t) && (o = absFloor(t)), o; }
function compareArrays(e, t, o) { var a, r = Math.min(e.length, t.length), n = Math.abs(e.length - t.length), s = 0; for (a = 0; a < r; a++)
    (o && e[a] !== t[a] || !o && toInt(e[a]) !== toInt(t[a])) && s++; return s + n; }
function warn(e) { !1 === hooks.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e); }
function deprecate(e, t) { var o = !0; return extend(function () { if (null != hooks.deprecationHandler && hooks.deprecationHandler(null, e), o) {
    for (var a, r = [], n = 0; n < arguments.length; n++) {
        if (a = "", "object" == typeof arguments[n]) {
            for (var s in a += "\n[" + n + "] ", arguments[0])
                a += s + ": " + arguments[0][s] + ", ";
            a = a.slice(0, -2);
        }
        else
            a = arguments[n];
        r.push(a);
    }
    warn(e + "\nArguments: " + Array.prototype.slice.call(r).join("") + "\n" + (new Error).stack), o = !1;
} return t.apply(this, arguments); }, t); }
var keys, deprecations = {};
function deprecateSimple(e, t) { null != hooks.deprecationHandler && hooks.deprecationHandler(e, t), deprecations[e] || (warn(t), deprecations[e] = !0); }
function isFunction(e) { return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e); }
function set(e) { var t, o; for (o in e)
    isFunction(t = e[o]) ? this[o] = t : this["_" + o] = t; this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source); }
function mergeConfigs(e, t) { var o, a = extend({}, e); for (o in t)
    hasOwnProp(t, o) && (isObject(e[o]) && isObject(t[o]) ? (a[o] = {}, extend(a[o], e[o]), extend(a[o], t[o])) : null != t[o] ? a[o] = t[o] : delete a[o]); for (o in e)
    hasOwnProp(e, o) && !hasOwnProp(t, o) && isObject(e[o]) && (a[o] = extend({}, a[o])); return a; }
function Locale(e) { null != e && this.set(e); }
hooks.suppressDeprecationWarnings = !1, hooks.deprecationHandler = null, keys = Object.keys ? Object.keys : function (e) { var t, o = []; for (t in e)
    hasOwnProp(e, t) && o.push(t); return o; };
var defaultCalendar = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" };
function calendar(e, t, o) { var a = this._calendar[e] || this._calendar.sameElse; return isFunction(a) ? a.call(t, o) : a; }
var defaultLongDateFormat = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
function longDateFormat(e) { var t = this._longDateFormat[e], o = this._longDateFormat[e.toUpperCase()]; return t || !o ? t : (this._longDateFormat[e] = o.replace(/MMMM|MM|DD|dddd/g, function (e) { return e.slice(1); }), this._longDateFormat[e]); }
var defaultInvalidDate = "Invalid date";
function invalidDate() { return this._invalidDate; }
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(e) { return this._ordinal.replace("%d", e); }
var defaultRelativeTime = { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
function relativeTime(e, t, o, a) { var r = this._relativeTime[o]; return isFunction(r) ? r(e, t, o, a) : r.replace(/%d/i, e); }
function pastFuture(e, t) { var o = this._relativeTime[e > 0 ? "future" : "past"]; return isFunction(o) ? o(t) : o.replace(/%s/i, t); }
var aliases = {};
function addUnitAlias(e, t) { var o = e.toLowerCase(); aliases[o] = aliases[o + "s"] = aliases[t] = e; }
function normalizeUnits(e) { return "string" == typeof e ? aliases[e] || aliases[e.toLowerCase()] : void 0; }
function normalizeObjectUnits(e) { var t, o, a = {}; for (o in e)
    hasOwnProp(e, o) && (t = normalizeUnits(o)) && (a[t] = e[o]); return a; }
var priorities = {};
function addUnitPriority(e, t) { priorities[e] = t; }
function getPrioritizedUnits(e) { var t = []; for (var o in e)
    t.push({ unit: o, priority: priorities[o] }); return t.sort(function (e, t) { return e.priority - t.priority; }), t; }
function zeroFill(e, t, o) { var a = "" + Math.abs(e); return (e >= 0 ? o ? "+" : "" : "-") + Math.pow(10, Math.max(0, t - a.length)).toString().substr(1) + a; }
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(e, t, o, a) { var r = a; "string" == typeof a && (r = function () { return this[a](); }), e && (formatTokenFunctions[e] = r), t && (formatTokenFunctions[t[0]] = function () { return zeroFill(r.apply(this, arguments), t[1], t[2]); }), o && (formatTokenFunctions[o] = function () { return this.localeData().ordinal(r.apply(this, arguments), e); }); }
function removeFormattingTokens(e) { return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, ""); }
function makeFormatFunction(e) { var t, o, a = e.match(formattingTokens); for (t = 0, o = a.length; t < o; t++)
    a[t] = formatTokenFunctions[a[t]] ? formatTokenFunctions[a[t]] : removeFormattingTokens(a[t]); return function (t) { var r, n = ""; for (r = 0; r < o; r++)
    n += isFunction(a[r]) ? a[r].call(t, e) : a[r]; return n; }; }
function formatMoment(e, t) { return e.isValid() ? (t = expandFormat(t, e.localeData()), formatFunctions[t] = formatFunctions[t] || makeFormatFunction(t), formatFunctions[t](e)) : e.localeData().invalidDate(); }
function expandFormat(e, t) { var o = 5; function a(e) { return t.longDateFormat(e) || e; } for (localFormattingTokens.lastIndex = 0; o >= 0 && localFormattingTokens.test(e);)
    e = e.replace(localFormattingTokens, a), localFormattingTokens.lastIndex = 0, o -= 1; return e; }
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes = {};
function addRegexToken(e, t, o) { regexes[e] = isFunction(t) ? t : function (e, a) { return e && o ? o : t; }; }
function getParseRegexForToken(e, t) { return hasOwnProp(regexes, e) ? regexes[e](t._strict, t._locale) : new RegExp(unescapeFormat(e)); }
function unescapeFormat(e) { return regexEscape(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, o, a, r) { return t || o || a || r; })); }
function regexEscape(e) { return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); }
var tokens = {};
function addParseToken(e, t) { var o, a = t; for ("string" == typeof e && (e = [e]), isNumber(t) && (a = function (e, o) { o[t] = toInt(e); }), o = 0; o < e.length; o++)
    tokens[e[o]] = a; }
function addWeekParseToken(e, t) { addParseToken(e, function (e, o, a, r) { a._w = a._w || {}, t(e, a._w, a, r); }); }
function addTimeToArrayFromToken(e, t, o) { null != t && hasOwnProp(tokens, e) && tokens[e](t, o._a, o, e); }
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
function daysInYear(e) { return isLeapYear(e) ? 366 : 365; }
function isLeapYear(e) { return e % 4 == 0 && e % 100 != 0 || e % 400 == 0; }
addFormatToken("Y", 0, 0, function () { var e = this.year(); return e <= 9999 ? "" + e : "+" + e; }), addFormatToken(0, ["YY", 2], 0, function () { return this.year() % 100; }), addFormatToken(0, ["YYYY", 4], 0, "year"), addFormatToken(0, ["YYYYY", 5], 0, "year"), addFormatToken(0, ["YYYYYY", 6, !0], 0, "year"), addUnitAlias("year", "y"), addUnitPriority("year", 1), addRegexToken("Y", matchSigned), addRegexToken("YY", match1to2, match2), addRegexToken("YYYY", match1to4, match4), addRegexToken("YYYYY", match1to6, match6), addRegexToken("YYYYYY", match1to6, match6), addParseToken(["YYYYY", "YYYYYY"], YEAR), addParseToken("YYYY", function (e, t) { t[YEAR] = 2 === e.length ? hooks.parseTwoDigitYear(e) : toInt(e); }), addParseToken("YY", function (e, t) { t[YEAR] = hooks.parseTwoDigitYear(e); }), addParseToken("Y", function (e, t) { t[YEAR] = parseInt(e, 10); }), hooks.parseTwoDigitYear = function (e) { return toInt(e) + (toInt(e) > 68 ? 1900 : 2e3); };
var indexOf, getSetYear = makeGetSet("FullYear", !0);
function getIsLeapYear() { return isLeapYear(this.year()); }
function makeGetSet(e, t) { return function (o) { return null != o ? (set$1(this, e, o), hooks.updateOffset(this, t), this) : get(this, e); }; }
function get(e, t) { return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN; }
function set$1(e, t, o) { e.isValid() && !isNaN(o) && ("FullYear" === t && isLeapYear(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](o, e.month(), daysInMonth(o, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](o)); }
function stringGet(e) { return isFunction(this[e = normalizeUnits(e)]) ? this[e]() : this; }
function stringSet(e, t) { if ("object" == typeof e)
    for (var o = getPrioritizedUnits(e = normalizeObjectUnits(e)), a = 0; a < o.length; a++)
        this[o[a].unit](e[o[a].unit]);
else if (isFunction(this[e = normalizeUnits(e)]))
    return this[e](t); return this; }
function mod(e, t) { return (e % t + t) % t; }
function daysInMonth(e, t) { if (isNaN(e) || isNaN(t))
    return NaN; var o = mod(t, 12); return e += (t - o) / 12, 1 === o ? isLeapYear(e) ? 29 : 28 : 31 - o % 7 % 2; }
indexOf = Array.prototype.indexOf ? Array.prototype.indexOf : function (e) { var t; for (t = 0; t < this.length; ++t)
    if (this[t] === e)
        return t; return -1; }, addFormatToken("M", ["MM", 2], "Mo", function () { return this.month() + 1; }), addFormatToken("MMM", 0, 0, function (e) { return this.localeData().monthsShort(this, e); }), addFormatToken("MMMM", 0, 0, function (e) { return this.localeData().months(this, e); }), addUnitAlias("month", "M"), addUnitPriority("month", 8), addRegexToken("M", match1to2), addRegexToken("MM", match1to2, match2), addRegexToken("MMM", function (e, t) { return t.monthsShortRegex(e); }), addRegexToken("MMMM", function (e, t) { return t.monthsRegex(e); }), addParseToken(["M", "MM"], function (e, t) { t[MONTH] = toInt(e) - 1; }), addParseToken(["MMM", "MMMM"], function (e, t, o, a) { var r = o._locale.monthsParse(e, a, o._strict); null != r ? t[MONTH] = r : getParsingFlags(o).invalidMonth = e; });
var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
function localeMonths(e, t) { return e ? isArray(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(t) ? "format" : "standalone"][e.month()] : isArray(this._months) ? this._months : this._months.standalone; }
var defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
function localeMonthsShort(e, t) { return e ? isArray(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(t) ? "format" : "standalone"][e.month()] : isArray(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone; }
function handleStrictParse(e, t, o) { var a, r, n, s = e.toLocaleLowerCase(); if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], a = 0; a < 12; ++a)
        n = createUTC([2e3, a]), this._shortMonthsParse[a] = this.monthsShort(n, "").toLocaleLowerCase(), this._longMonthsParse[a] = this.months(n, "").toLocaleLowerCase(); return o ? "MMM" === t ? -1 !== (r = indexOf.call(this._shortMonthsParse, s)) ? r : null : -1 !== (r = indexOf.call(this._longMonthsParse, s)) ? r : null : "MMM" === t ? -1 !== (r = indexOf.call(this._shortMonthsParse, s)) ? r : -1 !== (r = indexOf.call(this._longMonthsParse, s)) ? r : null : -1 !== (r = indexOf.call(this._longMonthsParse, s)) ? r : -1 !== (r = indexOf.call(this._shortMonthsParse, s)) ? r : null; }
function localeMonthsParse(e, t, o) { var a, r, n; if (this._monthsParseExact)
    return handleStrictParse.call(this, e, t, o); for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), a = 0; a < 12; a++) {
    if (r = createUTC([2e3, a]), o && !this._longMonthsParse[a] && (this._longMonthsParse[a] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[a] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), o || this._monthsParse[a] || (n = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[a] = new RegExp(n.replace(".", ""), "i")), o && "MMMM" === t && this._longMonthsParse[a].test(e))
        return a;
    if (o && "MMM" === t && this._shortMonthsParse[a].test(e))
        return a;
    if (!o && this._monthsParse[a].test(e))
        return a;
} }
function setMonth(e, t) { var o; if (!e.isValid())
    return e; if ("string" == typeof t)
    if (/^\d+$/.test(t))
        t = toInt(t);
    else if (!isNumber(t = e.localeData().monthsParse(t)))
        return e; return o = Math.min(e.date(), daysInMonth(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, o), e; }
function getSetMonth(e) { return null != e ? (setMonth(this, e), hooks.updateOffset(this, !0), this) : get(this, "Month"); }
function getDaysInMonth() { return daysInMonth(this.year(), this.month()); }
var defaultMonthsShortRegex = matchWord;
function monthsShortRegex(e) { return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (hasOwnProp(this, "_monthsShortRegex") || (this._monthsShortRegex = defaultMonthsShortRegex), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex); }
var defaultMonthsRegex = matchWord;
function monthsRegex(e) { return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (hasOwnProp(this, "_monthsRegex") || (this._monthsRegex = defaultMonthsRegex), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex); }
function computeMonthsParse() { function e(e, t) { return t.length - e.length; } var t, o, a = [], r = [], n = []; for (t = 0; t < 12; t++)
    o = createUTC([2e3, t]), a.push(this.monthsShort(o, "")), r.push(this.months(o, "")), n.push(this.months(o, "")), n.push(this.monthsShort(o, "")); for (a.sort(e), r.sort(e), n.sort(e), t = 0; t < 12; t++)
    a[t] = regexEscape(a[t]), r[t] = regexEscape(r[t]); for (t = 0; t < 24; t++)
    n[t] = regexEscape(n[t]); this._monthsRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"); }
function createDate(e, t, o, a, r, n, s) { var i; return e < 100 && e >= 0 ? (i = new Date(e + 400, t, o, a, r, n, s), isFinite(i.getFullYear()) && i.setFullYear(e)) : i = new Date(e, t, o, a, r, n, s), i; }
function createUTCDate(e) { var t; if (e < 100 && e >= 0) {
    var o = Array.prototype.slice.call(arguments);
    o[0] = e + 400, t = new Date(Date.UTC.apply(null, o)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e);
}
else
    t = new Date(Date.UTC.apply(null, arguments)); return t; }
function firstWeekOffset(e, t, o) { var a = 7 + t - o; return -(7 + createUTCDate(e, 0, a).getUTCDay() - t) % 7 + a - 1; }
function dayOfYearFromWeeks(e, t, o, a, r) { var n, s, i = 1 + 7 * (t - 1) + (7 + o - a) % 7 + firstWeekOffset(e, a, r); return i <= 0 ? s = daysInYear(n = e - 1) + i : i > daysInYear(e) ? (n = e + 1, s = i - daysInYear(e)) : (n = e, s = i), { year: n, dayOfYear: s }; }
function weekOfYear(e, t, o) { var a, r, n = firstWeekOffset(e.year(), t, o), s = Math.floor((e.dayOfYear() - n - 1) / 7) + 1; return s < 1 ? a = s + weeksInYear(r = e.year() - 1, t, o) : s > weeksInYear(e.year(), t, o) ? (a = s - weeksInYear(e.year(), t, o), r = e.year() + 1) : (r = e.year(), a = s), { week: a, year: r }; }
function weeksInYear(e, t, o) { var a = firstWeekOffset(e, t, o), r = firstWeekOffset(e + 1, t, o); return (daysInYear(e) - a + r) / 7; }
function localeWeek(e) { return weekOfYear(e, this._week.dow, this._week.doy).week; }
addFormatToken("w", ["ww", 2], "wo", "week"), addFormatToken("W", ["WW", 2], "Wo", "isoWeek"), addUnitAlias("week", "w"), addUnitAlias("isoWeek", "W"), addUnitPriority("week", 5), addUnitPriority("isoWeek", 5), addRegexToken("w", match1to2), addRegexToken("ww", match1to2, match2), addRegexToken("W", match1to2), addRegexToken("WW", match1to2, match2), addWeekParseToken(["w", "ww", "W", "WW"], function (e, t, o, a) { t[a.substr(0, 1)] = toInt(e); });
var defaultLocaleWeek = { dow: 0, doy: 6 };
function localeFirstDayOfWeek() { return this._week.dow; }
function localeFirstDayOfYear() { return this._week.doy; }
function getSetWeek(e) { var t = this.localeData().week(this); return null == e ? t : this.add(7 * (e - t), "d"); }
function getSetISOWeek(e) { var t = weekOfYear(this, 1, 4).week; return null == e ? t : this.add(7 * (e - t), "d"); }
function parseWeekday(e, t) { return "string" != typeof e ? e : isNaN(e) ? "number" == typeof (e = t.weekdaysParse(e)) ? e : null : parseInt(e, 10); }
function parseIsoWeekday(e, t) { return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e; }
function shiftWeekdays(e, t) { return e.slice(t, 7).concat(e.slice(0, t)); }
addFormatToken("d", 0, "do", "day"), addFormatToken("dd", 0, 0, function (e) { return this.localeData().weekdaysMin(this, e); }), addFormatToken("ddd", 0, 0, function (e) { return this.localeData().weekdaysShort(this, e); }), addFormatToken("dddd", 0, 0, function (e) { return this.localeData().weekdays(this, e); }), addFormatToken("e", 0, 0, "weekday"), addFormatToken("E", 0, 0, "isoWeekday"), addUnitAlias("day", "d"), addUnitAlias("weekday", "e"), addUnitAlias("isoWeekday", "E"), addUnitPriority("day", 11), addUnitPriority("weekday", 11), addUnitPriority("isoWeekday", 11), addRegexToken("d", match1to2), addRegexToken("e", match1to2), addRegexToken("E", match1to2), addRegexToken("dd", function (e, t) { return t.weekdaysMinRegex(e); }), addRegexToken("ddd", function (e, t) { return t.weekdaysShortRegex(e); }), addRegexToken("dddd", function (e, t) { return t.weekdaysRegex(e); }), addWeekParseToken(["dd", "ddd", "dddd"], function (e, t, o, a) { var r = o._locale.weekdaysParse(e, a, o._strict); null != r ? t.d = r : getParsingFlags(o).invalidWeekday = e; }), addWeekParseToken(["d", "e", "E"], function (e, t, o, a) { t[a] = toInt(e); });
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
function localeWeekdays(e, t) { var o = isArray(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(t) ? "format" : "standalone"]; return !0 === e ? shiftWeekdays(o, this._week.dow) : e ? o[e.day()] : o; }
var defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
function localeWeekdaysShort(e) { return !0 === e ? shiftWeekdays(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort; }
var defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
function localeWeekdaysMin(e) { return !0 === e ? shiftWeekdays(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin; }
function handleStrictParse$1(e, t, o) { var a, r, n, s = e.toLocaleLowerCase(); if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], a = 0; a < 7; ++a)
        n = createUTC([2e3, 1]).day(a), this._minWeekdaysParse[a] = this.weekdaysMin(n, "").toLocaleLowerCase(), this._shortWeekdaysParse[a] = this.weekdaysShort(n, "").toLocaleLowerCase(), this._weekdaysParse[a] = this.weekdays(n, "").toLocaleLowerCase(); return o ? "dddd" === t ? -1 !== (r = indexOf.call(this._weekdaysParse, s)) ? r : null : "ddd" === t ? -1 !== (r = indexOf.call(this._shortWeekdaysParse, s)) ? r : null : -1 !== (r = indexOf.call(this._minWeekdaysParse, s)) ? r : null : "dddd" === t ? -1 !== (r = indexOf.call(this._weekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._shortWeekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._minWeekdaysParse, s)) ? r : null : "ddd" === t ? -1 !== (r = indexOf.call(this._shortWeekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._weekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._minWeekdaysParse, s)) ? r : null : -1 !== (r = indexOf.call(this._minWeekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._weekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._shortWeekdaysParse, s)) ? r : null; }
function localeWeekdaysParse(e, t, o) { var a, r, n; if (this._weekdaysParseExact)
    return handleStrictParse$1.call(this, e, t, o); for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), a = 0; a < 7; a++) {
    if (r = createUTC([2e3, 1]).day(a), o && !this._fullWeekdaysParse[a] && (this._fullWeekdaysParse[a] = new RegExp("^" + this.weekdays(r, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[a] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[a] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[a] || (n = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[a] = new RegExp(n.replace(".", ""), "i")), o && "dddd" === t && this._fullWeekdaysParse[a].test(e))
        return a;
    if (o && "ddd" === t && this._shortWeekdaysParse[a].test(e))
        return a;
    if (o && "dd" === t && this._minWeekdaysParse[a].test(e))
        return a;
    if (!o && this._weekdaysParse[a].test(e))
        return a;
} }
function getSetDayOfWeek(e) { if (!this.isValid())
    return null != e ? this : NaN; var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay(); return null != e ? (e = parseWeekday(e, this.localeData()), this.add(e - t, "d")) : t; }
function getSetLocaleDayOfWeek(e) { if (!this.isValid())
    return null != e ? this : NaN; var t = (this.day() + 7 - this.localeData()._week.dow) % 7; return null == e ? t : this.add(e - t, "d"); }
function getSetISODayOfWeek(e) { if (!this.isValid())
    return null != e ? this : NaN; if (null != e) {
    var t = parseIsoWeekday(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
} return this.day() || 7; }
var defaultWeekdaysRegex = matchWord;
function weekdaysRegex(e) { return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (hasOwnProp(this, "_weekdaysRegex") || (this._weekdaysRegex = defaultWeekdaysRegex), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex); }
var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex(e) { return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (hasOwnProp(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = defaultWeekdaysShortRegex), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex); }
var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex(e) { return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (hasOwnProp(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = defaultWeekdaysMinRegex), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex); }
function computeWeekdaysParse() { function e(e, t) { return t.length - e.length; } var t, o, a, r, n, s = [], i = [], l = [], u = []; for (t = 0; t < 7; t++)
    o = createUTC([2e3, 1]).day(t), a = this.weekdaysMin(o, ""), r = this.weekdaysShort(o, ""), n = this.weekdays(o, ""), s.push(a), i.push(r), l.push(n), u.push(a), u.push(r), u.push(n); for (s.sort(e), i.sort(e), l.sort(e), u.sort(e), t = 0; t < 7; t++)
    i[t] = regexEscape(i[t]), l[t] = regexEscape(l[t]), u[t] = regexEscape(u[t]); this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"); }
function hFormat() { return this.hours() % 12 || 12; }
function kFormat() { return this.hours() || 24; }
function meridiem(e, t) { addFormatToken(e, 0, 0, function () { return this.localeData().meridiem(this.hours(), this.minutes(), t); }); }
function matchMeridiem(e, t) { return t._meridiemParse; }
function localeIsPM(e) { return "p" === (e + "").toLowerCase().charAt(0); }
addFormatToken("H", ["HH", 2], 0, "hour"), addFormatToken("h", ["hh", 2], 0, hFormat), addFormatToken("k", ["kk", 2], 0, kFormat), addFormatToken("hmm", 0, 0, function () { return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2); }), addFormatToken("hmmss", 0, 0, function () { return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2); }), addFormatToken("Hmm", 0, 0, function () { return "" + this.hours() + zeroFill(this.minutes(), 2); }), addFormatToken("Hmmss", 0, 0, function () { return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2); }), meridiem("a", !0), meridiem("A", !1), addUnitAlias("hour", "h"), addUnitPriority("hour", 13), addRegexToken("a", matchMeridiem), addRegexToken("A", matchMeridiem), addRegexToken("H", match1to2), addRegexToken("h", match1to2), addRegexToken("k", match1to2), addRegexToken("HH", match1to2, match2), addRegexToken("hh", match1to2, match2), addRegexToken("kk", match1to2, match2), addRegexToken("hmm", match3to4), addRegexToken("hmmss", match5to6), addRegexToken("Hmm", match3to4), addRegexToken("Hmmss", match5to6), addParseToken(["H", "HH"], HOUR), addParseToken(["k", "kk"], function (e, t, o) { var a = toInt(e); t[HOUR] = 24 === a ? 0 : a; }), addParseToken(["a", "A"], function (e, t, o) { o._isPm = o._locale.isPM(e), o._meridiem = e; }), addParseToken(["h", "hh"], function (e, t, o) { t[HOUR] = toInt(e), getParsingFlags(o).bigHour = !0; }), addParseToken("hmm", function (e, t, o) { var a = e.length - 2; t[HOUR] = toInt(e.substr(0, a)), t[MINUTE] = toInt(e.substr(a)), getParsingFlags(o).bigHour = !0; }), addParseToken("hmmss", function (e, t, o) { var a = e.length - 4, r = e.length - 2; t[HOUR] = toInt(e.substr(0, a)), t[MINUTE] = toInt(e.substr(a, 2)), t[SECOND] = toInt(e.substr(r)), getParsingFlags(o).bigHour = !0; }), addParseToken("Hmm", function (e, t, o) { var a = e.length - 2; t[HOUR] = toInt(e.substr(0, a)), t[MINUTE] = toInt(e.substr(a)); }), addParseToken("Hmmss", function (e, t, o) { var a = e.length - 4, r = e.length - 2; t[HOUR] = toInt(e.substr(0, a)), t[MINUTE] = toInt(e.substr(a, 2)), t[SECOND] = toInt(e.substr(r)); });
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem(e, t, o) { return e > 11 ? o ? "pm" : "PM" : o ? "am" : "AM"; }
var globalLocale, getSetHour = makeGetSet("Hours", !0), baseConfig = { calendar: defaultCalendar, longDateFormat: defaultLongDateFormat, invalidDate: defaultInvalidDate, ordinal: defaultOrdinal, dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse, relativeTime: defaultRelativeTime, months: defaultLocaleMonths, monthsShort: defaultLocaleMonthsShort, week: defaultLocaleWeek, weekdays: defaultLocaleWeekdays, weekdaysMin: defaultLocaleWeekdaysMin, weekdaysShort: defaultLocaleWeekdaysShort, meridiemParse: defaultLocaleMeridiemParse }, locales = {}, localeFamilies = {};
function normalizeLocale(e) { return e ? e.toLowerCase().replace("_", "-") : e; }
function chooseLocale(e) { for (var t, o, a, r, n = 0; n < e.length;) {
    for (t = (r = normalizeLocale(e[n]).split("-")).length, o = (o = normalizeLocale(e[n + 1])) ? o.split("-") : null; t > 0;) {
        if (a = loadLocale(r.slice(0, t).join("-")))
            return a;
        if (o && o.length >= t && compareArrays(r, o, !0) >= t - 1)
            break;
        t--;
    }
    n++;
} return globalLocale; }
function loadLocale(e) { var t = null; if (!locales[e] && "undefined" != typeof module && module && module.exports)
    try {
        t = globalLocale._abbr, require("./locale/" + e), getSetGlobalLocale(t);
    }
    catch (e) { } return locales[e]; }
function getSetGlobalLocale(e, t) { var o; return e && ((o = isUndefined(t) ? getLocale(e) : defineLocale(e, t)) ? globalLocale = o : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), globalLocale._abbr; }
function defineLocale(e, t) { if (null !== t) {
    var o, a = baseConfig;
    if (t.abbr = e, null != locales[e])
        deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), a = locales[e]._config;
    else if (null != t.parentLocale)
        if (null != locales[t.parentLocale])
            a = locales[t.parentLocale]._config;
        else {
            if (null == (o = loadLocale(t.parentLocale)))
                return localeFamilies[t.parentLocale] || (localeFamilies[t.parentLocale] = []), localeFamilies[t.parentLocale].push({ name: e, config: t }), null;
            a = o._config;
        }
    return locales[e] = new Locale(mergeConfigs(a, t)), localeFamilies[e] && localeFamilies[e].forEach(function (e) { defineLocale(e.name, e.config); }), getSetGlobalLocale(e), locales[e];
} return delete locales[e], null; }
function updateLocale(e, t) { if (null != t) {
    var o, a, r = baseConfig;
    null != (a = loadLocale(e)) && (r = a._config), (o = new Locale(t = mergeConfigs(r, t))).parentLocale = locales[e], locales[e] = o, getSetGlobalLocale(e);
}
else
    null != locales[e] && (null != locales[e].parentLocale ? locales[e] = locales[e].parentLocale : null != locales[e] && delete locales[e]); return locales[e]; }
function getLocale(e) { var t; if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return globalLocale; if (!isArray(e)) {
    if (t = loadLocale(e))
        return t;
    e = [e];
} return chooseLocale(e); }
function listLocales() { return keys(locales); }
function checkOverflow(e) { var t, o = e._a; return o && -2 === getParsingFlags(e).overflow && (t = o[MONTH] < 0 || o[MONTH] > 11 ? MONTH : o[DATE] < 1 || o[DATE] > daysInMonth(o[YEAR], o[MONTH]) ? DATE : o[HOUR] < 0 || o[HOUR] > 24 || 24 === o[HOUR] && (0 !== o[MINUTE] || 0 !== o[SECOND] || 0 !== o[MILLISECOND]) ? HOUR : o[MINUTE] < 0 || o[MINUTE] > 59 ? MINUTE : o[SECOND] < 0 || o[SECOND] > 59 ? SECOND : o[MILLISECOND] < 0 || o[MILLISECOND] > 999 ? MILLISECOND : -1, getParsingFlags(e)._overflowDayOfYear && (t < YEAR || t > DATE) && (t = DATE), getParsingFlags(e)._overflowWeeks && -1 === t && (t = WEEK), getParsingFlags(e)._overflowWeekday && -1 === t && (t = WEEKDAY), getParsingFlags(e).overflow = t), e; }
function defaults(e, t, o) { return null != e ? e : null != t ? t : o; }
function currentDateArray(e) { var t = new Date(hooks.now()); return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]; }
function configFromArray(e) { var t, o, a, r, n, s = []; if (!e._d) {
    for (a = currentDateArray(e), e._w && null == e._a[DATE] && null == e._a[MONTH] && dayOfYearFromWeekInfo(e), null != e._dayOfYear && (n = defaults(e._a[YEAR], a[YEAR]), (e._dayOfYear > daysInYear(n) || 0 === e._dayOfYear) && (getParsingFlags(e)._overflowDayOfYear = !0), o = createUTCDate(n, 0, e._dayOfYear), e._a[MONTH] = o.getUTCMonth(), e._a[DATE] = o.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t)
        e._a[t] = s[t] = a[t];
    for (; t < 7; t++)
        e._a[t] = s[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
    24 === e._a[HOUR] && 0 === e._a[MINUTE] && 0 === e._a[SECOND] && 0 === e._a[MILLISECOND] && (e._nextDay = !0, e._a[HOUR] = 0), e._d = (e._useUTC ? createUTCDate : createDate).apply(null, s), r = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[HOUR] = 24), e._w && void 0 !== e._w.d && e._w.d !== r && (getParsingFlags(e).weekdayMismatch = !0);
} }
function dayOfYearFromWeekInfo(e) { var t, o, a, r, n, s, i, l; if (null != (t = e._w).GG || null != t.W || null != t.E)
    n = 1, s = 4, o = defaults(t.GG, e._a[YEAR], weekOfYear(createLocal(), 1, 4).year), a = defaults(t.W, 1), ((r = defaults(t.E, 1)) < 1 || r > 7) && (l = !0);
else {
    n = e._locale._week.dow, s = e._locale._week.doy;
    var u = weekOfYear(createLocal(), n, s);
    o = defaults(t.gg, e._a[YEAR], u.year), a = defaults(t.w, u.week), null != t.d ? ((r = t.d) < 0 || r > 6) && (l = !0) : null != t.e ? (r = t.e + n, (t.e < 0 || t.e > 6) && (l = !0)) : r = n;
} a < 1 || a > weeksInYear(o, n, s) ? getParsingFlags(e)._overflowWeeks = !0 : null != l ? getParsingFlags(e)._overflowWeekday = !0 : (i = dayOfYearFromWeeks(o, a, r, n, s), e._a[YEAR] = i.year, e._dayOfYear = i.dayOfYear); }
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]], isoTimes = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
function configFromISO(e) { var t, o, a, r, n, s, i = e._i, l = extendedIsoRegex.exec(i) || basicIsoRegex.exec(i); if (l) {
    for (getParsingFlags(e).iso = !0, t = 0, o = isoDates.length; t < o; t++)
        if (isoDates[t][1].exec(l[1])) {
            r = isoDates[t][0], a = !1 !== isoDates[t][2];
            break;
        }
    if (null == r)
        return void (e._isValid = !1);
    if (l[3]) {
        for (t = 0, o = isoTimes.length; t < o; t++)
            if (isoTimes[t][1].exec(l[3])) {
                n = (l[2] || " ") + isoTimes[t][0];
                break;
            }
        if (null == n)
            return void (e._isValid = !1);
    }
    if (!a && null != n)
        return void (e._isValid = !1);
    if (l[4]) {
        if (!tzRegex.exec(l[4]))
            return void (e._isValid = !1);
        s = "Z";
    }
    e._f = r + (n || "") + (s || ""), configFromStringAndFormat(e);
}
else
    e._isValid = !1; }
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
function extractFromRFC2822Strings(e, t, o, a, r, n) { var s = [untruncateYear(e), defaultLocaleMonthsShort.indexOf(t), parseInt(o, 10), parseInt(a, 10), parseInt(r, 10)]; return n && s.push(parseInt(n, 10)), s; }
function untruncateYear(e) { var t = parseInt(e, 10); return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t; }
function preprocessRFC2822(e) { return e.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""); }
function checkWeekday(e, t, o) { return !e || defaultLocaleWeekdaysShort.indexOf(e) === new Date(t[0], t[1], t[2]).getDay() || (getParsingFlags(o).weekdayMismatch = !0, o._isValid = !1, !1); }
var obsOffsets = { UT: 0, GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };
function calculateOffset(e, t, o) { if (e)
    return obsOffsets[e]; if (t)
    return 0; var a = parseInt(o, 10), r = a % 100; return (a - r) / 100 * 60 + r; }
function configFromRFC2822(e) { var t = rfc2822.exec(preprocessRFC2822(e._i)); if (t) {
    var o = extractFromRFC2822Strings(t[4], t[3], t[2], t[5], t[6], t[7]);
    if (!checkWeekday(t[1], o, e))
        return;
    e._a = o, e._tzm = calculateOffset(t[8], t[9], t[10]), e._d = createUTCDate.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), getParsingFlags(e).rfc2822 = !0;
}
else
    e._isValid = !1; }
function configFromString(e) { var t = aspNetJsonRegex.exec(e._i); null === t ? (configFromISO(e), !1 === e._isValid && (delete e._isValid, configFromRFC2822(e), !1 === e._isValid && (delete e._isValid, hooks.createFromInputFallback(e)))) : e._d = new Date(+t[1]); }
function configFromStringAndFormat(e) { if (e._f !== hooks.ISO_8601)
    if (e._f !== hooks.RFC_2822) {
        e._a = [], getParsingFlags(e).empty = !0;
        var t, o, a, r, n, s = "" + e._i, i = s.length, l = 0;
        for (a = expandFormat(e._f, e._locale).match(formattingTokens) || [], t = 0; t < a.length; t++)
            (o = (s.match(getParseRegexForToken(r = a[t], e)) || [])[0]) && ((n = s.substr(0, s.indexOf(o))).length > 0 && getParsingFlags(e).unusedInput.push(n), s = s.slice(s.indexOf(o) + o.length), l += o.length), formatTokenFunctions[r] ? (o ? getParsingFlags(e).empty = !1 : getParsingFlags(e).unusedTokens.push(r), addTimeToArrayFromToken(r, o, e)) : e._strict && !o && getParsingFlags(e).unusedTokens.push(r);
        getParsingFlags(e).charsLeftOver = i - l, s.length > 0 && getParsingFlags(e).unusedInput.push(s), e._a[HOUR] <= 12 && !0 === getParsingFlags(e).bigHour && e._a[HOUR] > 0 && (getParsingFlags(e).bigHour = void 0), getParsingFlags(e).parsedDateParts = e._a.slice(0), getParsingFlags(e).meridiem = e._meridiem, e._a[HOUR] = meridiemFixWrap(e._locale, e._a[HOUR], e._meridiem), configFromArray(e), checkOverflow(e);
    }
    else
        configFromRFC2822(e);
else
    configFromISO(e); }
function meridiemFixWrap(e, t, o) { var a; return null == o ? t : null != e.meridiemHour ? e.meridiemHour(t, o) : null != e.isPM ? ((a = e.isPM(o)) && t < 12 && (t += 12), a || 12 !== t || (t = 0), t) : t; }
function configFromStringAndArray(e) { var t, o, a, r, n; if (0 === e._f.length)
    return getParsingFlags(e).invalidFormat = !0, void (e._d = new Date(NaN)); for (r = 0; r < e._f.length; r++)
    n = 0, t = copyConfig({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[r], configFromStringAndFormat(t), isValid(t) && (n += getParsingFlags(t).charsLeftOver, n += 10 * getParsingFlags(t).unusedTokens.length, getParsingFlags(t).score = n, (null == a || n < a) && (a = n, o = t)); extend(e, o || t); }
function configFromObject(e) { if (!e._d) {
    var t = normalizeObjectUnits(e._i);
    e._a = map([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function (e) { return e && parseInt(e, 10); }), configFromArray(e);
} }
function createFromConfig(e) { var t = new Moment(checkOverflow(prepareConfig(e))); return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t; }
function prepareConfig(e) { var t = e._i, o = e._f; return e._locale = e._locale || getLocale(e._l), null === t || void 0 === o && "" === t ? createInvalid({ nullInput: !0 }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)), isMoment(t) ? new Moment(checkOverflow(t)) : (isDate(t) ? e._d = t : isArray(o) ? configFromStringAndArray(e) : o ? configFromStringAndFormat(e) : configFromInput(e), isValid(e) || (e._d = null), e)); }
function configFromInput(e) { var t = e._i; isUndefined(t) ? e._d = new Date(hooks.now()) : isDate(t) ? e._d = new Date(t.valueOf()) : "string" == typeof t ? configFromString(e) : isArray(t) ? (e._a = map(t.slice(0), function (e) { return parseInt(e, 10); }), configFromArray(e)) : isObject(t) ? configFromObject(e) : isNumber(t) ? e._d = new Date(t) : hooks.createFromInputFallback(e); }
function createLocalOrUTC(e, t, o, a, r) { var n = {}; return !0 !== o && !1 !== o || (a = o, o = void 0), (isObject(e) && isObjectEmpty(e) || isArray(e) && 0 === e.length) && (e = void 0), n._isAMomentObject = !0, n._useUTC = n._isUTC = r, n._l = o, n._i = e, n._f = t, n._strict = a, createFromConfig(n); }
function createLocal(e, t, o, a) { return createLocalOrUTC(e, t, o, a, !1); }
hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (e) { e._d = new Date(e._i + (e._useUTC ? " UTC" : "")); }), hooks.ISO_8601 = function () { }, hooks.RFC_2822 = function () { };
var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var e = createLocal.apply(null, arguments); return this.isValid() && e.isValid() ? e < this ? this : e : createInvalid(); }), prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var e = createLocal.apply(null, arguments); return this.isValid() && e.isValid() ? e > this ? this : e : createInvalid(); });
function pickBy(e, t) { var o, a; if (1 === t.length && isArray(t[0]) && (t = t[0]), !t.length)
    return createLocal(); for (o = t[0], a = 1; a < t.length; ++a)
    t[a].isValid() && !t[a][e](o) || (o = t[a]); return o; }
function min() { return pickBy("isBefore", [].slice.call(arguments, 0)); }
function max() { return pickBy("isAfter", [].slice.call(arguments, 0)); }
var now = function () { return Date.now ? Date.now() : +new Date; }, ordering = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
function isDurationValid(e) { for (var t in e)
    if (-1 === indexOf.call(ordering, t) || null != e[t] && isNaN(e[t]))
        return !1; for (var o = !1, a = 0; a < ordering.length; ++a)
    if (e[ordering[a]]) {
        if (o)
            return !1;
        parseFloat(e[ordering[a]]) !== toInt(e[ordering[a]]) && (o = !0);
    } return !0; }
function isValid$1() { return this._isValid; }
function createInvalid$1() { return createDuration(NaN); }
function Duration(e) { var t = normalizeObjectUnits(e), o = t.year || 0, a = t.quarter || 0, r = t.month || 0, n = t.week || t.isoWeek || 0, s = t.day || 0, i = t.hour || 0, l = t.minute || 0, u = t.second || 0, d = t.millisecond || 0; this._isValid = isDurationValid(t), this._milliseconds = +d + 1e3 * u + 6e4 * l + 1e3 * i * 60 * 60, this._days = +s + 7 * n, this._months = +r + 3 * a + 12 * o, this._data = {}, this._locale = getLocale(), this._bubble(); }
function isDuration(e) { return e instanceof Duration; }
function absRound(e) { return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e); }
function offset(e, t) { addFormatToken(e, 0, 0, function () { var e = this.utcOffset(), o = "+"; return e < 0 && (e = -e, o = "-"), o + zeroFill(~~(e / 60), 2) + t + zeroFill(~~e % 60, 2); }); }
offset("Z", ":"), offset("ZZ", ""), addRegexToken("Z", matchShortOffset), addRegexToken("ZZ", matchShortOffset), addParseToken(["Z", "ZZ"], function (e, t, o) { o._useUTC = !0, o._tzm = offsetFromString(matchShortOffset, e); });
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(e, t) { var o = (t || "").match(e); if (null === o)
    return null; var a = ((o[o.length - 1] || []) + "").match(chunkOffset) || ["-", 0, 0], r = 60 * a[1] + toInt(a[2]); return 0 === r ? 0 : "+" === a[0] ? r : -r; }
function cloneWithOffset(e, t) { var o, a; return t._isUTC ? (o = t.clone(), a = (isMoment(e) || isDate(e) ? e.valueOf() : createLocal(e).valueOf()) - o.valueOf(), o._d.setTime(o._d.valueOf() + a), hooks.updateOffset(o, !1), o) : createLocal(e).local(); }
function getDateOffset(e) { return 15 * -Math.round(e._d.getTimezoneOffset() / 15); }
function getSetOffset(e, t, o) { var a, r = this._offset || 0; if (!this.isValid())
    return null != e ? this : NaN; if (null != e) {
    if ("string" == typeof e) {
        if (null === (e = offsetFromString(matchShortOffset, e)))
            return this;
    }
    else
        Math.abs(e) < 16 && !o && (e *= 60);
    return !this._isUTC && t && (a = getDateOffset(this)), this._offset = e, this._isUTC = !0, null != a && this.add(a, "m"), r !== e && (!t || this._changeInProgress ? addSubtract(this, createDuration(e - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, hooks.updateOffset(this, !0), this._changeInProgress = null)), this;
} return this._isUTC ? r : getDateOffset(this); }
function getSetZone(e, t) { return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset(); }
function setOffsetToUTC(e) { return this.utcOffset(0, e); }
function setOffsetToLocal(e) { return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(getDateOffset(this), "m")), this; }
function setOffsetToParsedOffset() { if (null != this._tzm)
    this.utcOffset(this._tzm, !1, !0);
else if ("string" == typeof this._i) {
    var e = offsetFromString(matchOffset, this._i);
    null != e ? this.utcOffset(e) : this.utcOffset(0, !0);
} return this; }
function hasAlignedHourOffset(e) { return !!this.isValid() && (e = e ? createLocal(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0); }
function isDaylightSavingTime() { return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset(); }
function isDaylightSavingTimeShifted() { if (!isUndefined(this._isDSTShifted))
    return this._isDSTShifted; var e = {}; if (copyConfig(e, this), (e = prepareConfig(e))._a) {
    var t = e._isUTC ? createUTC(e._a) : createLocal(e._a);
    this._isDSTShifted = this.isValid() && compareArrays(e._a, t.toArray()) > 0;
}
else
    this._isDSTShifted = !1; return this._isDSTShifted; }
function isLocal() { return !!this.isValid() && !this._isUTC; }
function isUtcOffset() { return !!this.isValid() && this._isUTC; }
function isUtc() { return !!this.isValid() && this._isUTC && 0 === this._offset; }
hooks.updateOffset = function () { };
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(e, t) { var o, a, r, n = e, s = null; return isDuration(e) ? n = { ms: e._milliseconds, d: e._days, M: e._months } : isNumber(e) ? (n = {}, t ? n[t] = e : n.milliseconds = e) : (s = aspNetRegex.exec(e)) ? (o = "-" === s[1] ? -1 : 1, n = { y: 0, d: toInt(s[DATE]) * o, h: toInt(s[HOUR]) * o, m: toInt(s[MINUTE]) * o, s: toInt(s[SECOND]) * o, ms: toInt(absRound(1e3 * s[MILLISECOND])) * o }) : (s = isoRegex.exec(e)) ? n = { y: parseIso(s[2], o = "-" === s[1] ? -1 : 1), M: parseIso(s[3], o), w: parseIso(s[4], o), d: parseIso(s[5], o), h: parseIso(s[6], o), m: parseIso(s[7], o), s: parseIso(s[8], o) } : null == n ? n = {} : "object" == typeof n && ("from" in n || "to" in n) && (r = momentsDifference(createLocal(n.from), createLocal(n.to)), (n = {}).ms = r.milliseconds, n.M = r.months), a = new Duration(n), isDuration(e) && hasOwnProp(e, "_locale") && (a._locale = e._locale), a; }
function parseIso(e, t) { var o = e && parseFloat(e.replace(",", ".")); return (isNaN(o) ? 0 : o) * t; }
function positiveMomentsDifference(e, t) { var o = {}; return o.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(o.months, "M").isAfter(t) && --o.months, o.milliseconds = +t - +e.clone().add(o.months, "M"), o; }
function momentsDifference(e, t) { var o; return e.isValid() && t.isValid() ? (t = cloneWithOffset(t, e), e.isBefore(t) ? o = positiveMomentsDifference(e, t) : ((o = positiveMomentsDifference(t, e)).milliseconds = -o.milliseconds, o.months = -o.months), o) : { milliseconds: 0, months: 0 }; }
function createAdder(e, t) { return function (o, a) { var r; return null === a || isNaN(+a) || (deprecateSimple(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), r = o, o = a, a = r), addSubtract(this, createDuration(o = "string" == typeof o ? +o : o, a), e), this; }; }
function addSubtract(e, t, o, a) { var r = t._milliseconds, n = absRound(t._days), s = absRound(t._months); e.isValid() && (a = null == a || a, s && setMonth(e, get(e, "Month") + s * o), n && set$1(e, "Date", get(e, "Date") + n * o), r && e._d.setTime(e._d.valueOf() + r * o), a && hooks.updateOffset(e, n || s)); }
createDuration.fn = Duration.prototype, createDuration.invalid = createInvalid$1;
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function getCalendarFormat(e, t) { var o = e.diff(t, "days", !0); return o < -6 ? "sameElse" : o < -1 ? "lastWeek" : o < 0 ? "lastDay" : o < 1 ? "sameDay" : o < 2 ? "nextDay" : o < 7 ? "nextWeek" : "sameElse"; }
function calendar$1(e, t) { var o = e || createLocal(), a = cloneWithOffset(o, this).startOf("day"), r = hooks.calendarFormat(this, a) || "sameElse", n = t && (isFunction(t[r]) ? t[r].call(this, o) : t[r]); return this.format(n || this.localeData().calendar(r, this, createLocal(o))); }
function clone() { return new Moment(this); }
function isAfter(e, t) { var o = isMoment(e) ? e : createLocal(e); return !(!this.isValid() || !o.isValid()) && ("millisecond" === (t = normalizeUnits(t) || "millisecond") ? this.valueOf() > o.valueOf() : o.valueOf() < this.clone().startOf(t).valueOf()); }
function isBefore(e, t) { var o = isMoment(e) ? e : createLocal(e); return !(!this.isValid() || !o.isValid()) && ("millisecond" === (t = normalizeUnits(t) || "millisecond") ? this.valueOf() < o.valueOf() : this.clone().endOf(t).valueOf() < o.valueOf()); }
function isBetween(e, t, o, a) { var r = isMoment(e) ? e : createLocal(e), n = isMoment(t) ? t : createLocal(t); return !!(this.isValid() && r.isValid() && n.isValid()) && ("(" === (a = a || "()")[0] ? this.isAfter(r, o) : !this.isBefore(r, o)) && (")" === a[1] ? this.isBefore(n, o) : !this.isAfter(n, o)); }
function isSame(e, t) { var o, a = isMoment(e) ? e : createLocal(e); return !(!this.isValid() || !a.isValid()) && ("millisecond" === (t = normalizeUnits(t) || "millisecond") ? this.valueOf() === a.valueOf() : (o = a.valueOf(), this.clone().startOf(t).valueOf() <= o && o <= this.clone().endOf(t).valueOf())); }
function isSameOrAfter(e, t) { return this.isSame(e, t) || this.isAfter(e, t); }
function isSameOrBefore(e, t) { return this.isSame(e, t) || this.isBefore(e, t); }
function diff(e, t, o) { var a, r, n; if (!this.isValid())
    return NaN; if (!(a = cloneWithOffset(e, this)).isValid())
    return NaN; switch (r = 6e4 * (a.utcOffset() - this.utcOffset()), t = normalizeUnits(t)) {
    case "year":
        n = monthDiff(this, a) / 12;
        break;
    case "month":
        n = monthDiff(this, a);
        break;
    case "quarter":
        n = monthDiff(this, a) / 3;
        break;
    case "second":
        n = (this - a) / 1e3;
        break;
    case "minute":
        n = (this - a) / 6e4;
        break;
    case "hour":
        n = (this - a) / 36e5;
        break;
    case "day":
        n = (this - a - r) / 864e5;
        break;
    case "week":
        n = (this - a - r) / 6048e5;
        break;
    default: n = this - a;
} return o ? n : absFloor(n); }
function monthDiff(e, t) { var o = 12 * (t.year() - e.year()) + (t.month() - e.month()), a = e.clone().add(o, "months"); return -(o + (t - a < 0 ? (t - a) / (a - e.clone().add(o - 1, "months")) : (t - a) / (e.clone().add(o + 1, "months") - a))) || 0; }
function toString() { return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"); }
function toISOString(e) { if (!this.isValid())
    return null; var t = !0 !== e, o = t ? this.clone().utc() : this; return o.year() < 0 || o.year() > 9999 ? formatMoment(o, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : isFunction(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", formatMoment(o, "Z")) : formatMoment(o, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"); }
function inspect() { if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)"; var e = "moment", t = ""; this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z"); var o = "[" + e + '("]', a = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"; return this.format(o + a + "-MM-DD[T]HH:mm:ss.SSS" + t + '[")]'); }
function format(e) { e || (e = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat); var t = formatMoment(this, e); return this.localeData().postformat(t); }
function from(e, t) { return this.isValid() && (isMoment(e) && e.isValid() || createLocal(e).isValid()) ? createDuration({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate(); }
function fromNow(e) { return this.from(createLocal(), e); }
function to(e, t) { return this.isValid() && (isMoment(e) && e.isValid() || createLocal(e).isValid()) ? createDuration({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate(); }
function toNow(e) { return this.to(createLocal(), e); }
function locale(e) { var t; return void 0 === e ? this._locale._abbr : (null != (t = getLocale(e)) && (this._locale = t), this); }
hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (e) { return void 0 === e ? this.localeData() : this.locale(e); });
function localeData() { return this._locale; }
var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = 3506328 * MS_PER_HOUR;
function mod$1(e, t) { return (e % t + t) % t; }
function localStartOfDate(e, t, o) { return e < 100 && e >= 0 ? new Date(e + 400, t, o) - MS_PER_400_YEARS : new Date(e, t, o).valueOf(); }
function utcStartOfDate(e, t, o) { return e < 100 && e >= 0 ? Date.UTC(e + 400, t, o) - MS_PER_400_YEARS : Date.UTC(e, t, o); }
function startOf(e) { var t; if (void 0 === (e = normalizeUnits(e)) || "millisecond" === e || !this.isValid())
    return this; var o = this._isUTC ? utcStartOfDate : localStartOfDate; switch (e) {
    case "year":
        t = o(this.year(), 0, 1);
        break;
    case "quarter":
        t = o(this.year(), this.month() - this.month() % 3, 1);
        break;
    case "month":
        t = o(this.year(), this.month(), 1);
        break;
    case "week":
        t = o(this.year(), this.month(), this.date() - this.weekday());
        break;
    case "isoWeek":
        t = o(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;
    case "day":
    case "date":
        t = o(this.year(), this.month(), this.date());
        break;
    case "hour":
        t = this._d.valueOf(), t -= mod$1(t + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
        break;
    case "minute":
        t = this._d.valueOf(), t -= mod$1(t, MS_PER_MINUTE);
        break;
    case "second": t = this._d.valueOf(), t -= mod$1(t, MS_PER_SECOND);
} return this._d.setTime(t), hooks.updateOffset(this, !0), this; }
function endOf(e) { var t; if (void 0 === (e = normalizeUnits(e)) || "millisecond" === e || !this.isValid())
    return this; var o = this._isUTC ? utcStartOfDate : localStartOfDate; switch (e) {
    case "year":
        t = o(this.year() + 1, 0, 1) - 1;
        break;
    case "quarter":
        t = o(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;
    case "month":
        t = o(this.year(), this.month() + 1, 1) - 1;
        break;
    case "week":
        t = o(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;
    case "isoWeek":
        t = o(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;
    case "day":
    case "date":
        t = o(this.year(), this.month(), this.date() + 1) - 1;
        break;
    case "hour":
        t = this._d.valueOf(), t += MS_PER_HOUR - mod$1(t + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
        break;
    case "minute":
        t = this._d.valueOf(), t += MS_PER_MINUTE - mod$1(t, MS_PER_MINUTE) - 1;
        break;
    case "second": t = this._d.valueOf(), t += MS_PER_SECOND - mod$1(t, MS_PER_SECOND) - 1;
} return this._d.setTime(t), hooks.updateOffset(this, !0), this; }
function valueOf() { return this._d.valueOf() - 6e4 * (this._offset || 0); }
function unix() { return Math.floor(this.valueOf() / 1e3); }
function toDate() { return new Date(this.valueOf()); }
function toArray() { var e = this; return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]; }
function toObject() { var e = this; return { years: e.year(), months: e.month(), date: e.date(), hours: e.hours(), minutes: e.minutes(), seconds: e.seconds(), milliseconds: e.milliseconds() }; }
function toJSON() { return this.isValid() ? this.toISOString() : null; }
function isValid$2() { return isValid(this); }
function parsingFlags() { return extend({}, getParsingFlags(this)); }
function invalidAt() { return getParsingFlags(this).overflow; }
function creationData() { return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict }; }
function addWeekYearFormatToken(e, t) { addFormatToken(0, [e, e.length], 0, t); }
function getSetWeekYear(e) { return getSetWeekYearHelper.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy); }
function getSetISOWeekYear(e) { return getSetWeekYearHelper.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4); }
function getISOWeeksInYear() { return weeksInYear(this.year(), 1, 4); }
function getWeeksInYear() { var e = this.localeData()._week; return weeksInYear(this.year(), e.dow, e.doy); }
function getSetWeekYearHelper(e, t, o, a, r) { var n; return null == e ? weekOfYear(this, a, r).year : (t > (n = weeksInYear(e, a, r)) && (t = n), setWeekAll.call(this, e, t, o, a, r)); }
function setWeekAll(e, t, o, a, r) { var n = dayOfYearFromWeeks(e, t, o, a, r), s = createUTCDate(n.year, 0, n.dayOfYear); return this.year(s.getUTCFullYear()), this.month(s.getUTCMonth()), this.date(s.getUTCDate()), this; }
function getSetQuarter(e) { return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3); }
addFormatToken(0, ["gg", 2], 0, function () { return this.weekYear() % 100; }), addFormatToken(0, ["GG", 2], 0, function () { return this.isoWeekYear() % 100; }), addWeekYearFormatToken("gggg", "weekYear"), addWeekYearFormatToken("ggggg", "weekYear"), addWeekYearFormatToken("GGGG", "isoWeekYear"), addWeekYearFormatToken("GGGGG", "isoWeekYear"), addUnitAlias("weekYear", "gg"), addUnitAlias("isoWeekYear", "GG"), addUnitPriority("weekYear", 1), addUnitPriority("isoWeekYear", 1), addRegexToken("G", matchSigned), addRegexToken("g", matchSigned), addRegexToken("GG", match1to2, match2), addRegexToken("gg", match1to2, match2), addRegexToken("GGGG", match1to4, match4), addRegexToken("gggg", match1to4, match4), addRegexToken("GGGGG", match1to6, match6), addRegexToken("ggggg", match1to6, match6), addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, o, a) { t[a.substr(0, 2)] = toInt(e); }), addWeekParseToken(["gg", "GG"], function (e, t, o, a) { t[a] = hooks.parseTwoDigitYear(e); }), addFormatToken("Q", 0, "Qo", "quarter"), addUnitAlias("quarter", "Q"), addUnitPriority("quarter", 7), addRegexToken("Q", match1), addParseToken("Q", function (e, t) { t[MONTH] = 3 * (toInt(e) - 1); }), addFormatToken("D", ["DD", 2], "Do", "date"), addUnitAlias("date", "D"), addUnitPriority("date", 9), addRegexToken("D", match1to2), addRegexToken("DD", match1to2, match2), addRegexToken("Do", function (e, t) { return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient; }), addParseToken(["D", "DD"], DATE), addParseToken("Do", function (e, t) { t[DATE] = toInt(e.match(match1to2)[0]); });
var getSetDayOfMonth = makeGetSet("Date", !0);
function getSetDayOfYear(e) { var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1; return null == e ? t : this.add(e - t, "d"); }
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), addUnitAlias("dayOfYear", "DDD"), addUnitPriority("dayOfYear", 4), addRegexToken("DDD", match1to3), addRegexToken("DDDD", match3), addParseToken(["DDD", "DDDD"], function (e, t, o) { o._dayOfYear = toInt(e); }), addFormatToken("m", ["mm", 2], 0, "minute"), addUnitAlias("minute", "m"), addUnitPriority("minute", 14), addRegexToken("m", match1to2), addRegexToken("mm", match1to2, match2), addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", !1);
addFormatToken("s", ["ss", 2], 0, "second"), addUnitAlias("second", "s"), addUnitPriority("second", 15), addRegexToken("s", match1to2), addRegexToken("ss", match1to2, match2), addParseToken(["s", "ss"], SECOND);
var token, getSetSecond = makeGetSet("Seconds", !1);
for (addFormatToken("S", 0, 0, function () { return ~~(this.millisecond() / 100); }), addFormatToken(0, ["SS", 2], 0, function () { return ~~(this.millisecond() / 10); }), addFormatToken(0, ["SSS", 3], 0, "millisecond"), addFormatToken(0, ["SSSS", 4], 0, function () { return 10 * this.millisecond(); }), addFormatToken(0, ["SSSSS", 5], 0, function () { return 100 * this.millisecond(); }), addFormatToken(0, ["SSSSSS", 6], 0, function () { return 1e3 * this.millisecond(); }), addFormatToken(0, ["SSSSSSS", 7], 0, function () { return 1e4 * this.millisecond(); }), addFormatToken(0, ["SSSSSSSS", 8], 0, function () { return 1e5 * this.millisecond(); }), addFormatToken(0, ["SSSSSSSSS", 9], 0, function () { return 1e6 * this.millisecond(); }), addUnitAlias("millisecond", "ms"), addUnitPriority("millisecond", 16), addRegexToken("S", match1to3, match1), addRegexToken("SS", match1to3, match2), addRegexToken("SSS", match1to3, match3), token = "SSSS"; token.length <= 9; token += "S")
    addRegexToken(token, matchUnsigned);
function parseMs(e, t) { t[MILLISECOND] = toInt(1e3 * ("0." + e)); }
for (token = "S"; token.length <= 9; token += "S")
    addParseToken(token, parseMs);
var getSetMillisecond = makeGetSet("Milliseconds", !1);
function getZoneAbbr() { return this._isUTC ? "UTC" : ""; }
function getZoneName() { return this._isUTC ? "Coordinated Universal Time" : ""; }
addFormatToken("z", 0, 0, "zoneAbbr"), addFormatToken("zz", 0, 0, "zoneName");
var proto = Moment.prototype;
function createUnix(e) { return createLocal(1e3 * e); }
function createInZone() { return createLocal.apply(null, arguments).parseZone(); }
function preParsePostFormat(e) { return e; }
proto.add = add, proto.calendar = calendar$1, proto.clone = clone, proto.diff = diff, proto.endOf = endOf, proto.format = format, proto.from = from, proto.fromNow = fromNow, proto.to = to, proto.toNow = toNow, proto.get = stringGet, proto.invalidAt = invalidAt, proto.isAfter = isAfter, proto.isBefore = isBefore, proto.isBetween = isBetween, proto.isSame = isSame, proto.isSameOrAfter = isSameOrAfter, proto.isSameOrBefore = isSameOrBefore, proto.isValid = isValid$2, proto.lang = lang, proto.locale = locale, proto.localeData = localeData, proto.max = prototypeMax, proto.min = prototypeMin, proto.parsingFlags = parsingFlags, proto.set = stringSet, proto.startOf = startOf, proto.subtract = subtract, proto.toArray = toArray, proto.toObject = toObject, proto.toDate = toDate, proto.toISOString = toISOString, proto.inspect = inspect, proto.toJSON = toJSON, proto.toString = toString, proto.unix = unix, proto.valueOf = valueOf, proto.creationData = creationData, proto.year = getSetYear, proto.isLeapYear = getIsLeapYear, proto.weekYear = getSetWeekYear, proto.isoWeekYear = getSetISOWeekYear, proto.quarter = proto.quarters = getSetQuarter, proto.month = getSetMonth, proto.daysInMonth = getDaysInMonth, proto.week = proto.weeks = getSetWeek, proto.isoWeek = proto.isoWeeks = getSetISOWeek, proto.weeksInYear = getWeeksInYear, proto.isoWeeksInYear = getISOWeeksInYear, proto.date = getSetDayOfMonth, proto.day = proto.days = getSetDayOfWeek, proto.weekday = getSetLocaleDayOfWeek, proto.isoWeekday = getSetISODayOfWeek, proto.dayOfYear = getSetDayOfYear, proto.hour = proto.hours = getSetHour, proto.minute = proto.minutes = getSetMinute, proto.second = proto.seconds = getSetSecond, proto.millisecond = proto.milliseconds = getSetMillisecond, proto.utcOffset = getSetOffset, proto.utc = setOffsetToUTC, proto.local = setOffsetToLocal, proto.parseZone = setOffsetToParsedOffset, proto.hasAlignedHourOffset = hasAlignedHourOffset, proto.isDST = isDaylightSavingTime, proto.isLocal = isLocal, proto.isUtcOffset = isUtcOffset, proto.isUtc = isUtc, proto.isUTC = isUtc, proto.zoneAbbr = getZoneAbbr, proto.zoneName = getZoneName, proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth), proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth), proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear), proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone), proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);
var proto$1 = Locale.prototype;
function get$1(e, t, o, a) { var r = getLocale(), n = createUTC().set(a, t); return r[o](n, e); }
function listMonthsImpl(e, t, o) { if (isNumber(e) && (t = e, e = void 0), e = e || "", null != t)
    return get$1(e, t, o, "month"); var a, r = []; for (a = 0; a < 12; a++)
    r[a] = get$1(e, a, o, "month"); return r; }
function listWeekdaysImpl(e, t, o, a) { "boolean" == typeof e ? (isNumber(t) && (o = t, t = void 0), t = t || "") : (o = t = e, e = !1, isNumber(t) && (o = t, t = void 0), t = t || ""); var r, n = getLocale(), s = e ? n._week.dow : 0; if (null != o)
    return get$1(t, (o + s) % 7, a, "day"); var i = []; for (r = 0; r < 7; r++)
    i[r] = get$1(t, (r + s) % 7, a, "day"); return i; }
function listMonths(e, t) { return listMonthsImpl(e, t, "months"); }
function listMonthsShort(e, t) { return listMonthsImpl(e, t, "monthsShort"); }
function listWeekdays(e, t, o) { return listWeekdaysImpl(e, t, o, "weekdays"); }
function listWeekdaysShort(e, t, o) { return listWeekdaysImpl(e, t, o, "weekdaysShort"); }
function listWeekdaysMin(e, t, o) { return listWeekdaysImpl(e, t, o, "weekdaysMin"); }
proto$1.calendar = calendar, proto$1.longDateFormat = longDateFormat, proto$1.invalidDate = invalidDate, proto$1.ordinal = ordinal, proto$1.preparse = preParsePostFormat, proto$1.postformat = preParsePostFormat, proto$1.relativeTime = relativeTime, proto$1.pastFuture = pastFuture, proto$1.set = set, proto$1.months = localeMonths, proto$1.monthsShort = localeMonthsShort, proto$1.monthsParse = localeMonthsParse, proto$1.monthsRegex = monthsRegex, proto$1.monthsShortRegex = monthsShortRegex, proto$1.week = localeWeek, proto$1.firstDayOfYear = localeFirstDayOfYear, proto$1.firstDayOfWeek = localeFirstDayOfWeek, proto$1.weekdays = localeWeekdays, proto$1.weekdaysMin = localeWeekdaysMin, proto$1.weekdaysShort = localeWeekdaysShort, proto$1.weekdaysParse = localeWeekdaysParse, proto$1.weekdaysRegex = weekdaysRegex, proto$1.weekdaysShortRegex = weekdaysShortRegex, proto$1.weekdaysMinRegex = weekdaysMinRegex, proto$1.isPM = localeIsPM, proto$1.meridiem = localeMeridiem, getSetGlobalLocale("en", { dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (e) { var t = e % 10; return e + (1 === toInt(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th"); } }), hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale), hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
var mathAbs = Math.abs;
function abs() { var e = this._data; return this._milliseconds = mathAbs(this._milliseconds), this._days = mathAbs(this._days), this._months = mathAbs(this._months), e.milliseconds = mathAbs(e.milliseconds), e.seconds = mathAbs(e.seconds), e.minutes = mathAbs(e.minutes), e.hours = mathAbs(e.hours), e.months = mathAbs(e.months), e.years = mathAbs(e.years), this; }
function addSubtract$1(e, t, o, a) { var r = createDuration(t, o); return e._milliseconds += a * r._milliseconds, e._days += a * r._days, e._months += a * r._months, e._bubble(); }
function add$1(e, t) { return addSubtract$1(this, e, t, 1); }
function subtract$1(e, t) { return addSubtract$1(this, e, t, -1); }
function absCeil(e) { return e < 0 ? Math.floor(e) : Math.ceil(e); }
function bubble() { var e, t, o, a, r, n = this._milliseconds, s = this._days, i = this._months, l = this._data; return n >= 0 && s >= 0 && i >= 0 || n <= 0 && s <= 0 && i <= 0 || (n += 864e5 * absCeil(monthsToDays(i) + s), s = 0, i = 0), l.milliseconds = n % 1e3, e = absFloor(n / 1e3), l.seconds = e % 60, t = absFloor(e / 60), l.minutes = t % 60, o = absFloor(t / 60), l.hours = o % 24, s += absFloor(o / 24), i += r = absFloor(daysToMonths(s)), s -= absCeil(monthsToDays(r)), a = absFloor(i / 12), i %= 12, l.days = s, l.months = i, l.years = a, this; }
function daysToMonths(e) { return 4800 * e / 146097; }
function monthsToDays(e) { return 146097 * e / 4800; }
function as(e) { if (!this.isValid())
    return NaN; var t, o, a = this._milliseconds; if ("month" === (e = normalizeUnits(e)) || "quarter" === e || "year" === e)
    switch (o = this._months + daysToMonths(t = this._days + a / 864e5), e) {
        case "month": return o;
        case "quarter": return o / 3;
        case "year": return o / 12;
    }
else
    switch (t = this._days + Math.round(monthsToDays(this._months)), e) {
        case "week": return t / 7 + a / 6048e5;
        case "day": return t + a / 864e5;
        case "hour": return 24 * t + a / 36e5;
        case "minute": return 1440 * t + a / 6e4;
        case "second": return 86400 * t + a / 1e3;
        case "millisecond": return Math.floor(864e5 * t) + a;
        default: throw new Error("Unknown unit " + e);
    } }
function valueOf$1() { return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12) : NaN; }
function makeAs(e) { return function () { return this.as(e); }; }
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
function clone$1() { return createDuration(this); }
function get$2(e) { return e = normalizeUnits(e), this.isValid() ? this[e + "s"]() : NaN; }
function makeGetter(e) { return function () { return this.isValid() ? this._data[e] : NaN; }; }
var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
function weeks() { return absFloor(this.days() / 7); }
var round = Math.round, thresholds = { ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11 };
function substituteTimeAgo(e, t, o, a, r) { return r.relativeTime(t || 1, !!o, e, a); }
function relativeTime$1(e, t, o) { var a = createDuration(e).abs(), r = round(a.as("s")), n = round(a.as("m")), s = round(a.as("h")), i = round(a.as("d")), l = round(a.as("M")), u = round(a.as("y")), d = r <= thresholds.ss && ["s", r] || r < thresholds.s && ["ss", r] || n <= 1 && ["m"] || n < thresholds.m && ["mm", n] || s <= 1 && ["h"] || s < thresholds.h && ["hh", s] || i <= 1 && ["d"] || i < thresholds.d && ["dd", i] || l <= 1 && ["M"] || l < thresholds.M && ["MM", l] || u <= 1 && ["y"] || ["yy", u]; return d[2] = t, d[3] = +e > 0, d[4] = o, substituteTimeAgo.apply(null, d); }
function getSetRelativeTimeRounding(e) { return void 0 === e ? round : "function" == typeof e && (round = e, !0); }
function getSetRelativeTimeThreshold(e, t) { return void 0 !== thresholds[e] && (void 0 === t ? thresholds[e] : (thresholds[e] = t, "s" === e && (thresholds.ss = t - 1), !0)); }
function humanize(e) { if (!this.isValid())
    return this.localeData().invalidDate(); var t = this.localeData(), o = relativeTime$1(this, !e, t); return e && (o = t.pastFuture(+this, o)), t.postformat(o); }
var abs$1 = Math.abs;
function sign(e) { return (e > 0) - (e < 0) || +e; }
function toISOString$1() { if (!this.isValid())
    return this.localeData().invalidDate(); var e, t, o = abs$1(this._milliseconds) / 1e3, a = abs$1(this._days), r = abs$1(this._months); e = absFloor(o / 60), t = absFloor(e / 60), o %= 60, e %= 60; var n = absFloor(r / 12), s = r %= 12, i = a, l = t, u = e, d = o ? o.toFixed(3).replace(/\.?0+$/, "") : "", c = this.asSeconds(); if (!c)
    return "P0D"; var h = c < 0 ? "-" : "", f = sign(this._months) !== sign(c) ? "-" : "", m = sign(this._days) !== sign(c) ? "-" : "", g = sign(this._milliseconds) !== sign(c) ? "-" : ""; return h + "P" + (n ? f + n + "Y" : "") + (s ? f + s + "M" : "") + (i ? m + i + "D" : "") + (l || u || d ? "T" : "") + (l ? g + l + "H" : "") + (u ? g + u + "M" : "") + (d ? g + d + "S" : ""); }
var proto$2 = Duration.prototype;
function sortRows(e, t) { if (void 0 === e && (e = []), void 0 === t && (t = []), !e)
    return []; if (!t || 0 === t.length)
    return e; var o = t.length > 1; return e.slice(0).sort(function (e, a) { if (o) {
    for (var r = 0; r < t.length; r++) {
        var n = t[r];
        if (e.group)
            return e.group.children = sortRows(e.group.children), a.group.children = sortRows(a.group.children), e.group.column !== n.column ? 0 : ("A" === n.sortMode ? 1 : -1) * e.group.label.localeCompare(a.group.label);
        var s = compareCell(e.cells[n.column], a.cells[n.column], n.sortMode);
        if (0 !== s)
            return s;
    }
    return 0;
} return n = t[0], e.group ? (e.group.children = sortRows(e.group.children), a.group.children = sortRows(a.group.children), e.group.column !== n.column ? 0 : ("A" === n.sortMode ? 1 : -1) * e.group.label.localeCompare(a.group.label)) : compareCell(e.cells[n.column], a.cells[n.column], n.sortMode); }); }
function filterRows(e, t, o, a) { return void 0 === e && (e = []), void 0 === t && (t = {}), void 0 === o && (o = ""), void 0 === a && (a = []), e ? t && Object.keys(t).length > 0 || o && a ? (r = t ? Object.keys(t) : [], e.filter(function (e) { if (o && a) {
    if (0 === a.length)
        return !0;
    for (var n = !1, s = 0; s < a.length; s++)
        if (e.cells[a[s]].value.toLowerCase().includes(o.toLocaleLowerCase())) {
            n = !0;
            break;
        }
    if (!n)
        return !1;
} return 0 === r.length || r.filter(function (o) { var a = t[o], r = e.cells[o]; return !(!r || !r.value) && (!!r.value.toLowerCase().includes(a.toLowerCase()) || void 0); }).length === r.length; })) : e : []; var r; }
function groupRows(e, t, o) { if (void 0 === e && (e = []), void 0 === t && (t = []), void 0 === o && (o = {}), !e)
    return []; if (!t || 0 === t.length)
    return e; var a = []; return e.forEach(function (e) { for (var r = t[0].column, n = e.cells[r].value, s = null, i = 0; i < a.length; i++) {
    var l = a[i];
    if (l.group.label === n) {
        s = l;
        break;
    }
} for (null === s && a.push(s = { group: { parent: null, column: r, expanded: !1, label: n, children: [], totals: {} }, cells: {} }), i = 1; i < t.length; i++) {
    for (var u = t[i], d = e.cells[u.column].value, c = null, h = 0; h < s.group.children.length; h++) {
        var f = s.group.children[h];
        if (f.group.label === d) {
            c = f;
            break;
        }
    }
    c || s.group.children.push(c = { cells: {}, group: { parent: s, column: u.column, children: [], expanded: !1, label: d, totals: {} } }), s = c;
} s.group.children.push(e), updateGroupTotal(s, o, e); }), adjustGroupsAvarage(a, o), a; }
function updateGroupTotal(e, t, o) { if (e && t) {
    var a = Object.keys(t);
    0 !== a.length && a.forEach(function (a) { var r = e.group.totals[a] || 0, n = o.cells[a], s = "NR" === n.obj.t, i = t[a]; switch (i) {
        case TotalMode.COUNT:
            e.group.totals[a] = r + 1;
            for (var l = e.group.parent; null != l;)
                l.group.totals[a] = (l.group.totals[a] || 0) + 1, l = l.group.parent;
            break;
        case TotalMode.SUM:
        case TotalMode.AVARAGE:
            if (s) {
                var u = numeral(n.obj.k);
                e.group.totals[a] = u.add(r).value();
                for (var d = e.group.parent; null != d;)
                    d.group.totals[a] = u.add(d.group.totals[a] || 0).value(), d = d.group.parent;
            }
            break;
        default: console.warn("invalid total mode: " + i);
    } });
} }
function adjustGroupsAvarage(e, t) { if (e && t) {
    var o = Object.keys(t);
    if (0 !== e.length && e[0].group && 0 !== o.length) {
        var a = o.filter(function (e) { return TotalMode.AVARAGE === t[e]; });
        a.length > 0 && e.filter(function (e) { return e.group.children.length > 0; }).forEach(function (e) { return adjustGroupAvarage(e, a); });
    }
} }
function adjustGroupAvarage(e, t) { var o = e.group.children; if (0 === o.length)
    return 0; var a = 0; return o[0].group ? (o.forEach(function (e) { a += adjustGroupAvarage(e, t); }), t.forEach(function (t) { e.group.totals[t] = numeral(e.group.totals[t]).divide(a).value(); })) : (a = o.length, t.forEach(function (t) { e.group.totals[t] = numeral(e.group.totals[t]).divide(e.group.children.length).value(); })), a; }
function calcTotals(e, t) { if (void 0 === e && (e = []), void 0 === t && (t = {}), !e || !t)
    return {}; var o = Object.keys(t), a = {}; if (0 === o.length && o.every(function (e) { return t[e] === TotalMode.COUNT; }))
    o.forEach(function (t) { return a[t] = e.length; });
else {
    e.forEach(function (e) { o.filter(function (e) { return TotalMode.COUNT !== t[e]; }).forEach(function (t) { var o = e.cells[t]; if ("NR" === o.obj.t) {
        var r = numeral(o.obj.k);
        a[t] = r.add(a[t] || 0).value();
    } }); });
    for (var r = 0, n = o; r < n.length; r++) {
        var s = n[r];
        if (t[s] === TotalMode.AVARAGE) {
            var i = a[s];
            i && e.length > 0 && (a[s] = numeral(i).divide(e.length).value());
        }
        else
            t[s] === TotalMode.COUNT && (a[s] = e.length);
    }
} return a; }
function compareCell(e, t, o) { var a = "A" === o ? 1 : -1, r = e.obj, n = t.obj; if (r.t !== n.t || r.p !== n.p) {
    var s = r.t.localeCompare(n.t);
    return 0 === s && (s = r.p.localeCompare(n.p)), s;
} if ("NR" === r.t) {
    var i = numeral(r.k).value(), l = numeral(n.k).value();
    return i === l ? 0 : i > l ? 1 * a : -1 * a;
} if ("D8" === r.t) {
    var u = void 0, d = void 0;
    if ("*YYMD" === r.p)
        u = hooks(r.k, "YYYYMMDD"), d = hooks(n.k, "YYYYMMDD");
    else {
        if ("*DMYY" !== r.p)
            return r.k.localeCompare(n.k);
        u = hooks(r.k, "DDMMYYYY"), d = hooks(n.k, "DDMMYYYY");
    }
    return u.isSame(d) ? 0 : u.isBefore(d) ? -1 * a : 1 * a;
} return a * e.value.localeCompare(t.value); }
proto$2.isValid = isValid$1, proto$2.abs = abs, proto$2.add = add$1, proto$2.subtract = subtract$1, proto$2.as = as, proto$2.asMilliseconds = asMilliseconds, proto$2.asSeconds = asSeconds, proto$2.asMinutes = asMinutes, proto$2.asHours = asHours, proto$2.asDays = asDays, proto$2.asWeeks = asWeeks, proto$2.asMonths = asMonths, proto$2.asQuarters = asQuarters, proto$2.asYears = asYears, proto$2.valueOf = valueOf$1, proto$2._bubble = bubble, proto$2.clone = clone$1, proto$2.get = get$2, proto$2.milliseconds = milliseconds, proto$2.seconds = seconds, proto$2.minutes = minutes, proto$2.hours = hours, proto$2.days = days, proto$2.weeks = weeks, proto$2.months = months, proto$2.years = years, proto$2.humanize = humanize, proto$2.toISOString = toISOString$1, proto$2.toString = toISOString$1, proto$2.toJSON = toISOString$1, proto$2.locale = locale, proto$2.localeData = localeData, proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1), proto$2.lang = lang, addFormatToken("X", 0, 0, "unix"), addFormatToken("x", 0, 0, "valueOf"), addRegexToken("x", matchSigned), addRegexToken("X", matchTimestamp), addParseToken("X", function (e, t, o) { o._d = new Date(1e3 * parseFloat(e, 10)); }), addParseToken("x", function (e, t, o) { o._d = new Date(toInt(e)); }), hooks.version = "2.24.0", setHookCallback(createLocal), hooks.fn = proto, hooks.min = min, hooks.max = max, hooks.now = now, hooks.utc = createUTC, hooks.unix = createUnix, hooks.months = listMonths, hooks.isDate = isDate, hooks.locale = getSetGlobalLocale, hooks.invalid = createInvalid, hooks.duration = createDuration, hooks.isMoment = isMoment, hooks.weekdays = listWeekdays, hooks.parseZone = createInZone, hooks.localeData = getLocale, hooks.isDuration = isDuration, hooks.monthsShort = listMonthsShort, hooks.weekdaysMin = listWeekdaysMin, hooks.defineLocale = defineLocale, hooks.updateLocale = updateLocale, hooks.locales = listLocales, hooks.weekdaysShort = listWeekdaysShort, hooks.normalizeUnits = normalizeUnits, hooks.relativeTimeRounding = getSetRelativeTimeRounding, hooks.relativeTimeThreshold = getSetRelativeTimeThreshold, hooks.calendarFormat = getCalendarFormat, hooks.prototype = proto, hooks.HTML5_FMT = { DATETIME_LOCAL: "YYYY-MM-DDTHH:mm", DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss", DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS", DATE: "YYYY-MM-DD", TIME: "HH:mm", TIME_SECONDS: "HH:mm:ss", TIME_MS: "HH:mm:ss.SSS", WEEK: "GGGG-[W]WW", MONTH: "YYYY-MM" };
var KetchupDataTable = function () { function e() { this.showFilters = !1, this.filters = {}, this.globalFilter = !1, this.sortEnabled = !0, this.sort = [], this.rowsPerPage = 10, this.paginatorPos = PaginatorPos.TOP, this.columnsWidth = [], this.showHeader = !0, this.showGrid = !0, this.groups = [], this.multiSelection = !1, this.globalFilterValue = "", this.currentPage = 1, this.currentRowsPerPage = 10, this.selectedRows = [], this.groupState = {}, this.openedMenu = null, this.density = "medium", this.renderedRows = []; } return e.prototype.rowsPerPageHandler = function (e) { this.currentRowsPerPage = e; }, e.prototype.componentWillLoad = function () { this.rowsPerPageHandler(this.rowsPerPage); }, e.prototype.componentDidLoad = function () { this.selectRow && this.selectRow > 0 && this.selectRow <= this.renderedRows.length && (this.selectedRows = [], this.selectedRows.push(this.renderedRows[this.selectRow - 1]), this.kupAutoRowSelect.emit({ selectedRow: this.selectedRows[0] })); }, e.prototype.getColumns = function () { return this.data && this.data.columns ? this.data.columns : [{ title: "", name: "", size: 0 }]; }, e.prototype.getVisibleColumns = function () { var e = this, t = this.getColumns().filter(function (e) { return !e.hasOwnProperty("visible") || e.visible; }); return this.isGrouping() ? t.filter(function (t) { for (var o = null, a = 0, r = e.groups; a < r.length; a++) {
    var n = r[a];
    if (n.column === t.name) {
        o = n;
        break;
    }
} return !o || !o.hasOwnProperty("visible") || o.visible; }) : t; }, e.prototype.getColumnByName = function (e) { for (var t = 0, o = this.getColumns(); t < o.length; t++) {
    var a = o[t];
    if (a.name === e)
        return a;
} return null; }, e.prototype.getGroupByName = function (e) { if (!this.isGrouping())
    return null; for (var t = 0, o = this.groups; t < o.length; t++) {
    var a = o[t];
    if (a.column === e)
        return a;
} return null; }, e.prototype.getRows = function () { return this.data && this.data.rows ? this.data.rows : []; }, e.prototype.getFilteredRows = function () { return filterRows(this.getRows(), this.filters, this.globalFilterValue, this.getVisibleColumns().map(function (e) { return e.name; })); }, e.prototype.isGrouping = function () { return this.groups && this.groups.length > 0; }, e.prototype.removeGroup = function (e) { var t = this.groups.indexOf(e); t >= 0 && (this.groups.splice(t, 1), this.groups = this.groups.slice(), this.groupState = {}); }, e.prototype.hasTotals = function () { return this.totals && Object.keys(this.totals).length > 0; }, e.prototype.onColumnSort = function (e, t) { for (var o = e.ctrlKey, a = 0; a < this.sort.length && (r = this.sort[a]).column !== t; a++)
    ; if (a < this.sort.length) {
    var r = this.sort[a], n = Object.assign({}, r, { sortMode: r.sortMode === SortMode.A ? SortMode.D : SortMode.A });
    if (o) {
        var s = this.sort.slice();
        s[a] = n, this.sort = s;
    }
    else
        this.sort = [n];
}
else
    r = { column: t, sortMode: SortMode.A }, this.sort = o ? this.sort.concat([r]) : [r]; }, e.prototype.onFilterChange = function (e, t) { var o = e.detail; this.currentPage = 1; var a = Object.assign({}, this.filters); 0 === o.value.length ? delete a[t] : a[t] = o.value, this.filters = a; }, e.prototype.onGlobalFilterChange = function (e) { var t = e.detail; this.currentPage = 1, this.globalFilterValue = t.value; }, e.prototype.handlePageChanged = function (e) { this.currentPage = e.detail.newPage; }, e.prototype.handleRowsPerPageChanged = function (e) { this.currentRowsPerPage = e.detail.newRowsPerPage; }, e.prototype.onRowClick = function (e, t) { this.handleRowSelect(t, e.ctrlKey); var o = e.target, a = null; o instanceof HTMLElement && "TD" === o.tagName && (a = o.dataset.column), this.kupRowSelected.emit({ selectedRows: this.selectedRows, clickedColumn: a }); }, e.prototype.handleRowSelect = function (e, t) { if (this.multiSelection)
    if (t && this.selectedRows) {
        var o = this.selectedRows.indexOf(e);
        o < 0 ? this.selectedRows = this.selectedRows.concat([e]) : (this.selectedRows.splice(o, 1), this.selectedRows = this.selectedRows.slice());
    }
    else
        this.selectedRows = [e];
else
    this.selectedRows = [e]; }, e.prototype.onRowCheckboxSelection = function (e, t) { if (e.target.checked)
    this.selectedRows = this.selectedRows.length > 0 ? this.selectedRows.concat([t]) : [t], this.kupRowSelected.emit({ selectedRows: this.selectedRows, clickedColumn: null });
else {
    var o = this.selectedRows.indexOf(t);
    o >= 0 && (this.selectedRows.splice(o, 1), this.selectedRows = this.selectedRows.slice());
} }, e.prototype.onRowExpand = function (e) { e.group.expanded = !e.group.expanded, this.groupState[e.group.label].expanded = e.group.expanded, this.groupState = Object.assign({}, this.groupState); }, e.prototype.onSelectAll = function (e) { this.selectedRows = e.target.checked ? this.renderedRows : [], this.kupRowSelected.emit({ selectedRows: this.selectedRows, clickedColumn: null }); }, e.prototype.onColumnMouseOver = function (e) { this.openedMenu = e; }, e.prototype.onColumnMouseLeave = function (e) { this.openedMenu === e && (this.openedMenu = null); }, e.prototype.switchColumnGroup = function (e, t) { if (this.openedMenu = null, null !== e) {
    var o = this.groups.indexOf(e);
    this.groups.splice(o, 1), this.groups = this.groups.slice(), this.groupState = {};
}
else
    this.groups = this.groups.concat([{ column: t, visible: !0 }]), this.groupState = {}; }, e.prototype.onOptionClicked = function (e, t) { this.kupOptionClicked.emit({ column: e, row: t }); }, e.prototype.groupRows = function (e) { if (!this.isGrouping())
    return e; var t = groupRows(e, this.groups, this.totals); return this.adjustGroupState(t), t; }, e.prototype.adjustGroupState = function (e) { var t = this; e && 0 !== e.length && e[0].hasOwnProperty("group") && e.forEach(function (e) { return t.adjustGroupStateFromRow(e); }); }, e.prototype.adjustGroupStateFromRow = function (e) { var t = this; if (e && e.hasOwnProperty("group")) {
    var o = e.group, a = this.groupState[o.label];
    a ? o.expanded = a.expanded : this.groupState[o.label] = o, o.children.forEach(function (e) { return t.adjustGroupStateFromRow(e); });
} }, e.prototype.sortRows = function (e) { return sortRows(e, this.sort); }, e.prototype.paginateRows = function (e) { var t = this.currentPage * this.currentRowsPerPage - this.currentRowsPerPage; return e.slice(t, t + this.currentRowsPerPage); }, e.prototype.getSortIcon = function (e) { for (var t = 0, o = this.sort; t < o.length; t++) {
    var a = o[t];
    if (a.column === e)
        return "A" === a.sortMode ? "mdi-sort-ascending" : "mdi-sort-descending";
} return "mdi-sort"; }, e.prototype.calculateColspan = function () { var e = this.getVisibleColumns().length; return this.multiSelection && (e += 1), this.isGrouping() && this.hasTotals() && (e += 1), e; }, e.prototype.renderHeader = function () { var e = this, t = this.columnsWidth.length > 0, o = this.getVisibleColumns().map(function (o) { var a = null; if (e.showFilters) {
    var r = "";
    e.filters && e.filters[o.name] && (r = e.filters[o.name]), a = mycomponent_core_js_1.h("div", null, mycomponent_core_js_1.h("kup-text-input", { class: "datatable-filter", initialValue: r, "data-col": o.name, onKetchupTextInputUpdated: function (t) { e.onFilterChange(t, o.name); } }));
} var n = null; e.sortEnabled && (n = mycomponent_core_js_1.h("span", { class: "column-sort" }, mycomponent_core_js_1.h("span", { role: "button", "aria-label": "Sort column", class: "mdi " + e.getSortIcon(o.name), onClick: function (t) { return e.onColumnSort(t, o.name); } }))); var s = null; if (t)
    for (var i = 0; i < e.columnsWidth.length; i++) {
        var l = e.columnsWidth[i];
        if (l.column === o.name) {
            var u = l.width.toString() + "px";
            s = { width: u, minWidth: u, maxWidth: u };
            break;
        }
    } var d = [], c = e.getGroupByName(o.name), f = null != c ? "Disattiva raggruppamento" : "Attiva raggruppamento"; d.push(mycomponent_core_js_1.h("li", { role: "menuitem", onClick: function () { return e.switchColumnGroup(c, o.name); } }, mycomponent_core_js_1.h("span", { class: "mdi mdi-book" }), " ", f)), d.push(mycomponent_core_js_1.h("li", { role: "menuitem", onClick: function () { return e.kupAddColumn.emit({ column: o.name }); } }, mycomponent_core_js_1.h("span", { class: "mdi mdi-table-column-plus-after" }), "Aggiungi colonna")); var m = null; return 0 !== d.length && (m = mycomponent_core_js_1.h("div", { style: { display: e.openedMenu === o.name ? "block" : "none" }, class: "column-menu" }, mycomponent_core_js_1.h("ul", { role: "menubar" }, d))), mycomponent_core_js_1.h("th", { style: s, onMouseOver: function () { return e.onColumnMouseOver(o.name); }, onMouseLeave: function () { return e.onColumnMouseLeave(o.name); } }, mycomponent_core_js_1.h("span", { class: "column-title" }, o.title), n, a, m); }), a = null; this.multiSelection && (a = mycomponent_core_js_1.h("th", { style: { width: "30px", margin: "0 auto" } }, mycomponent_core_js_1.h("input", { type: "checkbox", onChange: function (t) { return e.onSelectAll(t); }, title: "selectedRow: " + this.selectedRows.length + " - renderedRows: " + this.renderedRows.length, checked: this.selectedRows.length > 0 && this.selectedRows.length === this.renderedRows.length }))); var r = null; return this.isGrouping() && this.hasTotals() && (r = mycomponent_core_js_1.h("th", null)), [a, r].concat(o); }, e.prototype.renderFooter = function (e) { if (!this.hasTotals())
    return null; var t = calcTotals(e, this.totals), o = this.getVisibleColumns().map(function (e) { return mycomponent_core_js_1.h("td", null, t[e.name]); }), a = null; this.multiSelection && (a = mycomponent_core_js_1.h("td", null)); var r = null; return this.isGrouping() && this.hasTotals() && (r = mycomponent_core_js_1.h("td", null)), mycomponent_core_js_1.h("tfoot", null, mycomponent_core_js_1.h("tr", null, a, r, o)); }, e.prototype.renderRow = function (e, t) { var o = this; void 0 === t && (t = 0); var a = this.getVisibleColumns(); if (e.group) {
    if (0 === e.group.children.length)
        return null;
    for (var r = "mdi mdi-chevron-" + (e.group.expanded ? "right" : "down"), n = [], s = [], i = 0; i < t; i++)
        s.push(mycomponent_core_js_1.h("span", { class: "indent" }));
    if (this.hasTotals()) {
        (d = []).push(mycomponent_core_js_1.h("td", { colSpan: this.multiSelection ? 2 : 1 }, s, mycomponent_core_js_1.h("span", { role: "button", "aria-label": "Row expander", class: r, onClick: function () { return o.onRowExpand(e); } }), e.group.label));
        for (var l = 0, u = a; l < u.length; l++)
            d.push(mycomponent_core_js_1.h("td", null, e.group.totals[u[l].name]));
        n.push(mycomponent_core_js_1.h("tr", null, d));
    }
    else
        n.push(mycomponent_core_js_1.h("tr", { class: "group" }, mycomponent_core_js_1.h("td", { colSpan: this.calculateColspan() }, s, mycomponent_core_js_1.h("span", { role: "button", "aria-label": "Row expander", class: "row-expander " + r, onClick: function () { return o.onRowExpand(e); } }), e.group.label)));
    return e.group.expanded && e.group.children.map(function (e) { return o.renderRow(e, t + 1); }).forEach(function (e) { Array.isArray(e) ? e.forEach(function (e) { return n.push(e); }) : n.push(e); }), n;
} var d = a.map(function (a, r) { var n = a.name, s = []; if (!(0 !== r || o.isGrouping() && o.hasTotals()))
    for (var i = 0; i < t; i++)
        s.push(mycomponent_core_js_1.h("span", { class: "indent" })); var l = e.cells[n], u = null; return l.options && (u = mycomponent_core_js_1.h("span", { class: "options", role: "button", "aria-label": "Opzioni oggetto", title: "Opzioni oggetto", onClick: function () { return o.onOptionClicked(n, e); } }, mycomponent_core_js_1.h("i", { class: "mdi mdi-settings" }))), mycomponent_core_js_1.h("td", { "data-column": n, style: l.style }, s, l.value, u); }), c = null; this.selectedRows.includes(e) && (c = "selected"); var f = null; this.multiSelection && (f = mycomponent_core_js_1.h("td", null, mycomponent_core_js_1.h("input", { type: "checkbox", checked: this.selectedRows.includes(e), onClick: function (e) { return e.stopPropagation(); }, onChange: function (t) { return o.onRowCheckboxSelection(t, e); } }))); var m = null; return this.isGrouping() && this.hasTotals() && (m = mycomponent_core_js_1.h("td", null)), this.renderedRows.push(e), mycomponent_core_js_1.h("tr", { class: c, onClick: function (t) { return o.onRowClick(t, e); } }, f, m, d); }, e.prototype.render = function () { var e = this; this.renderedRows = []; var t = this.getFilteredRows(), o = this.sortRows(t), a = this.renderFooter(o), r = this.groupRows(o), n = this.paginateRows(r), s = null; 0 === n.length ? s = mycomponent_core_js_1.h("tr", null, mycomponent_core_js_1.h("td", { colSpan: this.calculateColspan() }, "Empty data")) : (s = [], n.map(function (t) { return e.renderRow(t); }).forEach(function (e) { Array.isArray(e) ? e.forEach(function (e) { return s.push(e); }) : s.push(e); })); var i = this.renderHeader(), l = null; this.globalFilter && (l = mycomponent_core_js_1.h("div", { id: "globalFilter" }, mycomponent_core_js_1.h("kup-text-input", { label: "Global filter", onKetchupTextInputUpdated: function (t) { return e.onGlobalFilterChange(t); } }))); var u = null; PaginatorPos.TOP !== this.paginatorPos && PaginatorPos.BOTH !== this.paginatorPos || (u = mycomponent_core_js_1.h("kup-paginator", { id: "top-paginator", max: t.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: function (t) { return e.handlePageChanged(t); }, onKupRowsPerPageChanged: function (t) { return e.handleRowsPerPageChanged(t); } })); var d = null; PaginatorPos.BOTTOM !== this.paginatorPos && PaginatorPos.BOTH !== this.paginatorPos || (d = mycomponent_core_js_1.h("kup-paginator", { id: "bottom-paginator", max: t.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: function (t) { return e.handlePageChanged(t); }, onKupRowsPerPageChanged: function (t) { return e.handleRowsPerPageChanged(t); } })); var c = "density-" + this.density; this.showGrid || (c += " noGrid"); var f = null; if (this.isGrouping()) {
    var m = this.groups.map(function (t) { var o = e.getColumnByName(t.column); return o ? mycomponent_core_js_1.h("div", { class: "group-chip", tabIndex: 0, onClick: function () { return e.removeGroup(t); } }, mycomponent_core_js_1.h("span", { class: "mdi mdi-close-circle" }), o.title) : null; });
    f = mycomponent_core_js_1.h("div", { id: "group-chips" }, m);
} var g = mycomponent_core_js_1.h("div", { id: "density-panel" }, mycomponent_core_js_1.h("kup-button", { flat: !0, iconClass: "mdi mdi-format-align-justify", onClick: function () { return e.density = "small"; } }), mycomponent_core_js_1.h("kup-button", { flat: !0, iconClass: "mdi mdi-menu", onClick: function () { return e.density = "medium"; } }), mycomponent_core_js_1.h("kup-button", { flat: !0, iconClass: "mdi mdi-view-sequential", onClick: function () { return e.density = "big"; } })); return mycomponent_core_js_1.h("div", null, f, u, l, g, mycomponent_core_js_1.h("div", { id: "data-table-wrapper" }, mycomponent_core_js_1.h("table", { class: c }, mycomponent_core_js_1.h("thead", { hidden: !this.showHeader }, mycomponent_core_js_1.h("tr", null, i)), mycomponent_core_js_1.h("tbody", null, s), a)), d); }, Object.defineProperty(e, "is", { get: function () { return "kup-data-table"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { columnsWidth: { type: "Any", attr: "columns-width" }, currentPage: { state: !0 }, currentRowsPerPage: { state: !0 }, data: { type: "Any", attr: "data" }, density: { state: !0 }, filters: { type: "Any", attr: "filters", mutable: !0 }, globalFilter: { type: Boolean, attr: "global-filter" }, globalFilterValue: { state: !0 }, groups: { type: "Any", attr: "groups", mutable: !0 }, groupState: { state: !0 }, multiSelection: { type: Boolean, attr: "multi-selection" }, openedMenu: { state: !0 }, paginatorPos: { type: String, attr: "paginator-pos" }, rowsPerPage: { type: Number, attr: "rows-per-page", watchCallbacks: ["rowsPerPageHandler"] }, selectedRows: { state: !0 }, selectRow: { type: Number, attr: "select-row" }, showFilters: { type: Boolean, attr: "show-filters" }, showGrid: { type: Boolean, attr: "show-grid" }, showHeader: { type: Boolean, attr: "show-header" }, sort: { type: "Any", attr: "sort", mutable: !0 }, sortEnabled: { type: Boolean, attr: "sort-enabled" }, totals: { type: "Any", attr: "totals" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "kupAutoRowSelect", method: "kupAutoRowSelect", bubbles: !0, cancelable: !1, composed: !0 }, { name: "kupRowSelected", method: "kupRowSelected", bubbles: !0, cancelable: !1, composed: !0 }, { name: "kupOptionClicked", method: "kupOptionClicked", bubbles: !0, cancelable: !1, composed: !0 }, { name: "kupAddColumn", method: "kupAddColumn", bubbles: !0, cancelable: !1, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);.sc-kup-data-table-h{--int_main-background-color:var(--kup-data-table_background-color,#6aaaa7);--int_color:var(--kup-data-table_color,#111);--int_hover-color:var(--kup-data-table_hover-color,#545454);--int_hover-background-color:var(--kup-data-table_hover-background-color,#e0e0e0);--int_border-color:var(--kup-data-table_border-color,#000);--int_head-background-color:var(--kup-data-table_head-background-color,#f5f5f5);--int_group-background-color:var(--kup-data-table_group-background-color,#f5f5f5);--int_group-border-color:var(--kup-data-table_group-border-color,#6aaaa7);--int_filter-border-color:var(--kup-data-table_filter-border-color,#dadada)}#data-table-wrapper.sc-kup-data-table{overflow:auto}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table{color:var(--int_color);width:100%;min-width:intrinsic;min-width:-moz-max-content;min-width:-webkit-max-content;border-collapse:collapse;text-align:left}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   td.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   th.sc-kup-data-table{padding:.5rem 1rem}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   .column-sort.sc-kup-data-table{margin-left:.5rem;cursor:pointer}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   th.sc-kup-data-table   kup-text-input.datatable-filter.sc-kup-data-table{--int_border-color:var(--int_filter-border-color)}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   th.sc-kup-data-table   input.sc-kup-data-table{display:block}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   thead.sc-kup-data-table{background:var(--int_head-background-color);border:1px solid var(--int_border-color);border-bottom:3px solid var(--int_border-color)}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   thead.sc-kup-data-table   th.sc-kup-data-table{position:relative}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table{border:1px solid var(--int_border-color)}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table > tr.selected.sc-kup-data-table > td.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table:hover > td.sc-kup-data-table{color:var(--int_hover-color);background-color:var(--int_hover-background-color)}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table{border-left:10px solid var(--int_group-border-color);background:var(--int_group-background-color);font-weight:700}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table   td.sc-kup-data-table{padding:1rem 0}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table   icon.sc-kup-data-table{cursor:pointer;margin-right:.5rem}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table{-webkit-transition:padding .1s ease-in-out;transition:padding .1s ease-in-out}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table   .indent.sc-kup-data-table{display:inline-block;height:1rem;width:2rem}#data-table-wrapper.sc-kup-data-table > table.noGrid.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table > table.noGrid.sc-kup-data-table   td.sc-kup-data-table{border:none}#data-table-wrapper.sc-kup-data-table > table.density-small.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table{padding-top:.2rem;padding-bottom:.2rem}#data-table-wrapper.sc-kup-data-table > table.density-small.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table > td.sc-kup-data-table{padding-top:.75rem;padding-bottom:.75rem}#data-table-wrapper.sc-kup-data-table > table.density-big.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table{padding-top:1rem;padding-bottom:1rem}#data-table-wrapper.sc-kup-data-table > table.density-big.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table > td.sc-kup-data-table{padding-top:1.25rem;padding-bottom:1.25rem}#globalFilter.sc-kup-data-table{margin-bottom:.5rem;text-align:center}#group-chips.sc-kup-data-table{display:-ms-flexbox;display:flex;margin-bottom:.5rem}#group-chips.sc-kup-data-table > .group-chip.sc-kup-data-table{display:-ms-flexbox;display:flex;background-color:var(--int_main-background-color);padding:.5rem;color:#fff;margin-right:.5rem;cursor:pointer}#group-chips.sc-kup-data-table > .group-chip.sc-kup-data-table   icon.sc-kup-data-table{margin-right:.5rem}#group-chips.sc-kup-data-table > .group-chip.sc-kup-data-table:hover{color:red}.column-menu.sc-kup-data-table{position:absolute;z-index:100;background:#fff;border:1px solid #ccc;font-weight:400}.column-menu.sc-kup-data-table   ul.sc-kup-data-table{list-style-type:none;margin:0;padding:0}.column-menu.sc-kup-data-table   ul.sc-kup-data-table > li.sc-kup-data-table{padding:.5rem;text-align:left}.column-menu.sc-kup-data-table   ul.sc-kup-data-table > li.sc-kup-data-table:hover{cursor:pointer;background:var(--int_main-background-color);color:#fff}#density-panel.sc-kup-data-table{text-align:center}"; }, enumerable: !0, configurable: !0 }), e; }(), KetchupPaginator = function () { function e() { this.max = 0, this.perPage = 10, this.selectedPerPage = 10, this.currentPage = 1; } return e.prototype.isPrevPageDisabled = function () { return 1 == this.currentPage; }, e.prototype.isNextPageDisabled = function () { return this.currentPage * this.perPage >= this.max; }, e.prototype.onPrevPage = function () { this.isPrevPageDisabled() || this.kupPageChanged.emit({ newPage: this.currentPage - 1 }); }, e.prototype.onNextPage = function () { this.isNextPageDisabled() || this.kupPageChanged.emit({ newPage: this.currentPage + 1 }); }, e.prototype.onGoToPage = function (e) { this.kupPageChanged.emit({ newPage: parseInt(e.target.value) }); }, e.prototype.onRowsPerPage = function (e) { this.kupRowsPerPageChanged.emit({ newRowsPerPage: parseInt(e.target.value) }); }, e.prototype.getGoToPageOptions = function (e) { var t = []; t.push(mycomponent_core_js_1.h("option", { value: "1", selected: 1 === this.currentPage }, "1")); for (var o = 2; o <= e; o++)
    t.push(mycomponent_core_js_1.h("option", { value: o, selected: this.currentPage === o }, o)); return t; }, e.prototype.getRowsPerPageOptions = function () { var e = []; if (this.currentPage != this.max) {
    var t = this.perPage;
    if (0 === t)
        return e;
    for (; t < this.max;)
        e.push(mycomponent_core_js_1.h("option", { value: t, selected: t === this.selectedPerPage }, t)), t *= 2;
    e.push(mycomponent_core_js_1.h("option", { value: this.max, selected: this.max === this.perPage }, this.max));
}
else
    e.push(mycomponent_core_js_1.h("option", { value: this.perPage, selected: !0 }, this.perPage)); return e; }, e.prototype.render = function () { var e = this, t = "mdi mdi-chevron-left"; this.isPrevPageDisabled() && (t += " disabled"); var o = "mdi mdi-chevron-right"; this.isNextPageDisabled() && (o += " disabled"); var a = Math.ceil(this.max / this.selectedPerPage), r = this.getGoToPageOptions(a), n = this.getRowsPerPageOptions(); return mycomponent_core_js_1.h("div", { id: "paginator" }, mycomponent_core_js_1.h("div", { class: "align-left" }, "Pagina", mycomponent_core_js_1.h("span", { class: "prev-page" }, mycomponent_core_js_1.h("icon", { className: t, onclick: function () { return e.onPrevPage(); } })), mycomponent_core_js_1.h("select", { onChange: function (t) { return e.onGoToPage(t); } }, r), mycomponent_core_js_1.h("span", { class: "next-page" }, mycomponent_core_js_1.h("icon", { className: o, onclick: function () { return e.onNextPage(); } })), "Di ", a), mycomponent_core_js_1.h("div", { class: "align-right" }, mycomponent_core_js_1.h("span", { class: "nextPageGroup" }, "Numero risultati: ", this.max), "Mostra", mycomponent_core_js_1.h("select", { onChange: function (t) { return e.onRowsPerPage(t); } }, n), "righe per pagina")); }, Object.defineProperty(e, "is", { get: function () { return "kup-paginator"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { currentPage: { type: Number, attr: "current-page" }, max: { type: Number, attr: "max" }, perPage: { type: Number, attr: "per-page" }, selectedPerPage: { type: Number, attr: "selected-per-page" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "kupPageChanged", method: "kupPageChanged", bubbles: !0, cancelable: !1, composed: !0 }, { name: "kupRowsPerPageChanged", method: "kupRowsPerPageChanged", bubbles: !0, cancelable: !1, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);#paginator.sc-kup-paginator{margin:.5rem 0;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:justify;justify-content:space-between}#paginator.sc-kup-paginator   icon.sc-kup-paginator{cursor:pointer}#paginator.sc-kup-paginator   icon.disabled.sc-kup-paginator{cursor:default;opacity:.3}#paginator.sc-kup-paginator   .nextPage.sc-kup-paginator, #paginator.sc-kup-paginator   .nextPageGroup.sc-kup-paginator, #paginator.sc-kup-paginator   .prevPage.sc-kup-paginator, #paginator.sc-kup-paginator   select.sc-kup-paginator{margin:0 .1rem}#paginator.sc-kup-paginator   .nextPageGroup.sc-kup-paginator{border-right:1px solid #000;padding-right:.3rem}"; }, enumerable: !0, configurable: !0 }), e; }();
exports.KupDataTable = KetchupDataTable;
exports.KupPaginator = KetchupPaginator;
