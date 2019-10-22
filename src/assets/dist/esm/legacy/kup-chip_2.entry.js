import { r as registerInstance, c as createEvent, h, g as getElement } from './chunk-1851c479.js';
var KupChip = /** @class */ (function () {
    function KupChip(hostRef) {
        registerInstance(this, hostRef);
        this.closable = false;
        this.disabled = false;
        this.close = createEvent(this, "close", 7);
    }
    // ---- Listeners ----
    KupChip.prototype.onCloseClicked = function () {
        if (!this.disabled) {
            this.close.emit();
        }
    };
    KupChip.prototype.render = function () {
        var _this = this;
        var close = null;
        if (this.closable) {
            close = (h("svg", { version: "1.1", width: "16", height: "16", viewBox: "0 0 24 24", "aria-hidden": "false", onClick: function () { return _this.onCloseClicked(); } }, h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })));
        }
        var chipClass = {
            disabled: this.disabled,
        };
        return (h("span", { id: "chip", class: chipClass, tabindex: "0", "aria-disabled": this.disabled ? 'true' : 'false' }, h("span", { id: "content" }, h("slot", null), close)));
    };
    Object.defineProperty(KupChip, "style", {
        get: function () { return ":host{--chi_color:var(--kup-chip_color,#1a1a1a);--chi_icon-color:var(--kup-chip_icon-color,#d91e18);--chi_icon-color-hover:var(--kup-chip_icon-color-hover,#f0423c);--chi_background:var(--kup-chip_background,#f0f0f0);--chi_background-hover:var(--kup-chip_background-hover,#e5e5e5);--chi_disabled-color:var(--kup-chip_disabled-color,#888)}#chip{background:var(--chi_background);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;vertical-align:middle;margin:.5rem;padding:.5rem;outline:none;cursor:default}#chip:not(.disabled):hover{background:var(--chi_background-hover)}#chip #content{margin:0 3px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;vertical-align:middle;-ms-flex-pack:justify;justify-content:space-between;color:var(--chi_color)}#chip #content svg{cursor:pointer;fill:var(--chi_icon-color);margin-left:4px}#chip #content svg:hover{fill:var(--chi_icon-color-hover)}#chip.disabled #content{color:var(--chi_disabled-color)}#chip.disabled #content svg{cursor:default;fill:var(--chi_disabled-color)}"; },
        enumerable: true,
        configurable: true
    });
    return KupChip;
}());
var KupTooltip = /** @class */ (function () {
    function KupTooltip(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Layout used to display the items
         */
        this.layout = '1';
        this.visible = false;
        // ---- Non reactive ----
        this.tooltipPosition = {};
        this.kupTooltipLoadData = createEvent(this, "kupTooltipLoadData", 6);
        this.kupTooltipLoadDetail = createEvent(this, "kupTooltipLoadDetail", 6);
    }
    KupTooltip.prototype.onDataChanged = function () {
        var _this = this;
        if (this.visible) {
            this.positionRecalc();
            // loading detail
            this.loadDetailTimeout = setTimeout(function () { return _this.loadDetail(); }, 200);
        }
    };
    // ---- Private methods ----
    KupTooltip.prototype.hasDetailData = function () {
        return !!this.detailData && !!this.detailData.rows;
    };
    KupTooltip.prototype.resetTimeouts = function () {
        if (this.tooltipTimeout) {
            clearTimeout(this.tooltipTimeout);
            this.tooltipTimeout = null;
        }
        if (this.loadDetailTimeout) {
            clearTimeout(this.loadDetailTimeout);
            this.loadDetailTimeout = null;
        }
    };
    KupTooltip.prototype.loadDetail = function () {
        this.loadDetailTimeout = null;
        this.kupTooltipLoadDetail.emit();
    };
    Object.defineProperty(KupTooltip.prototype, "rows", {
        get: function () {
            return this.hasDetailData() ? this.detailData.rows : [];
        },
        enumerable: true,
        configurable: true
    });
    KupTooltip.prototype.getImage = function () {
        if (this.data) {
            return this.data.image;
        }
        return '';
    };
    KupTooltip.prototype.getTitle = function () {
        if (this.data) {
            return this.data.title;
        }
        return '';
    };
    KupTooltip.prototype.getContent = function () {
        return this.data ? this.data.content : {};
    };
    // ---- Listeners ----
    KupTooltip.prototype.onMouseOver = function () {
        var _this = this;
        if (!this.tooltipTimeout) {
            this.tooltipTimeout = setTimeout(function () {
                _this.tooltipTimeout = null;
                _this.visible = true;
                _this.kupTooltipLoadData.emit();
            }, 200);
        }
    };
    KupTooltip.prototype.onMouseLeave = function () {
        // reset data
        this.data = null;
        this.detailData = null;
        // reset visibility
        this.visible = false;
        // reset timeouts
        this.resetTimeouts();
    };
    // ---- Render methods ----
    KupTooltip.prototype.getDefaultLayout = function () {
        return [
            h("div", { class: "left" }, h("img", { src: this.getImage(), width: "75", height: "75" })),
            h("div", { class: "right" }, h("h3", null, this.getTitle()), this.getInfos()),
        ];
    };
    KupTooltip.prototype.getLayout2 = function () {
        return (h("div", null, h("h3", null, this.getTitle())));
    };
    KupTooltip.prototype.getLayout3 = function () {
        return [
            h("div", null, h("h4", null, this.getTitle())),
            this.getInfos(),
        ];
    };
    KupTooltip.prototype.getInfos = function () {
        var infos = null;
        var content = this.getContent();
        if (content) {
            infos = [];
            for (var i = 1; i <= 2; i++) {
                var info = content["info" + i];
                if (info && info.label && info.label) {
                    infos.push(h("div", null, h("span", { class: "label" }, info.label, ": "), ' ' + info.value));
                }
            }
        }
        return infos;
    };
    KupTooltip.prototype.positionRecalc = function () {
        // resetting position
        this.tooltipPosition = {};
        var rect = this.wrapperEl.getBoundingClientRect();
        var threshold = this.hasDetailData ? 300 : 150;
        // vertical position
        if (window.innerHeight - rect.bottom < threshold) {
            this.tooltipPosition.bottom = window.innerHeight - rect.top + 3 + "px";
        }
        else {
            this.tooltipPosition.top = rect.bottom + 3 + "px";
        }
        // horizontal position
        if (window.innerWidth - rect.left < 350) {
            // 350 is the min-width of the tooltip
            this.tooltipPosition.right = window.innerWidth - rect.right + "px";
        }
        else {
            this.tooltipPosition.left = rect.left + "px";
        }
    };
    KupTooltip.prototype.createTooltip = function () {
        if (!this.data) {
            return null;
        }
        var mainContent = null;
        var mainContentClass = {};
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
        var detailContent = null;
        if (this.hasDetailData()) {
            detailContent = this.rows.map(function (row) { return (h("div", { class: "detail-row" }, h("div", { class: "detail-row__label" }, row.cells['label'].value), h("div", { class: "detail-row__value" }, row.cells['value'].value))); });
        }
        var detailClass = {
            visible: this.hasDetailData(),
        };
        var tooltipStyle = Object.assign({}, this.tooltipPosition);
        return (h("div", { id: "tooltip", hidden: !this.visible || !this.data, style: tooltipStyle }, h("div", { id: "main-content", class: mainContentClass }, mainContent), h("div", { id: "detail", class: detailClass }, detailContent)));
    };
    KupTooltip.prototype.render = function () {
        var _this = this;
        return (h("div", { id: "wrapper", onMouseOver: this.onMouseOver.bind(this), onMouseLeave: this.onMouseLeave.bind(this), ref: function (el) { return (_this.wrapperEl = el); } }, h("slot", null), this.createTooltip()));
    };
    Object.defineProperty(KupTooltip.prototype, "tooltipEl", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupTooltip, "watchers", {
        get: function () {
            return {
                "data": ["onDataChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupTooltip, "style", {
        get: function () { return ":host{--tlt_background:var(--kup-tlt_background,#fff);--tlt_border_color:var(--kup-tlt_border-color,#ccc);--tlt_detail-lbl-color:var(--kup-detail-lbl-color,#616161);--tlt_detail-txt-color:var(--kup-detail-txt-color,#888);--tlt_shadow:var(--kup-tlt_shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5));--tlt_display:var(--kup-tlt_display,inline-block)}:host #wrapper{position:relative;display:var(--tlt_display)}:host #wrapper #tooltip{position:fixed;background:var(--tlt_background);z-index:1000;-webkit-box-shadow:var(--tlt_shadow);box-shadow:var(--tlt_shadow);border-radius:3px;min-width:350px}:host #wrapper #tooltip #main-content{margin:20px;display:-ms-flexbox;display:flex;color:var(--tlt_detail-txt-color)}:host #wrapper #tooltip #main-content .left{width:75px;margin-right:15px}:host #wrapper #tooltip #main-content .right{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between}:host #wrapper #tooltip #main-content.layout2{-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}:host #wrapper #tooltip #main-content.layout3{-ms-flex-direction:column;flex-direction:column}:host #wrapper #tooltip #main-content.layout3>div:not(:last-child){margin-bottom:6px}:host #wrapper #tooltip #main-content h3,:host #wrapper #tooltip #main-content h4{margin:0}:host #wrapper #tooltip #main-content .label{color:var(--tlt_detail-lbl-color)}:host #wrapper #tooltip #detail:not(.visible){max-height:0;opacity:0;-webkit-transition:max-height .5s ease-out,opacity .5s ease-out;transition:max-height .5s ease-out,opacity .5s ease-out}:host #wrapper #tooltip #detail.visible{border-top:1px solid var(--tlt_border_color);padding:20px;max-height:500px;opacity:1;-webkit-transition:max-height .5s ease-in,opacity .5s ease-in;transition:max-height .5s ease-in,opacity .5s ease-in}:host #wrapper #tooltip #detail .detail-row{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}:host #wrapper #tooltip #detail .detail-row:not(:last-child){margin-bottom:6px}:host #wrapper #tooltip #detail .detail-row__label{color:var(--tlt_detail-lbl-color)}"; },
        enumerable: true,
        configurable: true
    });
    return KupTooltip;
}());
export { KupChip as kup_chip, KupTooltip as kup_tooltip };
