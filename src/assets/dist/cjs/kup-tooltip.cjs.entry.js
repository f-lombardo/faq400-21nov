'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-c31c1549.js');

class KupTooltip {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        /**
         * Layout used to display the items
         */
        this.layout = '1';
        this.visible = false;
        // ---- Non reactive ----
        this.tooltipPosition = {};
        this.kupTooltipLoadData = __chunk_1.createEvent(this, "kupTooltipLoadData", 6);
        this.kupTooltipLoadDetail = __chunk_1.createEvent(this, "kupTooltipLoadDetail", 6);
    }
    onDataChanged() {
        if (this.visible) {
            // resetting position
            this.tooltipPosition = {};
            const rect = this.wrapperEl.getBoundingClientRect();
            // vertical position
            if (window.innerHeight - rect.bottom < 150) {
                this.tooltipPosition.bottom = `${rect.height + 3}px`;
            }
            else {
                this.tooltipPosition.top = `${rect.height}px`;
            }
            // horizontal position
            if (window.innerWidth - rect.left < 350) {
                // 350 is the min-width of the tooltip
                this.tooltipPosition.right = `0`;
            }
            else {
                this.tooltipPosition.left = `0`;
            }
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
            __chunk_1.h("div", { class: "left" }, __chunk_1.h("img", { src: this.getImage(), width: "75", height: "75" })),
            __chunk_1.h("div", { class: "right" }, __chunk_1.h("h3", null, this.getTitle()), this.getInfos()),
        ];
    }
    getLayout2() {
        return (__chunk_1.h("div", null, __chunk_1.h("h3", null, this.getTitle())));
    }
    getLayout3() {
        return [
            __chunk_1.h("div", null, __chunk_1.h("h4", null, this.getTitle())),
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
                    infos.push(__chunk_1.h("div", null, __chunk_1.h("span", { class: "label" }, info.label, ": "), ' ' + info.value));
                }
            }
        }
        return infos;
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
            detailContent = this.rows.map((row) => (__chunk_1.h("div", { class: "detail-row" }, __chunk_1.h("div", { class: "detail-row__label" }, row.cells['label'].value), __chunk_1.h("div", { class: "detail-row__value" }, row.cells['value'].value))));
        }
        const detailClass = {
            visible: this.hasDetailData(),
        };
        const tooltipStyle = Object.assign({}, this.tooltipPosition);
        return (__chunk_1.h("div", { id: "tooltip", hidden: !this.visible || !this.data, style: tooltipStyle }, __chunk_1.h("div", { id: "main-content", class: mainContentClass }, mainContent), __chunk_1.h("div", { id: "detail", class: detailClass }, detailContent)));
    }
    render() {
        return (__chunk_1.h("div", { id: "wrapper", onMouseOver: this.onMouseOver.bind(this), onMouseLeave: this.onMouseLeave.bind(this), ref: (el) => (this.wrapperEl = el) }, __chunk_1.h("slot", null), this.createTooltip()));
    }
    get tooltipEl() { return __chunk_1.getElement(this); }
    static get watchers() { return {
        "data": ["onDataChanged"]
    }; }
    static get style() { return ":host{--tlt_background:var(--kup-tlt_background,#fff);--tlt_detail-lbl-color:var(--kup-detail-lbl-color,#888);--tlt_shadow:var(--kup-tlt_shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5))}:host #wrapper{position:relative;display:inline-block}:host #wrapper #tooltip{position:absolute;background:var(--tlt_background);z-index:1000;-webkit-box-shadow:var(--tlt_shadow);box-shadow:var(--tlt_shadow);border-radius:3px;min-width:350px}:host #wrapper #tooltip #main-content{margin:20px;display:-ms-flexbox;display:flex}:host #wrapper #tooltip #main-content .left{width:75px;margin-right:15px}:host #wrapper #tooltip #main-content .right{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between}:host #wrapper #tooltip #main-content.layout2{-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}:host #wrapper #tooltip #main-content.layout3{-ms-flex-direction:column;flex-direction:column}:host #wrapper #tooltip #main-content.layout3>div:not(:last-child){margin-bottom:6px}:host #wrapper #tooltip #main-content h3,:host #wrapper #tooltip #main-content h4{margin:0}:host #wrapper #tooltip #main-content .label{color:var(--tlt_detail-lbl-color)}:host #wrapper #tooltip #detail:not(.visible){max-height:0;opacity:0;-webkit-transition:max-height .5s ease-out,opacity .5s ease-out;transition:max-height .5s ease-out,opacity .5s ease-out}:host #wrapper #tooltip #detail.visible{border-top:1px solid #ccc;padding:20px;max-height:500px;opacity:1;-webkit-transition:max-height .5s ease-in,opacity .5s ease-in;transition:max-height .5s ease-in,opacity .5s ease-in}:host #wrapper #tooltip #detail .detail-row{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}:host #wrapper #tooltip #detail .detail-row:not(:last-child){margin-bottom:6px}:host #wrapper #tooltip #detail .detail-row__label{color:var(--tlt_detail-lbl-color)}"; }
}

exports.kup_tooltip = KupTooltip;
