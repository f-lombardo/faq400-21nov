export class KupGauge {
    constructor() {
        this.arcThickness = 30;
        this.colors = ['red', 'yellow', 'green'];
        this.labelDistance = 20;
        this.maxValue = 100;
        this.measurementUnit = '';
        this.minValue = -100;
        this.reverseColors = false;
        this.showLabels = true;
        this.showValue = true;
        this.size = 300;
        this.value = 0;
        this.arcGenerator = d3.arc();
        this.maxValuePositive = 0;
    }
    percToDeg(perc) {
        return perc * 360;
    }
    ;
    degToRad(deg) {
        return deg * Math.PI / 180;
    }
    ;
    percToRad(perc) {
        return this.degToRad(this.percToDeg(perc));
    }
    ;
    calculateValuePercentage(valueToPercentage = 0) {
        return (valueToPercentage - this.minValue) / this.maxValuePositive;
    }
    paintNeedle(needleLength, needleBaseRadius, centerX, centerY, rotationPercentage = 0) {
        let leftX, leftY, rightX, rightY, thetaRad, topX, topY;
        thetaRad = this.percToRad(rotationPercentage / 2);
        topX = centerX - needleLength * Math.cos(thetaRad);
        topY = centerY - needleLength * Math.sin(thetaRad);
        leftX = centerX - needleBaseRadius * Math.cos(thetaRad - Math.PI / 2);
        leftY = centerY - needleBaseRadius * Math.sin(thetaRad - Math.PI / 2);
        rightX = centerX - needleBaseRadius * Math.cos(thetaRad + Math.PI / 2);
        rightY = centerY - needleBaseRadius * Math.sin(thetaRad + Math.PI / 2);
        return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
    }
    render() {
        this.maxValuePositive = Math.abs(this.minValue - this.maxValue);
        const halvedSize = this.size / 2;
        const needleCircleRadius = this.size / 16;
        const needleLength = halvedSize - this.arcThickness / 2;
        const valueLabelYPosition = halvedSize + needleCircleRadius + this.labelDistance * 1;
        const givenThresholds = [];
        if (this.firstThreshold) {
            givenThresholds.push(this.firstThreshold);
        }
        if (this.secondThreshold) {
            givenThresholds.push(this.secondThreshold);
        }
        const arcsThresholds = [this.minValue, ...givenThresholds, this.maxValue];
        const arcsElements = [];
        const arcsColors = !this.reverseColors ? this.colors : this.colors.reverse();
        for (let i = 0; i < arcsThresholds.length - 1; i++) {
            const currentArcPath = this.arcGenerator({
                innerRadius: halvedSize - this.arcThickness,
                outerRadius: halvedSize,
                startAngle: this.calculateValuePercentage(arcsThresholds[i]) * Math.PI,
                endAngle: this.calculateValuePercentage(arcsThresholds[i + 1]) * Math.PI
            });
            arcsElements.push(h("path", { d: currentArcPath, style: { fill: arcsColors[i] ? arcsColors[i] : '#000000' } }));
        }
        const textElements = this.showLabels ? arcsThresholds.map(threshold => {
            const thresholdPercentage = this.calculateValuePercentage(threshold);
            let textPosition = 'end';
            if (thresholdPercentage > .5) {
                textPosition = 'start';
            }
            else if (thresholdPercentage === .5) {
                textPosition = 'middle';
            }
            const thetaRad = this.percToRad(thresholdPercentage / 2);
            const topX = halvedSize - (needleLength + this.labelDistance) * Math.cos(thetaRad);
            const topY = halvedSize - (needleLength + this.labelDistance) * Math.sin(thetaRad);
            return h("text", { class: "gauge__label-text", "text-anchor": textPosition, x: topX, y: topY }, threshold + ' ' + this.measurementUnit);
        })
            : [];
        return (h("div", { class: "gauge__container" },
            h("svg", { class: "gauge", viewBox: `0 0 ${this.size} ${valueLabelYPosition}` },
                h("g", { transform: `rotate(-90) translate(-${halvedSize}, ${halvedSize})` }, arcsElements),
                h("circle", { class: "gauge__needle-base", cx: halvedSize, cy: halvedSize, r: needleCircleRadius }),
                h("path", { class: "gauge__needle", d: this.paintNeedle(needleLength, needleCircleRadius, halvedSize, halvedSize, this.calculateValuePercentage(this.value)) }),
                textElements,
                this.showValue ?
                    h("text", { class: "gauge__value-text", "text-anchor": "middle", x: halvedSize, y: valueLabelYPosition }, this.value + ' ' + this.measurementUnit)
                    : null)));
    }
    static get is() { return "kup-gauge"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "arcThickness": {
            "type": Number,
            "attr": "arc-thickness"
        },
        "colors": {
            "type": "Any",
            "attr": "colors"
        },
        "firstThreshold": {
            "type": Number,
            "attr": "first-threshold"
        },
        "labelDistance": {
            "type": Number,
            "attr": "label-distance"
        },
        "maxValue": {
            "type": Number,
            "attr": "max-value"
        },
        "measurementUnit": {
            "type": String,
            "attr": "measurement-unit"
        },
        "minValue": {
            "type": Number,
            "attr": "min-value"
        },
        "reverseColors": {
            "type": Boolean,
            "attr": "reverse-colors"
        },
        "secondThreshold": {
            "type": Number,
            "attr": "second-threshold"
        },
        "showLabels": {
            "type": Boolean,
            "attr": "show-labels"
        },
        "showValue": {
            "type": Boolean,
            "attr": "show-value"
        },
        "size": {
            "type": Number,
            "attr": "size"
        },
        "value": {
            "type": Number,
            "attr": "value"
        }
    }; }
    static get style() { return "/**style-placeholder:kup-gauge:**/"; }
}
