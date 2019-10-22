import { setElementOffset } from "../../utils/offset";
export class KupPortal {
    constructor() {
        /**
         * Tells the portal instance if it can be visible or not
         */
        this.isVisible = false;
        /**
         * Array of custom css vars which needs to be mirrored. Their value is computed from cssVarsRef
         */
        this.mirroredCssVars = [];
        /**
         * Calculated offset of where the portal must be positioned
         */
        this.refOffset = {};
        /**
         * The HTML element on which the virtual node must be appended
         */
        this.portalRootNode = document.body;
        //---- Internal state ----
        this.instance = document.createElement('kup-portal-instance');
        this.supportsShadowRoot = false;
        this.supportsAdoptedStyle = false;
    }
    //---- Lifecycle ----
    // Initial operations
    componentWillLoad() {
        // Attach the created element to the designed father
        this.portalRootNode.appendChild(this.instance);
        // Controls if the browsers supports shadow root
        // https://wicg.github.io/construct-stylesheets/
        if (this.instance.shadowRoot) {
            // If it is supported, then stores the portal initial stylesheet
            this.supportsShadowRoot = true;
            // and Construtable Stylesheet Objects
            if ('adoptedStyleSheets' in this.instance.shadowRoot) {
                this.supportsAdoptedStyle = true;
            }
        }
    }
    // Actual operations on the elements to update the portal instance
    // Migrated this hook from componentWillUpdate to componentWillRender
    // https://stenciljs.com/docs/component-lifecycle#componentwillrender-
    // Used this hook because during its execution props will held the new value
    // While componentWillUpdate does not have the correct value inside the props.
    componentDidUpdate() {
        // Updates tree node
        this.instance.vNodes = this.nodes;
        // Creates style node
        if (this.styleNode) {
            const styleNode = this.styleNode.cloneNode(true);
            styleNode.setAttribute('data-portal-style', 'true');
            this.instance.styleNode = styleNode;
        }
        else if (this.portalParentRef && this.supportsAdoptedStyle) {
            this.instance.additionalAdoptedStyleSheets = this.portalParentRef.shadowRoot.adoptedStyleSheets.slice();
        }
        // Sets new position
        setElementOffset(this.instance, this.refOffset);
        // Sets visibility
        this.instance.isVisible = this.isVisible;
        this.computeCssVars(this.portalParentRef, this.mirroredCssVars);
    }
    // Before being unmounted
    componentDidUnload() {
        this.portalRootNode.removeChild(this.instance);
    }
    //---- Watchers ----
    onPortalRootNodeChange(newValue) {
        newValue.appendChild(this.instance);
    }
    //---- Methods ----
    computeCssVars(el, props) {
        if (window) {
            const computed = window.getComputedStyle(el);
            props.forEach(prop => {
                this.instance.style.setProperty(prop, computed.getPropertyValue(prop));
            });
        }
    }
    /**
     * Returns the root node instance of the KetchupPortalInstance element
     */
    async getPortalInstance() {
        return this.instance;
    }
    //---- Rendering functions ----
    // This is portal component, which does not need any rendering
    render() { return null; }
    static get is() { return "kup-portal"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
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
                "text": "Tells the portal instance if it can be visible or not"
            },
            "attribute": "is-visible",
            "reflect": false,
            "defaultValue": "false"
        },
        "mirroredCssVars": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Array of custom css vars which needs to be mirrored. Their value is computed from cssVarsRef"
            },
            "defaultValue": "[]"
        },
        "nodes": {
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Virtual node list the KetchupPortalInstance must render"
            }
        },
        "portalParentRef": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLElement",
                "resolved": "HTMLElement",
                "references": {
                    "HTMLElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Reference to the html element which is using the portal.\nIt must be a root of a web component."
            }
        },
        "refOffset": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "ElementOffset",
                "resolved": "ElementOffset",
                "references": {
                    "ElementOffset": {
                        "location": "import",
                        "path": "../../utils/offset"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Calculated offset of where the portal must be positioned"
            },
            "defaultValue": "{}"
        },
        "portalRootNode": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLElement",
                "resolved": "HTMLElement",
                "references": {
                    "HTMLElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The HTML element on which the virtual node must be appended"
            },
            "defaultValue": "document.body"
        },
        "styleNode": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLStyleElement | null",
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
        }
    }; }
    static get methods() { return {
        "getPortalInstance": {
            "complexType": {
                "signature": "() => Promise<HTMLElement>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<HTMLElement>"
            },
            "docs": {
                "text": "Returns the root node instance of the KetchupPortalInstance element",
                "tags": []
            }
        }
    }; }
    static get watchers() { return [{
            "propName": "portalRootNode",
            "methodName": "onPortalRootNodeChange"
        }]; }
}
