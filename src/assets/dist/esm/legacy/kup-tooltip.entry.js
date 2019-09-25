import { r as registerInstance, c as createEvent, h, g as getElement } from './chunk-1851c479.js';
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
            // resetting position
            this.tooltipPosition = {};
            var rect = this.wrapperEl.getBoundingClientRect();
            // vertical position
            if (window.innerHeight - rect.bottom < 150) {
                this.tooltipPosition.bottom = rect.height + 3 + "px";
            }
            else {
                this.tooltipPosition.top = rect.height + "px";
            }
            // horizontal position
            if (window.innerWidth - rect.left < 350) {
                // 350 is the min-width of the tooltip
                this.tooltipPosition.right = "0";
            }
            else {
                this.tooltipPosition.left = "0";
            }
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
        get: function () { return ":host{--tlt_background:var(--kup-tlt_background,#fff);--tlt_detail-lbl-color:var(--kup-detail-lbl-color,#888);--tlt_shadow:var(--kup-tlt_shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5))}:host #wrapper{position:relative;display:inline-block}:host #wrapper #tooltip{position:absolute;background:var(--tlt_background);z-index:1000;-webkit-box-shadow:var(--tlt_shadow);box-shadow:var(--tlt_shadow);border-radius:3px;min-width:350px}:host #wrapper #tooltip #main-content{margin:20px;display:-ms-flexbox;display:flex}:host #wrapper #tooltip #main-content .left{width:75px;margin-right:15px}:host #wrapper #tooltip #main-content .right{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between}:host #wrapper #tooltip #main-content.layout2{-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}:host #wrapper #tooltip #main-content.layout3{-ms-flex-direction:column;flex-direction:column}:host #wrapper #tooltip #main-content.layout3>div:not(:last-child){margin-bottom:6px}:host #wrapper #tooltip #main-content h3,:host #wrapper #tooltip #main-content h4{margin:0}:host #wrapper #tooltip #main-content .label{color:var(--tlt_detail-lbl-color)}:host #wrapper #tooltip #detail:not(.visible){max-height:0;opacity:0;-webkit-transition:max-height .5s ease-out,opacity .5s ease-out;transition:max-height .5s ease-out,opacity .5s ease-out}:host #wrapper #tooltip #detail.visible{border-top:1px solid #ccc;padding:20px;max-height:500px;opacity:1;-webkit-transition:max-height .5s ease-in,opacity .5s ease-in;transition:max-height .5s ease-in,opacity .5s ease-in}:host #wrapper #tooltip #detail .detail-row{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}:host #wrapper #tooltip #detail .detail-row:not(:last-child){margin-bottom:6px}:host #wrapper #tooltip #detail .detail-row__label{color:var(--tlt_detail-lbl-color)}"; },
        enumerable: true,
        configurable: true
    });
    return KupTooltip;
}());
export { KupTooltip as kup_tooltip };
