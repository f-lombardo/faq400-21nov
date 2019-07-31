import { Row, SortObject, GenericMap, GroupObject, TotalMode, TotalsMap, Column } from './kup-data-table-declarations';
export declare function sortRows(rows?: Array<Row>, sort?: Array<SortObject>): Array<Row>;
export declare function filterRows(rows?: Array<Row>, filters?: GenericMap, globalFilter?: string, columns?: Array<string>): Row[];
export declare function groupRows(columns?: Column[], rows?: Row[], groups?: GroupObject[], totals?: TotalsMap): Array<Row>;
export declare function calcTotals(rows?: Array<Row>, totals?: {
    [index: string]: TotalMode;
}): {
    [index: string]: number;
};
export declare function getColumnByName(columns: Column[], name: string): Column;
