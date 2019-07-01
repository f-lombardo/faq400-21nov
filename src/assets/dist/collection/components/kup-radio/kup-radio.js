import { generateUniqueId } from "../../utils/utils";
import { KetchupRadioElementFactory } from "./kup-radio-declarations";
export class KupRadio {
    constructor() {
        this.label = '';
        this.direction = 'horizontal';
        this.displayedField = 'id';
        this.initialValue = KetchupRadioElementFactory();
        this.items = [];
        this.radioName = '';
        this.valueField = 'id';
        this.selectedRadio = null;
    }
    checkDirection(newVal) {
        if (!/horizontal|vertical/.test(newVal)) {
            throw new Error('kup-radio: direction must be horizontal or vertical.');
        }
    }
    componentWillLoad() {
        this.reflectInitialValue(this.initialValue);
    }
    reflectInitialValue(newValue, oldValue) {
        if (!oldValue || newValue[this.valueField] !== oldValue[this.valueField]) {
            this.onRadioChanged(newValue);
        }
    }
    onRadioChanged(radio) {
        this.ketchupRadioChanged.emit({
            value: radio,
            oldValue: this.selectedRadio,
            info: {}
        });
        this.selectedRadio = radio;
    }
    radioElementsComposer() {
        return this.items.map((radio) => {
            const uId = generateUniqueId(radio[this.valueField]);
            return h("li", { class: 'kup-radio__item' + (this.selectedRadio && this.selectedRadio[this.valueField] === radio[this.valueField] ? ' kup-radio__item--selected' : '') },
                h("div", null,
                    h("input", { id: uId, type: "radio", name: this.radioName, value: radio[this.valueField], onChange: this.onRadioChanged.bind(this, radio) })),
                h("label", { htmlFor: uId }, radio[this.displayedField]));
        });
    }
    render() {
        let classRadioGroup = 'kup-radio__group';
        if (this.direction === 'horizontal') {
            classRadioGroup += ' kup-radio__group--horizontal';
        }
        return (h("div", null,
            this.label ? h("p", null, this.label) : null,
            h("ul", { class: classRadioGroup }, this.radioElementsComposer())));
    }
    static get is() { return "kup-radio"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "direction": {
            "type": String,
            "attr": "direction",
            "watchCallbacks": ["checkDirection"]
        },
        "displayedField": {
            "type": String,
            "attr": "displayed-field"
        },
        "initialValue": {
            "type": "Any",
            "attr": "initial-value",
            "watchCallbacks": ["reflectInitialValue"]
        },
        "items": {
            "type": "Any",
            "attr": "items"
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "radioName": {
            "type": String,
            "attr": "radio-name"
        },
        "selectedRadio": {
            "state": true
        },
        "valueField": {
            "type": String,
            "attr": "value-field"
        }
    }; }
    static get events() { return [{
            "name": "ketchupRadioChanged",
            "method": "ketchupRadioChanged",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:kup-radio:**/"; }
}
