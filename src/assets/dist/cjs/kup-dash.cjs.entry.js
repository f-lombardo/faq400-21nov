'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-c31c1549.js');

class KupDash {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.layout = '1';
        this.fontsize = '';
        this.ketchupDashClicked = __chunk_1.createEvent(this, "ketchupDashClicked", 7);
    }
    onDshClickedHandler() {
        this.ketchupDashClicked.emit();
    }
    render() {
        let content = null;
        switch (this.layout) {
            case '2':
                content = (__chunk_1.h("div", null, __chunk_1.h("div", { class: "icon" }, __chunk_1.h("slot", { name: "icon" })), __chunk_1.h("div", { class: "value-int" }, __chunk_1.h("slot", { name: "value-int" })), __chunk_1.h("div", { class: "value-dec" }, __chunk_1.h("slot", { name: "value-dec" })), __chunk_1.h("div", { class: "unit" }, __chunk_1.h("slot", { name: "unit" }))));
                break;
            case '3':
                content = (__chunk_1.h("div", null, __chunk_1.h("div", { class: "value" }, __chunk_1.h("slot", { name: "value" })), __chunk_1.h("div", { class: "descr" }, __chunk_1.h("slot", { name: "descr" }))));
                break;
            case '4':
                content = (__chunk_1.h("div", null, __chunk_1.h("div", { class: "icon" }, __chunk_1.h("slot", { name: "icon" })), __chunk_1.h("div", { class: "value-and-unit" }, __chunk_1.h("div", { class: "value-int" }, __chunk_1.h("slot", { name: "value-int" })), __chunk_1.h("div", { class: "value-dec" }, __chunk_1.h("slot", { name: "value-dec" })), __chunk_1.h("div", { class: "unit" }, __chunk_1.h("slot", { name: "unit" }))), __chunk_1.h("div", null), __chunk_1.h("div", { class: "descr" }, __chunk_1.h("slot", { name: "descr" }))));
                break;
            case '5':
                content = (__chunk_1.h("div", null, __chunk_1.h("div", null, __chunk_1.h("div", { class: "descr" }, __chunk_1.h("slot", { name: "descr" })), __chunk_1.h("div", { class: "value" }, __chunk_1.h("slot", { name: "value" }))), __chunk_1.h("div", { class: "icon" }, __chunk_1.h("slot", { name: "icon" }))));
                break;
            case '6':
                content = (__chunk_1.h("div", null, __chunk_1.h("div", { class: "icon" }, __chunk_1.h("slot", { name: "icon" })), __chunk_1.h("div", null, __chunk_1.h("div", { class: "value" }, __chunk_1.h("slot", { name: "value" })), __chunk_1.h("div", { class: "descr" }, __chunk_1.h("slot", { name: "descr" })))));
                break;
            case '7':
                content = (__chunk_1.h("div", null, __chunk_1.h("div", null, __chunk_1.h("div", { class: "value" }, __chunk_1.h("slot", { name: "value" })), __chunk_1.h("div", { class: "descr" }, __chunk_1.h("slot", { name: "descr" }))), __chunk_1.h("div", { class: "icon" }, __chunk_1.h("slot", { name: "icon" }))));
                break;
            case '8':
                content = (__chunk_1.h("div", null, __chunk_1.h("div", { class: "icon" }, __chunk_1.h("slot", { name: "icon" })), __chunk_1.h("div", { class: "value" }, __chunk_1.h("slot", { name: "value" })), __chunk_1.h("div", { class: "descr" }, __chunk_1.h("slot", { name: "descr" }))));
                break;
            default:
                // layout 1
                content = (__chunk_1.h("div", null, __chunk_1.h("div", { class: "descr" }, __chunk_1.h("slot", { name: "descr" })), __chunk_1.h("div", { class: "value" }, __chunk_1.h("slot", { name: "value" }))));
                break;
        }
        const style = { fontSize: this.fontsize };
        return (__chunk_1.h("div", { id: "dash", style: style, onClick: () => this.onDshClickedHandler() }, __chunk_1.h("div", { id: "content", class: `layout-${this.layout}` }, content)));
    }
    static get style() { return ":host{--dash_bkg-color:var(--kup-dash_background-color,transparent);--dash_color:var(--kup-dash_color,#111);--dash_border-color:var(--kup-dash_border-color,transparent)}#dash{background-color:var(--dash_bkg-color);border:1px solid var(--dash_border-color);color:var(--dash_color);font-size:2vw;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;text-align:center;position:relative;word-break:normal}#dash #content .icon{margin:auto;font-size:90%}#dash #content.layout-1,#dash #content.layout-3{text-align:center}#dash #content.layout-1 .descr,#dash #content.layout-3 .descr{font-size:70%;width:100%}#dash #content.layout-1 .value,#dash #content.layout-3 .value{font-size:220%;padding:2% 0}#dash #content.layout-2>div{display:-ms-flexbox;display:flex}#dash #content.layout-2>div .icon{margin:auto;font-size:150%;margin-right:5%}#dash #content.layout-2>div .value-int{font-size:250%}#dash #content.layout-2>div .unit,#dash #content.layout-2>div .value-dec{font-size:130%;margin-top:auto;margin-bottom:4%}#dash #content.layout-2>div .unit{margin-left:4%}#dash #content.layout-4>div{display:grid;grid-template-columns:2fr 5fr}#dash #content.layout-4>div .icon{margin:auto;font-size:150%;margin-right:5%}#dash #content.layout-4>div .value-and-unit{display:-ms-flexbox;display:flex}#dash #content.layout-4>div .value-and-unit .value-int{font-size:250%}#dash #content.layout-4>div .value-and-unit .unit,#dash #content.layout-4>div .value-and-unit .value-dec{font-size:130%;margin-top:auto;margin-bottom:4%}#dash #content.layout-4>div .value-and-unit .unit{margin-left:4%}#dash #content.layout-4>div .descr{margin-left:4%;text-align:left;font-size:80%;width:100%;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}#dash #content.layout-5>div,#dash #content.layout-7>div{display:-ms-flexbox;display:flex}#dash #content.layout-5>div .icon,#dash #content.layout-7>div .icon{font-size:150%;margin:auto;margin-left:10%}#dash #content.layout-5>div .value,#dash #content.layout-7>div .value{font-size:200%}#dash #content.layout-5>div .descr,#dash #content.layout-7>div .descr{text-align:right;font-size:65%;width:100%;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}#dash #content.layout-6>div{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}#dash #content.layout-6>div .icon{font-size:150%;margin-right:10%}#dash #content.layout-6>div .value{font-size:220%;text-align:right}#dash #content.layout-6>div .descr{font-size:80%;text-align:right;width:100%;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}#dash #content.layout-8>div{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}#dash #content.layout-8>div .icon{margin-right:4%;font-size:75%}#dash #content.layout-8>div .value{margin-right:4%;font-size:250%}#dash #content.layout-8>div .descr{font-size:60%;text-align:left;word-spacing:10000px}"; }
}

exports.kup_dash = KupDash;
