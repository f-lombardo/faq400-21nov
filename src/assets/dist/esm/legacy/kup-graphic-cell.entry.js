import { r as registerInstance, h } from './chunk-1851c479.js';
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
export { KupGraphicCell as kup_graphic_cell };
