import { generateUniqueId } from "../../utils/utils";
export class KetchupRadio {
    constructor() {
        this.label = '';
        this.direction = 'horizontal';
        this.displayedField = 'id';
        this.items = [];
        this.radioName = '';
        this.valueField = 'id';
        this.selectedRadio = '';
    }
    checkDirection(newVal) {
        if (!/horizontal|vertical/.test(newVal)) {
            throw new Error('ketchup-radio: direction must be horizontal or vertical.');
        }
    }
    onRadioChanged(event) {
        const { target } = event;
        this.radioChanged.emit({
            target,
            newValue: target.value,
            oldValue: this.selectedRadio,
        });
        this.selectedRadio = target.value;
    }
    radioElementsComposer() {
        return this.items.map((radio) => {
            const uId = generateUniqueId(radio[this.valueField]);
            return h("li", { class: 'ketchup-radio__item' + (this.selectedRadio === radio[this.valueField] ? ' ketchup-radio__item--selected' : '') },
                h("div", null,
                    h("input", { id: uId, type: "radio", name: this.radioName, value: radio[this.valueField], onChange: this.onRadioChanged.bind(this) })),
                h("label", { htmlFor: uId }, radio[this.displayedField]));
        });
    }
    render() {
        let classRadioGroup = 'ketchup-radio__group';
        if (this.direction === 'horizontal') {
            classRadioGroup += ' ketchup-radio__group--horizontal';
        }
        return (h("div", null,
            this.label ? h("p", null, this.label) : null,
            h("ul", { class: classRadioGroup }, this.radioElementsComposer())));
    }
    static get is() { return "ketchup-radio"; }
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
            "method": "radioChanged",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ketchup-radio:**/"; }
}
