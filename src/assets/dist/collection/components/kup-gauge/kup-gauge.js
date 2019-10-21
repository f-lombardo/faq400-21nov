import { h } from '@stencil/core';
export class KupGauge {
    constructor() {
        /**
         * Sets how much the arc of the gauge should be thick.
         * @namespace kup-gauge.arcThickness
         * @see kup-gauge.size
         */
        this.arcThickness = 30;
        /**
         * Array of three elements to specify the color of the arcs.
         */
        this.colors = [
            'var(--gau_first-color)',
            'var(--gau_second-color)',
            'var(--gau_third-color)',
        ];
        /**
         * The distance the label and the value has from the gauge graph.
         */
        this.labelDistance = 20;
        /**
         * The maximum value reachable in the current graph.
         */
        this.maxValue = 100;
        /**
         * A string which will be appended to the displayed values of the component.
         */
        this.measurementUnit = '';
        /**
         * The minimum value reachable in the current graph.
         */
        this.minValue = -100;
        /**
         * If set to true, the colors inside the colors array are used in the reversed order.
         */
        this.reverseColors = false;
        /**
         * If set to false, threshold values of the gauge are not displayed.
         */
        this.showLabels = true;
        /**
         * If set to false, the maximum and minimum values of the gauge are not displayed.
         */
        this.showMaxmin = true;
        /**
         * If set to false, the current value of the gauge is not displayed.
         */
        this.showValue = true;
        /**
         * Con be used change the viewbox of the SVG.
         * By manipulating this value, some customizations of the aspect of the gauge is achievable.
         * @namespace kup-gauge.size
         * @see kup-gauge.arcThickness
         */
        this.size = 300;
        /**
         * The current value of the gauge.
         * The gauge's needle points to the percentage based on this prop.
         */
        this.value = 0;
        /**
         * The current size of gauge's value.
         * Correct values are: 0,1,2 or 3.
         */
        this.valueSize = 0;
        /**
         * if true, shows a rounded needle.
         */
        this.needleCircle = false;
        /**
         * if true, ignore threasholds in gauge and show
         * colored value's arc.
         */
        this.onlyValue = false;
        /**
         * Set Width gauge.
         */
        this.widthComponent = '22vw';
        //---- Internal not reactive state ----
        // Arcs generator
        this.arcGenerator = d3.arc();
        /**
         * Holds the maximum positive interval.
         * Percentages are calculated as it follows:
         * MIN = 0 = the value the prop minValue gets transformed to\
         * MAX = ABSOLUTE(minValue - maxValue) = the maxValuePositive holds this value
         * TVALUE = value - minValue = any value, which needs to be represented on the chart
         * @namespace kup-gauge.maxValuePositive
         */
        this.maxValuePositive = 0;
    }
    //---- Utility functions ----
    // Manipulates and transforms degrees to percentage and vice versa.
    percToDeg(perc) {
        return perc * 360;
    }
    degToRad(deg) {
        return (deg * Math.PI) / 180;
    }
    percToRad(perc) {
        return this.degToRad(this.percToDeg(perc));
    }
    /**
     * Given a valid value, minValue <= value <= maxValue, calculates this value as a percentage of the interval [minValue, maxValue]
     * @param {number} valueToPercentage - The value to be calculated as a percentage
     * @see kup-gauge.maxValuePositive
     */
    calculateValuePercentage(valueToPercentage = 0) {
        return (valueToPercentage - this.minValue) / this.maxValuePositive;
    }
    calculateValueFontSize() {
        if (this.valueSize > 2)
            return '3vw';
        if (this.valueSize > 1)
            return '2.5vw';
        if (this.valueSize > 0)
            return '2vw';
        return '1.5vw';
    }
    //---- Rendering functions ----
    /**
     * Provided all the necessary data, returns the string necessary for a <path/> element to build the gauge needle.
     * @param needleLength - A pure number of viewbox units indicating the needle lenght.
     * @param needleBaseRadius - Sets the needle radius in viewbox units.
     * @param centerX - X coordinate of the center of the base needle.
     * @param centerY - Y coordinate of the center of the base needle.
     * @param rotationPercentage {number} - A percentage number setting the current rotation of the needle. (0 < rotationPercentage < 1)
     * @returns {string}
     */
    paintNeedle(needleLength, needleBaseRadius, centerX, centerY, rotationPercentage = 0) {
        let leftX, leftY, rightX, rightY, thetaRad, topX, topY;
        thetaRad = this.percToRad(rotationPercentage / 2); // Since the gauge is a semicircle, we must divide the percentage in half to have the correct angle
        topX = centerX - needleLength * Math.cos(thetaRad);
        topY = centerY - needleLength * Math.sin(thetaRad);
        leftX = centerX - needleBaseRadius * Math.cos(thetaRad - Math.PI / 2);
        leftY = centerY - needleBaseRadius * Math.sin(thetaRad - Math.PI / 2);
        rightX = centerX - needleBaseRadius * Math.cos(thetaRad + Math.PI / 2);
        rightY = centerY - needleBaseRadius * Math.sin(thetaRad + Math.PI / 2);
        return ('M ' +
            leftX +
            ' ' +
            leftY +
            ' L ' +
            topX +
            ' ' +
            topY +
            ' L ' +
            rightX +
            ' ' +
            rightY);
    }
    render() {
        // mathematical operations
        this.maxValuePositive = Math.abs(this.minValue - this.maxValue);
        // Svg constants
        const halvedSize = this.size / 2; // The svg size ratio w : w / 2
        const needleCircleRadius = this.size / 20; // Arbitrary size of the base of the needle
        const needleLength = halvedSize - 2 * this.arcThickness; // Calculates the length of the needle in pure units
        const valueLabelYPosition = halvedSize + needleCircleRadius + this.labelDistance * 1;
        // User provided thresholds
        // TODO these thresholds will be given to the component by a user prop
        const givenThresholds = [];
        if (!this.onlyValue) {
            if (this.firstThreshold || 0 === this.firstThreshold) {
                givenThresholds.push(this.firstThreshold);
            }
            if (this.secondThreshold || 0 === this.secondThreshold) {
                givenThresholds.push(this.secondThreshold);
            }
        }
        else {
            givenThresholds.push(this.value);
        }
        // This creates the various point from which the arcs are generated
        const arcsThresholds = [
            this.minValue,
            ...givenThresholds,
            this.maxValue,
        ];
        // Creates arc elements and chooses their color orders
        const arcsElements = [];
        let arcsColors;
        if (!this.onlyValue) {
            arcsColors = !this.reverseColors
                ? this.colors
                : this.colors.slice().reverse();
        }
        else {
            let computedcolors = !this.reverseColors
                ? this.colors
                : this.colors.slice().reverse();
            let valuecolor = this.value < this.firstThreshold
                ? computedcolors[0]
                : this.value < this.secondThreshold
                    ? computedcolors[1]
                    : computedcolors[2];
            arcsColors = [valuecolor, 'var(--gau_empty-color)'];
        }
        console.log(arcsThresholds.length);
        for (let i = 0; i < arcsThresholds.length - 1; i++) {
            const currentArcPath = this.arcGenerator({
                innerRadius: halvedSize - this.arcThickness,
                outerRadius: halvedSize,
                startAngle: this.calculateValuePercentage(arcsThresholds[i]) * Math.PI,
                endAngle: this.calculateValuePercentage(arcsThresholds[i + 1]) *
                    Math.PI,
            });
            // If there is no color specified for that arc, we provide a black fallback
            arcsElements.push(h("path", { d: currentArcPath, style: { fill: arcsColors[i] ? arcsColors[i] : '#000000' } }));
        }
        console.log(arcsElements.length);
        // Composes the threshold label elements, if labels must be displayed
        const textElements = this.showLabels || this.showMaxmin
            ? arcsThresholds.map((threshold) => {
                // Given the
                const thresholdPercentage = this.calculateValuePercentage(threshold);
                // Decides the position of the text
                // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
                let textPosition = 'end';
                if (thresholdPercentage > 0.5) {
                    textPosition = 'start';
                }
                else if (thresholdPercentage === 0.5) {
                    textPosition = 'middle';
                }
                // Since the gauge is a semicircle, we must divide the percentage in half to have the correct angle
                const thetaRad = this.percToRad(thresholdPercentage / 2);
                let topX = halvedSize - (needleLength + 2) * Math.cos(thetaRad);
                let topY = halvedSize - (needleLength + 2) * Math.sin(thetaRad);
                let retValue = '';
                if (thresholdPercentage > 0 && thresholdPercentage < 1) {
                    if (this.showLabels && !this.onlyValue) {
                        retValue = (h("text", { class: "gauge__label-text", "text-anchor": textPosition, x: topX, y: topY }, threshold));
                    }
                }
                else {
                    if (this.showMaxmin) {
                        if (thresholdPercentage === 0) {
                            topX = this.arcThickness;
                            topY = halvedSize + this.labelDistance;
                        }
                        else {
                            topX = this.size - this.arcThickness;
                            topY = halvedSize + this.labelDistance;
                        }
                        retValue = (h("text", { class: "gauge__label-text", "text-anchor": textPosition, x: topX, y: topY }, threshold));
                    }
                }
                return retValue;
            })
            : [];
        const style = { fontSize: this.calculateValueFontSize() };
        const width = { width: this.widthComponent };
        return (h("div", { class: "gauge__container" },
            h("svg", { class: "gauge", style: width, viewBox: `0 0 ${this.size} ${valueLabelYPosition}` },
                h("g", { transform: `rotate(-90) translate(-${halvedSize}, ${halvedSize})` }, arcsElements),
                this.needleCircle ?
                    h("circle", { class: "gauge__needle-base", cx: halvedSize, cy: halvedSize, r: needleCircleRadius }) : null,
                h("path", { class: "gauge__needle", d: this.paintNeedle(needleLength, needleCircleRadius, halvedSize, halvedSize, this.calculateValuePercentage(this.value)) }),
                textElements),
            h("div", null, this.showValue ?
                h("div", { class: "gauge__value-text", "text-anchor": "middle", style: style }, this.value + ' ' + this.measurementUnit)
                : null)));
    }
    static get is() { return "kup-gauge"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-gauge.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-gauge.css"]
    }; }
    static get properties() { return {
        "arcThickness": {
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
                "tags": [{
                        "text": "kup-gauge.arcThickness",
                        "name": "namespace"
                    }, {
                        "text": "kup-gauge.size",
                        "name": "see"
                    }],
                "text": "Sets how much the arc of the gauge should be thick."
            },
            "attribute": "arc-thickness",
            "reflect": false,
            "defaultValue": "30"
        },
        "colors": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Array of three elements to specify the color of the arcs."
            },
            "defaultValue": "[\r\n        'var(--gau_first-color)',\r\n        'var(--gau_second-color)',\r\n        'var(--gau_third-color)',\r\n    ]"
        },
        "firstThreshold": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The first threshold, establishing the length of the first and second arc."
            },
            "attribute": "first-threshold",
            "reflect": false
        },
        "labelDistance": {
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
                "text": "The distance the label and the value has from the gauge graph."
            },
            "attribute": "label-distance",
            "reflect": false,
            "defaultValue": "20"
        },
        "maxValue": {
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
                "text": "The maximum value reachable in the current graph."
            },
            "attribute": "max-value",
            "reflect": false,
            "defaultValue": "100"
        },
        "measurementUnit": {
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
                "text": "A string which will be appended to the displayed values of the component."
            },
            "attribute": "measurement-unit",
            "reflect": false,
            "defaultValue": "''"
        },
        "minValue": {
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
                "text": "The minimum value reachable in the current graph."
            },
            "attribute": "min-value",
            "reflect": false,
            "defaultValue": "-100"
        },
        "reverseColors": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If set to true, the colors inside the colors array are used in the reversed order."
            },
            "attribute": "reverse-colors",
            "reflect": false,
            "defaultValue": "false"
        },
        "secondThreshold": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "The second threshold, establishing the length of the second and third arc."
            },
            "attribute": "second-threshold",
            "reflect": false
        },
        "showLabels": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If set to false, threshold values of the gauge are not displayed."
            },
            "attribute": "show-labels",
            "reflect": false,
            "defaultValue": "true"
        },
        "showMaxmin": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If set to false, the maximum and minimum values of the gauge are not displayed."
            },
            "attribute": "show-maxmin",
            "reflect": false,
            "defaultValue": "true"
        },
        "showValue": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If set to false, the current value of the gauge is not displayed."
            },
            "attribute": "show-value",
            "reflect": false,
            "defaultValue": "true"
        },
        "size": {
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
                "tags": [{
                        "text": "kup-gauge.size",
                        "name": "namespace"
                    }, {
                        "text": "kup-gauge.arcThickness",
                        "name": "see"
                    }],
                "text": "Con be used change the viewbox of the SVG.\r\nBy manipulating this value, some customizations of the aspect of the gauge is achievable."
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "300"
        },
        "value": {
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
                "text": "The current value of the gauge.\r\nThe gauge's needle points to the percentage based on this prop."
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "0"
        },
        "valueSize": {
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
                "text": "The current size of gauge's value.\r\nCorrect values are: 0,1,2 or 3."
            },
            "attribute": "value-size",
            "reflect": false,
            "defaultValue": "0"
        },
        "needleCircle": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "if true, shows a rounded needle."
            },
            "attribute": "needle-circle",
            "reflect": false,
            "defaultValue": "false"
        },
        "onlyValue": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "if true, ignore threasholds in gauge and show\r\ncolored value's arc."
            },
            "attribute": "only-value",
            "reflect": false,
            "defaultValue": "false"
        },
        "widthComponent": {
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
                "text": "Set Width gauge."
            },
            "attribute": "width-component",
            "reflect": false,
            "defaultValue": "'22vw'"
        }
    }; }
}
