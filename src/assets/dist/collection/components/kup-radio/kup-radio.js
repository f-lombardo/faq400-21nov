import { h } from '@stencil/core';
import { generateUniqueId } from "../../utils/utils";
import { KetchupRadioElementFactory } from "./kup-radio-declarations";
export class KupRadio {
    constructor() {
        /**
         * Label to describe the radio group
         */
        this.label = '';
        /**
         * Direction in which the radio elements must be placed
         */
        this.direction = 'horizontal';
        /**
         * Chooses which field of an item object should be used to create the list and be filtered.
         */
        this.displayedField = 'id';
        /**
         * Allows to pass an initial selected item for the Radio group
         */
        this.initialValue = KetchupRadioElementFactory();
        /**
         * Radio elements to display
         */
        this.items = [];
        /**
         * Radio elements value
         */
        this.radioName = '';
        /**
         * Chooses which field of an item object should be used to create the list and be filtered.
         */
        this.valueField = 'id';
        //---- Internal state ----
        this.selectedRadio = null;
    }
    //---- Validating props ----
    checkDirection(newVal) {
        if (!/horizontal|vertical/.test(newVal)) {
            throw new Error('kup-radio: direction must be horizontal or vertical.');
        }
    }
    //---- Lifecycle Hooks ----
    componentWillLoad() {
        // When the component is going to be loaded, if there is an initial value set, we can reflect it to internal state
        // This is used because when component is instantiated it does NOT run watchers.
        this.reflectInitialValue(this.initialValue);
    }
    //---- Private methods ----
    // Always reflect changes of initialValue to value element
    reflectInitialValue(newValue, oldValue) {
        // When a new initial value is passed, we control that the new item is different from the old one before updating the state
        if (!oldValue || newValue[this.valueField] !== oldValue[this.valueField]) {
            this.onRadioChanged(newValue);
        }
    }
    // Typing for input element UIEvent & {target: HTMLInputElement}
    onRadioChanged(radio) {
        this.ketchupRadioChanged.emit({
            value: radio,
            oldValue: this.selectedRadio,
            info: {}
        });
        this.selectedRadio = radio;
    }
    //---- Rendering functions ----
    radioElementsComposer() {
        return this.items.map((radio) => {
            // The id is necessary for the label to be associated with the input
            // TODO Anyway this can be extracted into another map object to avoid creating a new id each time the component is painted.
            const uId = generateUniqueId(radio[this.valueField]);
            return h("li", { class: 'kup-radio__item' + (this.selectedRadio && this.selectedRadio[this.valueField] === radio[this.valueField] ? ' kup-radio__item--selected' : '') },
                h("div", null,
                    h("input", { id: uId, type: "radio", name: this.radioName, value: radio[this.valueField], onChange: this.onRadioChanged.bind(this, radio) })),
                h("label", { htmlFor: uId }, radio[this.displayedField]));
        });
    }
    render() {
        let classRadioGroup = 'kup-radio__group';
        // When direction is horizontal
        if (this.direction === 'horizontal') {
            classRadioGroup += ' kup-radio__group--horizontal';
        }
        return (h("div", null,
            this.label ? h("p", null, this.label) : null,
            h("ul", { class: classRadioGroup }, this.radioElementsComposer())));
    }
    static get is() { return "kup-radio"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-radio.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-radio.css"]
    }; }
    static get properties() { return {
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
                "text": "Label to describe the radio group"
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "''"
        },
        "direction": {
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
                "text": "Direction in which the radio elements must be placed"
            },
            "attribute": "direction",
            "reflect": false,
            "defaultValue": "'horizontal'"
        },
        "displayedField": {
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
                "text": "Chooses which field of an item object should be used to create the list and be filtered."
            },
            "attribute": "displayed-field",
            "reflect": false,
            "defaultValue": "'id'"
        },
        "initialValue": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "KetchupRadioElement",
                "resolved": "KetchupRadioElement",
                "references": {
                    "KetchupRadioElement": {
                        "location": "import",
                        "path": "./kup-radio-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Allows to pass an initial selected item for the Radio group"
            },
            "defaultValue": "KetchupRadioElementFactory()"
        },
        "items": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "KetchupRadioElement[]",
                "resolved": "KetchupRadioElement[]",
                "references": {
                    "KetchupRadioElement": {
                        "location": "import",
                        "path": "./kup-radio-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Radio elements to display"
            },
            "defaultValue": "[]"
        },
        "radioName": {
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
                "text": "Radio elements value"
            },
            "attribute": "radio-name",
            "reflect": false,
            "defaultValue": "''"
        },
        "valueField": {
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
                "text": "Chooses which field of an item object should be used to create the list and be filtered."
            },
            "attribute": "value-field",
            "reflect": false,
            "defaultValue": "'id'"
        }
    }; }
    static get states() { return {
        "selectedRadio": {}
    }; }
    static get events() { return [{
            "method": "ketchupRadioChanged",
            "name": "ketchupRadioChanged",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When currently selected radio button has been changed."
            },
            "complexType": {
                "original": "KetchupRadioChangeEvent",
                "resolved": "KupPayloadEvent<any, GenericObject>",
                "references": {
                    "KetchupRadioChangeEvent": {
                        "location": "import",
                        "path": "./kup-radio-declarations"
                    }
                }
            }
        }]; }
    static get watchers() { return [{
            "propName": "direction",
            "methodName": "checkDirection"
        }, {
            "propName": "initialValue",
            "methodName": "reflectInitialValue"
        }]; }
}
