"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mycomponent_core_js_1 = require("../mycomponent.core.js");
var SortMode, TotalMode, PaginatorPos;
!function (e) { e.A = "A", e.D = "D"; }(SortMode || (SortMode = {})), function (e) { e.COUNT = "Count", e.SUM = "Sum", e.AVARAGE = "Avarage"; }(TotalMode || (TotalMode = {})), function (e) { e.TOP = "Top", e.BOTTOM = "Bottom", e.BOTH = "Both"; }(PaginatorPos || (PaginatorPos = {}));
var commonjsGlobal = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function createCommonjsModule(e, t) { return e(t = { exports: {} }, t.exports), t.exports; }
var hookCallback, some, numeral = createCommonjsModule(function (e) { var t, a; t = commonjsGlobal, a = function () { var e, t, a, o, r, n = {}, s = {}, i = { currentLocale: "en", zeroFormat: null, nullFormat: null, defaultFormat: "0,0", scalePercentBy100: !0 }, l = { currentLocale: i.currentLocale, zeroFormat: i.zeroFormat, nullFormat: i.nullFormat, defaultFormat: i.defaultFormat, scalePercentBy100: i.scalePercentBy100 }; function u(e, t) { this._input = e, this._value = t; } return (e = function (a) { var o, r, s, i; if (e.isNumeral(a))
    o = a.value();
else if (0 === a || void 0 === a)
    o = 0;
else if (null === a || t.isNaN(a))
    o = null;
else if ("string" == typeof a)
    if (l.zeroFormat && a === l.zeroFormat)
        o = 0;
    else if (l.nullFormat && a === l.nullFormat || !a.replace(/[^0-9]+/g, "").length)
        o = null;
    else {
        for (r in n)
            if ((i = "function" == typeof n[r].regexps.unformat ? n[r].regexps.unformat() : n[r].regexps.unformat) && a.match(i)) {
                s = n[r].unformat;
                break;
            }
        o = (s = s || e._.stringToNumber)(a);
    }
else
    o = Number(a) || null; return new u(a, o); }).version = "2.0.6", e.isNumeral = function (e) { return e instanceof u; }, e._ = t = { numberToFormat: function (t, a, o) { var r, n, i, l, u, d, c, h, f = s[e.options.currentLocale], m = !1, g = !1, p = "", y = "", k = !1; if (t = t || 0, i = Math.abs(t), e._.includes(a, "(") ? (m = !0, a = a.replace(/[\(|\)]/g, "")) : (e._.includes(a, "+") || e._.includes(a, "-")) && (d = e._.includes(a, "+") ? a.indexOf("+") : t < 0 ? a.indexOf("-") : -1, a = a.replace(/[\+|\-]/g, "")), e._.includes(a, "a") && (n = !!(n = a.match(/a(k|m|b|t)?/)) && n[1], e._.includes(a, " a") && (p = " "), a = a.replace(new RegExp(p + "a[kmbt]?"), ""), i >= 1e12 && !n || "t" === n ? (p += f.abbreviations.trillion, t /= 1e12) : i < 1e12 && i >= 1e9 && !n || "b" === n ? (p += f.abbreviations.billion, t /= 1e9) : i < 1e9 && i >= 1e6 && !n || "m" === n ? (p += f.abbreviations.million, t /= 1e6) : (i < 1e6 && i >= 1e3 && !n || "k" === n) && (p += f.abbreviations.thousand, t /= 1e3)), e._.includes(a, "[.]") && (g = !0, a = a.replace("[.]", ".")), l = t.toString().split(".")[0], u = a.split(".")[1], c = a.indexOf(","), r = (a.split(".")[0].split(",")[0].match(/0/g) || []).length, u ? (e._.includes(u, "[") ? (u = (u = u.replace("]", "")).split("["), y = e._.toFixed(t, u[0].length + u[1].length, o, u[1].length)) : y = e._.toFixed(t, u.length, o), l = y.split(".")[0], y = e._.includes(y, ".") ? f.delimiters.decimal + y.split(".")[1] : "", g && 0 === Number(y.slice(1)) && (y = "")) : l = e._.toFixed(t, 0, o), p && !n && Number(l) >= 1e3 && p !== f.abbreviations.trillion)
        switch (l = String(Number(l) / 1e3), p) {
            case f.abbreviations.thousand:
                p = f.abbreviations.million;
                break;
            case f.abbreviations.million:
                p = f.abbreviations.billion;
                break;
            case f.abbreviations.billion: p = f.abbreviations.trillion;
        } if (e._.includes(l, "-") && (l = l.slice(1), k = !0), l.length < r)
        for (var _ = r - l.length; _ > 0; _--)
            l = "0" + l; return c > -1 && (l = l.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + f.delimiters.thousands)), 0 === a.indexOf(".") && (l = ""), h = l + y + (p || ""), m ? h = (m && k ? "(" : "") + h + (m && k ? ")" : "") : d >= 0 ? h = 0 === d ? (k ? "-" : "+") + h : h + (k ? "-" : "+") : k && (h = "-" + h), h; }, stringToNumber: function (e) { var t, a, o, r = s[l.currentLocale], n = e, i = { thousand: 3, million: 6, billion: 9, trillion: 12 }; if (l.zeroFormat && e === l.zeroFormat)
        a = 0;
    else if (l.nullFormat && e === l.nullFormat || !e.replace(/[^0-9]+/g, "").length)
        a = null;
    else {
        for (t in a = 1, "." !== r.delimiters.decimal && (e = e.replace(/\./g, "").replace(r.delimiters.decimal, ".")), i)
            if (o = new RegExp("[^a-zA-Z]" + r.abbreviations[t] + "(?:\\)|(\\" + r.currency.symbol + ")?(?:\\))?)?$"), n.match(o)) {
                a *= Math.pow(10, i[t]);
                break;
            }
        a *= (e.split("-").length + Math.min(e.split("(").length - 1, e.split(")").length - 1)) % 2 ? 1 : -1, e = e.replace(/[^0-9\.]+/g, ""), a *= Number(e);
    } return a; }, isNaN: function (e) { return "number" == typeof e && isNaN(e); }, includes: function (e, t) { return -1 !== e.indexOf(t); }, insert: function (e, t, a) { return e.slice(0, a) + t + e.slice(a); }, reduce: function (e, t) { if (null === this)
        throw new TypeError("Array.prototype.reduce called on null or undefined"); if ("function" != typeof t)
        throw new TypeError(t + " is not a function"); var a, o = Object(e), r = o.length >>> 0, n = 0; if (3 === arguments.length)
        a = arguments[2];
    else {
        for (; n < r && !(n in o);)
            n++;
        if (n >= r)
            throw new TypeError("Reduce of empty array with no initial value");
        a = o[n++];
    } for (; n < r; n++)
        n in o && (a = t(a, o[n], n, o)); return a; }, multiplier: function (e) { var t = e.toString().split("."); return t.length < 2 ? 1 : Math.pow(10, t[1].length); }, correctionFactor: function () { return Array.prototype.slice.call(arguments).reduce(function (e, a) { var o = t.multiplier(a); return e > o ? e : o; }, 1); }, toFixed: function (e, t, a, o) { var r, n, s, i, l = e.toString().split("."), u = t - (o || 0); return r = 2 === l.length ? Math.min(Math.max(l[1].length, u), t) : u, s = Math.pow(10, r), i = (a(e + "e+" + r) / s).toFixed(r), o > t - r && (n = new RegExp("\\.?0{1," + (o - (t - r)) + "}$"), i = i.replace(n, "")), i; } }, e.options = l, e.formats = n, e.locales = s, e.locale = function (e) { return e && (l.currentLocale = e.toLowerCase()), l.currentLocale; }, e.localeData = function (e) { if (!e)
    return s[l.currentLocale]; if (e = e.toLowerCase(), !s[e])
    throw new Error("Unknown locale : " + e); return s[e]; }, e.reset = function () { for (var e in i)
    l[e] = i[e]; }, e.zeroFormat = function (e) { l.zeroFormat = "string" == typeof e ? e : null; }, e.nullFormat = function (e) { l.nullFormat = "string" == typeof e ? e : null; }, e.defaultFormat = function (e) { l.defaultFormat = "string" == typeof e ? e : "0.0"; }, e.register = function (e, t, a) { if (t = t.toLowerCase(), this[e + "s"][t])
    throw new TypeError(t + " " + e + " already registered."); return this[e + "s"][t] = a, a; }, e.validate = function (t, a) { var o, r, n, s, i, l, u, d; if ("string" != typeof t && (t += "", console.warn && console.warn("Numeral.js: Value is not string. It has been co-erced to: ", t)), (t = t.trim()).match(/^\d+$/))
    return !0; if ("" === t)
    return !1; try {
    u = e.localeData(a);
}
catch (t) {
    u = e.localeData(e.locale());
} return n = u.currency.symbol, i = u.abbreviations, o = u.delimiters.decimal, r = "." === u.delimiters.thousands ? "\\." : u.delimiters.thousands, !(null !== (d = t.match(/^[^\d]+/)) && (t = t.substr(1), d[0] !== n) || null !== (d = t.match(/[^\d]+$/)) && (t = t.slice(0, -1), d[0] !== i.thousand && d[0] !== i.million && d[0] !== i.billion && d[0] !== i.trillion) || (l = new RegExp(r + "{2}"), t.match(/[^\d.,]/g) || (s = t.split(o)).length > 2 || (s.length < 2 ? !s[0].match(/^\d+.*\d$/) || s[0].match(l) : 1 === s[0].length ? !s[0].match(/^\d+$/) || s[0].match(l) || !s[1].match(/^\d+$/) : !s[0].match(/^\d+.*\d$/) || s[0].match(l) || !s[1].match(/^\d+$/)))); }, e.fn = u.prototype = { clone: function () { return e(this); }, format: function (t, a) { var o, r, s, i = this._value, u = t || l.defaultFormat; if (a = a || Math.round, 0 === i && null !== l.zeroFormat)
        r = l.zeroFormat;
    else if (null === i && null !== l.nullFormat)
        r = l.nullFormat;
    else {
        for (o in n)
            if (u.match(n[o].regexps.format)) {
                s = n[o].format;
                break;
            }
        r = (s = s || e._.numberToFormat)(i, u, a);
    } return r; }, value: function () { return this._value; }, input: function () { return this._input; }, set: function (e) { return this._value = Number(e), this; }, add: function (e) { var a = t.correctionFactor.call(null, this._value, e); return this._value = t.reduce([this._value, e], function (e, t, o, r) { return e + Math.round(a * t); }, 0) / a, this; }, subtract: function (e) { var a = t.correctionFactor.call(null, this._value, e); return this._value = t.reduce([e], function (e, t, o, r) { return e - Math.round(a * t); }, Math.round(this._value * a)) / a, this; }, multiply: function (e) { return this._value = t.reduce([this._value, e], function (e, a, o, r) { var n = t.correctionFactor(e, a); return Math.round(e * n) * Math.round(a * n) / Math.round(n * n); }, 1), this; }, divide: function (e) { return this._value = t.reduce([this._value, e], function (e, a, o, r) { var n = t.correctionFactor(e, a); return Math.round(e * n) / Math.round(a * n); }), this; }, difference: function (t) { return Math.abs(e(this._value).subtract(t).value()); } }, e.register("locale", "en", { delimiters: { thousands: ",", decimal: "." }, abbreviations: { thousand: "k", million: "m", billion: "b", trillion: "t" }, ordinal: function (e) { var t = e % 10; return 1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th"; }, currency: { symbol: "$" } }), e.register("format", "bps", { regexps: { format: /(BPS)/, unformat: /(BPS)/ }, format: function (t, a, o) { var r, n = e._.includes(a, " BPS") ? " " : ""; return t *= 1e4, a = a.replace(/\s?BPS/, ""), r = e._.numberToFormat(t, a, o), e._.includes(r, ")") ? ((r = r.split("")).splice(-1, 0, n + "BPS"), r = r.join("")) : r = r + n + "BPS", r; }, unformat: function (t) { return +(1e-4 * e._.stringToNumber(t)).toFixed(15); } }), r = "(" + (r = (a = { base: 1e3, suffixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] }).suffixes.concat((o = { base: 1024, suffixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"] }).suffixes.filter(function (e) { return a.suffixes.indexOf(e) < 0; })).join("|")).replace("B", "B(?!PS)") + ")", e.register("format", "bytes", { regexps: { format: /([0\s]i?b)/, unformat: new RegExp(r) }, format: function (t, r, n) { var s, i, l, u = e._.includes(r, "ib") ? o : a, d = e._.includes(r, " b") || e._.includes(r, " ib") ? " " : ""; for (r = r.replace(/\s?i?b/, ""), s = 0; s <= u.suffixes.length; s++)
        if (i = Math.pow(u.base, s), l = Math.pow(u.base, s + 1), null === t || 0 === t || t >= i && t < l) {
            d += u.suffixes[s], i > 0 && (t /= i);
            break;
        } return e._.numberToFormat(t, r, n) + d; }, unformat: function (t) { var r, n, s = e._.stringToNumber(t); if (s) {
        for (r = a.suffixes.length - 1; r >= 0; r--) {
            if (e._.includes(t, a.suffixes[r])) {
                n = Math.pow(a.base, r);
                break;
            }
            if (e._.includes(t, o.suffixes[r])) {
                n = Math.pow(o.base, r);
                break;
            }
        }
        s *= n || 1;
    } return s; } }), e.register("format", "currency", { regexps: { format: /(\$)/ }, format: function (t, a, o) { var r, n, s = e.locales[e.options.currentLocale], i = { before: a.match(/^([\+|\-|\(|\s|\$]*)/)[0], after: a.match(/([\+|\-|\)|\s|\$]*)$/)[0] }; for (a = a.replace(/\s?\$\s?/, ""), r = e._.numberToFormat(t, a, o), t >= 0 ? (i.before = i.before.replace(/[\-\(]/, ""), i.after = i.after.replace(/[\-\)]/, "")) : t < 0 && !e._.includes(i.before, "-") && !e._.includes(i.before, "(") && (i.before = "-" + i.before), n = 0; n < i.before.length; n++)
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
        } return r; } }), e.register("format", "exponential", { regexps: { format: /(e\+|e-)/, unformat: /(e\+|e-)/ }, format: function (t, a, o) { var r = ("number" != typeof t || e._.isNaN(t) ? "0e+0" : t.toExponential()).split("e"); return a = a.replace(/e[\+|\-]{1}0/, ""), e._.numberToFormat(Number(r[0]), a, o) + "e" + r[1]; }, unformat: function (t) { var a = e._.includes(t, "e+") ? t.split("e+") : t.split("e-"), o = Number(a[0]), r = Number(a[1]); return r = e._.includes(t, "e-") ? r *= -1 : r, e._.reduce([o, Math.pow(10, r)], function (t, a, o, r) { var n = e._.correctionFactor(t, a); return t * n * (a * n) / (n * n); }, 1); } }), e.register("format", "ordinal", { regexps: { format: /(o)/ }, format: function (t, a, o) { var r = e.locales[e.options.currentLocale], n = e._.includes(a, " o") ? " " : ""; return a = a.replace(/\s?o/, ""), n += r.ordinal(t), e._.numberToFormat(t, a, o) + n; } }), e.register("format", "percentage", { regexps: { format: /(%)/, unformat: /(%)/ }, format: function (t, a, o) { var r, n = e._.includes(a, " %") ? " " : ""; return e.options.scalePercentBy100 && (t *= 100), a = a.replace(/\s?\%/, ""), r = e._.numberToFormat(t, a, o), e._.includes(r, ")") ? ((r = r.split("")).splice(-1, 0, n + "%"), r = r.join("")) : r = r + n + "%", r; }, unformat: function (t) { var a = e._.stringToNumber(t); return e.options.scalePercentBy100 ? .01 * a : a; } }), e.register("format", "time", { regexps: { format: /(:)/, unformat: /(:)/ }, format: function (e, t, a) { var o = Math.floor(e / 60 / 60), r = Math.floor((e - 60 * o * 60) / 60), n = Math.round(e - 60 * o * 60 - 60 * r); return o + ":" + (r < 10 ? "0" + r : r) + ":" + (n < 10 ? "0" + n : n); }, unformat: function (e) { var t = e.split(":"), a = 0; return 3 === t.length ? (a += 60 * Number(t[0]) * 60, a += 60 * Number(t[1]), a += Number(t[2])) : 2 === t.length && (a += 60 * Number(t[0]), a += Number(t[1])), Number(a); } }), e; }, e.exports ? e.exports = a() : t.numeral = a(); });
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
function map(e, t) { var a, o = []; for (a = 0; a < e.length; ++a)
    o.push(t(e[a], a)); return o; }
function hasOwnProp(e, t) { return Object.prototype.hasOwnProperty.call(e, t); }
function extend(e, t) { for (var a in t)
    hasOwnProp(t, a) && (e[a] = t[a]); return hasOwnProp(t, "toString") && (e.toString = t.toString), hasOwnProp(t, "valueOf") && (e.valueOf = t.valueOf), e; }
function createUTC(e, t, a, o) { return createLocalOrUTC(e, t, a, o, !0).utc(); }
function defaultParsingFlags() { return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], meridiem: null, rfc2822: !1, weekdayMismatch: !1 }; }
function getParsingFlags(e) { return null == e._pf && (e._pf = defaultParsingFlags()), e._pf; }
function isValid(e) { if (null == e._isValid) {
    var t = getParsingFlags(e), a = some.call(t.parsedDateParts, function (e) { return null != e; }), o = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && a);
    if (e._strict && (o = o && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour), null != Object.isFrozen && Object.isFrozen(e))
        return o;
    e._isValid = o;
} return e._isValid; }
function createInvalid(e) { var t = createUTC(NaN); return null != e ? extend(getParsingFlags(t), e) : getParsingFlags(t).userInvalidated = !0, t; }
some = Array.prototype.some ? Array.prototype.some : function (e) { for (var t = Object(this), a = t.length >>> 0, o = 0; o < a; o++)
    if (o in t && e.call(this, t[o], o, t))
        return !0; return !1; };
var momentProperties = hooks.momentProperties = [];
function copyConfig(e, t) { var a, o, r; if (isUndefined(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), isUndefined(t._i) || (e._i = t._i), isUndefined(t._f) || (e._f = t._f), isUndefined(t._l) || (e._l = t._l), isUndefined(t._strict) || (e._strict = t._strict), isUndefined(t._tzm) || (e._tzm = t._tzm), isUndefined(t._isUTC) || (e._isUTC = t._isUTC), isUndefined(t._offset) || (e._offset = t._offset), isUndefined(t._pf) || (e._pf = getParsingFlags(t)), isUndefined(t._locale) || (e._locale = t._locale), momentProperties.length > 0)
    for (a = 0; a < momentProperties.length; a++)
        isUndefined(r = t[o = momentProperties[a]]) || (e[o] = r); return e; }
var updateInProgress = !1;
function Moment(e) { copyConfig(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === updateInProgress && (updateInProgress = !0, hooks.updateOffset(this), updateInProgress = !1); }
function isMoment(e) { return e instanceof Moment || null != e && null != e._isAMomentObject; }
function absFloor(e) { return e < 0 ? Math.ceil(e) || 0 : Math.floor(e); }
function toInt(e) { var t = +e, a = 0; return 0 !== t && isFinite(t) && (a = absFloor(t)), a; }
function compareArrays(e, t, a) { var o, r = Math.min(e.length, t.length), n = Math.abs(e.length - t.length), s = 0; for (o = 0; o < r; o++)
    (a && e[o] !== t[o] || !a && toInt(e[o]) !== toInt(t[o])) && s++; return s + n; }
function warn(e) { !1 === hooks.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e); }
function deprecate(e, t) { var a = !0; return extend(function () { if (null != hooks.deprecationHandler && hooks.deprecationHandler(null, e), a) {
    for (var o, r = [], n = 0; n < arguments.length; n++) {
        if (o = "", "object" == typeof arguments[n]) {
            for (var s in o += "\n[" + n + "] ", arguments[0])
                o += s + ": " + arguments[0][s] + ", ";
            o = o.slice(0, -2);
        }
        else
            o = arguments[n];
        r.push(o);
    }
    warn(e + "\nArguments: " + Array.prototype.slice.call(r).join("") + "\n" + (new Error).stack), a = !1;
} return t.apply(this, arguments); }, t); }
var keys, deprecations = {};
function deprecateSimple(e, t) { null != hooks.deprecationHandler && hooks.deprecationHandler(e, t), deprecations[e] || (warn(t), deprecations[e] = !0); }
function isFunction(e) { return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e); }
function set(e) { var t, a; for (a in e)
    isFunction(t = e[a]) ? this[a] = t : this["_" + a] = t; this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source); }
function mergeConfigs(e, t) { var a, o = extend({}, e); for (a in t)
    hasOwnProp(t, a) && (isObject(e[a]) && isObject(t[a]) ? (o[a] = {}, extend(o[a], e[a]), extend(o[a], t[a])) : null != t[a] ? o[a] = t[a] : delete o[a]); for (a in e)
    hasOwnProp(e, a) && !hasOwnProp(t, a) && isObject(e[a]) && (o[a] = extend({}, o[a])); return o; }
function Locale(e) { null != e && this.set(e); }
hooks.suppressDeprecationWarnings = !1, hooks.deprecationHandler = null, keys = Object.keys ? Object.keys : function (e) { var t, a = []; for (t in e)
    hasOwnProp(e, t) && a.push(t); return a; };
var defaultCalendar = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" };
function calendar(e, t, a) { var o = this._calendar[e] || this._calendar.sameElse; return isFunction(o) ? o.call(t, a) : o; }
var defaultLongDateFormat = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
function longDateFormat(e) { var t = this._longDateFormat[e], a = this._longDateFormat[e.toUpperCase()]; return t || !a ? t : (this._longDateFormat[e] = a.replace(/MMMM|MM|DD|dddd/g, function (e) { return e.slice(1); }), this._longDateFormat[e]); }
var defaultInvalidDate = "Invalid date";
function invalidDate() { return this._invalidDate; }
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(e) { return this._ordinal.replace("%d", e); }
var defaultRelativeTime = { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
function relativeTime(e, t, a, o) { var r = this._relativeTime[a]; return isFunction(r) ? r(e, t, a, o) : r.replace(/%d/i, e); }
function pastFuture(e, t) { var a = this._relativeTime[e > 0 ? "future" : "past"]; return isFunction(a) ? a(t) : a.replace(/%s/i, t); }
var aliases = {};
function addUnitAlias(e, t) { var a = e.toLowerCase(); aliases[a] = aliases[a + "s"] = aliases[t] = e; }
function normalizeUnits(e) { return "string" == typeof e ? aliases[e] || aliases[e.toLowerCase()] : void 0; }
function normalizeObjectUnits(e) { var t, a, o = {}; for (a in e)
    hasOwnProp(e, a) && (t = normalizeUnits(a)) && (o[t] = e[a]); return o; }
var priorities = {};
function addUnitPriority(e, t) { priorities[e] = t; }
function getPrioritizedUnits(e) { var t = []; for (var a in e)
    t.push({ unit: a, priority: priorities[a] }); return t.sort(function (e, t) { return e.priority - t.priority; }), t; }
function zeroFill(e, t, a) { var o = "" + Math.abs(e); return (e >= 0 ? a ? "+" : "" : "-") + Math.pow(10, Math.max(0, t - o.length)).toString().substr(1) + o; }
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(e, t, a, o) { var r = o; "string" == typeof o && (r = function () { return this[o](); }), e && (formatTokenFunctions[e] = r), t && (formatTokenFunctions[t[0]] = function () { return zeroFill(r.apply(this, arguments), t[1], t[2]); }), a && (formatTokenFunctions[a] = function () { return this.localeData().ordinal(r.apply(this, arguments), e); }); }
function removeFormattingTokens(e) { return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, ""); }
function makeFormatFunction(e) { var t, a, o = e.match(formattingTokens); for (t = 0, a = o.length; t < a; t++)
    o[t] = formatTokenFunctions[o[t]] ? formatTokenFunctions[o[t]] : removeFormattingTokens(o[t]); return function (t) { var r, n = ""; for (r = 0; r < a; r++)
    n += isFunction(o[r]) ? o[r].call(t, e) : o[r]; return n; }; }
function formatMoment(e, t) { return e.isValid() ? (t = expandFormat(t, e.localeData()), formatFunctions[t] = formatFunctions[t] || makeFormatFunction(t), formatFunctions[t](e)) : e.localeData().invalidDate(); }
function expandFormat(e, t) { var a = 5; function o(e) { return t.longDateFormat(e) || e; } for (localFormattingTokens.lastIndex = 0; a >= 0 && localFormattingTokens.test(e);)
    e = e.replace(localFormattingTokens, o), localFormattingTokens.lastIndex = 0, a -= 1; return e; }
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes = {};
function addRegexToken(e, t, a) { regexes[e] = isFunction(t) ? t : function (e, o) { return e && a ? a : t; }; }
function getParseRegexForToken(e, t) { return hasOwnProp(regexes, e) ? regexes[e](t._strict, t._locale) : new RegExp(unescapeFormat(e)); }
function unescapeFormat(e) { return regexEscape(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, a, o, r) { return t || a || o || r; })); }
function regexEscape(e) { return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); }
var tokens = {};
function addParseToken(e, t) { var a, o = t; for ("string" == typeof e && (e = [e]), isNumber(t) && (o = function (e, a) { a[t] = toInt(e); }), a = 0; a < e.length; a++)
    tokens[e[a]] = o; }
function addWeekParseToken(e, t) { addParseToken(e, function (e, a, o, r) { o._w = o._w || {}, t(e, o._w, o, r); }); }
function addTimeToArrayFromToken(e, t, a) { null != t && hasOwnProp(tokens, e) && tokens[e](t, a._a, a, e); }
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
function daysInYear(e) { return isLeapYear(e) ? 366 : 365; }
function isLeapYear(e) { return e % 4 == 0 && e % 100 != 0 || e % 400 == 0; }
addFormatToken("Y", 0, 0, function () { var e = this.year(); return e <= 9999 ? "" + e : "+" + e; }), addFormatToken(0, ["YY", 2], 0, function () { return this.year() % 100; }), addFormatToken(0, ["YYYY", 4], 0, "year"), addFormatToken(0, ["YYYYY", 5], 0, "year"), addFormatToken(0, ["YYYYYY", 6, !0], 0, "year"), addUnitAlias("year", "y"), addUnitPriority("year", 1), addRegexToken("Y", matchSigned), addRegexToken("YY", match1to2, match2), addRegexToken("YYYY", match1to4, match4), addRegexToken("YYYYY", match1to6, match6), addRegexToken("YYYYYY", match1to6, match6), addParseToken(["YYYYY", "YYYYYY"], YEAR), addParseToken("YYYY", function (e, t) { t[YEAR] = 2 === e.length ? hooks.parseTwoDigitYear(e) : toInt(e); }), addParseToken("YY", function (e, t) { t[YEAR] = hooks.parseTwoDigitYear(e); }), addParseToken("Y", function (e, t) { t[YEAR] = parseInt(e, 10); }), hooks.parseTwoDigitYear = function (e) { return toInt(e) + (toInt(e) > 68 ? 1900 : 2e3); };
var indexOf, getSetYear = makeGetSet("FullYear", !0);
function getIsLeapYear() { return isLeapYear(this.year()); }
function makeGetSet(e, t) { return function (a) { return null != a ? (set$1(this, e, a), hooks.updateOffset(this, t), this) : get(this, e); }; }
function get(e, t) { return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN; }
function set$1(e, t, a) { e.isValid() && !isNaN(a) && ("FullYear" === t && isLeapYear(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](a, e.month(), daysInMonth(a, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](a)); }
function stringGet(e) { return isFunction(this[e = normalizeUnits(e)]) ? this[e]() : this; }
function stringSet(e, t) { if ("object" == typeof e)
    for (var a = getPrioritizedUnits(e = normalizeObjectUnits(e)), o = 0; o < a.length; o++)
        this[a[o].unit](e[a[o].unit]);
else if (isFunction(this[e = normalizeUnits(e)]))
    return this[e](t); return this; }
function mod(e, t) { return (e % t + t) % t; }
function daysInMonth(e, t) { if (isNaN(e) || isNaN(t))
    return NaN; var a = mod(t, 12); return e += (t - a) / 12, 1 === a ? isLeapYear(e) ? 29 : 28 : 31 - a % 7 % 2; }
indexOf = Array.prototype.indexOf ? Array.prototype.indexOf : function (e) { var t; for (t = 0; t < this.length; ++t)
    if (this[t] === e)
        return t; return -1; }, addFormatToken("M", ["MM", 2], "Mo", function () { return this.month() + 1; }), addFormatToken("MMM", 0, 0, function (e) { return this.localeData().monthsShort(this, e); }), addFormatToken("MMMM", 0, 0, function (e) { return this.localeData().months(this, e); }), addUnitAlias("month", "M"), addUnitPriority("month", 8), addRegexToken("M", match1to2), addRegexToken("MM", match1to2, match2), addRegexToken("MMM", function (e, t) { return t.monthsShortRegex(e); }), addRegexToken("MMMM", function (e, t) { return t.monthsRegex(e); }), addParseToken(["M", "MM"], function (e, t) { t[MONTH] = toInt(e) - 1; }), addParseToken(["MMM", "MMMM"], function (e, t, a, o) { var r = a._locale.monthsParse(e, o, a._strict); null != r ? t[MONTH] = r : getParsingFlags(a).invalidMonth = e; });
var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
function localeMonths(e, t) { return e ? isArray(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(t) ? "format" : "standalone"][e.month()] : isArray(this._months) ? this._months : this._months.standalone; }
var defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
function localeMonthsShort(e, t) { return e ? isArray(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(t) ? "format" : "standalone"][e.month()] : isArray(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone; }
function handleStrictParse(e, t, a) { var o, r, n, s = e.toLocaleLowerCase(); if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], o = 0; o < 12; ++o)
        n = createUTC([2e3, o]), this._shortMonthsParse[o] = this.monthsShort(n, "").toLocaleLowerCase(), this._longMonthsParse[o] = this.months(n, "").toLocaleLowerCase(); return a ? "MMM" === t ? -1 !== (r = indexOf.call(this._shortMonthsParse, s)) ? r : null : -1 !== (r = indexOf.call(this._longMonthsParse, s)) ? r : null : "MMM" === t ? -1 !== (r = indexOf.call(this._shortMonthsParse, s)) ? r : -1 !== (r = indexOf.call(this._longMonthsParse, s)) ? r : null : -1 !== (r = indexOf.call(this._longMonthsParse, s)) ? r : -1 !== (r = indexOf.call(this._shortMonthsParse, s)) ? r : null; }
function localeMonthsParse(e, t, a) { var o, r, n; if (this._monthsParseExact)
    return handleStrictParse.call(this, e, t, a); for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), o = 0; o < 12; o++) {
    if (r = createUTC([2e3, o]), a && !this._longMonthsParse[o] && (this._longMonthsParse[o] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[o] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), a || this._monthsParse[o] || (n = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[o] = new RegExp(n.replace(".", ""), "i")), a && "MMMM" === t && this._longMonthsParse[o].test(e))
        return o;
    if (a && "MMM" === t && this._shortMonthsParse[o].test(e))
        return o;
    if (!a && this._monthsParse[o].test(e))
        return o;
} }
function setMonth(e, t) { var a; if (!e.isValid())
    return e; if ("string" == typeof t)
    if (/^\d+$/.test(t))
        t = toInt(t);
    else if (!isNumber(t = e.localeData().monthsParse(t)))
        return e; return a = Math.min(e.date(), daysInMonth(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, a), e; }
function getSetMonth(e) { return null != e ? (setMonth(this, e), hooks.updateOffset(this, !0), this) : get(this, "Month"); }
function getDaysInMonth() { return daysInMonth(this.year(), this.month()); }
var defaultMonthsShortRegex = matchWord;
function monthsShortRegex(e) { return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (hasOwnProp(this, "_monthsShortRegex") || (this._monthsShortRegex = defaultMonthsShortRegex), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex); }
var defaultMonthsRegex = matchWord;
function monthsRegex(e) { return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (hasOwnProp(this, "_monthsRegex") || (this._monthsRegex = defaultMonthsRegex), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex); }
function computeMonthsParse() { function e(e, t) { return t.length - e.length; } var t, a, o = [], r = [], n = []; for (t = 0; t < 12; t++)
    a = createUTC([2e3, t]), o.push(this.monthsShort(a, "")), r.push(this.months(a, "")), n.push(this.months(a, "")), n.push(this.monthsShort(a, "")); for (o.sort(e), r.sort(e), n.sort(e), t = 0; t < 12; t++)
    o[t] = regexEscape(o[t]), r[t] = regexEscape(r[t]); for (t = 0; t < 24; t++)
    n[t] = regexEscape(n[t]); this._monthsRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i"); }
function createDate(e, t, a, o, r, n, s) { var i; return e < 100 && e >= 0 ? (i = new Date(e + 400, t, a, o, r, n, s), isFinite(i.getFullYear()) && i.setFullYear(e)) : i = new Date(e, t, a, o, r, n, s), i; }
function createUTCDate(e) { var t; if (e < 100 && e >= 0) {
    var a = Array.prototype.slice.call(arguments);
    a[0] = e + 400, t = new Date(Date.UTC.apply(null, a)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e);
}
else
    t = new Date(Date.UTC.apply(null, arguments)); return t; }
function firstWeekOffset(e, t, a) { var o = 7 + t - a; return -(7 + createUTCDate(e, 0, o).getUTCDay() - t) % 7 + o - 1; }
function dayOfYearFromWeeks(e, t, a, o, r) { var n, s, i = 1 + 7 * (t - 1) + (7 + a - o) % 7 + firstWeekOffset(e, o, r); return i <= 0 ? s = daysInYear(n = e - 1) + i : i > daysInYear(e) ? (n = e + 1, s = i - daysInYear(e)) : (n = e, s = i), { year: n, dayOfYear: s }; }
function weekOfYear(e, t, a) { var o, r, n = firstWeekOffset(e.year(), t, a), s = Math.floor((e.dayOfYear() - n - 1) / 7) + 1; return s < 1 ? o = s + weeksInYear(r = e.year() - 1, t, a) : s > weeksInYear(e.year(), t, a) ? (o = s - weeksInYear(e.year(), t, a), r = e.year() + 1) : (r = e.year(), o = s), { week: o, year: r }; }
function weeksInYear(e, t, a) { var o = firstWeekOffset(e, t, a), r = firstWeekOffset(e + 1, t, a); return (daysInYear(e) - o + r) / 7; }
function localeWeek(e) { return weekOfYear(e, this._week.dow, this._week.doy).week; }
addFormatToken("w", ["ww", 2], "wo", "week"), addFormatToken("W", ["WW", 2], "Wo", "isoWeek"), addUnitAlias("week", "w"), addUnitAlias("isoWeek", "W"), addUnitPriority("week", 5), addUnitPriority("isoWeek", 5), addRegexToken("w", match1to2), addRegexToken("ww", match1to2, match2), addRegexToken("W", match1to2), addRegexToken("WW", match1to2, match2), addWeekParseToken(["w", "ww", "W", "WW"], function (e, t, a, o) { t[o.substr(0, 1)] = toInt(e); });
var defaultLocaleWeek = { dow: 0, doy: 6 };
function localeFirstDayOfWeek() { return this._week.dow; }
function localeFirstDayOfYear() { return this._week.doy; }
function getSetWeek(e) { var t = this.localeData().week(this); return null == e ? t : this.add(7 * (e - t), "d"); }
function getSetISOWeek(e) { var t = weekOfYear(this, 1, 4).week; return null == e ? t : this.add(7 * (e - t), "d"); }
function parseWeekday(e, t) { return "string" != typeof e ? e : isNaN(e) ? "number" == typeof (e = t.weekdaysParse(e)) ? e : null : parseInt(e, 10); }
function parseIsoWeekday(e, t) { return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e; }
function shiftWeekdays(e, t) { return e.slice(t, 7).concat(e.slice(0, t)); }
addFormatToken("d", 0, "do", "day"), addFormatToken("dd", 0, 0, function (e) { return this.localeData().weekdaysMin(this, e); }), addFormatToken("ddd", 0, 0, function (e) { return this.localeData().weekdaysShort(this, e); }), addFormatToken("dddd", 0, 0, function (e) { return this.localeData().weekdays(this, e); }), addFormatToken("e", 0, 0, "weekday"), addFormatToken("E", 0, 0, "isoWeekday"), addUnitAlias("day", "d"), addUnitAlias("weekday", "e"), addUnitAlias("isoWeekday", "E"), addUnitPriority("day", 11), addUnitPriority("weekday", 11), addUnitPriority("isoWeekday", 11), addRegexToken("d", match1to2), addRegexToken("e", match1to2), addRegexToken("E", match1to2), addRegexToken("dd", function (e, t) { return t.weekdaysMinRegex(e); }), addRegexToken("ddd", function (e, t) { return t.weekdaysShortRegex(e); }), addRegexToken("dddd", function (e, t) { return t.weekdaysRegex(e); }), addWeekParseToken(["dd", "ddd", "dddd"], function (e, t, a, o) { var r = a._locale.weekdaysParse(e, o, a._strict); null != r ? t.d = r : getParsingFlags(a).invalidWeekday = e; }), addWeekParseToken(["d", "e", "E"], function (e, t, a, o) { t[o] = toInt(e); });
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
function localeWeekdays(e, t) { var a = isArray(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(t) ? "format" : "standalone"]; return !0 === e ? shiftWeekdays(a, this._week.dow) : e ? a[e.day()] : a; }
var defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
function localeWeekdaysShort(e) { return !0 === e ? shiftWeekdays(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort; }
var defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
function localeWeekdaysMin(e) { return !0 === e ? shiftWeekdays(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin; }
function handleStrictParse$1(e, t, a) { var o, r, n, s = e.toLocaleLowerCase(); if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], o = 0; o < 7; ++o)
        n = createUTC([2e3, 1]).day(o), this._minWeekdaysParse[o] = this.weekdaysMin(n, "").toLocaleLowerCase(), this._shortWeekdaysParse[o] = this.weekdaysShort(n, "").toLocaleLowerCase(), this._weekdaysParse[o] = this.weekdays(n, "").toLocaleLowerCase(); return a ? "dddd" === t ? -1 !== (r = indexOf.call(this._weekdaysParse, s)) ? r : null : "ddd" === t ? -1 !== (r = indexOf.call(this._shortWeekdaysParse, s)) ? r : null : -1 !== (r = indexOf.call(this._minWeekdaysParse, s)) ? r : null : "dddd" === t ? -1 !== (r = indexOf.call(this._weekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._shortWeekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._minWeekdaysParse, s)) ? r : null : "ddd" === t ? -1 !== (r = indexOf.call(this._shortWeekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._weekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._minWeekdaysParse, s)) ? r : null : -1 !== (r = indexOf.call(this._minWeekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._weekdaysParse, s)) ? r : -1 !== (r = indexOf.call(this._shortWeekdaysParse, s)) ? r : null; }
function localeWeekdaysParse(e, t, a) { var o, r, n; if (this._weekdaysParseExact)
    return handleStrictParse$1.call(this, e, t, a); for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), o = 0; o < 7; o++) {
    if (r = createUTC([2e3, 1]).day(o), a && !this._fullWeekdaysParse[o] && (this._fullWeekdaysParse[o] = new RegExp("^" + this.weekdays(r, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[o] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[o] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[o] || (n = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[o] = new RegExp(n.replace(".", ""), "i")), a && "dddd" === t && this._fullWeekdaysParse[o].test(e))
        return o;
    if (a && "ddd" === t && this._shortWeekdaysParse[o].test(e))
        return o;
    if (a && "dd" === t && this._minWeekdaysParse[o].test(e))
        return o;
    if (!a && this._weekdaysParse[o].test(e))
        return o;
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
function computeWeekdaysParse() { function e(e, t) { return t.length - e.length; } var t, a, o, r, n, s = [], i = [], l = [], u = []; for (t = 0; t < 7; t++)
    a = createUTC([2e3, 1]).day(t), o = this.weekdaysMin(a, ""), r = this.weekdaysShort(a, ""), n = this.weekdays(a, ""), s.push(o), i.push(r), l.push(n), u.push(o), u.push(r), u.push(n); for (s.sort(e), i.sort(e), l.sort(e), u.sort(e), t = 0; t < 7; t++)
    i[t] = regexEscape(i[t]), l[t] = regexEscape(l[t]), u[t] = regexEscape(u[t]); this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"); }
function hFormat() { return this.hours() % 12 || 12; }
function kFormat() { return this.hours() || 24; }
function meridiem(e, t) { addFormatToken(e, 0, 0, function () { return this.localeData().meridiem(this.hours(), this.minutes(), t); }); }
function matchMeridiem(e, t) { return t._meridiemParse; }
function localeIsPM(e) { return "p" === (e + "").toLowerCase().charAt(0); }
addFormatToken("H", ["HH", 2], 0, "hour"), addFormatToken("h", ["hh", 2], 0, hFormat), addFormatToken("k", ["kk", 2], 0, kFormat), addFormatToken("hmm", 0, 0, function () { return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2); }), addFormatToken("hmmss", 0, 0, function () { return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2); }), addFormatToken("Hmm", 0, 0, function () { return "" + this.hours() + zeroFill(this.minutes(), 2); }), addFormatToken("Hmmss", 0, 0, function () { return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2); }), meridiem("a", !0), meridiem("A", !1), addUnitAlias("hour", "h"), addUnitPriority("hour", 13), addRegexToken("a", matchMeridiem), addRegexToken("A", matchMeridiem), addRegexToken("H", match1to2), addRegexToken("h", match1to2), addRegexToken("k", match1to2), addRegexToken("HH", match1to2, match2), addRegexToken("hh", match1to2, match2), addRegexToken("kk", match1to2, match2), addRegexToken("hmm", match3to4), addRegexToken("hmmss", match5to6), addRegexToken("Hmm", match3to4), addRegexToken("Hmmss", match5to6), addParseToken(["H", "HH"], HOUR), addParseToken(["k", "kk"], function (e, t, a) { var o = toInt(e); t[HOUR] = 24 === o ? 0 : o; }), addParseToken(["a", "A"], function (e, t, a) { a._isPm = a._locale.isPM(e), a._meridiem = e; }), addParseToken(["h", "hh"], function (e, t, a) { t[HOUR] = toInt(e), getParsingFlags(a).bigHour = !0; }), addParseToken("hmm", function (e, t, a) { var o = e.length - 2; t[HOUR] = toInt(e.substr(0, o)), t[MINUTE] = toInt(e.substr(o)), getParsingFlags(a).bigHour = !0; }), addParseToken("hmmss", function (e, t, a) { var o = e.length - 4, r = e.length - 2; t[HOUR] = toInt(e.substr(0, o)), t[MINUTE] = toInt(e.substr(o, 2)), t[SECOND] = toInt(e.substr(r)), getParsingFlags(a).bigHour = !0; }), addParseToken("Hmm", function (e, t, a) { var o = e.length - 2; t[HOUR] = toInt(e.substr(0, o)), t[MINUTE] = toInt(e.substr(o)); }), addParseToken("Hmmss", function (e, t, a) { var o = e.length - 4, r = e.length - 2; t[HOUR] = toInt(e.substr(0, o)), t[MINUTE] = toInt(e.substr(o, 2)), t[SECOND] = toInt(e.substr(r)); });
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem(e, t, a) { return e > 11 ? a ? "pm" : "PM" : a ? "am" : "AM"; }
var globalLocale, getSetHour = makeGetSet("Hours", !0), baseConfig = { calendar: defaultCalendar, longDateFormat: defaultLongDateFormat, invalidDate: defaultInvalidDate, ordinal: defaultOrdinal, dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse, relativeTime: defaultRelativeTime, months: defaultLocaleMonths, monthsShort: defaultLocaleMonthsShort, week: defaultLocaleWeek, weekdays: defaultLocaleWeekdays, weekdaysMin: defaultLocaleWeekdaysMin, weekdaysShort: defaultLocaleWeekdaysShort, meridiemParse: defaultLocaleMeridiemParse }, locales = {}, localeFamilies = {};
function normalizeLocale(e) { return e ? e.toLowerCase().replace("_", "-") : e; }
function chooseLocale(e) { for (var t, a, o, r, n = 0; n < e.length;) {
    for (t = (r = normalizeLocale(e[n]).split("-")).length, a = (a = normalizeLocale(e[n + 1])) ? a.split("-") : null; t > 0;) {
        if (o = loadLocale(r.slice(0, t).join("-")))
            return o;
        if (a && a.length >= t && compareArrays(r, a, !0) >= t - 1)
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
function getSetGlobalLocale(e, t) { var a; return e && ((a = isUndefined(t) ? getLocale(e) : defineLocale(e, t)) ? globalLocale = a : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), globalLocale._abbr; }
function defineLocale(e, t) { if (null !== t) {
    var a, o = baseConfig;
    if (t.abbr = e, null != locales[e])
        deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), o = locales[e]._config;
    else if (null != t.parentLocale)
        if (null != locales[t.parentLocale])
            o = locales[t.parentLocale]._config;
        else {
            if (null == (a = loadLocale(t.parentLocale)))
                return localeFamilies[t.parentLocale] || (localeFamilies[t.parentLocale] = []), localeFamilies[t.parentLocale].push({ name: e, config: t }), null;
            o = a._config;
        }
    return locales[e] = new Locale(mergeConfigs(o, t)), localeFamilies[e] && localeFamilies[e].forEach(function (e) { defineLocale(e.name, e.config); }), getSetGlobalLocale(e), locales[e];
} return delete locales[e], null; }
function updateLocale(e, t) { if (null != t) {
    var a, o, r = baseConfig;
    null != (o = loadLocale(e)) && (r = o._config), (a = new Locale(t = mergeConfigs(r, t))).parentLocale = locales[e], locales[e] = a, getSetGlobalLocale(e);
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
function checkOverflow(e) { var t, a = e._a; return a && -2 === getParsingFlags(e).overflow && (t = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || 24 === a[HOUR] && (0 !== a[MINUTE] || 0 !== a[SECOND] || 0 !== a[MILLISECOND]) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1, getParsingFlags(e)._overflowDayOfYear && (t < YEAR || t > DATE) && (t = DATE), getParsingFlags(e)._overflowWeeks && -1 === t && (t = WEEK), getParsingFlags(e)._overflowWeekday && -1 === t && (t = WEEKDAY), getParsingFlags(e).overflow = t), e; }
function defaults(e, t, a) { return null != e ? e : null != t ? t : a; }
function currentDateArray(e) { var t = new Date(hooks.now()); return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]; }
function configFromArray(e) { var t, a, o, r, n, s = []; if (!e._d) {
    for (o = currentDateArray(e), e._w && null == e._a[DATE] && null == e._a[MONTH] && dayOfYearFromWeekInfo(e), null != e._dayOfYear && (n = defaults(e._a[YEAR], o[YEAR]), (e._dayOfYear > daysInYear(n) || 0 === e._dayOfYear) && (getParsingFlags(e)._overflowDayOfYear = !0), a = createUTCDate(n, 0, e._dayOfYear), e._a[MONTH] = a.getUTCMonth(), e._a[DATE] = a.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t)
        e._a[t] = s[t] = o[t];
    for (; t < 7; t++)
        e._a[t] = s[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
    24 === e._a[HOUR] && 0 === e._a[MINUTE] && 0 === e._a[SECOND] && 0 === e._a[MILLISECOND] && (e._nextDay = !0, e._a[HOUR] = 0), e._d = (e._useUTC ? createUTCDate : createDate).apply(null, s), r = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[HOUR] = 24), e._w && void 0 !== e._w.d && e._w.d !== r && (getParsingFlags(e).weekdayMismatch = !0);
} }
function dayOfYearFromWeekInfo(e) { var t, a, o, r, n, s, i, l; if (null != (t = e._w).GG || null != t.W || null != t.E)
    n = 1, s = 4, a = defaults(t.GG, e._a[YEAR], weekOfYear(createLocal(), 1, 4).year), o = defaults(t.W, 1), ((r = defaults(t.E, 1)) < 1 || r > 7) && (l = !0);
else {
    n = e._locale._week.dow, s = e._locale._week.doy;
    var u = weekOfYear(createLocal(), n, s);
    a = defaults(t.gg, e._a[YEAR], u.year), o = defaults(t.w, u.week), null != t.d ? ((r = t.d) < 0 || r > 6) && (l = !0) : null != t.e ? (r = t.e + n, (t.e < 0 || t.e > 6) && (l = !0)) : r = n;
} o < 1 || o > weeksInYear(a, n, s) ? getParsingFlags(e)._overflowWeeks = !0 : null != l ? getParsingFlags(e)._overflowWeekday = !0 : (i = dayOfYearFromWeeks(a, o, r, n, s), e._a[YEAR] = i.year, e._dayOfYear = i.dayOfYear); }
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]], isoTimes = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
function configFromISO(e) { var t, a, o, r, n, s, i = e._i, l = extendedIsoRegex.exec(i) || basicIsoRegex.exec(i); if (l) {
    for (getParsingFlags(e).iso = !0, t = 0, a = isoDates.length; t < a; t++)
        if (isoDates[t][1].exec(l[1])) {
            r = isoDates[t][0], o = !1 !== isoDates[t][2];
            break;
        }
    if (null == r)
        return void (e._isValid = !1);
    if (l[3]) {
        for (t = 0, a = isoTimes.length; t < a; t++)
            if (isoTimes[t][1].exec(l[3])) {
                n = (l[2] || " ") + isoTimes[t][0];
                break;
            }
        if (null == n)
            return void (e._isValid = !1);
    }
    if (!o && null != n)
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
function extractFromRFC2822Strings(e, t, a, o, r, n) { var s = [untruncateYear(e), defaultLocaleMonthsShort.indexOf(t), parseInt(a, 10), parseInt(o, 10), parseInt(r, 10)]; return n && s.push(parseInt(n, 10)), s; }
function untruncateYear(e) { var t = parseInt(e, 10); return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t; }
function preprocessRFC2822(e) { return e.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""); }
function checkWeekday(e, t, a) { return !e || defaultLocaleWeekdaysShort.indexOf(e) === new Date(t[0], t[1], t[2]).getDay() || (getParsingFlags(a).weekdayMismatch = !0, a._isValid = !1, !1); }
var obsOffsets = { UT: 0, GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };
function calculateOffset(e, t, a) { if (e)
    return obsOffsets[e]; if (t)
    return 0; var o = parseInt(a, 10), r = o % 100; return (o - r) / 100 * 60 + r; }
function configFromRFC2822(e) { var t = rfc2822.exec(preprocessRFC2822(e._i)); if (t) {
    var a = extractFromRFC2822Strings(t[4], t[3], t[2], t[5], t[6], t[7]);
    if (!checkWeekday(t[1], a, e))
        return;
    e._a = a, e._tzm = calculateOffset(t[8], t[9], t[10]), e._d = createUTCDate.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), getParsingFlags(e).rfc2822 = !0;
}
else
    e._isValid = !1; }
function configFromString(e) { var t = aspNetJsonRegex.exec(e._i); null === t ? (configFromISO(e), !1 === e._isValid && (delete e._isValid, configFromRFC2822(e), !1 === e._isValid && (delete e._isValid, hooks.createFromInputFallback(e)))) : e._d = new Date(+t[1]); }
function configFromStringAndFormat(e) { if (e._f !== hooks.ISO_8601)
    if (e._f !== hooks.RFC_2822) {
        e._a = [], getParsingFlags(e).empty = !0;
        var t, a, o, r, n, s = "" + e._i, i = s.length, l = 0;
        for (o = expandFormat(e._f, e._locale).match(formattingTokens) || [], t = 0; t < o.length; t++)
            (a = (s.match(getParseRegexForToken(r = o[t], e)) || [])[0]) && ((n = s.substr(0, s.indexOf(a))).length > 0 && getParsingFlags(e).unusedInput.push(n), s = s.slice(s.indexOf(a) + a.length), l += a.length), formatTokenFunctions[r] ? (a ? getParsingFlags(e).empty = !1 : getParsingFlags(e).unusedTokens.push(r), addTimeToArrayFromToken(r, a, e)) : e._strict && !a && getParsingFlags(e).unusedTokens.push(r);
        getParsingFlags(e).charsLeftOver = i - l, s.length > 0 && getParsingFlags(e).unusedInput.push(s), e._a[HOUR] <= 12 && !0 === getParsingFlags(e).bigHour && e._a[HOUR] > 0 && (getParsingFlags(e).bigHour = void 0), getParsingFlags(e).parsedDateParts = e._a.slice(0), getParsingFlags(e).meridiem = e._meridiem, e._a[HOUR] = meridiemFixWrap(e._locale, e._a[HOUR], e._meridiem), configFromArray(e), checkOverflow(e);
    }
    else
        configFromRFC2822(e);
else
    configFromISO(e); }
function meridiemFixWrap(e, t, a) { var o; return null == a ? t : null != e.meridiemHour ? e.meridiemHour(t, a) : null != e.isPM ? ((o = e.isPM(a)) && t < 12 && (t += 12), o || 12 !== t || (t = 0), t) : t; }
function configFromStringAndArray(e) { var t, a, o, r, n; if (0 === e._f.length)
    return getParsingFlags(e).invalidFormat = !0, void (e._d = new Date(NaN)); for (r = 0; r < e._f.length; r++)
    n = 0, t = copyConfig({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[r], configFromStringAndFormat(t), isValid(t) && (n += getParsingFlags(t).charsLeftOver, n += 10 * getParsingFlags(t).unusedTokens.length, getParsingFlags(t).score = n, (null == o || n < o) && (o = n, a = t)); extend(e, a || t); }
function configFromObject(e) { if (!e._d) {
    var t = normalizeObjectUnits(e._i);
    e._a = map([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function (e) { return e && parseInt(e, 10); }), configFromArray(e);
} }
function createFromConfig(e) { var t = new Moment(checkOverflow(prepareConfig(e))); return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t; }
function prepareConfig(e) { var t = e._i, a = e._f; return e._locale = e._locale || getLocale(e._l), null === t || void 0 === a && "" === t ? createInvalid({ nullInput: !0 }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)), isMoment(t) ? new Moment(checkOverflow(t)) : (isDate(t) ? e._d = t : isArray(a) ? configFromStringAndArray(e) : a ? configFromStringAndFormat(e) : configFromInput(e), isValid(e) || (e._d = null), e)); }
function configFromInput(e) { var t = e._i; isUndefined(t) ? e._d = new Date(hooks.now()) : isDate(t) ? e._d = new Date(t.valueOf()) : "string" == typeof t ? configFromString(e) : isArray(t) ? (e._a = map(t.slice(0), function (e) { return parseInt(e, 10); }), configFromArray(e)) : isObject(t) ? configFromObject(e) : isNumber(t) ? e._d = new Date(t) : hooks.createFromInputFallback(e); }
function createLocalOrUTC(e, t, a, o, r) { var n = {}; return !0 !== a && !1 !== a || (o = a, a = void 0), (isObject(e) && isObjectEmpty(e) || isArray(e) && 0 === e.length) && (e = void 0), n._isAMomentObject = !0, n._useUTC = n._isUTC = r, n._l = a, n._i = e, n._f = t, n._strict = o, createFromConfig(n); }
function createLocal(e, t, a, o) { return createLocalOrUTC(e, t, a, o, !1); }
hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (e) { e._d = new Date(e._i + (e._useUTC ? " UTC" : "")); }), hooks.ISO_8601 = function () { }, hooks.RFC_2822 = function () { };
var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var e = createLocal.apply(null, arguments); return this.isValid() && e.isValid() ? e < this ? this : e : createInvalid(); }), prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var e = createLocal.apply(null, arguments); return this.isValid() && e.isValid() ? e > this ? this : e : createInvalid(); });
function pickBy(e, t) { var a, o; if (1 === t.length && isArray(t[0]) && (t = t[0]), !t.length)
    return createLocal(); for (a = t[0], o = 1; o < t.length; ++o)
    t[o].isValid() && !t[o][e](a) || (a = t[o]); return a; }
function min() { return pickBy("isBefore", [].slice.call(arguments, 0)); }
function max() { return pickBy("isAfter", [].slice.call(arguments, 0)); }
var now = function () { return Date.now ? Date.now() : +new Date; }, ordering = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
function isDurationValid(e) { for (var t in e)
    if (-1 === indexOf.call(ordering, t) || null != e[t] && isNaN(e[t]))
        return !1; for (var a = !1, o = 0; o < ordering.length; ++o)
    if (e[ordering[o]]) {
        if (a)
            return !1;
        parseFloat(e[ordering[o]]) !== toInt(e[ordering[o]]) && (a = !0);
    } return !0; }
function isValid$1() { return this._isValid; }
function createInvalid$1() { return createDuration(NaN); }
function Duration(e) { var t = normalizeObjectUnits(e), a = t.year || 0, o = t.quarter || 0, r = t.month || 0, n = t.week || t.isoWeek || 0, s = t.day || 0, i = t.hour || 0, l = t.minute || 0, u = t.second || 0, d = t.millisecond || 0; this._isValid = isDurationValid(t), this._milliseconds = +d + 1e3 * u + 6e4 * l + 1e3 * i * 60 * 60, this._days = +s + 7 * n, this._months = +r + 3 * o + 12 * a, this._data = {}, this._locale = getLocale(), this._bubble(); }
function isDuration(e) { return e instanceof Duration; }
function absRound(e) { return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e); }
function offset(e, t) { addFormatToken(e, 0, 0, function () { var e = this.utcOffset(), a = "+"; return e < 0 && (e = -e, a = "-"), a + zeroFill(~~(e / 60), 2) + t + zeroFill(~~e % 60, 2); }); }
offset("Z", ":"), offset("ZZ", ""), addRegexToken("Z", matchShortOffset), addRegexToken("ZZ", matchShortOffset), addParseToken(["Z", "ZZ"], function (e, t, a) { a._useUTC = !0, a._tzm = offsetFromString(matchShortOffset, e); });
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(e, t) { var a = (t || "").match(e); if (null === a)
    return null; var o = ((a[a.length - 1] || []) + "").match(chunkOffset) || ["-", 0, 0], r = 60 * o[1] + toInt(o[2]); return 0 === r ? 0 : "+" === o[0] ? r : -r; }
function cloneWithOffset(e, t) { var a, o; return t._isUTC ? (a = t.clone(), o = (isMoment(e) || isDate(e) ? e.valueOf() : createLocal(e).valueOf()) - a.valueOf(), a._d.setTime(a._d.valueOf() + o), hooks.updateOffset(a, !1), a) : createLocal(e).local(); }
function getDateOffset(e) { return 15 * -Math.round(e._d.getTimezoneOffset() / 15); }
function getSetOffset(e, t, a) { var o, r = this._offset || 0; if (!this.isValid())
    return null != e ? this : NaN; if (null != e) {
    if ("string" == typeof e) {
        if (null === (e = offsetFromString(matchShortOffset, e)))
            return this;
    }
    else
        Math.abs(e) < 16 && !a && (e *= 60);
    return !this._isUTC && t && (o = getDateOffset(this)), this._offset = e, this._isUTC = !0, null != o && this.add(o, "m"), r !== e && (!t || this._changeInProgress ? addSubtract(this, createDuration(e - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, hooks.updateOffset(this, !0), this._changeInProgress = null)), this;
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
function createDuration(e, t) { var a, o, r, n = e, s = null; return isDuration(e) ? n = { ms: e._milliseconds, d: e._days, M: e._months } : isNumber(e) ? (n = {}, t ? n[t] = e : n.milliseconds = e) : (s = aspNetRegex.exec(e)) ? (a = "-" === s[1] ? -1 : 1, n = { y: 0, d: toInt(s[DATE]) * a, h: toInt(s[HOUR]) * a, m: toInt(s[MINUTE]) * a, s: toInt(s[SECOND]) * a, ms: toInt(absRound(1e3 * s[MILLISECOND])) * a }) : (s = isoRegex.exec(e)) ? n = { y: parseIso(s[2], a = "-" === s[1] ? -1 : 1), M: parseIso(s[3], a), w: parseIso(s[4], a), d: parseIso(s[5], a), h: parseIso(s[6], a), m: parseIso(s[7], a), s: parseIso(s[8], a) } : null == n ? n = {} : "object" == typeof n && ("from" in n || "to" in n) && (r = momentsDifference(createLocal(n.from), createLocal(n.to)), (n = {}).ms = r.milliseconds, n.M = r.months), o = new Duration(n), isDuration(e) && hasOwnProp(e, "_locale") && (o._locale = e._locale), o; }
function parseIso(e, t) { var a = e && parseFloat(e.replace(",", ".")); return (isNaN(a) ? 0 : a) * t; }
function positiveMomentsDifference(e, t) { var a = {}; return a.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(a.months, "M").isAfter(t) && --a.months, a.milliseconds = +t - +e.clone().add(a.months, "M"), a; }
function momentsDifference(e, t) { var a; return e.isValid() && t.isValid() ? (t = cloneWithOffset(t, e), e.isBefore(t) ? a = positiveMomentsDifference(e, t) : ((a = positiveMomentsDifference(t, e)).milliseconds = -a.milliseconds, a.months = -a.months), a) : { milliseconds: 0, months: 0 }; }
function createAdder(e, t) { return function (a, o) { var r; return null === o || isNaN(+o) || (deprecateSimple(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), r = a, a = o, o = r), addSubtract(this, createDuration(a = "string" == typeof a ? +a : a, o), e), this; }; }
function addSubtract(e, t, a, o) { var r = t._milliseconds, n = absRound(t._days), s = absRound(t._months); e.isValid() && (o = null == o || o, s && setMonth(e, get(e, "Month") + s * a), n && set$1(e, "Date", get(e, "Date") + n * a), r && e._d.setTime(e._d.valueOf() + r * a), o && hooks.updateOffset(e, n || s)); }
createDuration.fn = Duration.prototype, createDuration.invalid = createInvalid$1;
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function getCalendarFormat(e, t) { var a = e.diff(t, "days", !0); return a < -6 ? "sameElse" : a < -1 ? "lastWeek" : a < 0 ? "lastDay" : a < 1 ? "sameDay" : a < 2 ? "nextDay" : a < 7 ? "nextWeek" : "sameElse"; }
function calendar$1(e, t) { var a = e || createLocal(), o = cloneWithOffset(a, this).startOf("day"), r = hooks.calendarFormat(this, o) || "sameElse", n = t && (isFunction(t[r]) ? t[r].call(this, a) : t[r]); return this.format(n || this.localeData().calendar(r, this, createLocal(a))); }
function clone() { return new Moment(this); }
function isAfter(e, t) { var a = isMoment(e) ? e : createLocal(e); return !(!this.isValid() || !a.isValid()) && ("millisecond" === (t = normalizeUnits(t) || "millisecond") ? this.valueOf() > a.valueOf() : a.valueOf() < this.clone().startOf(t).valueOf()); }
function isBefore(e, t) { var a = isMoment(e) ? e : createLocal(e); return !(!this.isValid() || !a.isValid()) && ("millisecond" === (t = normalizeUnits(t) || "millisecond") ? this.valueOf() < a.valueOf() : this.clone().endOf(t).valueOf() < a.valueOf()); }
function isBetween(e, t, a, o) { var r = isMoment(e) ? e : createLocal(e), n = isMoment(t) ? t : createLocal(t); return !!(this.isValid() && r.isValid() && n.isValid()) && ("(" === (o = o || "()")[0] ? this.isAfter(r, a) : !this.isBefore(r, a)) && (")" === o[1] ? this.isBefore(n, a) : !this.isAfter(n, a)); }
function isSame(e, t) { var a, o = isMoment(e) ? e : createLocal(e); return !(!this.isValid() || !o.isValid()) && ("millisecond" === (t = normalizeUnits(t) || "millisecond") ? this.valueOf() === o.valueOf() : (a = o.valueOf(), this.clone().startOf(t).valueOf() <= a && a <= this.clone().endOf(t).valueOf())); }
function isSameOrAfter(e, t) { return this.isSame(e, t) || this.isAfter(e, t); }
function isSameOrBefore(e, t) { return this.isSame(e, t) || this.isBefore(e, t); }
function diff(e, t, a) { var o, r, n; if (!this.isValid())
    return NaN; if (!(o = cloneWithOffset(e, this)).isValid())
    return NaN; switch (r = 6e4 * (o.utcOffset() - this.utcOffset()), t = normalizeUnits(t)) {
    case "year":
        n = monthDiff(this, o) / 12;
        break;
    case "month":
        n = monthDiff(this, o);
        break;
    case "quarter":
        n = monthDiff(this, o) / 3;
        break;
    case "second":
        n = (this - o) / 1e3;
        break;
    case "minute":
        n = (this - o) / 6e4;
        break;
    case "hour":
        n = (this - o) / 36e5;
        break;
    case "day":
        n = (this - o - r) / 864e5;
        break;
    case "week":
        n = (this - o - r) / 6048e5;
        break;
    default: n = this - o;
} return a ? n : absFloor(n); }
function monthDiff(e, t) { var a = 12 * (t.year() - e.year()) + (t.month() - e.month()), o = e.clone().add(a, "months"); return -(a + (t - o < 0 ? (t - o) / (o - e.clone().add(a - 1, "months")) : (t - o) / (e.clone().add(a + 1, "months") - o))) || 0; }
function toString() { return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"); }
function toISOString(e) { if (!this.isValid())
    return null; var t = !0 !== e, a = t ? this.clone().utc() : this; return a.year() < 0 || a.year() > 9999 ? formatMoment(a, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : isFunction(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", formatMoment(a, "Z")) : formatMoment(a, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"); }
function inspect() { if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)"; var e = "moment", t = ""; this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z"); var a = "[" + e + '("]', o = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"; return this.format(a + o + "-MM-DD[T]HH:mm:ss.SSS" + t + '[")]'); }
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
function localStartOfDate(e, t, a) { return e < 100 && e >= 0 ? new Date(e + 400, t, a) - MS_PER_400_YEARS : new Date(e, t, a).valueOf(); }
function utcStartOfDate(e, t, a) { return e < 100 && e >= 0 ? Date.UTC(e + 400, t, a) - MS_PER_400_YEARS : Date.UTC(e, t, a); }
function startOf(e) { var t; if (void 0 === (e = normalizeUnits(e)) || "millisecond" === e || !this.isValid())
    return this; var a = this._isUTC ? utcStartOfDate : localStartOfDate; switch (e) {
    case "year":
        t = a(this.year(), 0, 1);
        break;
    case "quarter":
        t = a(this.year(), this.month() - this.month() % 3, 1);
        break;
    case "month":
        t = a(this.year(), this.month(), 1);
        break;
    case "week":
        t = a(this.year(), this.month(), this.date() - this.weekday());
        break;
    case "isoWeek":
        t = a(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;
    case "day":
    case "date":
        t = a(this.year(), this.month(), this.date());
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
    return this; var a = this._isUTC ? utcStartOfDate : localStartOfDate; switch (e) {
    case "year":
        t = a(this.year() + 1, 0, 1) - 1;
        break;
    case "quarter":
        t = a(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;
    case "month":
        t = a(this.year(), this.month() + 1, 1) - 1;
        break;
    case "week":
        t = a(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;
    case "isoWeek":
        t = a(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;
    case "day":
    case "date":
        t = a(this.year(), this.month(), this.date() + 1) - 1;
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
function getSetWeekYearHelper(e, t, a, o, r) { var n; return null == e ? weekOfYear(this, o, r).year : (t > (n = weeksInYear(e, o, r)) && (t = n), setWeekAll.call(this, e, t, a, o, r)); }
function setWeekAll(e, t, a, o, r) { var n = dayOfYearFromWeeks(e, t, a, o, r), s = createUTCDate(n.year, 0, n.dayOfYear); return this.year(s.getUTCFullYear()), this.month(s.getUTCMonth()), this.date(s.getUTCDate()), this; }
function getSetQuarter(e) { return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3); }
addFormatToken(0, ["gg", 2], 0, function () { return this.weekYear() % 100; }), addFormatToken(0, ["GG", 2], 0, function () { return this.isoWeekYear() % 100; }), addWeekYearFormatToken("gggg", "weekYear"), addWeekYearFormatToken("ggggg", "weekYear"), addWeekYearFormatToken("GGGG", "isoWeekYear"), addWeekYearFormatToken("GGGGG", "isoWeekYear"), addUnitAlias("weekYear", "gg"), addUnitAlias("isoWeekYear", "GG"), addUnitPriority("weekYear", 1), addUnitPriority("isoWeekYear", 1), addRegexToken("G", matchSigned), addRegexToken("g", matchSigned), addRegexToken("GG", match1to2, match2), addRegexToken("gg", match1to2, match2), addRegexToken("GGGG", match1to4, match4), addRegexToken("gggg", match1to4, match4), addRegexToken("GGGGG", match1to6, match6), addRegexToken("ggggg", match1to6, match6), addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, a, o) { t[o.substr(0, 2)] = toInt(e); }), addWeekParseToken(["gg", "GG"], function (e, t, a, o) { t[o] = hooks.parseTwoDigitYear(e); }), addFormatToken("Q", 0, "Qo", "quarter"), addUnitAlias("quarter", "Q"), addUnitPriority("quarter", 7), addRegexToken("Q", match1), addParseToken("Q", function (e, t) { t[MONTH] = 3 * (toInt(e) - 1); }), addFormatToken("D", ["DD", 2], "Do", "date"), addUnitAlias("date", "D"), addUnitPriority("date", 9), addRegexToken("D", match1to2), addRegexToken("DD", match1to2, match2), addRegexToken("Do", function (e, t) { return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient; }), addParseToken(["D", "DD"], DATE), addParseToken("Do", function (e, t) { t[DATE] = toInt(e.match(match1to2)[0]); });
var getSetDayOfMonth = makeGetSet("Date", !0);
function getSetDayOfYear(e) { var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1; return null == e ? t : this.add(e - t, "d"); }
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), addUnitAlias("dayOfYear", "DDD"), addUnitPriority("dayOfYear", 4), addRegexToken("DDD", match1to3), addRegexToken("DDDD", match3), addParseToken(["DDD", "DDDD"], function (e, t, a) { a._dayOfYear = toInt(e); }), addFormatToken("m", ["mm", 2], 0, "minute"), addUnitAlias("minute", "m"), addUnitPriority("minute", 14), addRegexToken("m", match1to2), addRegexToken("mm", match1to2, match2), addParseToken(["m", "mm"], MINUTE);
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
function get$1(e, t, a, o) { var r = getLocale(), n = createUTC().set(o, t); return r[a](n, e); }
function listMonthsImpl(e, t, a) { if (isNumber(e) && (t = e, e = void 0), e = e || "", null != t)
    return get$1(e, t, a, "month"); var o, r = []; for (o = 0; o < 12; o++)
    r[o] = get$1(e, o, a, "month"); return r; }
function listWeekdaysImpl(e, t, a, o) { "boolean" == typeof e ? (isNumber(t) && (a = t, t = void 0), t = t || "") : (a = t = e, e = !1, isNumber(t) && (a = t, t = void 0), t = t || ""); var r, n = getLocale(), s = e ? n._week.dow : 0; if (null != a)
    return get$1(t, (a + s) % 7, o, "day"); var i = []; for (r = 0; r < 7; r++)
    i[r] = get$1(t, (r + s) % 7, o, "day"); return i; }
function listMonths(e, t) { return listMonthsImpl(e, t, "months"); }
function listMonthsShort(e, t) { return listMonthsImpl(e, t, "monthsShort"); }
function listWeekdays(e, t, a) { return listWeekdaysImpl(e, t, a, "weekdays"); }
function listWeekdaysShort(e, t, a) { return listWeekdaysImpl(e, t, a, "weekdaysShort"); }
function listWeekdaysMin(e, t, a) { return listWeekdaysImpl(e, t, a, "weekdaysMin"); }
proto$1.calendar = calendar, proto$1.longDateFormat = longDateFormat, proto$1.invalidDate = invalidDate, proto$1.ordinal = ordinal, proto$1.preparse = preParsePostFormat, proto$1.postformat = preParsePostFormat, proto$1.relativeTime = relativeTime, proto$1.pastFuture = pastFuture, proto$1.set = set, proto$1.months = localeMonths, proto$1.monthsShort = localeMonthsShort, proto$1.monthsParse = localeMonthsParse, proto$1.monthsRegex = monthsRegex, proto$1.monthsShortRegex = monthsShortRegex, proto$1.week = localeWeek, proto$1.firstDayOfYear = localeFirstDayOfYear, proto$1.firstDayOfWeek = localeFirstDayOfWeek, proto$1.weekdays = localeWeekdays, proto$1.weekdaysMin = localeWeekdaysMin, proto$1.weekdaysShort = localeWeekdaysShort, proto$1.weekdaysParse = localeWeekdaysParse, proto$1.weekdaysRegex = weekdaysRegex, proto$1.weekdaysShortRegex = weekdaysShortRegex, proto$1.weekdaysMinRegex = weekdaysMinRegex, proto$1.isPM = localeIsPM, proto$1.meridiem = localeMeridiem, getSetGlobalLocale("en", { dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (e) { var t = e % 10; return e + (1 === toInt(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th"); } }), hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale), hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
var mathAbs = Math.abs;
function abs() { var e = this._data; return this._milliseconds = mathAbs(this._milliseconds), this._days = mathAbs(this._days), this._months = mathAbs(this._months), e.milliseconds = mathAbs(e.milliseconds), e.seconds = mathAbs(e.seconds), e.minutes = mathAbs(e.minutes), e.hours = mathAbs(e.hours), e.months = mathAbs(e.months), e.years = mathAbs(e.years), this; }
function addSubtract$1(e, t, a, o) { var r = createDuration(t, a); return e._milliseconds += o * r._milliseconds, e._days += o * r._days, e._months += o * r._months, e._bubble(); }
function add$1(e, t) { return addSubtract$1(this, e, t, 1); }
function subtract$1(e, t) { return addSubtract$1(this, e, t, -1); }
function absCeil(e) { return e < 0 ? Math.floor(e) : Math.ceil(e); }
function bubble() { var e, t, a, o, r, n = this._milliseconds, s = this._days, i = this._months, l = this._data; return n >= 0 && s >= 0 && i >= 0 || n <= 0 && s <= 0 && i <= 0 || (n += 864e5 * absCeil(monthsToDays(i) + s), s = 0, i = 0), l.milliseconds = n % 1e3, e = absFloor(n / 1e3), l.seconds = e % 60, t = absFloor(e / 60), l.minutes = t % 60, a = absFloor(t / 60), l.hours = a % 24, s += absFloor(a / 24), i += r = absFloor(daysToMonths(s)), s -= absCeil(monthsToDays(r)), o = absFloor(i / 12), i %= 12, l.days = s, l.months = i, l.years = o, this; }
function daysToMonths(e) { return 4800 * e / 146097; }
function monthsToDays(e) { return 146097 * e / 4800; }
function as(e) { if (!this.isValid())
    return NaN; var t, a, o = this._milliseconds; if ("month" === (e = normalizeUnits(e)) || "quarter" === e || "year" === e)
    switch (a = this._months + daysToMonths(t = this._days + o / 864e5), e) {
        case "month": return a;
        case "quarter": return a / 3;
        case "year": return a / 12;
    }
else
    switch (t = this._days + Math.round(monthsToDays(this._months)), e) {
        case "week": return t / 7 + o / 6048e5;
        case "day": return t + o / 864e5;
        case "hour": return 24 * t + o / 36e5;
        case "minute": return 1440 * t + o / 6e4;
        case "second": return 86400 * t + o / 1e3;
        case "millisecond": return Math.floor(864e5 * t) + o;
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
function substituteTimeAgo(e, t, a, o, r) { return r.relativeTime(t || 1, !!a, e, o); }
function relativeTime$1(e, t, a) { var o = createDuration(e).abs(), r = round(o.as("s")), n = round(o.as("m")), s = round(o.as("h")), i = round(o.as("d")), l = round(o.as("M")), u = round(o.as("y")), d = r <= thresholds.ss && ["s", r] || r < thresholds.s && ["ss", r] || n <= 1 && ["m"] || n < thresholds.m && ["mm", n] || s <= 1 && ["h"] || s < thresholds.h && ["hh", s] || i <= 1 && ["d"] || i < thresholds.d && ["dd", i] || l <= 1 && ["M"] || l < thresholds.M && ["MM", l] || u <= 1 && ["y"] || ["yy", u]; return d[2] = t, d[3] = +e > 0, d[4] = a, substituteTimeAgo.apply(null, d); }
function getSetRelativeTimeRounding(e) { return void 0 === e ? round : "function" == typeof e && (round = e, !0); }
function getSetRelativeTimeThreshold(e, t) { return void 0 !== thresholds[e] && (void 0 === t ? thresholds[e] : (thresholds[e] = t, "s" === e && (thresholds.ss = t - 1), !0)); }
function humanize(e) { if (!this.isValid())
    return this.localeData().invalidDate(); var t = this.localeData(), a = relativeTime$1(this, !e, t); return e && (a = t.pastFuture(+this, a)), t.postformat(a); }
var abs$1 = Math.abs;
function sign(e) { return (e > 0) - (e < 0) || +e; }
function toISOString$1() { if (!this.isValid())
    return this.localeData().invalidDate(); var e, t, a = abs$1(this._milliseconds) / 1e3, o = abs$1(this._days), r = abs$1(this._months); e = absFloor(a / 60), t = absFloor(e / 60), a %= 60, e %= 60; var n = absFloor(r / 12), s = r %= 12, i = o, l = t, u = e, d = a ? a.toFixed(3).replace(/\.?0+$/, "") : "", c = this.asSeconds(); if (!c)
    return "P0D"; var h = c < 0 ? "-" : "", f = sign(this._months) !== sign(c) ? "-" : "", m = sign(this._days) !== sign(c) ? "-" : "", g = sign(this._milliseconds) !== sign(c) ? "-" : ""; return h + "P" + (n ? f + n + "Y" : "") + (s ? f + s + "M" : "") + (i ? m + i + "D" : "") + (l || u || d ? "T" : "") + (l ? g + l + "H" : "") + (u ? g + u + "M" : "") + (d ? g + d + "S" : ""); }
var proto$2 = Duration.prototype;
proto$2.isValid = isValid$1, proto$2.abs = abs, proto$2.add = add$1, proto$2.subtract = subtract$1, proto$2.as = as, proto$2.asMilliseconds = asMilliseconds, proto$2.asSeconds = asSeconds, proto$2.asMinutes = asMinutes, proto$2.asHours = asHours, proto$2.asDays = asDays, proto$2.asWeeks = asWeeks, proto$2.asMonths = asMonths, proto$2.asQuarters = asQuarters, proto$2.asYears = asYears, proto$2.valueOf = valueOf$1, proto$2._bubble = bubble, proto$2.clone = clone$1, proto$2.get = get$2, proto$2.milliseconds = milliseconds, proto$2.seconds = seconds, proto$2.minutes = minutes, proto$2.hours = hours, proto$2.days = days, proto$2.weeks = weeks, proto$2.months = months, proto$2.years = years, proto$2.humanize = humanize, proto$2.toISOString = toISOString$1, proto$2.toString = toISOString$1, proto$2.toJSON = toISOString$1, proto$2.locale = locale, proto$2.localeData = localeData, proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1), proto$2.lang = lang, addFormatToken("X", 0, 0, "unix"), addFormatToken("x", 0, 0, "valueOf"), addRegexToken("x", matchSigned), addRegexToken("X", matchTimestamp), addParseToken("X", function (e, t, a) { a._d = new Date(1e3 * parseFloat(e, 10)); }), addParseToken("x", function (e, t, a) { a._d = new Date(toInt(e)); }), hooks.version = "2.24.0", setHookCallback(createLocal), hooks.fn = proto, hooks.min = min, hooks.max = max, hooks.now = now, hooks.utc = createUTC, hooks.unix = createUnix, hooks.months = listMonths, hooks.isDate = isDate, hooks.locale = getSetGlobalLocale, hooks.invalid = createInvalid, hooks.duration = createDuration, hooks.isMoment = isMoment, hooks.weekdays = listWeekdays, hooks.parseZone = createInZone, hooks.localeData = getLocale, hooks.isDuration = isDuration, hooks.monthsShort = listMonthsShort, hooks.weekdaysMin = listWeekdaysMin, hooks.defineLocale = defineLocale, hooks.updateLocale = updateLocale, hooks.locales = listLocales, hooks.weekdaysShort = listWeekdaysShort, hooks.normalizeUnits = normalizeUnits, hooks.relativeTimeRounding = getSetRelativeTimeRounding, hooks.relativeTimeThreshold = getSetRelativeTimeThreshold, hooks.calendarFormat = getCalendarFormat, hooks.prototype = proto, hooks.HTML5_FMT = { DATETIME_LOCAL: "YYYY-MM-DDTHH:mm", DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss", DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS", DATE: "YYYY-MM-DD", TIME: "HH:mm", TIME_SECONDS: "HH:mm:ss", TIME_MS: "HH:mm:ss.SSS", WEEK: "GGGG-[W]WW", MONTH: "YYYY-MM" };
var KetchupDataTable = function () { function e() { this.showFilters = !1, this.filters = {}, this.globalFilter = !1, this.sortEnabled = !0, this.sort = [], this.rowsPerPage = 10, this.paginatorPos = PaginatorPos.TOP, this.columnsWidth = [], this.showHeader = !0, this.showGrid = !0, this.groups = [], this.globalFilterValue = "", this.currentPage = 1, this.currentRowsPerPage = 10, this.selectedRow = null, this.groupState = {}; } return e.prototype.rowsPerPageHandler = function (e) { this.currentRowsPerPage = e; }, e.prototype.componentWillLoad = function () { if (this.rowsPerPageHandler(this.rowsPerPage), this.selectRow && this.selectRow > 0) {
    var e = this.sortRows(this.getFilteredRows());
    this.selectRow <= e.length && (this.selectedRow = e[this.selectRow - 1], this.kupRowSelected.emit({ row: this.selectedRow }));
} }, e.prototype.getColumns = function () { return this.data && this.data.columns ? this.data.columns : [{ title: "", name: "", size: 0 }]; }, e.prototype.getRows = function () { return this.data && this.data.rows ? this.data.rows : []; }, e.prototype.isGrouping = function () { return this.groups && this.groups.length > 0; }, e.prototype.getFilteredRows = function () { var e = this; if (this.filters && Object.keys(this.filters).length > 0 || this.globalFilter) {
    var t = Object.keys(this.filters);
    return this.getRows().filter(function (a) { if (e.globalFilter) {
        for (var o = !1, r = 0; r < e.data.columns.length; r++)
            if (a.cells[e.data.columns[r].name].value.toLowerCase().includes(e.globalFilterValue.toLocaleLowerCase())) {
                o = !0;
                break;
            }
        if (!o)
            return !1;
    } return t.filter(function (t) { var o = e.filters[t], r = a.cells[t]; return !(!r || !r.value) && (!!r.value.toLowerCase().includes(o.toLowerCase()) || void 0); }).length === t.length; });
} return this.getRows(); }, e.prototype.onColumnSort = function (e) { for (var t = e.target.dataset.col, a = 0; a < this.sort.length && (o = this.sort[a]).column !== t; a++)
    ; if (a < this.sort.length) {
    var o = this.sort[a], r = Object.assign({}, o, { sortMode: o.sortMode === SortMode.A ? SortMode.D : SortMode.A });
    if (e.ctrlKey) {
        var n = this.sort.slice();
        n[a] = r, this.sort = n;
    }
    else
        this.sort = [r];
}
else
    o = { column: t, sortMode: SortMode.A }, this.sort = e.ctrlKey ? this.sort.concat([o]) : [o]; }, e.prototype.onFilterChange = function (e) { this.currentPage = 1; var t = e.target.dataset.col, a = Object.assign({}, this.filters); 0 === e.detail.value.length ? delete a[t] : a[t] = e.detail.value, this.filters = a; }, e.prototype.onGlobalFilterChange = function (e) { this.currentPage = 1, this.globalFilterValue = e.detail.value; }, e.prototype.groupRows = function (e) { var t = this; if (!this.isGrouping())
    return e; var a = []; return this.getRows().forEach(function (e) { for (var o = e.cells[t.groups[0].column].value, r = null, n = 0; n < a.length; n++) {
    var s = a[n];
    if (s.group.label === o) {
        r = s;
        break;
    }
} null === r && a.push(r = { group: { expanded: !1, label: o, children: [] }, cells: {} }), r.group.expanded = !!t.groupState[o] && t.groupState[o].expanded, t.groupState[o] = { expanded: r.group.expanded }, r.group.children.push(e); }), a; }, e.prototype.sortRows = function (e) { var t = this; if (0 === this.sort.length)
    return e; var a = this.sort.length > 1; return e.sort(function (e, o) { if (a) {
    for (var r = 0; r < t.sort.length; r++) {
        var n = t.compareCell(e.cells[(s = t.sort[r]).column], o.cells[s.column], s.sortMode);
        if (0 !== n)
            return n;
    }
    return 0;
} var s; return t.compareCell(e.cells[(s = t.sort[0]).column], o.cells[s.column], s.sortMode); }); }, e.prototype.compareCell = function (e, t, a) { var o = "A" === a ? 1 : -1, r = e.obj, n = t.obj; if (r.t !== n.t || r.p !== n.p) {
    var s = r.t.localeCompare(n.t);
    return 0 === s && (s = r.p.localeCompare(n.p)), s;
} if ("NR" === r.t) {
    var i = numeral(r.k).value(), l = numeral(n.k).value();
    return i === l ? 0 : i > l ? 1 * o : -1 * o;
} if ("D8" === r.t) {
    var u = void 0, d = void 0;
    if ("*YYMD" === r.p)
        u = hooks(r.k, "YYYYMMDD"), d = hooks(n.k, "YYYYMMDD");
    else {
        if ("*DMYY" !== r.p)
            return r.k.localeCompare(n.k);
        u = hooks(r.k, "DDMMYYYY"), d = hooks(n.k, "DDMMYYYY");
    }
    return u.isSame(d) ? 0 : u.isBefore(d) ? -1 * o : 1 * o;
} return o * e.value.localeCompare(t.value); }, e.prototype.paginateRows = function (e) { var t = this.currentPage * this.currentRowsPerPage - this.currentRowsPerPage; return e.slice(t, t + this.currentRowsPerPage); }, e.prototype.getSortIcon = function (e) { for (var t = 0; t < this.sort.length; t++) {
    var a = this.sort[t];
    if (a.column === e)
        return "A" === a.sortMode ? "mdi-sort-ascending" : "mdi-sort-descending";
} return "mdi-sort"; }, e.prototype.handlePageChanged = function (e) { this.currentPage = e.detail.newPage; }, e.prototype.handleRowsPerPageChanged = function (e) { this.currentRowsPerPage = e.detail.newRowsPerPage; }, e.prototype.onRowClick = function (e) { this.kupRowSelected.emit({ row: e }), this.selectedRow = e; }, e.prototype.onRowExpand = function (e) { e.group.expanded = !e.group.expanded, this.groupState[e.group.label].expanded = e.group.expanded, this.groupState = Object.assign({}, this.groupState); }, e.prototype.renderHeader = function () { var e = this, t = this.columnsWidth.length > 0; return this.getColumns().map(function (a) { var o = null; if (e.showFilters) {
    var r = "";
    e.filters && e.filters[a.name] && (r = e.filters[a.name]), o = mycomponent_core_js_1.h("div", null, mycomponent_core_js_1.h("kup-text-input", { initialValue: r, "data-col": a.name, onKetchupTextInputUpdated: function (t) { e.onFilterChange(t); } }));
} var n = null; e.sortEnabled && (n = mycomponent_core_js_1.h("span", { class: "column-sort" }, mycomponent_core_js_1.h("icon", { class: "mdi " + e.getSortIcon(a.name), "data-col": a.name, onClick: function (t) { return e.onColumnSort(t); } }))); var s = null; if (t)
    for (var i = 0; i < e.columnsWidth.length; i++) {
        var l = e.columnsWidth[i];
        if (l.column === a.name) {
            var u = l.width.toString() + "px";
            s = { width: u, minWidth: u, maxWidth: u };
            break;
        }
    } return mycomponent_core_js_1.h("th", { style: s }, mycomponent_core_js_1.h("span", { class: "column-title" }, a.title), n, o); }); }, e.prototype.renderFooter = function (e) { var t = this; if (!this.totals)
    return null; var a = Object.keys(this.totals), o = {}; if (0 === a.length || a.every(function (e) { return t.totals[e] === TotalMode.COUNT; }))
    a.forEach(function (t) { return o[t] = e.length; });
else {
    e.forEach(function (e) { a.filter(function (e) { return TotalMode.COUNT !== t.totals[e]; }).forEach(function (t) { var a = e.cells[t]; if ("NR" === a.obj.t) {
        var r = numeral(a.obj.k);
        o[t] = r.add(o[t] || 0).value();
    } }); });
    for (var r = 0; r < a.length; r++) {
        var n = a[r];
        if (this.totals[n] === TotalMode.AVARAGE) {
            var s = o[n];
            s && e.length > 0 && (o[n] = numeral(s).divide(e.length).value());
        }
        else
            this.totals[n] === TotalMode.COUNT && (o[n] = e.length);
    }
} var i = this.getColumns().map(function (e) { return mycomponent_core_js_1.h("td", null, o[e.name]); }); return mycomponent_core_js_1.h("tfoot", null, mycomponent_core_js_1.h("tr", null, i)); }, e.prototype.renderRow = function (e, t) { var a = this; if (void 0 === t && (t = 0), e.group) {
    var o = "mdi mdi-chevron-" + (e.group.expanded ? "right" : "down"), r = [];
    return r.push(mycomponent_core_js_1.h("tr", { class: "group" }, mycomponent_core_js_1.h("td", { colSpan: this.getColumns().length }, mycomponent_core_js_1.h("icon", { class: o, onClick: function () { return a.onRowExpand(e); } }), e.group.label))), e.group.expanded && e.group.children.map(function (e) { return a.renderRow(e, t + 1); }).forEach(function (e) { return r.push(e); }), r;
} var n = this.getColumns().map(function (a, o) { var r = a.name, n = []; if (0 === o)
    for (var s = 0; s < t; s++)
        n.push(mycomponent_core_js_1.h("span", { class: "indent" })); return mycomponent_core_js_1.h("td", null, n, e.cells[r].value); }), s = null; return this.selectedRow === e && (s = "selected"), mycomponent_core_js_1.h("tr", { class: s, onClick: function () { return a.onRowClick(e); } }, n); }, e.prototype.render = function () { var e, t = this, a = this.renderHeader(), o = this.getFilteredRows(), r = this.renderFooter(o), n = this.sortRows(o), s = this.groupRows(n), i = this.paginateRows(s); e = 0 === i.length ? mycomponent_core_js_1.h("tr", null, mycomponent_core_js_1.h("td", { colSpan: this.getColumns().length }, "Empty data")) : i.map(function (e) { return t.renderRow(e); }); var l = null; this.globalFilter && (l = mycomponent_core_js_1.h("div", { id: "globalFilter" }, mycomponent_core_js_1.h("kup-text-input", { label: "Global filter", onKetchupTextInputUpdated: function (e) { return t.onGlobalFilterChange(e); } }))); var u = null; PaginatorPos.TOP !== this.paginatorPos && PaginatorPos.BOTH !== this.paginatorPos || (u = mycomponent_core_js_1.h("kup-paginator", { max: o.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: function (e) { return t.handlePageChanged(e); }, onKupRowsPerPageChanged: function (e) { return t.handleRowsPerPageChanged(e); } })); var d = null; PaginatorPos.BOTTOM !== this.paginatorPos && PaginatorPos.BOTH !== this.paginatorPos || (d = mycomponent_core_js_1.h("kup-paginator", { max: o.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: function (e) { return t.handlePageChanged(e); }, onKupRowsPerPageChanged: function (e) { return t.handleRowsPerPageChanged(e); } })); var c = null; return this.showGrid || (c = "noGrid"), mycomponent_core_js_1.h("div", null, u, l, mycomponent_core_js_1.h("div", { id: "data-table-wrapper" }, mycomponent_core_js_1.h("table", { class: c }, mycomponent_core_js_1.h("thead", { hidden: !this.showHeader }, mycomponent_core_js_1.h("tr", null, a)), mycomponent_core_js_1.h("tbody", null, e), r)), d); }, Object.defineProperty(e, "is", { get: function () { return "kup-data-table"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { columnsWidth: { type: "Any", attr: "columns-width" }, currentPage: { state: !0 }, currentRowsPerPage: { state: !0 }, data: { type: "Any", attr: "data" }, filters: { type: "Any", attr: "filters", mutable: !0 }, globalFilter: { type: Boolean, attr: "global-filter" }, globalFilterValue: { state: !0 }, groups: { type: "Any", attr: "groups" }, groupState: { state: !0 }, paginatorPos: { type: String, attr: "paginator-pos" }, rowsPerPage: { type: Number, attr: "rows-per-page", watchCallbacks: ["rowsPerPageHandler"] }, selectedRow: { state: !0 }, selectRow: { type: Number, attr: "select-row" }, showFilters: { type: Boolean, attr: "show-filters" }, showGrid: { type: Boolean, attr: "show-grid" }, showHeader: { type: Boolean, attr: "show-header" }, sort: { type: "Any", attr: "sort", mutable: !0 }, sortEnabled: { type: Boolean, attr: "sort-enabled" }, totals: { type: "Any", attr: "totals" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "kupRowSelected", method: "kupRowSelected", bubbles: !0, cancelable: !1, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);.sc-kup-data-table-h{--int_color:var(--kup-data-table_color,#111);--int_hover-color:var(--kup-data-table_hover-color,#545454);--int_hover-background-color:var(--kup-data-table_hover-background-color,#f0f0f0)}#data-table-wrapper.sc-kup-data-table{overflow:auto}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table{color:var(--int_color);width:100%;border-collapse:collapse}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   td.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   th.sc-kup-data-table{border:1px solid #000}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   td.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   th.sc-kup-data-table{padding:.5rem}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   .column-sort.sc-kup-data-table{margin-left:.5rem;cursor:pointer}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   th.sc-kup-data-table   input.sc-kup-data-table{display:block}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table > tr.selected.sc-kup-data-table > td.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table:hover > td.sc-kup-data-table{color:var(--int_hover-color);background-color:var(--int_hover-background-color)}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table   icon.sc-kup-data-table{cursor:pointer;margin-right:.5rem}#data-table-wrapper.sc-kup-data-table > table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table   .indent.sc-kup-data-table{display:inline-block;height:1rem;width:2rem}#data-table-wrapper.sc-kup-data-table > table.noGrid.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table > table.noGrid.sc-kup-data-table   td.sc-kup-data-table{border:none}#globalFilter.sc-kup-data-table{margin-bottom:.5rem;text-align:center}"; }, enumerable: !0, configurable: !0 }), e; }(), KetchupPaginator = function () { function e() { this.max = 0, this.perPage = 10, this.selectedPerPage = 10, this.currentPage = 1; } return e.prototype.isPrevPageDisabled = function () { return 1 == this.currentPage; }, e.prototype.isNextPageDisabled = function () { return this.currentPage * this.perPage >= this.max; }, e.prototype.onPrevPage = function () { this.isPrevPageDisabled() || this.kupPageChanged.emit({ newPage: this.currentPage - 1 }); }, e.prototype.onNextPage = function () { this.isNextPageDisabled() || this.kupPageChanged.emit({ newPage: this.currentPage + 1 }); }, e.prototype.onGoToPage = function (e) { this.kupPageChanged.emit({ newPage: parseInt(e.target.value) }); }, e.prototype.onRowsPerPage = function (e) { this.kupRowsPerPageChanged.emit({ newRowsPerPage: parseInt(e.target.value) }); }, e.prototype.getGoToPageOptions = function (e) { var t = []; t.push(mycomponent_core_js_1.h("option", { value: "1", selected: 1 === this.currentPage }, "1")); for (var a = 2; a <= e; a++)
    t.push(mycomponent_core_js_1.h("option", { value: a, selected: this.currentPage === a }, a)); return t; }, e.prototype.getRowsPerPageOptions = function () { var e = []; if (this.currentPage != this.max) {
    var t = this.perPage;
    if (0 === t)
        return e;
    for (; t < this.max;)
        e.push(mycomponent_core_js_1.h("option", { value: t, selected: t === this.selectedPerPage }, t)), t *= 2;
    e.push(mycomponent_core_js_1.h("option", { value: this.max, selected: this.max === this.perPage }, this.max));
}
else
    e.push(mycomponent_core_js_1.h("option", { value: this.perPage, selected: !0 }, this.perPage)); return e; }, e.prototype.render = function () { var e = this, t = "mdi mdi-chevron-left"; this.isPrevPageDisabled() && (t += " disabled"); var a = "mdi mdi-chevron-right"; this.isNextPageDisabled() && (a += " disabled"); var o = Math.ceil(this.max / this.selectedPerPage), r = this.getGoToPageOptions(o), n = this.getRowsPerPageOptions(); return mycomponent_core_js_1.h("div", { id: "paginator" }, mycomponent_core_js_1.h("div", { class: "align-left" }, "Pagina", mycomponent_core_js_1.h("span", { class: "prev-page" }, mycomponent_core_js_1.h("icon", { className: t, onclick: function () { return e.onPrevPage(); } })), mycomponent_core_js_1.h("select", { onChange: function (t) { return e.onGoToPage(t); } }, r), mycomponent_core_js_1.h("span", { class: "next-page" }, mycomponent_core_js_1.h("icon", { className: a, onclick: function () { return e.onNextPage(); } })), "Di ", o), mycomponent_core_js_1.h("div", { class: "align-right" }, mycomponent_core_js_1.h("span", { class: "nextPageGroup" }, "Numero risultati: ", this.max), "Mostra", mycomponent_core_js_1.h("select", { onChange: function (t) { return e.onRowsPerPage(t); } }, n), "righe per pagina")); }, Object.defineProperty(e, "is", { get: function () { return "kup-paginator"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { currentPage: { type: Number, attr: "current-page" }, max: { type: Number, attr: "max" }, perPage: { type: Number, attr: "per-page" }, selectedPerPage: { type: Number, attr: "selected-per-page" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "kupPageChanged", method: "kupPageChanged", bubbles: !0, cancelable: !1, composed: !0 }, { name: "kupRowsPerPageChanged", method: "kupRowsPerPageChanged", bubbles: !0, cancelable: !1, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);#paginator.sc-kup-paginator{margin:.5rem 0;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:justify;justify-content:space-between}#paginator.sc-kup-paginator   icon.sc-kup-paginator{cursor:pointer}#paginator.sc-kup-paginator   icon.disabled.sc-kup-paginator{cursor:default;opacity:.3}#paginator.sc-kup-paginator   .nextPage.sc-kup-paginator, #paginator.sc-kup-paginator   .nextPageGroup.sc-kup-paginator, #paginator.sc-kup-paginator   .prevPage.sc-kup-paginator, #paginator.sc-kup-paginator   select.sc-kup-paginator{margin:0 .1rem}#paginator.sc-kup-paginator   .nextPageGroup.sc-kup-paginator{border-right:1px solid #000;padding-right:.3rem}"; }, enumerable: !0, configurable: !0 }), e; }();
exports.KupDataTable = KetchupDataTable;
exports.KupPaginator = KetchupPaginator;
function isObject$1(e) { var t = typeof e; return null != e && ("object" == t || "function" == t); }
var isObject_1 = isObject$1, freeGlobal = "object" == typeof commonjsGlobal && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, _freeGlobal = freeGlobal, freeSelf = "object" == typeof self && self && self.Object === Object && self, root = _freeGlobal || freeSelf || Function("return this")(), _root = root, now$1 = function () { return _root.Date.now(); }, now_1 = now$1, Symbol = _root.Symbol, _Symbol = Symbol, objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol ? Symbol.toStringTag : void 0;
function getRawTag(e) { var t = hasOwnProperty.call(e, symToStringTag), a = e[symToStringTag]; try {
    e[symToStringTag] = void 0;
    var o = !0;
}
catch (e) { } var r = nativeObjectToString.call(e); return o && (t ? e[symToStringTag] = a : delete e[symToStringTag]), r; }
var _getRawTag = getRawTag, objectProto$1 = Object.prototype, nativeObjectToString$1 = objectProto$1.toString;
function objectToString(e) { return nativeObjectToString$1.call(e); }
var _objectToString = objectToString, nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag$1 = Symbol ? Symbol.toStringTag : void 0;
function baseGetTag(e) { return null == e ? void 0 === e ? undefinedTag : nullTag : symToStringTag$1 && symToStringTag$1 in Object(e) ? _getRawTag(e) : _objectToString(e); }
var _baseGetTag = baseGetTag;
function isObjectLike(e) { return null != e && "object" == typeof e; }
var isObjectLike_1 = isObjectLike, symbolTag = "[object Symbol]";
function isSymbol(e) { return "symbol" == typeof e || isObjectLike_1(e) && _baseGetTag(e) == symbolTag; }
var isSymbol_1 = isSymbol, NAN = NaN, reTrim = /^\s+|\s+$/g, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
function toNumber(e) { if ("number" == typeof e)
    return e; if (isSymbol_1(e))
    return NAN; if (isObject_1(e)) {
    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
    e = isObject_1(t) ? t + "" : t;
} if ("string" != typeof e)
    return 0 === e ? e : +e; e = e.replace(reTrim, ""); var a = reIsBinary.test(e); return a || reIsOctal.test(e) ? freeParseInt(e.slice(2), a ? 2 : 8) : reIsBadHex.test(e) ? NAN : +e; }
var toNumber_1 = toNumber, FUNC_ERROR_TEXT = "Expected a function", nativeMax = Math.max, nativeMin = Math.min;
function debounce(e, t, a) { var o, r, n, s, i, l, u = 0, d = !1, c = !1, h = !0; if ("function" != typeof e)
    throw new TypeError(FUNC_ERROR_TEXT); function f(t) { var a = o, n = r; return o = r = void 0, u = t, s = e.apply(n, a); } function m(e) { var a = e - l; return void 0 === l || a >= t || a < 0 || c && e - u >= n; } function g() { var e = now_1(); if (m(e))
    return p(e); i = setTimeout(g, function (e) { var a = t - (e - l); return c ? nativeMin(a, n - (e - u)) : a; }(e)); } function p(e) { return i = void 0, h && o ? f(e) : (o = r = void 0, s); } function y() { var e = now_1(), a = m(e); if (o = arguments, r = this, l = e, a) {
    if (void 0 === i)
        return function (e) { return u = e, i = setTimeout(g, t), d ? f(e) : s; }(l);
    if (c)
        return i = setTimeout(g, t), f(l);
} return void 0 === i && (i = setTimeout(g, t)), s; } return t = toNumber_1(t) || 0, isObject_1(a) && (d = !!a.leading, n = (c = "maxWait" in a) ? nativeMax(toNumber_1(a.maxWait) || 0, t) : n, h = "trailing" in a ? !!a.trailing : h), y.cancel = function () { void 0 !== i && clearTimeout(i), u = 0, o = l = r = i = void 0; }, y.flush = function () { return void 0 === i ? s : p(now_1()); }, y; }
var debounce_1 = debounce;
function debounceEvent(e, t) { var a = e._original || e; return { _original: e, emit: debounce_1(a.emit.bind(a), t) }; }
var KetchupTextInput = function () { function e() { this.initialValue = "", this.isClearable = !1, this.label = "", this.maxLength = 524288, this.debounce = 400, this.value = "", this.classInputText = "ketchup-input-text"; } return e.prototype.debounceChanged = function () { this.ketchupTextInputUpdated = debounceEvent(this.ketchupTextInputUpdated, this.debounce); }, e.prototype.componentWillLoad = function () { this.value = this.initialValue; }, e.prototype.componentDidLoad = function () { this.debounceChanged(); }, e.prototype.triggerFocus = function () { this.inputEl.focus(), this.textInput.focus(); }, e.prototype.onClearClick = function () { var e = this; this.value = "", setTimeout(function () { return e.triggerFocus(); }, 10); }, e.prototype.onKeyDown = function (e) { "Enter" === e.key && (e.preventDefault(), this.ketchupTextInputSubmit.emit({ value: this.value })); }, e.prototype.onInputBlurred = function (e) { var t = e.target; this.inputBlur.emit({ value: t.value, oldValue: this.value }), this.value = t.value; }, e.prototype.onInputFocused = function (e) { var t = e.target; this.inputFocused.emit({ value: t.value, oldValue: this.value }), this.value = t.value; }, e.prototype.onInputUpdated = function (e) { var t = e.target; this.ketchupTextInputUpdated.emit({ value: t.value, oldValue: this.value }), this.value = t.value; }, e.prototype.render = function () { var e = this, t = this.classInputText + "__container", a = null; return this.label && (a = mycomponent_core_js_1.h("label", { htmlFor: "ketchup-input" }, this.label)), mycomponent_core_js_1.h("div", { class: t + (this.isClearable ? " " + t + "--clearable" : "") }, a, mycomponent_core_js_1.h("input", { id: "ketchup-input", class: this.classInputText + (this.isClearable ? " " + this.classInputText + "--clearable" : ""), maxlength: this.maxLength, ref: function (t) { return e.textInput = t; }, tabindex: "0", value: this.value, onBlur: this.onInputBlurred.bind(this), onInput: this.onInputUpdated.bind(this), onFocus: this.onInputFocused.bind(this), onKeyDown: this.onKeyDown.bind(this) }), this.isClearable ? mycomponent_core_js_1.h("button", { "aria-label": "Close", class: this.classInputText + "__clear", role: "button", onClick: this.onClearClick.bind(this) }, mycomponent_core_js_1.h("svg", { viewBox: "0 0 24 24" }, mycomponent_core_js_1.h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }))) : null); }, Object.defineProperty(e, "is", { get: function () { return "kup-text-input"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { debounce: { type: Number, attr: "debounce", watchCallbacks: ["debounceChanged"] }, initialValue: { type: String, attr: "initial-value" }, inputEl: { elementRef: !0 }, isClearable: { type: Boolean, attr: "is-clearable" }, label: { type: String, attr: "label" }, maxLength: { type: Number, attr: "max-length" }, triggerFocus: { method: !0 }, value: { state: !0 } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "ketchupTextInputBlurred", method: "inputBlur", bubbles: !0, cancelable: !1, composed: !0 }, { name: "ketchupTextInputFocused", method: "inputFocused", bubbles: !0, cancelable: !1, composed: !0 }, { name: "ketchupTextInputSubmit", method: "ketchupTextInputSubmit", bubbles: !0, cancelable: !1, composed: !0 }, { name: "ketchupTextInputUpdated", method: "ketchupTextInputUpdated", bubbles: !0, cancelable: !1, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ".sc-kup-text-input-h{--int_color:var(--kup-text-input_color,#000);--int_font-size:var(--kup-text-input_font-size,14px);--int_border-color:var(--kup-text-input_border-color,grey);--int_border-color--selected:var(--kup-text-input_border-color--selected,#4e908f);--int_tr-duration:var(--kup-text-input_transition-duration,0.6s);--int_icon-color:var(--kup-text-input_icon-color,grey);--int_icon-color--hover:var(--kup-text-input_icon-color--hover,#676767);display:inline-block}label.sc-kup-text-input{margin-right:.5rem}.ketchup-input-text.sc-kup-text-input{color:var(--int_color);background-color:#fff;border:1px solid var(--int_border-color);border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;outline:none;padding:4px 6px;position:relative;-webkit-transition:background-color var(--int_tr-duration);transition:background-color var(--int_tr-duration);z-index:0}.ketchup-input-text__container.sc-kup-text-input{display:inline-block;position:relative;z-index:0}.ketchup-input-text.sc-kup-text-input:focus, .ketchup-input-text.sc-kup-text-input:hover{border-color:var(--int_border-color--selected)}.ketchup-input-text--clearable.sc-kup-text-input{padding-right:calc(6px + 4px * 2 + var(--int_font-size))}.ketchup-input-text__clear.sc-kup-text-input{-ms-flex-align:center;align-items:center;background-color:transparent;border:none;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;margin:0;outline:none;padding:4px;position:absolute;right:6px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:1}.ketchup-input-text__clear.sc-kup-text-input > svg.sc-kup-text-input{fill:var(--int_icon-color);height:var(--int_font-size);-webkit-transition:fill var(--int_tr-duration);transition:fill var(--int_tr-duration);width:var(--int_font-size)}.ketchup-input-text__clear.sc-kup-text-input:hover > svg.sc-kup-text-input{fill:var(--int_icon-color--hover)}"; }, enumerable: !0, configurable: !0 }), e; }();
exports.KupTextInput = KetchupTextInput;
