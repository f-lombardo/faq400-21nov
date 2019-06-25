import { h } from '../mycomponent.core.js';

class KupHtml {
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
    static get style() { return ".sc-kup-html-h{--htm_height:var(--kup-html_height,600px);--htm_width:var(--kup-html_width,100%);display:inline-block;width:100%}[is-button].sc-kup-html-h{display:inline-block;width:auto}.ketchup-frame.sc-kup-html{height:var(--htm_height);width:var(--htm_width)}"; }
}

export { KupHtml };
