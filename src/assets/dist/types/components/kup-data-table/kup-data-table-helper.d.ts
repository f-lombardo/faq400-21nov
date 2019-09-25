import { Row, SortObject, Cell, GenericMap, GroupObject, TotalMode, TotalsMap, Column } from './kup-data-table-declarations';
export declare function sortRows(rows?: Array<Row>, sort?: Array<SortObject>): Array<Row>;
export declare function filterRows(rows?: Array<Row>, filters?: GenericMap, globalFilter?: string, columns?: Array<string>): Row[];
export declare function groupRows(columns?: Column[], rows?: Row[], groups?: GroupObject[], totals?: TotalsMap): Array<Row>;
export declare function calcTotals(rows?: Array<Row>, totals?: {
    [index: string]: TotalMode;
}): {
    [index: string]: number;
};
export declare function getColumnByName(columns: Column[], name: string): Column;
export declare function paginateRows(rows: Row[], currentPage: number, rowsPerPage: number): Row[];
/**
 * Given a cell object, determines if the style object has also a border radius
 * @param cell - The cell to check
 * @returns {boolean} - true if borderRadius is present, false otherwise.
 */
export declare function styleHasBorderRadius(cell: Cell): boolean;
