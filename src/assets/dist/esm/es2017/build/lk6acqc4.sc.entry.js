import { h } from '../mycomponent.core.js';

class KetchupButton {
    constructor() {
        this.flat = false;
        this.fillspace = false;
        this.showtext = true;
        this.showicon = true;
        this.rounded = false;
        this.transparent = false;
        this.btnStyle = {};
        this.iconUrl = 'https://cdn.materialdesignicons.com/3.2.89/css/materialdesignicons.min.css';
    }
    onBorderColorChange(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        if (this.transparent && this.borderColor) {
            const btnStyle = this.ketchupButtonEl.querySelector('button').style;
            btnStyle.borderColor = this.borderColor;
            btnStyle.color = this.borderColor;
        }
    }
    onStyleChanged(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        const btnStyle = this.ketchupButtonEl.querySelector('button').style;
        if (newValue.fontName) {
            btnStyle.fontFamily = newValue.fontName;
        }
        else {
            btnStyle.fontFamily = 'inherit';
        }
        if (newValue.fontColor) {
            btnStyle.color = newValue.fontColor;
        }
        if (newValue.bold) {
            btnStyle.fontWeight = 'bold';
        }
        else {
            btnStyle.fontWeight = 'inherit';
        }
    }
    onBtnClickedHandler() {
        this.ketchupButtonClicked.emit({ id: this.ketchupButtonEl.dataset.id });
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
        if ('Hint' === this.textmode) {
            title = this.label;
        }
        return (h("div", null,
            h("link", { href: this.iconUrl, rel: "stylesheet", type: "text/css" }),
            h("button", { class: btnClass, title: title, onClick: () => this.onBtnClickedHandler() },
                icon,
                btnLabel)));
    }
    static get is() { return "ketchup-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "align": {
            "type": String,
            "attr": "align"
        },
        "borderColor": {
            "type": String,
            "attr": "border-color",
            "watchCallbacks": ["onBorderColorChange"]
        },
        "btnStyle": {
            "type": "Any",
            "attr": "btn-style",
            "watchCallbacks": ["onStyleChanged"]
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
            "name": "ketchupButtonClicked",
            "method": "ketchupButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".fillspace.sc-ketchup-button-h{width:100%}button.sc-ketchup-button{background:#4e908f;border:none;color:#fff;border-radius:2px;-webkit-box-shadow:none;box-shadow:none;white-space:nowrap;padding:0 8px;line-height:30px;cursor:pointer;text-align:center}button.sc-ketchup-button:hover{-webkit-box-shadow:2px 2px 5px 1px hsla(0,0%,39.2%,.7);box-shadow:2px 2px 5px 1px hsla(0,0%,39.2%,.7)}button.sc-ketchup-button > .button-icon.sc-ketchup-button{float:left;display:block;width:18px}button.rounded.sc-ketchup-button{border-radius:50%}button.transparent.sc-ketchup-button{background-color:transparent;border:1px solid grey;color:grey}button.btn-info.sc-ketchup-button{background:#6a8fd1}button.btn-danger.sc-ketchup-button{background:#f0423c}button.btn-danger.sc-ketchup-button:hover{background:#d91e18}button.btn-warning.sc-ketchup-button{background:#ffd454}button.btn-selected.sc-ketchup-button{background:#ffc107}button.flat-btn.sc-ketchup-button{background:none;border:none;color:#4e908f}button.flat-btn.sc-ketchup-button:hover{-webkit-box-shadow:none;box-shadow:none}button.flat-btn.sc-ketchup-button   .button-text.sc-ketchup-button{text-decoration:underline}button.align-right.sc-ketchup-button{text-align:right}button.align-right.sc-ketchup-button > .button-icon.sc-ketchup-button{float:right}button.align-left.sc-ketchup-button{text-align:left}button.fillspace.sc-ketchup-button{width:100%}"; }
}

export { KetchupButton };
