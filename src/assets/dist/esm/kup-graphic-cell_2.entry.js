import { r as registerInstance, h, c as createEvent } from './chunk-1851c479.js';

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
        registerInstance(this, hostRef);
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
        return (h("canvas", { ref: (el) => (this.canvas = el), height: this.height, width: this.width }, this.value));
    }
    static get watchers() { return {
        "value": ["onValueChange"]
    }; }
}

class KupPaginator {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.max = 0;
        this.perPage = 10;
        this.selectedPerPage = 10;
        this.currentPage = 1;
        this.kupPageChanged = createEvent(this, "kupPageChanged", 6);
        this.kupRowsPerPageChanged = createEvent(this, "kupRowsPerPageChanged", 6);
    }
    isPrevPageDisabled() {
        return this.currentPage == 1;
    }
    isNextPageDisabled() {
        return this.currentPage * this.perPage >= this.max;
    }
    onPrevPage() {
        if (this.isPrevPageDisabled()) {
            return;
        }
        // fire next page event
        this.kupPageChanged.emit({
            newPage: this.currentPage - 1,
        });
    }
    onNextPage() {
        if (this.isNextPageDisabled()) {
            return;
        }
        // fire next page event
        this.kupPageChanged.emit({
            newPage: this.currentPage + 1,
        });
    }
    onGoToPage({ target }) {
        this.kupPageChanged.emit({
            newPage: parseInt(target.value),
        });
    }
    onRowsPerPage({ target }) {
        this.kupRowsPerPageChanged.emit({
            newRowsPerPage: parseInt(target.value),
        });
    }
    // render functions
    getGoToPageOptions(maxNumberOfPage) {
        const goToPageOptions = [];
        goToPageOptions.push(h("option", { value: "1", selected: this.currentPage === 1 }, "1"));
        for (let i = 2; i <= maxNumberOfPage; i++) {
            goToPageOptions.push(h("option", { value: i, selected: this.currentPage === i }, i));
        }
        return goToPageOptions;
    }
    getRowsPerPageOptions() {
        const rowsPerPageOptions = [];
        if (this.currentPage != this.max) {
            let i = this.perPage;
            if (i === 0) {
                return rowsPerPageOptions;
            }
            while (i < this.max) {
                rowsPerPageOptions.push(h("option", { value: i, selected: i === this.selectedPerPage }, i));
                i = i * 2;
            }
            // adding 'max' option
            rowsPerPageOptions.push(h("option", { value: this.max, selected: this.max === this.perPage }, this.max));
        }
        else {
            rowsPerPageOptions.push(h("option", { value: this.perPage, selected: true }, this.perPage));
        }
        return rowsPerPageOptions;
    }
    render() {
        let prevPageClassName = 'mdi mdi-chevron-left';
        if (this.isPrevPageDisabled()) {
            prevPageClassName += ' disabled';
        }
        let nextPageClassName = 'mdi mdi-chevron-right';
        if (this.isNextPageDisabled()) {
            nextPageClassName += ' disabled';
        }
        const maxNumberOfPage = Math.ceil(this.max / this.selectedPerPage);
        const goToPageOptions = this.getGoToPageOptions(maxNumberOfPage);
        const rowsPerPageOptions = this.getRowsPerPageOptions();
        return (h("div", { id: "paginator" }, h("div", { class: "align-left" }, "Pagina", h("span", { class: "prev-page" }, h("icon", { className: prevPageClassName, onclick: () => this.onPrevPage() })), h("select", { onChange: (e) => this.onGoToPage(e) }, goToPageOptions), h("span", { class: "next-page" }, h("icon", { className: nextPageClassName, onclick: () => this.onNextPage() })), "Di ", maxNumberOfPage), h("div", { class: "align-right" }, h("span", { class: "nextPageGroup" }, "Numero risultati: ", this.max), h("slot", { name: "more-results" }), "Mostra", h("select", { onChange: (e) => this.onRowsPerPage(e) }, rowsPerPageOptions), "righe per pagina")));
    }
    static get style() { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);:host{--int_text-color:var(--kup-paginator_text-color,$mainTextColor);--int_font-size:var(--kup-paginator_font-size,1rem)}#paginator{color:var(--int_text-color);margin:.5rem 0;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:justify;justify-content:space-between;font-size:var(--int_font-size)}#paginator icon{cursor:pointer;opacity:1;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}#paginator icon:hover:not(.disabled){opacity:.75}#paginator icon.disabled{cursor:default;opacity:.3}#paginator .nextPageGroup,#paginator select{margin:0 .5rem}#paginator .next-page,#paginator .prev-page{margin:0 .25rem}#paginator .nextPageGroup{padding-right:1.5rem}"; }
}

export { KupGraphicCell as kup_graphic_cell, KupPaginator as kup_paginator };
