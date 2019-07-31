import { r as registerInstance, c as createEvent, h } from './chunk-1851c479.js';

class KupChip {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.closable = false;
        this.disabled = false;
        this.close = createEvent(this, "close", 7);
    }
    // ---- Listeners ----
    onCloseClicked() {
        if (!this.disabled) {
            this.close.emit();
        }
    }
    render() {
        let close = null;
        if (this.closable) {
            close = (h("svg", { version: "1.1", width: "16", height: "16", viewBox: "0 0 24 24", "aria-hidden": "false", onClick: () => this.onCloseClicked() }, h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })));
        }
        const chipClass = {
            disabled: this.disabled,
        };
        return (h("span", { id: "chip", class: chipClass, tabindex: "0", "aria-disabled": this.disabled ? 'true' : 'false' }, h("span", { id: "content" }, h("slot", null), close)));
    }
    static get style() { return "#chip{background:#e0e0e0;color:#545454;margin:4px;padding:4px;border-radius:10px;outline:none}#chip,#chip #content{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;vertical-align:middle}#chip #content{height:25px;margin:0 3px;-ms-flex-pack:justify;justify-content:space-between;cursor:default}#chip #content svg{cursor:pointer;fill:#545454;margin-left:2px}#chip.disabled{background:#f5f5f5}#chip.disabled #content svg{cursor:default}"; }
}

export { KupChip as kup_chip };
