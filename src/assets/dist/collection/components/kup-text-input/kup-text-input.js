import { generateUniqueId } from '../../utils/utils';
import { debounceEvent } from '../../utils/helpers';
export class KupTextInput {
    constructor() {
        this.initialValue = '';
        this.inputType = 'text';
        this.isClearable = false;
        this.label = '';
        this.maxLength = 524288;
        this.debounce = 400;
        this.placeholder = '';
        this.value = '';
        this.elementId = generateUniqueId('kup-input');
        this.classInputText = 'kup-input-text';
    }
    debounceChanged() {
        this.ketchupTextInputUpdated = debounceEvent(this.ketchupTextInputUpdated, this.debounce);
    }
    componentWillLoad() {
        this.value = this.initialValue;
    }
    componentDidLoad() {
        this.debounceChanged();
    }
    triggerFocus() {
        this.inputEl.focus();
        this.textInput.focus();
    }
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
    render() {
        const containerClass = this.classInputText + '__container';
        let lbl = null;
        if (this.label) {
            lbl = h("label", { htmlFor: this.elementId }, this.label);
        }
        return (h("div", { class: containerClass +
                (this.isClearable
                    ? ' ' + containerClass + '--clearable'
                    : '') },
            lbl,
            h("input", { id: this.elementId, class: this.classInputText +
                    (this.isClearable
                        ? ' ' + this.classInputText + '--clearable'
                        : ''), maxlength: this.maxLength, ref: (el) => (this.textInput = el), tabindex: "0", type: this.inputType, value: this.value, onBlur: this.onInputBlurred.bind(this), onInput: this.onInputUpdated.bind(this), onFocus: this.onInputFocused.bind(this), onKeyDown: this.onKeyDown.bind(this), placeholder: this.placeholder }),
            this.isClearable ? (h("button", { "aria-label": "Close", class: this.classInputText + '__clear', role: "button", onClick: this.onClearClick.bind(this) },
                h("svg", { viewBox: "0 0 24 24" },
                    h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })))) : null));
    }
    static get is() { return "kup-text-input"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "debounce": {
            "type": Number,
            "attr": "debounce",
            "watchCallbacks": ["debounceChanged"]
        },
        "initialValue": {
            "type": String,
            "attr": "initial-value"
        },
        "inputEl": {
            "elementRef": true
        },
        "inputType": {
            "type": String,
            "attr": "input-type"
        },
        "isClearable": {
            "type": Boolean,
            "attr": "is-clearable"
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "maxLength": {
            "type": Number,
            "attr": "max-length"
        },
        "obj": {
            "type": "Any",
            "attr": "obj"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "triggerFocus": {
            "method": true
        },
        "value": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "ketchupTextInputBlurred",
            "method": "inputBlur",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "ketchupTextInputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "ketchupTextInputSubmit",
            "method": "ketchupTextInputSubmit",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "ketchupTextInputUpdated",
            "method": "ketchupTextInputUpdated",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:kup-text-input:**/"; }
}
