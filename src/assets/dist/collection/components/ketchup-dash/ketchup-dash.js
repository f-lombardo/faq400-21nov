export class KetchupDash {
    constructor() {
        this.layout = '1';
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
                        h("div", { class: "value" },
                            h("slot", { name: "value" })),
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
                content = (h("div", null,
                    h("div", { class: "descr" },
                        h("slot", { name: "descr" })),
                    h("div", { class: "value" },
                        h("slot", { name: "value" }))));
                break;
        }
        return (h("div", { id: "dash", onClick: () => this.onDshClickedHandler() },
            h("div", { id: "content", class: `layout-${this.layout}` }, content)));
    }
    static get is() { return "kup-dash"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "layout": {
            "type": String,
            "attr": "layout"
        }
    }; }
    static get events() { return [{
            "name": "ketchupDashClicked",
            "method": "ketchupDashClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:kup-dash:**/"; }
}
