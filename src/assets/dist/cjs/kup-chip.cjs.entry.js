'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-c31c1549.js');

class KupChip {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.closable = false;
        this.disabled = false;
        this.close = __chunk_1.createEvent(this, "close", 7);
    }
    // ---- Listeners ----
    onCloseClicked() {
        if (!this.disabled) {
            this.close.emit();
        }
    }
    render() {
        let close = null;
        if (this.closable) {
            close = (__chunk_1.h("svg", { version: "1.1", width: "16", height: "16", viewBox: "0 0 24 24", "aria-hidden": "false", onClick: () => this.onCloseClicked() }, __chunk_1.h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })));
        }
        const chipClass = {
            disabled: this.disabled,
        };
        return (__chunk_1.h("span", { id: "chip", class: chipClass, tabindex: "0", "aria-disabled": this.disabled ? 'true' : 'false' }, __chunk_1.h("span", { id: "content" }, __chunk_1.h("slot", null), close)));
    }
    static get style() { return ":host{--chi_color:var(--kup-chip_color,#1a1a1a);--chi_icon-color:var(--kup-chip_icon-color,#d91e18);--chi_icon-color-hover:var(--kup-chip_icon-color-hover,#f0423c);--chi_background:var(--kup-chip_background,#f0f0f0);--chi_background-hover:var(--kup-chip_background-hover,#e5e5e5);--chi_disabled-color:var(--kup-chip_disabled-color,#888)}#chip{background:var(--chi_background);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;vertical-align:middle;margin:4px;padding:4px;outline:none;cursor:default}#chip:not(.disabled):hover{background:var(--chi_background-hover)}#chip #content{margin:0 3px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;vertical-align:middle;-ms-flex-pack:justify;justify-content:space-between;color:var(--chi_color)}#chip #content svg{cursor:pointer;fill:var(--chi_icon-color);margin-left:4px}#chip #content svg:hover{fill:var(--chi_icon-color-hover)}#chip.disabled #content{color:var(--chi_disabled-color)}#chip.disabled #content svg{cursor:default;fill:var(--chi_disabled-color)}"; }
}

exports.kup_chip = KupChip;
