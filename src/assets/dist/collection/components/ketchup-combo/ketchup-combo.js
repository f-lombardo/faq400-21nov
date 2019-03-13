import { eventFromElement } from "../../utils/utils";
export class KetchupCombo {
    constructor() {
        this.displayedField = 'id';
        this.initialValue = '';
        this.isClearable = false;
        this.items = [];
        this.label = '';
        this.value = '';
        this.filter = '';
        this.isOpen = false;
        this.clickFunction = this.onDocumentClick.bind(this);
        this.comboPosition = {
            isRight: false,
            isTop: false
        };
        this.baseClass = 'ketchup-combo';
    }
    componentDidLoad() {
        document.addEventListener('click', this.clickFunction);
    }
    componentDidUnload() {
        document.removeEventListener('click', this.clickFunction);
    }
    closeCombo() {
        this.isOpen = false;
    }
    openCombo() {
        this.comboPosition = this.calcBoxPosition();
        this.isOpen = true;
    }
    reflectInitialValue(newValue) {
        this.value = newValue;
    }
    calcBoxPosition() {
        const windowX = window.innerWidth;
        const windowY = window.innerHeight;
        const { height, left, top, width } = this.comboText.getBoundingClientRect();
        return {
            isRight: left + width / 2 > windowX / 2,
            isTop: top + height / 2 > windowY / 2
        };
    }
    onClearClick() {
        this.value = '';
        this.selected = null;
        this.onComboSelected(null);
    }
    onComboClick() {
        this.openCombo();
    }
    onDocumentClick(event) {
        try {
            if (event.composedPath().indexOf(this.comboEl) < 0) {
                this.closeCombo();
            }
        }
        catch (e) {
            const ele = event.target;
            if (!eventFromElement(this.comboEl, ele)) {
                this.closeCombo();
            }
        }
    }
    onFilterUpdate(event) {
        this.filter = event.detail.newValue.toLowerCase();
    }
    onItemSelected(item) {
        if (item[this.displayedField] !== this.value) {
            this.onComboSelected(item);
            this.selected = item;
            this.value = item[this.displayedField];
        }
        this.closeCombo();
    }
    onComboSelected(item) {
        this.ketchupComboSelected.emit({
            newValue: item,
        });
    }
    render() {
        const containerClass = this.baseClass + '__container';
        return ([
            h("div", { class: containerClass + (this.isClearable ? ' ' + containerClass + '--clearable' : ''), ref: (el) => this.comboText = el },
                h("span", { class: this.baseClass + '__current-value', onClick: this.onComboClick.bind(this) },
                    this.value,
                    h("svg", { class: this.baseClass + '__icon ' + this.baseClass + '__chevron' + (this.isOpen ? ' ' + this.baseClass + '__chevron--open' : ''), viewBox: "0 0 24 24" },
                        h("path", { d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" }))),
                this.isClearable ?
                    h("button", { "aria-label": "Close", class: this.baseClass + '__clear', role: "button", onClick: this.onClearClick.bind(this) },
                        h("svg", { class: this.baseClass + '__icon', viewBox: "0 0 24 24" },
                            h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }))) :
                    null),
            h("div", { class: this.baseClass + '__menu' + (this.isOpen ? ' is-open' : '') +
                    (this.comboPosition.isRight ? ' is-right' : '') + (this.comboPosition.isTop ? ' is-top' : '') },
                h("div", null,
                    h("ketchup-text-input", { onKetchupTextInputUpdated: this.onFilterUpdate.bind(this) })),
                h("ul", { class: this.baseClass + '__list' }, this.items.filter(item => !this.filter || item[this.displayedField].toLowerCase().indexOf(this.filter) >= 0)
                    .map(item => h("li", { onClick: () => this.onItemSelected(item) },
                    h("span", null, item[this.displayedField])))))
        ]);
    }
    static get is() { return "ketchup-combo"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "closeCombo": {
            "method": true
        },
        "comboEl": {
            "elementRef": true
        },
        "displayedField": {
            "type": String,
            "attr": "displayed-field"
        },
        "filter": {
            "state": true
        },
        "initialValue": {
            "type": String,
            "attr": "initial-value",
            "watchCallbacks": ["reflectInitialValue"]
        },
        "isClearable": {
            "type": Boolean,
            "attr": "is-clearable"
        },
        "isOpen": {
            "state": true
        },
        "items": {
            "type": "Any",
            "attr": "items"
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "openCombo": {
            "method": true
        },
        "value": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "ketchupComboSelected",
            "method": "ketchupComboSelected",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ketchup-combo:**/"; }
}
