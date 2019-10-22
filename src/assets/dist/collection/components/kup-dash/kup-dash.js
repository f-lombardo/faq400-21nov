import { h } from '@stencil/core';
export class KupDash {
    constructor() {
        this.layout = '1';
        this.fontsize = '';
    }
    onDshClickedHandler() {
        this.ketchupDashClicked.emit();
    }
    render() {
        let content = null;
        switch (this.layout) {
            case '2':
                content = (h("div", null,
                    h("div", { class: "icon" },
                        h("slot", { name: "icon" })),
                    h("div", { class: "value-int" },
                        h("slot", { name: "value-int" })),
                    h("div", { class: "value-dec" },
                        h("slot", { name: "value-dec" })),
                    h("div", { class: "unit" },
                        h("slot", { name: "unit" }))));
                break;
            case '3':
                content = (h("div", null,
                    h("div", { class: "value" },
                        h("slot", { name: "value" })),
                    h("div", { class: "descr" },
                        h("slot", { name: "descr" }))));
                break;
            case '4':
                content = (h("div", null,
                    h("div", { class: "icon" },
                        h("slot", { name: "icon" })),
                    h("div", { class: "value-and-unit" },
                        h("div", { class: "value-int" },
                            h("slot", { name: "value-int" })),
                        h("div", { class: "value-dec" },
                            h("slot", { name: "value-dec" })),
                        h("div", { class: "unit" },
                            h("slot", { name: "unit" }))),
                    h("div", null),
                    h("div", { class: "descr" },
                        h("slot", { name: "descr" }))));
                break;
            case '5':
                content = (h("div", null,
                    h("div", null,
                        h("div", { class: "descr" },
                            h("slot", { name: "descr" })),
                        h("div", { class: "value" },
                            h("slot", { name: "value" }))),
                    h("div", { class: "icon" },
                        h("slot", { name: "icon" }))));
                break;
            case '6':
                content = (h("div", null,
                    h("div", { class: "icon" },
                        h("slot", { name: "icon" })),
                    h("div", null,
                        h("div", { class: "value" },
                            h("slot", { name: "value" })),
                        h("div", { class: "descr" },
                            h("slot", { name: "descr" })))));
                break;
            case '7':
                content = (h("div", null,
                    h("div", null,
                        h("div", { class: "value" },
                            h("slot", { name: "value" })),
                        h("div", { class: "descr" },
                            h("slot", { name: "descr" }))),
                    h("div", { class: "icon" },
                        h("slot", { name: "icon" }))));
                break;
            case '8':
                content = (h("div", null,
                    h("div", { class: "icon" },
                        h("slot", { name: "icon" })),
                    h("div", { class: "value" },
                        h("slot", { name: "value" })),
                    h("div", { class: "descr" },
                        h("slot", { name: "descr" }))));
                break;
            default:
                // layout 1
                content = (h("div", null,
                    h("div", { class: "descr" },
                        h("slot", { name: "descr" })),
                    h("div", { class: "value" },
                        h("slot", { name: "value" }))));
                break;
        }
        const style = { fontSize: this.fontsize };
        return (h("div", { id: "dash", style: style, onClick: () => this.onDshClickedHandler() },
            h("div", { id: "content", class: `layout-${this.layout}` }, content)));
    }
    static get is() { return "kup-dash"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-dash.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-dash.css"]
    }; }
    static get properties() { return {
        "layout": {
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
            "attribute": "layout",
            "reflect": false,
            "defaultValue": "'1'"
        },
        "fontsize": {
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
            "attribute": "fontsize",
            "reflect": false,
            "defaultValue": "''"
        }
    }; }
    static get events() { return [{
            "method": "ketchupDashClicked",
            "name": "ketchupDashClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "{\t\t\n    }",
                "resolved": "{}",
                "references": {}
            }
        }]; }
}
