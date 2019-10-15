'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-c31c1549.js');

class KupChip {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.closable = false;
        this.disabled = false;
        this.close = __chunk_1.createEvent(this, "close", 7);
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
            close = (__chunk_1.h("svg", { version: "1.1", width: "16", height: "16", viewBox: "0 0 24 24", "aria-hidden": "false", onClick: () => this.onCloseClicked() }, __chunk_1.h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })));
        }
        const chipClass = {
            disabled: this.disabled,
        };
        return (__chunk_1.h("span", { id: "chip", class: chipClass, tabindex: "0", "aria-disabled": this.disabled ? 'true' : 'false' }, __chunk_1.h("span", { id: "content" }, __chunk_1.h("slot", null), close)));
    }
    static get style() { return ":host{--chi_color:var(--kup-chip_color,#1a1a1a);--chi_icon-color:var(--kup-chip_icon-color,#d91e18);--chi_icon-color-hover:var(--kup-chip_icon-color-hover,#f0423c);--chi_background:var(--kup-chip_background,#f0f0f0);--chi_background-hover:var(--kup-chip_background-hover,#e5e5e5);--chi_disabled-color:var(--kup-chip_disabled-color,#888)}#chip{background:var(--chi_background);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;vertical-align:middle;margin:.5rem;padding:.5rem;outline:none;cursor:default}#chip:not(.disabled):hover{background:var(--chi_background-hover)}#chip #content{margin:0 3px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;vertical-align:middle;-ms-flex-pack:justify;justify-content:space-between;color:var(--chi_color)}#chip #content svg{cursor:pointer;fill:var(--chi_icon-color);margin-left:4px}#chip #content svg:hover{fill:var(--chi_icon-color-hover)}#chip.disabled #content{color:var(--chi_disabled-color)}#chip.disabled #content svg{cursor:default;fill:var(--chi_disabled-color)}"; }
}

function getColorFromString(rgb) {
    const rIndex = rgb.indexOf('R');
    const gIndex = rgb.indexOf('G');
    const bIndex = rgb.indexOf('B');
    if (rIndex < 0 || gIndex < 0 || bIndex < 0) {
        return;
    }
    const r = rgb.substring(rIndex + 1, rIndex + 4);
    const g = rgb.substring(gIndex + 1, gIndex + 4);
    const b = rgb.substring(bIndex + 1, bIndex + 4);
    try {
        return new Color(parseInt(r), parseInt(g), parseInt(b));
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

class GraphicElement {
    constructor() {
        this.width = 100.0;
        this.height = 100.0;
        this.color = null;
        this.shape = 'bar';
    }
    init(markers) {
        markers.forEach((marker) => {
            if (marker.toUpperCase().startsWith('HEIGHT;')) {
                this.initHeight(marker);
            }
            else if (marker.toUpperCase().startsWith('SHAPE;')) {
                this.initShape(marker);
            }
            else if (marker.toUpperCase().startsWith('BCOLOR;')) ;
            else {
                this.initColor(marker);
            }
        });
    }
    initColor(rgb) {
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
    }
    isTrasparent() {
        return this.color === null;
    }
    initHeight(height) {
        if (height) {
            const toBeParsed = height
                .substring('HEIGHT;'.length)
                .replace(',', '.');
            try {
                this.height = parseFloat(toBeParsed);
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    initShape(shape) {
        shape = shape.substring('SHAPE;'.length);
        const vLastSemicolonIndex = shape.indexOf(';');
        let vShapeTypeString = shape;
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
    }
    isValidColor(color) {
        if (!color) {
            return false;
        }
        color = color.trim();
        const vRgb = [];
        let vError = false;
        let vColorKey = null;
        // red
        let vIndex = color.indexOf('R');
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
            const vIndexR = color.indexOf('R');
            const vIndexG = color.indexOf('G');
            const vIndexB = color.indexOf('B');
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
    }
    getHeight() {
        return this.height;
    }
    getWidth() {
        return this.width;
    }
    getShape() {
        return this.shape;
    }
    getColor() {
        return this.color;
    }
}
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    toString() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }
}

class KupGraphicCell {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.height = 30;
        this.width = 300;
        this.graphic_element_marker_splitter = '\\\\';
        this.graphic_element_splitter = '\\\\AND\\\\';
        this.background_color = 'BCOLOR;R255G000B000';
        this.default_color = new Color(0, 0, 0);
    }
    onValueChange() {
        this.draw();
    }
    // lifecycle
    componentDidLoad() {
        this.draw();
    }
    // private methods
    draw() {
        if (!this.value) {
            return;
        }
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.drawGraphicCell();
        }
    }
    drawGraphicCell() {
        const vGraphicElementDefinitionArr = this.value.split(this.graphic_element_splitter);
        vGraphicElementDefinitionArr.forEach((graphicElem, index) => {
            let vShapeMarker = 'SHAPE;BAR';
            let vBGColorMarker = this.background_color;
            let vHeightPctMarker = 'HEIGHT;100';
            const vMarkersArray = graphicElem.split(this.graphic_element_marker_splitter);
            const shapesArray = [];
            const vSeparatorsList = [];
            vMarkersArray.forEach((vString) => {
                if (this.isShapeMarker(vString)) {
                    vShapeMarker = vString;
                }
                else if (this.isBgColorMarker(vString)) {
                    vBGColorMarker = vString;
                }
                else if (this.isHeightMarker(vString)) {
                    vHeightPctMarker = vString;
                }
                else if (this.isDecoratorMarker(vString)) {
                    vSeparatorsList.push(vString);
                }
                else {
                    shapesArray.push(vString);
                }
            });
            const vGraphicElementArray = shapesArray.map((shape) => {
                const elem = new GraphicElement();
                elem.init([
                    vShapeMarker,
                    vBGColorMarker,
                    vHeightPctMarker,
                    shape,
                ]);
                return elem;
            });
            // first element -> setting background
            if (index === 0 && vBGColorMarker !== this.background_color) {
                const bgColor = getColorFromString(vBGColorMarker.substring('BCOLOR;'.length));
                this.drawRect(0, 0, this.canvas.width, this.canvas.height, bgColor);
            }
            let startX = 0;
            vGraphicElementArray.forEach((elem) => {
                switch (elem.getShape()) {
                    case 'circle':
                        startX = this.getNewStarXFromCircle(startX, elem);
                        break;
                    case 'tril':
                        startX = this.getNewStarXFromTril(startX, elem);
                        break;
                    case 'trir':
                        startX = this.getNewStarXFromTrir(startX, elem);
                        break;
                    default:
                        // bar
                        startX = this.getNewStarXFromBar(startX, elem);
                        break;
                }
            });
            vSeparatorsList.forEach((sep) => {
                if (sep.startsWith('SEP') || sep.startsWith('DIV')) {
                    this.drawSeparator(sep);
                }
                else if (sep.startsWith('ARW')) {
                    this.drawArrow(sep);
                }
                else if (sep.startsWith('GRID')) {
                    this.drawGrid(sep);
                }
            });
        });
    }
    isShapeMarker(value) {
        return value && value.toUpperCase().startsWith('SHAPE;');
    }
    isBgColorMarker(value) {
        return value && value.toUpperCase().startsWith('BCOLOR;');
    }
    isHeightMarker(value) {
        return value && value.toUpperCase().startsWith('HEIGHT;');
    }
    isDecoratorMarker(value) {
        return (value &&
            (value.toUpperCase().startsWith('SEP;') ||
                value.toUpperCase().startsWith('DIV;') ||
                value.toUpperCase().startsWith('ARW;') ||
                value.toUpperCase().startsWith('GRID;')));
    }
    getDim(dimPixel, dimPerc) {
        return Math.floor((dimPixel / 100) * dimPerc);
    }
    getNewStarXFromBar(startX, elem) {
        const elemWidth = this.getDim(this.canvas.width, elem.getWidth());
        const elemHeight = this.getDim(this.canvas.height, elem.getHeight());
        const y = this.canvas.height - elemHeight;
        if (!elem.isTrasparent()) {
            this.drawRect(startX, y, elemWidth, elemHeight, elem.getColor());
        }
        return elemWidth;
    }
    getNewStarXFromCircle(startX, circle) {
        const newStartX = this.getDim(this.canvas.width, circle.getWidth());
        const x = (startX + newStartX) / 2;
        if (!circle.isTrasparent()) {
            this.drawArc(x, this.canvas.height / 2, circle.getColor());
        }
        return newStartX;
    }
    getNewStarXFromTril(startX, triLeft) {
        const newStartX = this.getDim(this.canvas.width, triLeft.getWidth());
        if (!triLeft.isTrasparent()) {
            this.drawTri(newStartX, 0, startX, this.canvas.height / 2, triLeft.getColor());
        }
        return newStartX;
    }
    getNewStarXFromTrir(startX, triRight) {
        const newStartX = this.getDim(this.canvas.width, triRight.getWidth());
        if (!triRight.isTrasparent()) {
            this.drawTri(startX, 0, newStartX, this.canvas.height / 2, triRight.getColor());
        }
        return newStartX;
    }
    drawArc(x, radius, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.beginPath();
        this.ctx.arc(x, radius, radius, 0, 2 * Math.PI, true);
        this.ctx.fill();
    }
    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.fillRect(x, y, width, height);
    }
    drawTri(x1, y1, x2, y2, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x1, this.canvas.height);
        this.ctx.fill();
    }
    drawArrow(sep) {
        let vPart = sep.substring('ARW;'.length);
        if (vPart.indexOf(',') > -1) {
            vPart = vPart.replace(',', '.');
        }
        this.ctx.fillStyle = this.default_color.toString();
        const startX = this.getDim(this.canvas.width, parseFloat(vPart));
        const height = this.canvas.height;
        const arrSpan = Math.floor(height / 3);
        const arrSpanHalf = arrSpan / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, 0);
        this.ctx.lineTo(startX - arrSpan, height / 2);
        this.ctx.lineTo(startX - arrSpanHalf, height / 2);
        this.ctx.lineTo(startX - arrSpanHalf, height);
        this.ctx.lineTo(startX + arrSpanHalf, height);
        this.ctx.lineTo(startX + arrSpanHalf, height / 2);
        this.ctx.lineTo(startX + arrSpan, height / 2);
        this.ctx.fill();
    }
    drawGrid(sep) {
        let vPart = sep.substring('GRID;'.length);
        if (vPart.indexOf(',') > -1) {
            vPart = vPart.replace(',', '.');
        }
        const vTickNum = parseInt(vPart);
        const vTickDist = this.canvas.width / vTickNum;
        const tickH = this.canvas.height / 5;
        const y = this.canvas.height - tickH;
        const tickW = 1;
        for (let i = vTickDist; i < this.canvas.width; i = i + vTickDist) {
            this.drawRect(i, y, tickW, tickH, this.default_color);
        }
    }
    drawSeparator(sep) {
        const vSeparatorPart = sep.substring('SEP;'.length).split(';');
        let vColor = 'R000G000B000';
        let vThickness = 2;
        let vPositionPart = vSeparatorPart[0];
        if (vSeparatorPart.length > 1) {
            vColor = vSeparatorPart[1];
        }
        if (vSeparatorPart.length > 2) {
            vThickness = parseInt(vSeparatorPart[2]);
        }
        if (vPositionPart.indexOf(',') > -1) {
            vPositionPart = vPositionPart.replace(',', '.');
        }
        const x = this.getDim(this.canvas.width, parseFloat(vPositionPart));
        this.drawRect(x, 0, vThickness, this.canvas.height, getColorFromString(vColor));
    }
    render() {
        return (__chunk_1.h("canvas", { ref: (el) => (this.canvas = el), height: this.height, width: this.width }, this.value));
    }
    static get watchers() { return {
        "value": ["onValueChange"]
    }; }
}

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

exports.kup_chip = KupChip;
exports.kup_graphic_cell = KupGraphicCell;
exports.kup_tooltip = KupTooltip;
