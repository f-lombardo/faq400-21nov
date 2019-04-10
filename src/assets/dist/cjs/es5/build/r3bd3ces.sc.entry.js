"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
var mycomponent_core_js_1 = require("../mycomponent.core.js");
var chunk_31f65c6e_js_1 = require("./chunk-31f65c6e.js");
var chunk_b401efdc_js_1 = require("./chunk-b401efdc.js");
var KetchupCombo = function () { function e() { this.displayedField = "id", this.valueField = "id", this.initialValue = "", this.isClearable = !1, this.items = [], this.label = "", this.usePortal = !1, this.value = "", this.filter = "", this.isOpen = !1, this.portalRef = null, this.clickFunction = this.onDocumentClick.bind(this), this.comboPosition = { isRight: !1, isTop: !1 }, this.baseClass = "ketchup-combo"; } return e.prototype.componentWillLoad = function () { this.reflectInitialValue(this.initialValue); }, e.prototype.componentDidLoad = function () { document.addEventListener("click", this.clickFunction); }, e.prototype.componentDidUnload = function () { document.removeEventListener("click", this.clickFunction); }, e.prototype.closeCombo = function () { this.isOpen = !1; }, e.prototype.openCombo = function () { this.comboPosition = this.calcBoxPosition(), this.isOpen = !0; }, e.prototype.reflectInitialValue = function (e) { this.value = e[this.valueField], this.selected = e; }, e.prototype.reflectValueField = function (e) { this.value = this.selected ? this.selected[e] : ""; }, e.prototype.calcBoxPosition = function () { var e = document.documentElement.clientWidth, t = document.documentElement.clientHeight, i = this.comboText.getBoundingClientRect(); return { isRight: i.left + i.width / 2 > e / 2, isTop: i.top + i.height / 2 > t / 2 }; }, e.prototype.onClearClick = function () { this.value = "", this.selected = null, this.onComboSelected(null); }, e.prototype.onComboClick = function () { this.openCombo(); }, e.prototype.onDocumentClick = function (e) { return tslib_1.__awaiter(this, void 0, void 0, function () { var t, i; return tslib_1.__generator(this, function (o) { switch (o.label) {
    case 0: return t = null, this.usePortal ? [4, this.portalRef.getPortalInstance()] : [3, 2];
    case 1: t = o.sent(), o.label = 2;
    case 2:
        try {
            e.composedPath().indexOf(this.comboEl) < 0 && e.composedPath().indexOf(t) < 0 && this.closeCombo();
        }
        catch (o) {
            chunk_31f65c6e_js_1.b(this.comboEl, i = e.target) || chunk_31f65c6e_js_1.b(t, i) || this.closeCombo();
        }
        return [2];
} }); }); }, e.prototype.onFilterUpdate = function (e) { console.log(e), this.filter = e.detail.value.toLowerCase(); }, e.prototype.onItemSelected = function (e) { e[this.valueField] !== this.value && (this.onComboSelected(e), this.selected = e, this.value = e[this.valueField]), this.closeCombo(); }, e.prototype.onComboSelected = function (e) { this.ketchupComboSelected.emit({ value: e }); }, e.prototype.composeList = function () { var e = this; return mycomponent_core_js_1.h("div", { class: this.baseClass + "__menu" + (this.isOpen ? " is-open" : "") + (this.comboPosition.isRight ? " is-right" : "") + (this.comboPosition.isTop ? " is-top" : "") + (this.usePortal ? " is-using-portal" : "") }, mycomponent_core_js_1.h("div", { class: this.baseClass + "__filter" }, mycomponent_core_js_1.h("ketchup-text-input", { onKetchupTextInputUpdated: this.onFilterUpdate.bind(this) })), mycomponent_core_js_1.h("ul", { class: this.baseClass + "__list" }, this.items.filter(function (t) { return !e.filter || t[e.displayedField].toLowerCase().indexOf(e.filter) >= 0; }).map(function (t) { return mycomponent_core_js_1.h("li", { onClick: function () { return e.onItemSelected(t); } }, mycomponent_core_js_1.h("span", null, t[e.displayedField])); }))); }, e.prototype.render = function () { var e = this, t = this.baseClass + "__container"; return [mycomponent_core_js_1.h("div", { class: t + (this.isClearable ? " " + t + "--clearable" : ""), ref: function (t) { return e.comboText = t; } }, mycomponent_core_js_1.h("span", { class: this.baseClass + "__current-value", onClick: this.onComboClick.bind(this) }, this.selected[this.displayedField], mycomponent_core_js_1.h("svg", { class: this.baseClass + "__icon " + this.baseClass + "__chevron" + (this.isOpen ? " " + this.baseClass + "__chevron--open" : ""), viewBox: "0 0 24 24" }, mycomponent_core_js_1.h("path", { d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" }))), this.isClearable ? mycomponent_core_js_1.h("button", { "aria-label": "Close", class: this.baseClass + "__clear", role: "button", onClick: this.onClearClick.bind(this) }, mycomponent_core_js_1.h("svg", { class: this.baseClass + "__icon", viewBox: "0 0 24 24" }, mycomponent_core_js_1.h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }))) : null), this.usePortal ? mycomponent_core_js_1.h("ketchup-portal", { cssVarsRef: this.comboEl, isVisible: this.isOpen, mirroredCssVars: ["--cmb_menu-background", "--cmb_tr-duration"], nodes: this.composeList(), ref: function (t) { return e.portalRef = t; }, refOffset: chunk_b401efdc_js_1.b(this.comboEl, this.comboPosition), styleNode: this.comboEl.shadowRoot.querySelector("style") }) : this.composeList()]; }, Object.defineProperty(e, "is", { get: function () { return "ketchup-combo"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { closeCombo: { method: !0 }, comboEl: { elementRef: !0 }, displayedField: { type: String, attr: "displayed-field" }, filter: { state: !0 }, initialValue: { type: "Any", attr: "initial-value", watchCallbacks: ["reflectInitialValue"] }, isClearable: { type: Boolean, attr: "is-clearable" }, isOpen: { state: !0 }, items: { type: "Any", attr: "items" }, label: { type: String, attr: "label" }, openCombo: { method: !0 }, usePortal: { type: Boolean, attr: "use-portal" }, value: { state: !0 }, valueField: { type: String, attr: "value-field", watchCallbacks: ["reflectValueField"] } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "ketchupComboSelected", method: "ketchupComboSelected", bubbles: !0, cancelable: !1, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ".sc-ketchup-combo-h{--cmb_font-size:var(--kup-combo_input_font-size,14px);--cmb_border-color:var(--kup-combo_input_border-color,grey);--cmb_border-color--selected:var(--kup-combo_input_border-color,#676767);--cmb_tr-duration:var(--kup-combo_input_transition-duration,0.6s);--cmb_icon-color:var(--kup-combo_icon_color,grey);--cmb_icon-color--hover:var(--kup-combo_icon_color--hover,#676767);--cmb_menu-background:var(--kup-combo_menu_background,#fff);display:inline-block;position:relative;z-index:1}.ketchup-combo__container.sc-ketchup-combo{background-color:#fff;border:1px solid var(--cmb_border-color);border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-inline-flexbox;display:inline-flex;outline:none}.ketchup-combo__container.sc-ketchup-combo:focus, .ketchup-combo__container.sc-ketchup-combo:hover{border-color:var(--cmb_border-color--selected)}.ketchup-combo__icon.sc-ketchup-combo{fill:var(--cmb_icon-color);height:var(--cmb_font-size);-webkit-transition:fill var(--cmb_tr-duration),-webkit-transform var(--cmb_tr-duration);transition:fill var(--cmb_tr-duration),-webkit-transform var(--cmb_tr-duration);transition:fill var(--cmb_tr-duration),transform var(--cmb_tr-duration);transition:fill var(--cmb_tr-duration),transform var(--cmb_tr-duration),-webkit-transform var(--cmb_tr-duration);width:var(--cmb_font-size)}.ketchup-combo__current-value.sc-ketchup-combo{-ms-flex-align:center;align-items:center;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;font-size:var(--cmb_font-size);-ms-flex-pack:center;justify-content:center;padding:4px 6px}.ketchup-combo__chevron.sc-ketchup-combo{margin-left:16px}.ketchup-combo__chevron--open.sc-ketchup-combo{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.ketchup-combo__clear.sc-ketchup-combo{-ms-flex-align:center;align-items:center;background-color:transparent;border:none;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;margin:0;outline:none;padding:4px}.ketchup-combo__clear.sc-ketchup-combo:hover > svg.sc-ketchup-combo{fill:var(--cmb_icon-color--hover)}.ketchup-combo__menu.sc-ketchup-combo{background-color:var(--cmb_menu-background);border-radius:2px;-webkit-box-shadow:0 1px 5px rgba(0,0,0,.5);box-shadow:0 1px 5px rgba(0,0,0,.5);display:inline-block;left:0;opacity:0;position:absolute;-webkit-transition:opacity var(--cmb_tr-duration);transition:opacity var(--cmb_tr-duration);top:100%;visibility:hidden;z-index:1}.ketchup-combo__menu.is-open.sc-ketchup-combo{opacity:1;visibility:visible}.ketchup-combo__menu.is-top.sc-ketchup-combo{bottom:100%;top:auto}.ketchup-combo__menu.is-right.sc-ketchup-combo{left:auto;right:0}.ketchup-combo__menu.is-using-portal.sc-ketchup-combo{position:relative}.ketchup-combo__filter.sc-ketchup-combo{-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;padding:4px}.ketchup-combo__list.sc-ketchup-combo{display:block;list-style-type:none;padding:0;max-height:400px;margin:0;overflow:auto}.ketchup-combo__list.sc-ketchup-combo > li.sc-ketchup-combo{border-bottom:1px solid #e8eae9;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;display:block;padding:6px 8px 5px}.ketchup-combo__list.sc-ketchup-combo > li.is-selected.sc-ketchup-combo, .ketchup-combo__list.sc-ketchup-combo > li.sc-ketchup-combo:hover{background-color:#f0f0f0}.ketchup-combo__list.sc-ketchup-combo > li.sc-ketchup-combo:last-of-type{border-bottom:none}"; }, enumerable: !0, configurable: !0 }), e; }(), KetchupTextInput = function () { function e() { this.initialValue = "", this.isClearable = !1, this.label = "", this.maxLength = 524288, this.value = "", this.classInputText = "ketchup-input-text"; } return e.prototype.componentWillLoad = function () { this.value = this.initialValue; }, e.prototype.triggerFocus = function () { this.inputEl.focus(), this.textInput.focus(); }, e.prototype.onClearClick = function () { var e = this; this.value = "", setTimeout(function () { return e.triggerFocus(); }, 10); }, e.prototype.onKeyDown = function (e) { "Enter" === e.key && (e.preventDefault(), this.ketchupTextInputSubmit.emit({ value: this.value })); }, e.prototype.onInputBlurred = function (e) { var t = e.target; this.inputBlur.emit({ value: t.value, oldValue: this.value }), this.value = t.value; }, e.prototype.onInputFocused = function (e) { var t = e.target; this.inputFocused.emit({ value: t.value, oldValue: this.value }), this.value = t.value; }, e.prototype.onInputUpdated = function (e) { var t = e.target; this.ketchupTextInputUpdated.emit({ value: t.value, oldValue: this.value }), this.value = t.value; }, e.prototype.render = function () { var e = this, t = this.classInputText + "__container"; return mycomponent_core_js_1.h("div", { class: t + (this.isClearable ? " " + t + "--clearable" : "") }, mycomponent_core_js_1.h("input", { class: this.classInputText + (this.isClearable ? " " + this.classInputText + "--clearable" : ""), maxlength: this.maxLength, ref: function (t) { return e.textInput = t; }, tabindex: "0", value: this.value, onBlur: this.onInputBlurred.bind(this), onInput: this.onInputUpdated.bind(this), onFocus: this.onInputFocused.bind(this), onKeyDown: this.onKeyDown.bind(this) }), this.isClearable ? mycomponent_core_js_1.h("button", { "aria-label": "Close", class: this.classInputText + "__clear", role: "button", onClick: this.onClearClick.bind(this) }, mycomponent_core_js_1.h("svg", { viewBox: "0 0 24 24" }, mycomponent_core_js_1.h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }))) : null); }, Object.defineProperty(e, "is", { get: function () { return "ketchup-text-input"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { initialValue: { type: String, attr: "initial-value" }, inputEl: { elementRef: !0 }, isClearable: { type: Boolean, attr: "is-clearable" }, label: { type: String, attr: "label" }, maxLength: { type: Number, attr: "max-length" }, triggerFocus: { method: !0 }, value: { state: !0 } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function () { return [{ name: "ketchupTextInputBlurred", method: "inputBlur", bubbles: !0, cancelable: !1, composed: !0 }, { name: "ketchupTextInputFocused", method: "inputFocused", bubbles: !0, cancelable: !1, composed: !0 }, { name: "ketchupTextInputSubmit", method: "ketchupTextInputSubmit", bubbles: !0, cancelable: !1, composed: !0 }, { name: "ketchupTextInputUpdated", method: "ketchupTextInputUpdated", bubbles: !0, cancelable: !1, composed: !0 }]; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ".sc-ketchup-text-input-h{--int_font-size:var(--kup-text-input_font-size,14px);--int_border-color:var(--kup-text-input_border-color,grey);--int_border-color--selected:var(--kup-text-input_border-color--selected,#4e908f);--int_tr-duration:var(--kup-text-input_transition-duration,0.6s);--int_icon-color:var(--kup-text-input_icon-color,grey);--int_icon-color--hover:var(--kup-text-input_icon-color--hover,#676767);display:inline-block}.ketchup-input-text.sc-ketchup-text-input{background-color:#fff;border:1px solid var(--int_border-color);border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;outline:none;padding:4px 6px;position:relative;-webkit-transition:background-color var(--int_tr-duration);transition:background-color var(--int_tr-duration);z-index:0}.ketchup-input-text__container.sc-ketchup-text-input{display:inline-block;position:relative;z-index:0}.ketchup-input-text.sc-ketchup-text-input:focus, .ketchup-input-text.sc-ketchup-text-input:hover{border-color:var(--int_border-color--selected)}.ketchup-input-text--clearable.sc-ketchup-text-input{padding-right:calc(6px + 4px * 2 + var(--int_font-size))}.ketchup-input-text__clear.sc-ketchup-text-input{-ms-flex-align:center;align-items:center;background-color:transparent;border:none;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;margin:0;outline:none;padding:4px;position:absolute;right:6px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:1}.ketchup-input-text__clear.sc-ketchup-text-input > svg.sc-ketchup-text-input{fill:var(--int_icon-color);height:var(--int_font-size);-webkit-transition:fill var(--int_tr-duration);transition:fill var(--int_tr-duration);width:var(--int_font-size)}.ketchup-input-text__clear.sc-ketchup-text-input:hover > svg.sc-ketchup-text-input{fill:var(--int_icon-color--hover)}"; }, enumerable: !0, configurable: !0 }), e; }();
exports.KetchupCombo = KetchupCombo;
exports.KetchupTextInput = KetchupTextInput;
