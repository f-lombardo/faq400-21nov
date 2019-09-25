'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-c31c1549.js');

class KupImage {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.src = '';
        this.alt = '';
        this.width = 64;
        this.height = 64;
    }
    render() {
        let badgesElem = null;
        if (this.badges) {
            badgesElem = this.badges.map((badge) => {
                return (__chunk_1.h("kup-badge", { text: badge.text, position: badge.position, icon: badge.icon }));
            });
        }
        const wrapperStyle = {
            width: `${this.width}px`,
            height: `${this.height}px`,
        };
        return (__chunk_1.h("div", { id: "image-wrapper", style: wrapperStyle }, __chunk_1.h("img", { src: this.src, alt: this.alt }), badgesElem));
    }
    static get style() { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);*{-webkit-box-sizing:border-box;box-sizing:border-box}#image-wrapper{position:relative;display:inline-block}#image-wrapper img{width:100%;height:100%}"; }
}

class KupProgressBar {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.value = 0;
        this.hideLabel = false;
    }
    render() {
        const valueStyle = {
            width: `${this.value}%`,
        };
        let label = null;
        if (!this.hideLabel) {
            if (this.labelText) {
                label = this.labelText;
            }
            else {
                label = this.value + '%';
            }
        }
        return (__chunk_1.h("div", { id: "progress-bar" }, __chunk_1.h("div", { id: "progress-bar-percentage", style: valueStyle }, __chunk_1.h("span", null, label))));
    }
    static get style() { return ":host{--pgb_background-color:var(--kup-pb_background-color,#ccc);--pgb_foreground-color:var(--kup-pb_foreground-color,#3063a5);--pgb_text-color:var(--kup-pb_text-color,#fff)}#progress-bar{width:100%;background:var(--pgb_background-color);position:relative;border-radius:5px}#progress-bar #progress-bar-percentage{background:var(--pgb_foreground-color);padding:5px 0;color:#fff;text-align:center;height:18px;border-radius:5px}#progress-bar #progress-bar-percentage span{display:inline-block;position:absolute;width:100%;left:0;line-height:18px;font-size:12px}"; }
}

exports.kup_image = KupImage;
exports.kup_progress_bar = KupProgressBar;
