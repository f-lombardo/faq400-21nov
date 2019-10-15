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
function getColorFromString(rgb) {
    var rIndex = rgb.indexOf('R');
    var gIndex = rgb.indexOf('G');
    var bIndex = rgb.indexOf('B');
    if (rIndex < 0 || gIndex < 0 || bIndex < 0) {
        return;
    }
    var r = rgb.substring(rIndex + 1, rIndex + 4);
    var g = rgb.substring(gIndex + 1, gIndex + 4);
    var b = rgb.substring(bIndex + 1, bIndex + 4);
    try {
        return new Color(parseInt(r), parseInt(g), parseInt(b));
    }
    catch (e) {
        console.error(e);
    }
    return null;
}
var GraphicElement = /** @class */ (function () {
    function GraphicElement() {
        this.width = 100.0;
        this.height = 100.0;
        this.color = null;
        this.shape = 'bar';
    }
    GraphicElement.prototype.init = function (markers) {
        var _this = this;
        markers.forEach(function (marker) {
            if (marker.toUpperCase().startsWith('HEIGHT;')) {
                _this.initHeight(marker);
            }
            else if (marker.toUpperCase().startsWith('SHAPE;')) {
                _this.initShape(marker);
            }
            else if (marker.toUpperCase().startsWith('BCOLOR;'))
                ;
            else {
                _this.initColor(marker);
            }
        });
    };
    GraphicElement.prototype.initColor = function (rgb) {
        if (rgb.length > 11 && this.isValidColor(rgb)) {
            this.color = getColorFromString(rgb.substring(0, 12));
            try {
                this.width = parseFloat(rgb.substring(13).replace(',', '.'));
            }
            catch (e) {
                console.error(e);
            }
        }
        else if (rgb.startsWith('*NONE')) {
            try {
                this.width = parseFloat(rgb.substring(6).replace(',', '.'));
            }
            catch (e) {
                console.error(e);
            }
        }
    };
    GraphicElement.prototype.isTrasparent = function () {
        return this.color === null;
    };
    GraphicElement.prototype.initHeight = function (height) {
        if (height) {
            var toBeParsed = height
                .substring('HEIGHT;'.length)
                .replace(',', '.');
            try {
                this.height = parseFloat(toBeParsed);
            }
            catch (err) {
                console.error(err);
            }
        }
    };
    GraphicElement.prototype.initShape = function (shape) {
        shape = shape.substring('SHAPE;'.length);
        var vLastSemicolonIndex = shape.indexOf(';');
        var vShapeTypeString = shape;
        if (vLastSemicolonIndex > -1) {
            vShapeTypeString = shape.substring(0, vLastSemicolonIndex);
            try {
                this.width = parseFloat(shape.substring(vLastSemicolonIndex + 1).replace(',', '.'));
            }
            catch (err) {
                console.error(err);
            }
        }
        switch (vShapeTypeString.toLocaleLowerCase()) {
            case 'circle':
                this.shape = 'circle';
                break;
            case 'tril':
                this.shape = 'tril';
                break;
            case 'trir':
                this.shape = 'trir';
                break;
        }
    };
    GraphicElement.prototype.isValidColor = function (color) {
        if (!color) {
            return false;
        }
        color = color.trim();
        var vRgb = [];
        var vError = false;
        var vColorKey = null;
        // red
        var vIndex = color.indexOf('R');
        if (vIndex > -1) {
            vColorKey = color.substring(vIndex + 1, vIndex + 4);
            vRgb[0] = parseInt(vColorKey);
            if (isNaN(vRgb[0])) {
                vError = true;
            }
        }
        // green
        vIndex = color.indexOf('G');
        if (vIndex > -1) {
            vColorKey = color.substring(vIndex + 1, vIndex + 4);
            vRgb[1] = parseInt(vColorKey);
            if (isNaN(vRgb[1])) {
                vError = true;
            }
        }
        // blue
        vIndex = color.indexOf('B');
        if (vIndex > -1) {
            vColorKey = color.substring(vIndex + 1, vIndex + 4);
            vRgb[2] = parseInt(vColorKey);
            if (isNaN(vRgb[2])) {
                vError = true;
            }
        }
        if (vError) {
            var vIndexR = color.indexOf('R');
            var vIndexG = color.indexOf('G');
            var vIndexB = color.indexOf('B');
            // check R
            vColorKey = color.substring(vIndexR + 1, vIndexG);
            vRgb[0] = parseInt(vColorKey);
            if (isNaN(vRgb[0])) {
                vError = true;
            }
            // Check G
            vColorKey = color.substring(vIndexG + 1, vIndexB);
            vRgb[1] = parseInt(vColorKey);
            if (isNaN(vRgb[1])) {
                vError = true;
            }
            // Check B
            vColorKey = color.substring(vIndexB + 1);
            vRgb[2] = parseInt(vColorKey);
            if (isNaN(vRgb[2])) {
                vError = true;
            }
            if (vError) {
                return false;
            }
        }
        // Check if all values are between 0 and 255
        if (vRgb[0] < 0 ||
            vRgb[0] > 255 ||
            vRgb[1] < 0 ||
            vRgb[1] > 255 ||
            vRgb[2] < 0 ||
            vRgb[2] > 255) {
            return false;
        }
        // All good
        return true;
    };
    GraphicElement.prototype.getHeight = function () {
        return this.height;
    };
    GraphicElement.prototype.getWidth = function () {
        return this.width;
    };
    GraphicElement.prototype.getShape = function () {
        return this.shape;
    };
    GraphicElement.prototype.getColor = function () {
        return this.color;
    };
    return GraphicElement;
}());
var Color = /** @class */ (function () {
    function Color(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    Color.prototype.toString = function () {
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    };
    return Color;
}());
var KupGraphicCell = /** @class */ (function () {
    function KupGraphicCell(hostRef) {
        registerInstance(this, hostRef);
        this.height = 30;
        this.width = 300;
        this.graphic_element_marker_splitter = '\\\\';
        this.graphic_element_splitter = '\\\\AND\\\\';
        this.background_color = 'BCOLOR;R255G000B000';
        this.default_color = new Color(0, 0, 0);
    }
    KupGraphicCell.prototype.onValueChange = function () {
        this.draw();
    };
    // lifecycle
    KupGraphicCell.prototype.componentDidLoad = function () {
        this.draw();
    };
    // private methods
    KupGraphicCell.prototype.draw = function () {
        if (!this.value) {
            return;
        }
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.drawGraphicCell();
        }
    };
    KupGraphicCell.prototype.drawGraphicCell = function () {
        var _this = this;
        var vGraphicElementDefinitionArr = this.value.split(this.graphic_element_splitter);
        vGraphicElementDefinitionArr.forEach(function (graphicElem, index) {
            var vShapeMarker = 'SHAPE;BAR';
            var vBGColorMarker = _this.background_color;
            var vHeightPctMarker = 'HEIGHT;100';
            var vMarkersArray = graphicElem.split(_this.graphic_element_marker_splitter);
            var shapesArray = [];
            var vSeparatorsList = [];
            vMarkersArray.forEach(function (vString) {
                if (_this.isShapeMarker(vString)) {
                    vShapeMarker = vString;
                }
                else if (_this.isBgColorMarker(vString)) {
                    vBGColorMarker = vString;
                }
                else if (_this.isHeightMarker(vString)) {
                    vHeightPctMarker = vString;
                }
                else if (_this.isDecoratorMarker(vString)) {
                    vSeparatorsList.push(vString);
                }
                else {
                    shapesArray.push(vString);
                }
            });
            var vGraphicElementArray = shapesArray.map(function (shape) {
                var elem = new GraphicElement();
                elem.init([
                    vShapeMarker,
                    vBGColorMarker,
                    vHeightPctMarker,
                    shape,
                ]);
                return elem;
            });
            // first element -> setting background
            if (index === 0 && vBGColorMarker !== _this.background_color) {
                var bgColor = getColorFromString(vBGColorMarker.substring('BCOLOR;'.length));
                _this.drawRect(0, 0, _this.canvas.width, _this.canvas.height, bgColor);
            }
            var startX = 0;
            vGraphicElementArray.forEach(function (elem) {
                switch (elem.getShape()) {
                    case 'circle':
                        startX = _this.getNewStarXFromCircle(startX, elem);
                        break;
                    case 'tril':
                        startX = _this.getNewStarXFromTril(startX, elem);
                        break;
                    case 'trir':
                        startX = _this.getNewStarXFromTrir(startX, elem);
                        break;
                    default:
                        // bar
                        startX = _this.getNewStarXFromBar(startX, elem);
                        break;
                }
            });
            vSeparatorsList.forEach(function (sep) {
                if (sep.startsWith('SEP') || sep.startsWith('DIV')) {
                    _this.drawSeparator(sep);
                }
                else if (sep.startsWith('ARW')) {
                    _this.drawArrow(sep);
                }
                else if (sep.startsWith('GRID')) {
                    _this.drawGrid(sep);
                }
            });
        });
    };
    KupGraphicCell.prototype.isShapeMarker = function (value) {
        return value && value.toUpperCase().startsWith('SHAPE;');
    };
    KupGraphicCell.prototype.isBgColorMarker = function (value) {
        return value && value.toUpperCase().startsWith('BCOLOR;');
    };
    KupGraphicCell.prototype.isHeightMarker = function (value) {
        return value && value.toUpperCase().startsWith('HEIGHT;');
    };
    KupGraphicCell.prototype.isDecoratorMarker = function (value) {
        return (value &&
            (value.toUpperCase().startsWith('SEP;') ||
                value.toUpperCase().startsWith('DIV;') ||
                value.toUpperCase().startsWith('ARW;') ||
                value.toUpperCase().startsWith('GRID;')));
    };
    KupGraphicCell.prototype.getDim = function (dimPixel, dimPerc) {
        return Math.floor((dimPixel / 100) * dimPerc);
    };
    KupGraphicCell.prototype.getNewStarXFromBar = function (startX, elem) {
        var elemWidth = this.getDim(this.canvas.width, elem.getWidth());
        var elemHeight = this.getDim(this.canvas.height, elem.getHeight());
        var y = this.canvas.height - elemHeight;
        if (!elem.isTrasparent()) {
            this.drawRect(startX, y, elemWidth, elemHeight, elem.getColor());
        }
        return elemWidth;
    };
    KupGraphicCell.prototype.getNewStarXFromCircle = function (startX, circle) {
        var newStartX = this.getDim(this.canvas.width, circle.getWidth());
        var x = (startX + newStartX) / 2;
        if (!circle.isTrasparent()) {
            this.drawArc(x, this.canvas.height / 2, circle.getColor());
        }
        return newStartX;
    };
    KupGraphicCell.prototype.getNewStarXFromTril = function (startX, triLeft) {
        var newStartX = this.getDim(this.canvas.width, triLeft.getWidth());
        if (!triLeft.isTrasparent()) {
            this.drawTri(newStartX, 0, startX, this.canvas.height / 2, triLeft.getColor());
        }
        return newStartX;
    };
    KupGraphicCell.prototype.getNewStarXFromTrir = function (startX, triRight) {
        var newStartX = this.getDim(this.canvas.width, triRight.getWidth());
        if (!triRight.isTrasparent()) {
            this.drawTri(startX, 0, newStartX, this.canvas.height / 2, triRight.getColor());
        }
        return newStartX;
    };
    KupGraphicCell.prototype.drawArc = function (x, radius, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.beginPath();
        this.ctx.arc(x, radius, radius, 0, 2 * Math.PI, true);
        this.ctx.fill();
    };
    KupGraphicCell.prototype.drawRect = function (x, y, width, height, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.fillRect(x, y, width, height);
    };
    KupGraphicCell.prototype.drawTri = function (x1, y1, x2, y2, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x1, this.canvas.height);
        this.ctx.fill();
    };
    KupGraphicCell.prototype.drawArrow = function (sep) {
        var vPart = sep.substring('ARW;'.length);
        if (vPart.indexOf(',') > -1) {
            vPart = vPart.replace(',', '.');
        }
        this.ctx.fillStyle = this.default_color.toString();
        var startX = this.getDim(this.canvas.width, parseFloat(vPart));
        var height = this.canvas.height;
        var arrSpan = Math.floor(height / 3);
        var arrSpanHalf = arrSpan / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, 0);
        this.ctx.lineTo(startX - arrSpan, height / 2);
        this.ctx.lineTo(startX - arrSpanHalf, height / 2);
        this.ctx.lineTo(startX - arrSpanHalf, height);
        this.ctx.lineTo(startX + arrSpanHalf, height);
        this.ctx.lineTo(startX + arrSpanHalf, height / 2);
        this.ctx.lineTo(startX + arrSpan, height / 2);
        this.ctx.fill();
    };
    KupGraphicCell.prototype.drawGrid = function (sep) {
        var vPart = sep.substring('GRID;'.length);
        if (vPart.indexOf(',') > -1) {
            vPart = vPart.replace(',', '.');
        }
        var vTickNum = parseInt(vPart);
        var vTickDist = this.canvas.width / vTickNum;
        var tickH = this.canvas.height / 5;
        var y = this.canvas.height - tickH;
        var tickW = 1;
        for (var i = vTickDist; i < this.canvas.width; i = i + vTickDist) {
            this.drawRect(i, y, tickW, tickH, this.default_color);
        }
    };
    KupGraphicCell.prototype.drawSeparator = function (sep) {
        var vSeparatorPart = sep.substring('SEP;'.length).split(';');
        var vColor = 'R000G000B000';
        var vThickness = 2;
        var vPositionPart = vSeparatorPart[0];
        if (vSeparatorPart.length > 1) {
            vColor = vSeparatorPart[1];
        }
        if (vSeparatorPart.length > 2) {
            vThickness = parseInt(vSeparatorPart[2]);
        }
        if (vPositionPart.indexOf(',') > -1) {
            vPositionPart = vPositionPart.replace(',', '.');
        }
        var x = this.getDim(this.canvas.width, parseFloat(vPositionPart));
        this.drawRect(x, 0, vThickness, this.canvas.height, getColorFromString(vColor));
    };
    KupGraphicCell.prototype.render = function () {
        var _this = this;
        return (h("canvas", { ref: function (el) { return (_this.canvas = el); }, height: this.height, width: this.width }, this.value));
    };
    Object.defineProperty(KupGraphicCell, "watchers", {
        get: function () {
            return {
                "value": ["onValueChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return KupGraphicCell;
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
export { KupChip as kup_chip, KupGraphicCell as kup_graphic_cell, KupTooltip as kup_tooltip };
