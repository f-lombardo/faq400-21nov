import { h } from '../mycomponent.core.js';

class KupDash {
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
    static get properties() { return {
        "fontsize": {
            "type": String,
            "attr": "fontsize"
        },
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
    static get style() { return ".sc-kup-dash-h{--dash_bkg-color:var(--kup-dash_background-color,transparent);--dash_color:var(--kup-dash_color,#111);--dash_border-color:var(--kup-dash_border-color,transparent)}#dash.sc-kup-dash{background-color:var(--dash_bkg-color);border:1px solid var(--dash_border-color);color:var(--dash_color);min-height:170px;font-size:2vw;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;text-align:center;position:relative;word-break:normal}#dash.sc-kup-dash   #content.sc-kup-dash   .icon.sc-kup-dash{margin:auto;font-size:90%}#dash.sc-kup-dash   #content.layout-1.sc-kup-dash, #dash.sc-kup-dash   #content.layout-3.sc-kup-dash{text-align:center}#dash.sc-kup-dash   #content.layout-1.sc-kup-dash   .descr.sc-kup-dash, #dash.sc-kup-dash   #content.layout-3.sc-kup-dash   .descr.sc-kup-dash{font-size:70%;width:100%}#dash.sc-kup-dash   #content.layout-1.sc-kup-dash   .value.sc-kup-dash, #dash.sc-kup-dash   #content.layout-3.sc-kup-dash   .value.sc-kup-dash{font-size:220%;padding:2% 0}#dash.sc-kup-dash   #content.layout-2.sc-kup-dash > div.sc-kup-dash{display:-ms-flexbox;display:flex}#dash.sc-kup-dash   #content.layout-2.sc-kup-dash > div.sc-kup-dash   .icon.sc-kup-dash{margin:auto;font-size:150%;margin-right:5%}#dash.sc-kup-dash   #content.layout-2.sc-kup-dash > div.sc-kup-dash   .value-int.sc-kup-dash{font-size:250%}#dash.sc-kup-dash   #content.layout-2.sc-kup-dash > div.sc-kup-dash   .unit.sc-kup-dash, #dash.sc-kup-dash   #content.layout-2.sc-kup-dash > div.sc-kup-dash   .value-dec.sc-kup-dash{font-size:130%;margin-top:auto;margin-bottom:4%}#dash.sc-kup-dash   #content.layout-2.sc-kup-dash > div.sc-kup-dash   .unit.sc-kup-dash{margin-left:4%}#dash.sc-kup-dash   #content.layout-4.sc-kup-dash > div.sc-kup-dash{display:grid;grid-template-columns:2fr 5fr}#dash.sc-kup-dash   #content.layout-4.sc-kup-dash > div.sc-kup-dash   .icon.sc-kup-dash{margin:auto;font-size:150%;margin-right:5%}#dash.sc-kup-dash   #content.layout-4.sc-kup-dash > div.sc-kup-dash   .value-and-unit.sc-kup-dash{display:-ms-flexbox;display:flex}#dash.sc-kup-dash   #content.layout-4.sc-kup-dash > div.sc-kup-dash   .value-and-unit.sc-kup-dash   .value-int.sc-kup-dash{font-size:250%}#dash.sc-kup-dash   #content.layout-4.sc-kup-dash > div.sc-kup-dash   .value-and-unit.sc-kup-dash   .unit.sc-kup-dash, #dash.sc-kup-dash   #content.layout-4.sc-kup-dash > div.sc-kup-dash   .value-and-unit.sc-kup-dash   .value-dec.sc-kup-dash{font-size:130%;margin-top:auto;margin-bottom:4%}#dash.sc-kup-dash   #content.layout-4.sc-kup-dash > div.sc-kup-dash   .descr.sc-kup-dash{margin-left:4%;text-align:left;font-size:80%;width:100%;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}#dash.sc-kup-dash   #content.layout-5.sc-kup-dash > div.sc-kup-dash, #dash.sc-kup-dash   #content.layout-7.sc-kup-dash > div.sc-kup-dash{display:-ms-flexbox;display:flex}#dash.sc-kup-dash   #content.layout-5.sc-kup-dash > div.sc-kup-dash   .icon.sc-kup-dash, #dash.sc-kup-dash   #content.layout-7.sc-kup-dash > div.sc-kup-dash   .icon.sc-kup-dash{font-size:150%;margin:auto;margin-left:10%}#dash.sc-kup-dash   #content.layout-5.sc-kup-dash > div.sc-kup-dash   .value.sc-kup-dash, #dash.sc-kup-dash   #content.layout-7.sc-kup-dash > div.sc-kup-dash   .value.sc-kup-dash{font-size:200%}#dash.sc-kup-dash   #content.layout-5.sc-kup-dash > div.sc-kup-dash   .descr.sc-kup-dash, #dash.sc-kup-dash   #content.layout-7.sc-kup-dash > div.sc-kup-dash   .descr.sc-kup-dash{text-align:right;font-size:65%;width:100%;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}#dash.sc-kup-dash   #content.layout-6.sc-kup-dash > div.sc-kup-dash{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}#dash.sc-kup-dash   #content.layout-6.sc-kup-dash > div.sc-kup-dash   .icon.sc-kup-dash{font-size:150%;margin-right:10%}#dash.sc-kup-dash   #content.layout-6.sc-kup-dash > div.sc-kup-dash   .value.sc-kup-dash{font-size:220%;text-align:right}#dash.sc-kup-dash   #content.layout-6.sc-kup-dash > div.sc-kup-dash   .descr.sc-kup-dash{font-size:80%;text-align:right;width:100%;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}#dash.sc-kup-dash   #content.layout-8.sc-kup-dash > div.sc-kup-dash{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}#dash.sc-kup-dash   #content.layout-8.sc-kup-dash > div.sc-kup-dash   .icon.sc-kup-dash{margin-right:4%;font-size:75%}#dash.sc-kup-dash   #content.layout-8.sc-kup-dash > div.sc-kup-dash   .value.sc-kup-dash{margin-right:4%;font-size:250%}#dash.sc-kup-dash   #content.layout-8.sc-kup-dash > div.sc-kup-dash   .descr.sc-kup-dash{font-size:60%;text-align:left;word-spacing:10000px}"; }
}

export { KupDash };
