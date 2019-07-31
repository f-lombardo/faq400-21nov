import { getColorFromString } from './kup-graphic-cell-helper';
export class GraphicElement {
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
            else if (marker.toUpperCase().startsWith('BCOLOR;')) {
                // TODO ?
            }
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
export class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    toString() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }
}
