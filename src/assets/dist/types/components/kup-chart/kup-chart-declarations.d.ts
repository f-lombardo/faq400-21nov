import { Column, Row } from '../kup-data-table/kup-data-table-declarations';
export declare enum ChartType {
    Area = "Area",
    Bubble = "Bubble",
    Cal = "Cal",
    Candlestick = "Candlestick",
    Combo = "Combo",
    Geo = "Geo",
    Hbar = "Hbar",
    Line = "Line",
    Ohlc = "Ohlc",
    Pie = "Pie",
    Sankey = "Sankey",
    Scatter = "Scatter",
    Unk = "Unk",
    Vbar = "Vbar"
}
export declare enum ChartAspect {
    D2 = "2D",
    D3 = "3D"
}
export interface ChartOptions {
    is3D: boolean;
    colors?: string[];
    width?: number;
    height?: number;
    legend?: {
        position: string;
    };
    isStacked?: boolean;
    title?: string;
    titleTextStyle?: {
        color?: string;
        fontSize?: number;
    };
    series?: any;
}
export interface ChartClickedEvent {
    datetime?: string;
    column?: Column;
    row?: Row;
}
