import { h } from '@stencil/core';
export class KupTooltip {
    constructor() {
        /**
         * Layout used to display the items
         */
        this.layout = '1';
        this.visible = false;
        // ---- Non reactive ----
        this.tooltipPosition = {};
    }
    onDataChanged() {
        if (this.visible) {
            this.positionRecalc();
            // loading detail
            this.loadDetailTimeout = setTimeout(() => this.loadDetail(), 200);
        }
    }
    // ---- Private methods ----
    hasDetailData() {
        return !!this.detailData && !!this.detailData.rows;
    }
    resetTimeouts() {
        if (this.tooltipTimeout) {
            clearTimeout(this.tooltipTimeout);
            this.tooltipTimeout = null;
        }
        if (this.loadDetailTimeout) {
            clearTimeout(this.loadDetailTimeout);
            this.loadDetailTimeout = null;
        }
    }
    loadDetail() {
        this.loadDetailTimeout = null;
        this.kupTooltipLoadDetail.emit();
    }
    get rows() {
        return this.hasDetailData() ? this.detailData.rows : [];
    }
    getImage() {
        if (this.data) {
            return this.data.image;
        }
        return '';
    }
    getTitle() {
        if (this.data) {
            return this.data.title;
        }
        return '';
    }
    getContent() {
        return this.data ? this.data.content : {};
    }
    // ---- Listeners ----
    onMouseOver() {
        if (!this.tooltipTimeout) {
            this.tooltipTimeout = setTimeout(() => {
                this.tooltipTimeout = null;
                this.visible = true;
                this.kupTooltipLoadData.emit();
            }, 200);
        }
    }
    onMouseLeave() {
        // reset data
        this.data = null;
        this.detailData = null;
        // reset visibility
        this.visible = false;
        // reset timeouts
        this.resetTimeouts();
    }
    // ---- Render methods ----
    getDefaultLayout() {
        return [
            h("div", { class: "left" },
                h("img", { src: this.getImage(), width: "75", height: "75" })),
            h("div", { class: "right" },
                h("h3", null, this.getTitle()),
                this.getInfos()),
        ];
    }
    getLayout2() {
        return (h("div", null,
            h("h3", null, this.getTitle())));
    }
    getLayout3() {
        return [
            h("div", null,
                h("h4", null, this.getTitle())),
            this.getInfos(),
        ];
    }
    getInfos() {
        let infos = null;
        const content = this.getContent();
        if (content) {
            infos = [];
            for (let i = 1; i <= 2; i++) {
                const info = content[`info${i}`];
                if (info && info.label && info.label) {
                    infos.push(h("div", null,
                        h("span", { class: "label" },
                            info.label,
                            ": "),
                        ' ' + info.value));
                }
            }
        }
        return infos;
    }
    positionRecalc() {
        // resetting position
        this.tooltipPosition = {};
        const rect = this.wrapperEl.getBoundingClientRect();
        let threshold = this.hasDetailData ? 300 : 150;
        // vertical position
        if (window.innerHeight - rect.bottom < threshold) {
            this.tooltipPosition.bottom = `${window.innerHeight - rect.top + 3}px`;
        }
        else {
            this.tooltipPosition.top = `${rect.bottom + 3}px`;
        }
        // horizontal position
        if (window.innerWidth - rect.left < 350) {
            // 350 is the min-width of the tooltip
            this.tooltipPosition.right = `${window.innerWidth - rect.right}px`;
        }
        else {
            this.tooltipPosition.left = `${rect.left}px`;
        }
    }
    createTooltip() {
        if (!this.data) {
            return null;
        }
        let mainContent = null;
        const mainContentClass = {};
        if (this.layout === '2') {
            mainContent = this.getLayout2();
            mainContentClass['layout2'] = true;
        }
        else if (this.layout === '3') {
            mainContent = this.getLayout3();
            mainContentClass['layout3'] = true;
        }
        else {
            mainContent = this.getDefaultLayout();
        }
        let detailContent = null;
        if (this.hasDetailData()) {
            detailContent = this.rows.map((row) => (h("div", { class: "detail-row" },
                h("div", { class: "detail-row__label" }, row.cells['label'].value),
                h("div", { class: "detail-row__value" }, row.cells['value'].value))));
        }
        const detailClass = {
            visible: this.hasDetailData(),
        };
        const tooltipStyle = Object.assign({}, this.tooltipPosition);
        return (h("div", { id: "tooltip", hidden: !this.visible || !this.data, style: tooltipStyle },
            h("div", { id: "main-content", class: mainContentClass }, mainContent),
            h("div", { id: "detail", class: detailClass }, detailContent)));
    }
    render() {
        return (h("div", { id: "wrapper", onMouseOver: this.onMouseOver.bind(this), onMouseLeave: this.onMouseLeave.bind(this), ref: (el) => (this.wrapperEl = el) },
            h("slot", null),
            this.createTooltip()));
    }
    static get is() { return "kup-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-tooltip.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-tooltip.css"]
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
                "text": "Layout used to display the items"
            },
            "attribute": "layout",
            "reflect": false,
            "defaultValue": "'1'"
        },
        "data": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "TooltipData",
                "resolved": "TooltipData",
                "references": {
                    "TooltipData": {
                        "location": "import",
                        "path": "./kup-tooltip-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Data for top section"
            }
        },
        "detailData": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DataTable",
                "resolved": "DataTable",
                "references": {
                    "DataTable": {
                        "location": "import",
                        "path": "../kup-data-table/kup-data-table-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Data for the detail"
            }
        }
    }; }
    static get states() { return {
        "visible": {}
    }; }
    static get events() { return [{
            "method": "kupTooltipLoadData",
            "name": "kupTooltipLoadData",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "kupTooltipLoadDetail",
            "name": "kupTooltipLoadDetail",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "tooltipEl"; }
    static get watchers() { return [{
            "propName": "data",
            "methodName": "onDataChanged"
        }]; }
}
