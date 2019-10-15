import { h } from '@stencil/core';
import { GraphicElement, Color } from './kup-graphic-cell-declarations';
import { getColorFromString } from './kup-graphic-cell-helper';
export class KupGraphicCell {
    constructor() {
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
    static get is() { return "kup-graphic-cell"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "value": {
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
                "text": ""
            },
            "attribute": "value",
            "reflect": false
        },
        "height": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "height",
            "reflect": false,
            "defaultValue": "30"
        },
        "width": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "width",
            "reflect": false,
            "defaultValue": "300"
        }
    }; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "onValueChange"
        }]; }
}
