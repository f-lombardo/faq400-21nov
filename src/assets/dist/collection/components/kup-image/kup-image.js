import { h } from '@stencil/core';
export class KupImage {
    constructor() {
        this.src = '';
        this.alt = '';
        this.width = 64;
        this.height = 64;
    }
    render() {
        let badgesElem = null;
        if (this.badges) {
            badgesElem = this.badges.map((badge) => {
                return (h("kup-badge", { text: badge.text, position: badge.position, icon: badge.icon }));
            });
        }
        const wrapperStyle = {
            width: `${this.width}px`,
            height: `${this.height}px`,
        };
        return (h("div", { id: "image-wrapper", style: wrapperStyle },
            h("img", { src: this.src, alt: this.alt }),
            badgesElem));
    }
    static get is() { return "kup-image"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-image.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-image.css"]
    }; }
    static get properties() { return {
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
                "text": ""
            },
            "attribute": "src",
            "reflect": false,
            "defaultValue": "''"
        },
        "alt": {
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
            "attribute": "alt",
            "reflect": false,
            "defaultValue": "''"
        },
        "width": {
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
            "attribute": "width",
            "reflect": false,
            "defaultValue": "64"
        },
        "height": {
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
            "attribute": "height",
            "reflect": false,
            "defaultValue": "64"
        },
        "badges": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Badge[]",
                "resolved": "Badge[]",
                "references": {
                    "Badge": {
                        "location": "import",
                        "path": "./kup-image-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
}
