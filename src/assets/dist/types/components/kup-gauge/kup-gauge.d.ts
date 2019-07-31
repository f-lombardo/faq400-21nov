export declare class KupGauge {
    /**
     * Sets how much the arc of the gauge should be thick.
     * @namespace kup-gauge.arcThickness
     * @see kup-gauge.size
     */
    arcThickness: number;
    /**
     * Array of three elements to specify the color of the arcs.
     */
    colors: string[];
    /**
     * The first threshold, establishing the length of the first and second arc.
     */
    firstThreshold?: number;
    /**
     * The distance the label and the value has from the gauge graph.
     */
    labelDistance: number;
    /**
     * The maximum value reachable in the current graph.
     */
    maxValue: number;
    /**
     * A string which will be appended to the displayed values of the component.
     */
    measurementUnit: string;
    /**
     * The minimum value reachable in the current graph.
     */
    minValue: number;
    /**
     * If set to true, the colors inside the colors array are used in the reversed order.
     */
    reverseColors: boolean;
    /**
     * The second threshold, establishing the length of the second and third arc.
     */
    secondThreshold?: number;
    /**
     * If set to false, threshold values of the gauge are not displayed.
     */
    showLabels: boolean;
    /**
     * If set to false, the maximum and minimum values of the gauge are not displayed.
     */
    showMaxmin: boolean;
    /**
     * If set to false, the current value of the gauge is not displayed.
     */
    showValue: boolean;
    /**
     * Con be used change the viewbox of the SVG.
     * By manipulating this value, some customizations of the aspect of the gauge is achievable.
     * @namespace kup-gauge.size
     * @see kup-gauge.arcThickness
     */
    size: number;
    /**
     * The current value of the gauge.
     * The gauge's needle points to the percentage based on this prop.
     */
    value: number;
    /**
     * The current size of gauge's value.
     * Correct values are: 0,1,2 or 3.
     */
    valueSize: number;
    /**
     * if true, shows a rounded needle.
     */
    needleCircle: boolean;
    /**
     * if true, ignore threasholds in gauge and show
     * colored value's arc.
     */
    onlyValue: boolean;
    /**
     * Set Width gauge.
     */
    widthComponent: string;
    private arcGenerator;
    /**
     * Holds the maximum positive interval.
     * Percentages are calculated as it follows:
     * MIN = 0 = the value the prop minValue gets transformed to\
     * MAX = ABSOLUTE(minValue - maxValue) = the maxValuePositive holds this value
     * TVALUE = value - minValue = any value, which needs to be represented on the chart
     * @namespace kup-gauge.maxValuePositive
     */
    private maxValuePositive;
    percToDeg(perc: any): number;
    degToRad(deg: any): number;
    percToRad(perc: any): number;
    /**
     * Given a valid value, minValue <= value <= maxValue, calculates this value as a percentage of the interval [minValue, maxValue]
     * @param {number} valueToPercentage - The value to be calculated as a percentage
     * @see kup-gauge.maxValuePositive
     */
    calculateValuePercentage(valueToPercentage?: number): number;
    calculateValueFontSize(): string;
    /**
     * Provided all the necessary data, returns the string necessary for a <path/> element to build the gauge needle.
     * @param needleLength - A pure number of viewbox units indicating the needle lenght.
     * @param needleBaseRadius - Sets the needle radius in viewbox units.
     * @param centerX - X coordinate of the center of the base needle.
     * @param centerY - Y coordinate of the center of the base needle.
     * @param rotationPercentage {number} - A percentage number setting the current rotation of the needle. (0 < rotationPercentage < 1)
     * @returns {string}
     */
    paintNeedle(needleLength: number, needleBaseRadius: number, centerX: number, centerY: number, rotationPercentage?: number): string;
    render(): any;
}
