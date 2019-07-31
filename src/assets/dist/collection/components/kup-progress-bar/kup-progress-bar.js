import { h } from '@stencil/core';
export class KupProgressBar {
    constructor() {
        this.value = 0;
        this.hideLabel = false;
    }
    render() {
        const valueStyle = {
            width: `${this.value}%`,
        };
        let label = null;
        if (!this.hideLabel) {
            if (this.labelText) {
                label = this.labelText;
            }
            else {
                label = this.value + '%';
            }
        }
        return (h("div", { id: "progress-bar" },
            h("div", { id: "progress-bar-percentage", style: valueStyle },
                h("span", null, label))));
    }
    static get is() { return "kup-progress-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-progress-bar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-progress-bar.css"]
    }; }
    static get properties() { return {
        "value": {
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
                "text": ""
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "0"
        },
        "labelText": {
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
                "text": ""
            },
            "attribute": "label-text",
            "reflect": false
        },
        "hideLabel": {
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
                "text": ""
            },
            "attribute": "hide-label",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
}
