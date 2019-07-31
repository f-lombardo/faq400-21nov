import { h } from '@stencil/core';
export class KupHtml {
    constructor() {
        /**
         * The label to show when button isButton is active
         */
        this.label = 'Open in a new window';
        /**
         * If true, the kup-html takes the shape of a button
         */
        this.isButton = false;
        /**
         * The address which must be referenced by the iframe
         */
        this.src = '';
    }
    onFrameError() {
        this.ketchupHtmlError.emit();
    }
    onFrameLoaded() {
        this.ketchupHtmlLoaded.emit();
    }
    //---- Rendering functions ----
    render() {
        return !this.isButton ?
            h("iframe", { class: "ketchup-frame", onError: this.onFrameError.bind(this), onLoad: this.onFrameLoaded.bind(this), src: this.src }) :
            h("a", { "aria-label": this.label, href: this.src, rel: "noopener", target: "_blank" },
                h("kup-button", { align: "right", iconClass: "mdi mdi-open-in-new", label: this.label }));
    }
    static get is() { return "kup-html"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-html.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-html.css"]
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
                "text": "The label to show when button isButton is active"
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "'Open in a new window'"
        },
        "isButton": {
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
                "text": "If true, the kup-html takes the shape of a button"
            },
            "attribute": "is-button",
            "reflect": true,
            "defaultValue": "false"
        },
        "src": {
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
                "text": "The address which must be referenced by the iframe"
            },
            "attribute": "src",
            "reflect": false,
            "defaultValue": "''"
        }
    }; }
    static get events() { return [{
            "method": "ketchupHtmlError",
            "name": "ketchupHtmlError",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When loading the frame has thrown an error"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "ketchupHtmlLoaded",
            "name": "ketchupHtmlLoaded",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When the iframe has been loaded"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
}
