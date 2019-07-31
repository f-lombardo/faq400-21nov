import { h } from '../mycomponent.core.js';

class KupButton {
    constructor() {
        this.flat = false;
        this.fillspace = false;
        this.showtext = true;
        this.showicon = true;
        this.rounded = false;
        this.transparent = false;
        this.iconUrl = 'https://cdn.materialdesignicons.com/3.2.89/css/materialdesignicons.min.css';
    }
    onBtnClickedHandler() {
        this.kupButtonClicked.emit({ id: this.ketchupButtonEl.dataset.id });
    }
    _isHint() {
        return 'Hint' === this.textmode;
    }
    render() {
        let btnLabel = null;
        if ((!this._isHint() || (this._isHint() && this.flat)) &&
            this.showtext &&
            this.label) {
            btnLabel = h("span", { class: "button-text" }, this.label);
        }
        let icon = null;
        if (this.showicon && this.iconClass) {
            icon = h("span", { class: 'button-icon ' + this.iconClass });
        }
        let btnClass = '';
        if (this.flat) {
            btnClass = 'flat-btn';
        }
        else {
            if (this.buttonClass) {
                btnClass += this.buttonClass;
            }
            if (this.rounded) {
                btnClass += ' rounded';
            }
            if (this.transparent) {
                btnClass += ' transparent';
            }
        }
        if (this.fillspace) {
            btnClass += ' fillspace';
        }
        if (this.align) {
            if ('right' === this.align) {
                btnClass += ' align-right';
            }
            else if ('left' === this.align) {
                btnClass += ' align-left';
            }
        }
        btnClass = btnClass.trim();
        let title = '';
        if (this._isHint()) {
            title = this.label;
        }
        return [
            h("link", { href: this.iconUrl, rel: "stylesheet", type: "text/css" }),
            h("button", { type: "button", class: btnClass, title: title, onClick: () => this.onBtnClickedHandler() },
                icon,
                btnLabel),
        ];
    }
    static get is() { return "kup-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "align": {
            "type": String,
            "attr": "align"
        },
        "buttonClass": {
            "type": String,
            "attr": "button-class"
        },
        "fillspace": {
            "type": Boolean,
            "attr": "fillspace"
        },
        "flat": {
            "type": Boolean,
            "attr": "flat"
        },
        "iconClass": {
            "type": String,
            "attr": "icon-class"
        },
        "iconUrl": {
            "type": String,
            "attr": "icon-url"
        },
        "ketchupButtonEl": {
            "elementRef": true
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "rounded": {
            "type": Boolean,
            "attr": "rounded"
        },
        "showicon": {
            "type": Boolean,
            "attr": "showicon"
        },
        "showtext": {
            "type": Boolean,
            "attr": "showtext"
        },
        "textmode": {
            "type": String,
            "attr": "textmode"
        },
        "transparent": {
            "type": Boolean,
            "attr": "transparent"
        }
    }; }
    static get events() { return [{
            "name": "kupButtonClicked",
            "method": "kupButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".sc-kup-button-h{--btn_font-style:var(--kup-button_font-style,\"normal\");--btn_font-size:var(--kup-button_font-size,14px);--btn_font-weight:var(--kup-button_font-weight,400);--btn_font-family:var(--kup-button_font-family,inherit);--btn_icon-size:var(--kup-button_icon-size,18px);--btn_main-color:var(--kup-button_main-color,#4e908f);--btn_text-color:var(--kup-button_text-color,#fff);--btn_text-color--transparent:var(--kup-button_text-color--transparent,grey);--btn_text-decoration:var(--kup-button_text-decoration,\"none\");--btn_icon-color:var(--kup-button_icon-color,#fff);--btn_icon--transparent:var(--kup-button_icon-color--transparent,grey);--btn_animation-duration:var(--kup-button_animation-duration,0.3s);--btn_border-color:var(--kup-button_border-color,#4e908f);--btn_opacity:var(--kup-button_opacity,1);--btn_box-shadow:var(--kup-button_box-shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5));--btn_border:var(--kup-button_border,none);--btn_color-info:var(--kup-color-info,#6a8fd1);--btn_color-danger:var(--kup-danger-danger,#f0423c);--btn_color-danger--hover:var(--kup-danger-color--hover,#d91e18);--btn_color-warning:var(--kup-info-color,#ffd454);--btn_color-selected:var(--kup-info-color,#ffc107)}.fillspace.sc-kup-button-h   button.sc-kup-button{width:100%}button.sc-kup-button{outline:none;opacity:var(--btn_opacity);background:var(--btn_main-color);border-radius:2px;border:var(--btn_border);-webkit-box-shadow:none;box-shadow:none;color:var(--btn_text-color);cursor:pointer;font-family:var(--btn_font-family);font-size:var(--btn_font-size);font-weight:var(--btn_font-weight);line-height:30px;padding:0 8px;text-align:center;-webkit-transition:opacity .2s ease-in-out,-webkit-box-shadow var(--btn_animation-duration);transition:opacity .2s ease-in-out,-webkit-box-shadow var(--btn_animation-duration);transition:box-shadow var(--btn_animation-duration),opacity .2s ease-in-out;transition:box-shadow var(--btn_animation-duration),opacity .2s ease-in-out,-webkit-box-shadow var(--btn_animation-duration);white-space:nowrap}button.sc-kup-button:hover{-webkit-box-shadow:var(--btn_box-shadow);box-shadow:var(--btn_box-shadow)}button.sc-kup-button > .button-icon.sc-kup-button{display:block;color:var(--btn_icon-color);fill:var(--btn_icon-color);float:left;width:var(--btn_icon-size)}button.sc-kup-button > .button-text.sc-kup-button{font-style:var(--btn_font-style);-webkit-text-decoration:var(--btn_text-decoration);text-decoration:var(--btn_text-decoration)}button.rounded.sc-kup-button{border-radius:15px}button.transparent.sc-kup-button{background-color:transparent;border:1px solid var(--btn_border-color);color:var(--btn_text-color--transparent)}button.transparent.sc-kup-button > .button-icon.sc-kup-button{color:var(--btn_icon-color--transparent);fill:var(--btn_icon-color--transparent)}button.btn-info.sc-kup-button{background:var(--btn_color-info)}button.btn-danger.sc-kup-button{background:var(--btn_color-danger)}button.btn-danger.sc-kup-button:hover{background:var(--btn_color-danger--hover)}button.btn-warning.sc-kup-button{background:var(--btn_color-warning)}button.btn-selected.sc-kup-button{background:var(--btn_color-selected)}button.flat-btn.sc-kup-button{background:none;border:none;color:var(--btn_main-color)}button.flat-btn.sc-kup-button:hover{-webkit-box-shadow:none;box-shadow:none}button.flat-btn.sc-kup-button   .button-text.sc-kup-button{text-decoration:underline}button.flat-btn.sc-kup-button > .button-icon.sc-kup-button{color:var(--btn_main-color);fill:var(--btn_main-color)}button.align-right.sc-kup-button{text-align:right}button.align-right.sc-kup-button > .button-icon.sc-kup-button{float:right}button.align-left.sc-kup-button{text-align:left}button.fillspace.sc-kup-button{width:100%}"; }
}

export { KupButton };