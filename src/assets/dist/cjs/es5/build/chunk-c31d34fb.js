"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateUniqueId(e) { return void 0 === e && (e = "def"), (new Date).getTime() + e.trim().replace(/\s/g, "_"); }
exports.b = generateUniqueId;
function eventFromElement(e, n) { for (; n;) {
    if (console.log(n), n === e)
        return !0;
    n = n.parentElement;
} return !1; }
exports.a = eventFromElement;
