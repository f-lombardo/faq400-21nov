import { h } from '@stencil/core';
export class KupChip {
    constructor() {
        this.closable = false;
        this.disabled = false;
    }
    // ---- Listeners ----
    onCloseClicked() {
        if (!this.disabled) {
            this.close.emit();
        }
    }
    render() {
        let close = null;
        if (this.closable) {
            close = (h("svg", { version: "1.1", width: "16", height: "16", viewBox: "0 0 24 24", "aria-hidden": "false", onClick: () => this.onCloseClicked() },
                h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })));
        }
        const chipClass = {
            disabled: this.disabled,
        };
        return (h("span", { id: "chip", class: chipClass, tabindex: "0", "aria-disabled": this.disabled ? 'true' : 'false' },
            h("span", { id: "content" },
                h("slot", null),
                close)));
    }
    static get is() { return "kup-chip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-chip.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-chip.css"]
    }; }
    static get properties() { return {
        "closable": {
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
            "attribute": "closable",
            "reflect": false,
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
                "text": ""
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get events() { return [{
            "method": "close",
            "name": "close",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
}
