import { h } from '../mycomponent.core.js';

import { a as generateUniqueId } from './chunk-cc6d1815.js';

function KetchupRadioElementFactory() {
    return {
        label: '',
        value: ''
    };
}

class KupRadio {
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
    static get style() { return ".sc-kup-radio-h{--rad_font-size:var(--kup-radio_font-size,14px);--rad_border-color:var(--kup-radio_border-color,grey);--rad_border-color--selected:var(--kup-radio_border-color,#676767);--rad_color:var(--kup-radio_color,#4e908f);--rad_tr-duration:var(--kup-radio_transition-duration,0.6s)}.kup-radio__group.sc-kup-radio{list-style-type:none;margin:0;padding:0;position:relative;z-index:0}.kup-radio__group.kup-radio__group--horizontal.sc-kup-radio{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.kup-radio__item.sc-kup-radio{display:-ms-flexbox;display:flex;margin:10px 12px}.kup-radio__item.sc-kup-radio, .kup-radio__item.sc-kup-radio > div.sc-kup-radio{-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:relative;z-index:0}.kup-radio__item.sc-kup-radio > div.sc-kup-radio{display:-ms-inline-flexbox;display:inline-flex;height:calc(var(--rad_font-size) * 1.4);width:calc(var(--rad_font-size) * 1.4)}.kup-radio__item.sc-kup-radio > div.sc-kup-radio:after, .kup-radio__item.sc-kup-radio > div.sc-kup-radio:before{border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;content:\"\"}.kup-radio__item.sc-kup-radio > div.sc-kup-radio:before{border:1px solid var(--rad_border-color);height:100%;left:0;position:absolute;top:0;-webkit-transition:border-color var(--rad_tr-duration);transition:border-color var(--rad_tr-duration);width:100%;z-index:0}.kup-radio__item.sc-kup-radio > div.sc-kup-radio:after{background-color:var(--rad_color);height:calc(100% - 6px);position:relative;opacity:0;-webkit-transition:opacity var(--rad_tr-duration);transition:opacity var(--rad_tr-duration);width:calc(100% - 6px);z-index:1}.kup-radio__item.sc-kup-radio > div.sc-kup-radio > input.sc-kup-radio{cursor:pointer;height:100%;left:0;margin:0;opacity:0;position:absolute;top:0;width:100%;z-index:2}.kup-radio__item--selected.sc-kup-radio   div.sc-kup-radio:before{border-color:var(--rad_border-color--selected)}.kup-radio__item--selected.sc-kup-radio   div.sc-kup-radio:after{opacity:1}.kup-radio__item.sc-kup-radio   label.sc-kup-radio{cursor:pointer;font-size:var(--rad_font-size);margin-left:10px}"; }
}

export { KupRadio };