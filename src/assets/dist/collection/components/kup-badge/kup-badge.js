import { h, Host } from '@stencil/core';
import { BadgePosition } from './kup-badge-declarations';
export class KupBadge {
    constructor() {
        this.position = BadgePosition.TOP_RIGHT;
    }
    render() {
        const text = this.text || '';
        const isTopRight = BadgePosition.TOP_RIGHT === this.position;
        const isBottomRight = BadgePosition.BOTTOM_RIGHT === this.position;
        const isBottomLeft = BadgePosition.BOTTOM_LEFT === this.position;
        const hostClass = {
            'top-left': !isTopRight && !isBottomRight && !isBottomLeft,
            'top-right': isTopRight,
            'bottom-right': isBottomRight,
            'bottom-left': isBottomLeft,
        };
        const badgeClass = {};
        if (!text && this.icon) {
            badgeClass[this.icon] = true;
        }
        return (h(Host, { class: hostClass },
            h("div", { id: "badge", class: badgeClass }, text)));
    }
    static get is() { return "kup-badge"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-badge.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-badge.css"]
    }; }
    static get properties() { return {
        "text": {
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
            "attribute": "text",
            "reflect": false
        },
        "position": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "BadgePosition",
                "resolved": "BadgePosition.BOTTOM_LEFT | BadgePosition.BOTTOM_RIGHT | BadgePosition.TOP_LEFT | BadgePosition.TOP_RIGHT",
                "references": {
                    "BadgePosition": {
                        "location": "import",
                        "path": "./kup-badge-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "position",
            "reflect": false,
            "defaultValue": "BadgePosition.TOP_RIGHT"
        },
        "icon": {
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
            "attribute": "icon",
            "reflect": false
        }
    }; }
}
