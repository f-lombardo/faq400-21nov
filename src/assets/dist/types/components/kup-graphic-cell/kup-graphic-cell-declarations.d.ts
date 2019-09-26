export declare class GraphicElement {
    width: number;
    height: number;
    color: Color;
    shape: string;
    init(markers: string[]): void;
    initColor(rgb: string): void;
    isTrasparent(): boolean;
    initHeight(height: string): void;
    initShape(shape: string): void;
    isValidColor(color: string): boolean;
    getHeight(): number;
    getWidth(): number;
    getShape(): string;
    getColor(): Color;
}
export declare class Color {
    private r;
    private g;
    private b;
    constructor(r: number, g: number, b: number);
    toString(): string;
}
