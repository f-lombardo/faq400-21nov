export class KupPortalInstance {
    constructor() {
        this.isVisible = false;
        this.vNodes = null;
    }
    componentWillUpdate() {
        if (!this.port.shadowRoot.querySelector('style[data-portal-style]')) {
            this.port.shadowRoot.insertBefore(this.styleNode, this.port.shadowRoot.querySelector('style'));
        }
    }
    render() {
        return this.vNodes;
    }
    static get is() { return "kup-portal-instance"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "isVisible": {
            "type": Boolean,
            "attr": "is-visible",
            "reflectToAttr": true
        },
        "port": {
            "elementRef": true
        },
        "styleNode": {
            "type": "Any",
            "attr": "style-node"
        },
        "vNodes": {
            "type": "Any",
            "attr": "v-nodes"
        }
    }; }
    static get style() { return "/**style-placeholder:kup-portal-instance:**/"; }
}
