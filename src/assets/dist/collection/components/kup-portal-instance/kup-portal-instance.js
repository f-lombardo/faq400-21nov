export class KupPortalInstance {
    constructor() {
        this.additionalAdoptedStyleSheets = [];
        /**
         * Specifies if the current portal instance should be displayed or not.
         */
        this.isVisible = false;
        /**
         * Virtual node list the KetchupPortalInstance must render
         */
        this.vNodes = null;
        this.initialStyleSheets = [];
    }
    //---- Life cycle ----
    componentWillRender() {
        // Avoid an error when there is no given style node
        if (!this.port.shadowRoot.querySelector('style[data-portal-style]') && this.styleNode) {
            this.port.shadowRoot.insertBefore(this.styleNode, this.port.shadowRoot.querySelector('style'));
        }
    }
    componentDidUpdate() {
        // If there are adopted style sheets to be added to the portal instance, we set those after the rendering
        // This is because if set before the render there is no already set portal-instance style sheet.
        if (this.additionalAdoptedStyleSheets && this.additionalAdoptedStyleSheets.length) {
            // The first style sheet is always the one of the portal itself so it must be preserved.
            this.port.shadowRoot.adoptedStyleSheets = [this.port.shadowRoot.adoptedStyleSheets[0], ...this.additionalAdoptedStyleSheets];
        }
    }
    //---- Rendering functions ----
    // This is portal component, which does not need any rendering
    render() {
        return this.vNodes;
    }
    static get is() { return "kup-portal-instance"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-portal-instance.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-portal-instance.css"]
    }; }
    static get properties() { return {
        "additionalAdoptedStyleSheets": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "CSSStyleSheet[]",
                "resolved": "CSSStyleSheet[]",
                "references": {
                    "CSSStyleSheet": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "isVisible": {
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
                "text": "Specifies if the current portal instance should be displayed or not."
            },
            "attribute": "is-visible",
            "reflect": true,
            "defaultValue": "false"
        },
        "styleNode": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLStyleElement",
                "resolved": "HTMLStyleElement",
                "references": {
                    "HTMLStyleElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "A style node to be copied into the KetchupPortalInstance"
            }
        },
        "vNodes": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "JSX.Element[] | JSX.Element",
                "resolved": "Element | Element[]",
                "references": {
                    "JSX": {
                        "location": "import",
                        "path": "@stencil/core"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Virtual node list the KetchupPortalInstance must render"
            },
            "defaultValue": "null"
        }
    }; }
    static get elementRef() { return "port"; }
}
