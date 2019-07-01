import { h } from '../mycomponent.core.js';

class KupProgressBar {
    constructor() {
        this.value = 0;
        this.label = '';
    }
    render() {
        const valueStyle = {
            width: `${this.value}%`,
        };
        return (h("div", { id: "progress-bar" },
            h("div", { id: "value", style: valueStyle }),
            h("div", { id: "label" }, this.label)));
    }
    static get is() { return "kup-progress-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "label": {
            "type": String,
            "attr": "label"
        },
        "value": {
            "type": Number,
            "attr": "value"
        }
    }; }
    static get style() { return ""; }
}

export { KupProgressBar };
