export interface Column {
    name: string;
    title: string;
    size?: number;
    visible?: boolean;
}
export interface Row {
    cells: {
        [index: string]: Cell;
    };
    actions?: Array<RowAction>;
    id?: string;
    group?: {
        id: string;
        parent: Row;
        column: string;
        expanded: boolean;
        label: string;
        children: Array<Row>;
        totals: {
            [index: string]: number;
        };
    };
}
export interface Cell {
    obj: {
        t: string;
        p: string;
        k: string;
    };
    value: string;
    style?: GenericMap;
    options?: boolean;
    config?: any;
}
export interface GenericMap {
    [index: string]: string;
}
export interface SortObject {
    column: string;
    sortMode: SortMode;
}
export declare enum SortMode {
    A = "A",
    D = "D"
}
export interface TotalsMap {
    [index: string]: TotalMode;
}
export declare enum TotalMode {
    COUNT = "Count",
    SUM = "Sum",
    AVARAGE = "Avarage"
}
export declare enum PaginatorPos {
    TOP = "Top",
    BOTTOM = "Bottom",
    BOTH = "Both"
}
export interface GroupObject {
    column: string;
    visible: boolean;
}
export interface RowAction {
    text: string;
    icon: string;
}
export declare enum ShowGrid {
    NONE = "None",
    ROW = "Row",
    COL = "Col",
    COMPLETE = "Complete"
}
