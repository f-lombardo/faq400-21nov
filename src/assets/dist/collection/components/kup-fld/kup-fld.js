import { h } from '@stencil/core';
import { generateUniqueId } from "../../utils/utils";
export class KupFld {
    constructor() {
        /**
         * Data the FLD must parse to fully be configured.
         * It must be either an Object or a JSON parsable string
         */
        this.config = '';
        /**
         * Chooses if there is the need to show the submit button or not
         */
        this.showSubmit = false;
        /**
         * Chooses the submit button label to show
         */
        this.submitLabel = '';
        /**
         * Chooses the submit button position
         */
        this.submitPos = 'right'; // "left / right / top"
        /**
         * Chooses the label to show
         * If set to empty or has only white space chars, the label get removed
         */
        this.label = ''; // Example "Insert user name"
        /**
         * Chooses label position
         */
        this.labelPos = 'left'; // 'left / right / top'
        /**
         * Unsupported props gets propagated down to dynamic component
         */
        this.propagate = {};
        /**
         * Other configurations
         */
        this.extensions = {};
        //-- Not reactive --
        this.radioGeneratedName = generateUniqueId('value');
        this.currentValue = null;
        this.previousValue = null;
        // Generates an instance of the event handler while binding the current component as its this value
        // This is done once per component to improve performance speed
        this.onChangeInstance = this.onChange.bind(this);
        this.onSubmitInstance = this.onSubmit.bind(this);
    }
    //-- Reflect config to internal state --
    updateInternalState() {
        // Controls type of data passed to the config parameter and if necessary parses it
        let currentData;
        if (typeof this.config === 'string' && this.config) {
            currentData = JSON.parse(this.config);
        }
        else {
            currentData = this.config;
        }
        // Assigns given values to the state
        const keys = Object.keys(currentData);
        let propagate = {};
        keys.forEach((key) => {
            // Detects if a given key is present in the component as a @State variable
            if (key in this) {
                this[key] = currentData[key];
            }
            else {
                // if key is not present, it will be passed down to the component
                propagate[key] = currentData[key];
            }
        });
        this.propagate = propagate;
    }
    //---- Life cycle hooks ----
    componentWillLoad() {
        // Mandatory, since on first render the watch directive will not be triggered
        // therefore preventing component to display data
        this.updateInternalState();
    }
    //---- Methods ----
    // When a change or update event must be launched as if it's coming from the Fld itself
    onChange(event) {
        const { value, info } = event.detail;
        this.ketchupFldChanged.emit({
            originalEvent: event,
            oldValue: this.currentValue,
            value,
            info,
        });
        this.previousValue = this.currentValue;
        this.currentValue = value;
    }
    // When a submit event must be launched as if it's coming from the Fld itself
    onSubmit(event) {
        this.ketchupFldSubmit.emit({
            originalEvent: event,
            value: this.currentValue,
            oldValue: this.previousValue,
            info: {
                obj: event.detail.info && event.detail.info.obj
                    ? event.detail.info.obj
                    : undefined,
            },
        });
    }
    //-- Public --
    /**
     * Provides an interface to get the current value programmatically
     * @method getCurrentValue
     * @returns {any}
     */
    async getCurrentValue() {
        return this.currentValue;
    }
    //---- Rendering functions ----
    render() {
        let toRender = [];
        const baseClass = 'kup-fld';
        let label = null;
        let submit = null;
        //-- Label --
        if (this.label.trim().length) {
            label = (h("label", { class: baseClass +
                    '__label' +
                    ' ' +
                    baseClass +
                    '--' +
                    this.labelPos }, this.label));
        }
        //-- Submit --
        if (this.showSubmit) {
            submit = (h("kup-button", { class: baseClass +
                    '__submit' +
                    ' ' +
                    baseClass +
                    '--' +
                    this.submitPos, label: this.submitLabel, onKupButtonClicked: this.onSubmitInstance }));
        }
        //-- If a component must be positioned on top of the dynamic one --
        const labelIsTop = this.labelPos === 'top';
        const submitIsTop = this.submitPos === 'top';
        if (labelIsTop || submitIsTop) {
            toRender.push(h("div", { class: baseClass + '__top-container' },
                labelIsTop && label ? label : null,
                submitIsTop && submit ? submit : null));
        }
        //-- Outputs the main dynamic component to render --
        if (!labelIsTop && label) {
            toRender.push(label);
        }
        /**
         * JSX dynamic component notation
         * @see: https://stackoverflow.com/questions/29875869/react-jsx-dynamic-component-name
         */
        let type = '';
        let confObj = {};
        switch (this.type) {
            case 'cmb':
                confObj.displayedField = 'value';
                confObj.valueField = 'value';
                confObj.onKetchupComboSelected = this.onChangeInstance;
                type = 'combo';
                break;
            case 'rad':
                confObj.valueField = 'obj';
                confObj.radioName = this.radioGeneratedName; // TODO this must be changed to use a proper data field
                confObj.onKetchupRadioChanged = this.onChangeInstance;
                type = 'radio';
                break;
            case 'itx':
            case 'Itx':
                confObj.onKetchupTextInputUpdated = this.onChangeInstance;
                // When FLD has the text form, it should submit also when a user presses Enter on the text field
                confObj.onKetchupTextInputSubmit = this.onSubmitInstance;
                type = 'text-input';
                break;
        }
        const $DynamicComponent = ('kup-' + type); // TODO check if there is a better typing
        toRender.push(h($DynamicComponent, Object.assign({ class: baseClass + '__component', items: this.data }, confObj, this.propagate)));
        if (!submitIsTop && submit) {
            toRender.push(submit);
        }
        return toRender;
    }
    static get is() { return "kup-fld"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-fld.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-fld.css"]
    }; }
    static get properties() { return {
        "config": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string | object",
                "resolved": "object | string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Data the FLD must parse to fully be configured.\nIt must be either an Object or a JSON parsable string"
            },
            "attribute": "config",
            "reflect": false,
            "defaultValue": "''"
        },
        "data": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Effective data to pass to the component"
            },
            "attribute": "data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "type": {},
        "showSubmit": {},
        "submitLabel": {},
        "submitPos": {},
        "label": {},
        "labelPos": {},
        "propagate": {},
        "extensions": {}
    }; }
    static get events() { return [{
            "method": "ketchupFldChanged",
            "name": "ketchupFldChanged",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Launched when the value of the current FLD changes."
            },
            "complexType": {
                "original": "KetchupFldChangeEvent",
                "resolved": "KetchupFldChangeEvent",
                "references": {
                    "KetchupFldChangeEvent": {
                        "location": "import",
                        "path": "./kup-fld-declarations"
                    }
                }
            }
        }, {
            "method": "ketchupFldSubmit",
            "name": "ketchupFldSubmit",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Launched when the FLD values are confirmed and a submit event is triggered."
            },
            "complexType": {
                "original": "KetchupFldSubmitEvent",
                "resolved": "KetchupFldSubmitEvent",
                "references": {
                    "KetchupFldSubmitEvent": {
                        "location": "import",
                        "path": "./kup-fld-declarations"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "getCurrentValue": {
            "complexType": {
                "signature": "() => Promise<string | object>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<string | object>"
            },
            "docs": {
                "text": "Provides an interface to get the current value programmatically",
                "tags": [{
                        "name": "method",
                        "text": "getCurrentValue"
                    }, {
                        "name": "returns",
                        "text": undefined
                    }]
            }
        }
    }; }
    static get watchers() { return [{
            "propName": "config",
            "methodName": "updateInternalState"
        }]; }
}
