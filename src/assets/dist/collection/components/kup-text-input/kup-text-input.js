import { h } from '@stencil/core';
import { generateUniqueId } from '../../utils/utils';
import { debounceEvent } from '../../utils/helpers';
export class KupTextInput {
    constructor() {
        /**
         * Marks the field as clearable, allowing an icon to delete its content
         */
        this.initialValue = '';
        /**
         * Specify the type of input. Allowed values: password, text.
         */
        this.inputType = 'text';
        /**
         * Marks the field as clearable, allowing an icon to delete its content
         */
        this.isClearable = false;
        /**
         * Label to describe the text-input clear button group
         */
        this.label = '';
        /**
         * The max length of the text field.
         * Default value copied from here: https://www.w3schools.com/tags/att_input_maxlength.asp
         */
        this.maxLength = 524288;
        /**
         * Set the amount of time, in milliseconds, to wait to trigger the `ketchupTextInputUpdated` event after each keystroke.
         */
        this.debounce = 400;
        /**
         * text for input placeholder
         */
        this.placeholder = '';
        //-- Validating props --
        //---- Internal state ----
        this.value = '';
        this.elementId = generateUniqueId('kup-input');
        //-- Constants --
        this.classInputText = 'kup-input-text';
    }
    debounceChanged() {
        this.ketchupTextInputUpdated = debounceEvent(this.ketchupTextInputUpdated, this.debounce);
    }
    //---- Lifecycle Hooks  ----
    componentWillLoad() {
        // Sets initial value inside the element
        this.value = this.initialValue;
    }
    componentDidLoad() {
        this.debounceChanged();
    }
    //---- Public Methods ----
    /**
     * Triggers the focus event on the input text
     * @method triggerFocus
     */
    async triggerFocus() {
        // For focus issues, maybe have a look here
        // https://github.com/ionic-team/stencil/issues/180
        // https://github.com/ionic-team/stencil/issues/1008
        this.inputEl.focus();
        this.textInput.focus();
    }
    //---- Events and handlers ----
    /**
     * Clear the current content inside the the text input
     */
    onClearClick() {
        const oldValue = this.value;
        this.value = '';
        this.ketchupTextInputUpdated.emit({
            value: this.value,
            oldValue: oldValue,
            info: {
                obj: this.obj,
            },
        });
        setTimeout(() => this.triggerFocus(), 10);
    }
    /**
     * Listens for keydown events to get when 'Enter' is pressed, firing a submit event.
     */
    onKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.ketchupTextInputSubmit.emit({
                value: this.value,
                oldValue: this.value,
                info: {
                    obj: this.obj,
                },
            });
        }
    }
    onInputBlurred(event) {
        const { target } = event;
        this.inputBlur.emit({
            value: target.value,
            oldValue: this.value,
            info: {
                obj: this.obj,
            },
        });
        this.value = target.value;
        this.inputWrapperEl.classList.remove('focused');
    }
    onInputFocused(event) {
        const { target } = event;
        this.inputFocused.emit({
            value: target.value,
            oldValue: this.value,
            info: {
                obj: this.obj,
            },
        });
        this.value = target.value;
        this.inputWrapperEl.classList.add('focused');
    }
    onInputUpdated(event) {
        const { target } = event;
        this.ketchupTextInputUpdated.emit({
            value: target.value,
            oldValue: this.value,
            info: {
                obj: this.obj,
            },
        });
        this.value = target.value;
    }
    //---- Rendering functions ----
    render() {
        const containerClass = this.classInputText + '__container';
        let lbl = null;
        if (this.label) {
            lbl = h("label", { htmlFor: this.elementId }, this.label);
        }
        const inputWrapperClass = this.classInputText + '__input-wrapper';
        return (h("div", { class: containerClass +
                (this.isClearable
                    ? ' ' + containerClass + '--clearable'
                    : '') },
            lbl,
            h("div", { class: inputWrapperClass, ref: (el) => (this.inputWrapperEl = el) },
                h("slot", { name: "left" }),
                h("input", { id: this.elementId, class: this.classInputText, maxlength: this.maxLength, ref: (el) => (this.textInput = el), tabindex: "0", type: this.inputType, value: this.value, onBlur: this.onInputBlurred.bind(this), onInput: this.onInputUpdated.bind(this), onFocus: this.onInputFocused.bind(this), onKeyDown: this.onKeyDown.bind(this), placeholder: this.placeholder }),
                this.isClearable ? (h("button", { "aria-label": "Close", class: this.classInputText + '__clear', role: "button", onClick: this.onClearClick.bind(this) },
                    h("svg", { viewBox: "0 0 24 24" },
                        h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })))) : null)));
    }
    static get is() { return "kup-text-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-text-input.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-text-input.css"]
    }; }
    static get properties() { return {
        "initialValue": {
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
                "text": "Marks the field as clearable, allowing an icon to delete its content"
            },
            "attribute": "initial-value",
            "reflect": false,
            "defaultValue": "''"
        },
        "inputType": {
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
                "text": "Specify the type of input. Allowed values: password, text."
            },
            "attribute": "input-type",
            "reflect": false,
            "defaultValue": "'text'"
        },
        "isClearable": {
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
                "text": "Marks the field as clearable, allowing an icon to delete its content"
            },
            "attribute": "is-clearable",
            "reflect": false,
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
                "text": "Label to describe the text-input clear button group"
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "''"
        },
        "maxLength": {
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
                "text": "The max length of the text field.\nDefault value copied from here: https://www.w3schools.com/tags/att_input_maxlength.asp"
            },
            "attribute": "max-length",
            "reflect": false,
            "defaultValue": "524288"
        },
        "debounce": {
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
                "text": "Set the amount of time, in milliseconds, to wait to trigger the `ketchupTextInputUpdated` event after each keystroke."
            },
            "attribute": "debounce",
            "reflect": false,
            "defaultValue": "400"
        },
        "obj": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "GenericObject",
                "resolved": "GenericObject",
                "references": {
                    "GenericObject": {
                        "location": "import",
                        "path": "../../types/GenericTypes"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "A generic object which can be passed to the component.\nOnce this object is set, it will always be returned inside the info field of the\nketchupTextInputUpdated and ketchupTextInputSubmit."
            }
        },
        "placeholder": {
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
                "text": "text for input placeholder"
            },
            "attribute": "placeholder",
            "reflect": false,
            "defaultValue": "''"
        }
    }; }
    static get states() { return {
        "value": {}
    }; }
    static get events() { return [{
            "method": "inputBlur",
            "name": "ketchupTextInputBlurred",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When text field loses focus (blur)"
            },
            "complexType": {
                "original": "KetchupTextInputEvent",
                "resolved": "KupPayloadEvent<string, GenericObject>",
                "references": {
                    "KetchupTextInputEvent": {
                        "location": "import",
                        "path": "./kup-text-input-declarations"
                    }
                }
            }
        }, {
            "method": "inputFocused",
            "name": "ketchupTextInputFocused",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When the text input gains focus"
            },
            "complexType": {
                "original": "KetchupTextInputEvent",
                "resolved": "KupPayloadEvent<string, GenericObject>",
                "references": {
                    "KetchupTextInputEvent": {
                        "location": "import",
                        "path": "./kup-text-input-declarations"
                    }
                }
            }
        }, {
            "method": "ketchupTextInputSubmit",
            "name": "ketchupTextInputSubmit",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When a keydown enter event occurs it generates"
            },
            "complexType": {
                "original": "KetchupTextInputEvent",
                "resolved": "KupPayloadEvent<string, GenericObject>",
                "references": {
                    "KetchupTextInputEvent": {
                        "location": "import",
                        "path": "./kup-text-input-declarations"
                    }
                }
            }
        }, {
            "method": "ketchupTextInputUpdated",
            "name": "ketchupTextInputUpdated",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When the input text value gets updated"
            },
            "complexType": {
                "original": "KetchupTextInputEvent",
                "resolved": "KupPayloadEvent<string, GenericObject>",
                "references": {
                    "KetchupTextInputEvent": {
                        "location": "import",
                        "path": "./kup-text-input-declarations"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "triggerFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Triggers the focus event on the input text",
                "tags": [{
                        "name": "method",
                        "text": "triggerFocus"
                    }]
            }
        }
    }; }
    static get elementRef() { return "inputEl"; }
    static get watchers() { return [{
            "propName": "debounce",
            "methodName": "debounceChanged"
        }]; }
}
