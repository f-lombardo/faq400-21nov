export class KupHtml {
    constructor() {
        this.label = 'Open in a new window';
        this.isButton = false;
        this.src = '';
    }
    onFrameError() {
        this.ketchupHtmlError.emit();
    }
    onFrameLoaded() {
        this.ketchupHtmlLoaded.emit();
    }
    render() {
        return !this.isButton ?
            h("iframe", { class: "ketchup-frame", onError: this.onFrameError.bind(this), onLoad: this.onFrameLoaded.bind(this), src: this.src }) :
            h("a", { "aria-label": this.label, href: this.src, rel: "noopener", target: "_blank" },
                h("kup-button", { align: "right", iconClass: "mdi mdi-open-in-new", label: this.label }));
    }
    static get is() { return "kup-html"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "isButton": {
            "type": Boolean,
            "attr": "is-button",
            "reflectToAttr": true
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "src": {
            "type": String,
            "attr": "src"
        }
    }; }
    static get events() { return [{
            "name": "ketchupHtmlError",
            "method": "ketchupHtmlError",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "ketchupHtmlLoaded",
            "method": "ketchupHtmlLoaded",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:kup-html:**/"; }
}
