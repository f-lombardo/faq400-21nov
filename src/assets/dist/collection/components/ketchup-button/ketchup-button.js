export class KetchupButton {
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
    static get style() { return "/**style-placeholder:ketchup-button:**/"; }
}
