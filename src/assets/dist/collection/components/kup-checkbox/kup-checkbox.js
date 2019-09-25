import { Host, h } from '@stencil/core';
export class KupCheckbox {
    constructor() {
        /**
         * Sets the checkbox to be disabled
         */
        this.checked = false;
        /**
         * Sets the checkbox to be disabled
         *
         * Must have reflect into the attribute
         */
        this.disabled = false;
        /**
         * The label to set to the component
         */
        this.label = '';
        /**
         * Sets the tabindex of the checkbox
         */
        this.setTabIndex = 0;
    }
    //---- Methods ----
    //-- Events handlers --
    onCheckboxBlur() {
        this.kupCheckboxBlur.emit({ checked: !!this.checkbox.checked });
    }
    onCheckboxChange(e) {
        const newValue = !!e.target.checked;
        if (newValue !== this.checked) {
            this.checked = newValue;
            this.kupCheckboxChange.emit({
                checked: newValue,
            });
        }
    }
    onCheckboxFocus() {
        this.kupCheckboxFocus.emit({ checked: !!this.checkbox.checked });
    }
    onHostFocus() {
        if (this.checkbox) {
            this.checkbox.focus();
        }
    }
    //---- Lifecycle hooks ----
    render() {
        return (h(Host, { onFocus: this.onHostFocus.bind(this) },
            h("div", { class: "kup-checkbox" },
                h("input", { ref: (el) => this.checkbox = el, "aria-label": this.label ? this.label : null, checked: this.checked, disabled: this.disabled, tabindex: this.setTabIndex, type: "checkbox", onBlur: this.onCheckboxBlur.bind(this), onChange: this.onCheckboxChange.bind(this), onFocus: this.onCheckboxFocus.bind(this) }),
                h("span", { class: "kup-checkbox__check" }))));
    }
    static get is() { return "kup-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-checkbox.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-checkbox.css"]
    }; }
    static get properties() { return {
        "checked": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Sets the checkbox to be disabled"
            },
            "attribute": "checked",
            "reflect": true,
            "defaultValue": "false"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Sets the checkbox to be disabled\n\nMust have reflect into the attribute"
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The label to set to the component"
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "''"
        },
        "setTabIndex": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Sets the tabindex of the checkbox"
            },
            "attribute": "set-tab-index",
            "reflect": false,
            "defaultValue": "0"
        }
    }; }
    static get events() { return [{
            "method": "kupCheckboxBlur",
            "name": "kupCheckboxBlur",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fired when the checkbox input is blurred"
            },
            "complexType": {
                "original": "{\n        checked: boolean;\n    }",
                "resolved": "{ checked: boolean; }",
                "references": {}
            }
        }, {
            "method": "kupCheckboxChange",
            "name": "kupCheckboxChange",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fired when the checkbox input changes its value"
            },
            "complexType": {
                "original": "{\n        checked: boolean;\n    }",
                "resolved": "{ checked: boolean; }",
                "references": {}
            }
        }, {
            "method": "kupCheckboxFocus",
            "name": "kupCheckboxFocus",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Fired when the checkbox input receive focus"
            },
            "complexType": {
                "original": "{\n        checked: boolean;\n    }",
                "resolved": "{ checked: boolean; }",
                "references": {}
            }
        }]; }
}
