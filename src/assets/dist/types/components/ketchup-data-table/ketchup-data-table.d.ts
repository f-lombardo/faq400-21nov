import '../../stencil.core';
import { EventEmitter, JSXElements } from '../../stencil.core';
import { Column, PaginatorPos, SortObject, Row, TotalMode, GenericMap, GroupObject } from './ketchup-data-table-declarations';
export declare class KetchupDataTable {
    data: {
        columns?: Array<Column>;
        rows?: Array<Row>;
    };
    showFilters: boolean;
    filters: GenericMap;
    totals: {
        [index: string]: TotalMode;
    };
    globalFilter: boolean;
    sortEnabled: boolean;
    sort: Array<SortObject>;
    rowsPerPage: number;
    paginatorPos: PaginatorPos;
    columnsWidth: Array<{
        column: string;
        width: number;
    }>;
    showHeader: boolean;
    showGrid: boolean;
    selectRow: number;
    groups: Array<GroupObject>;
    private globalFilterValue;
    private currentPage;
    private currentRowsPerPage;
    private selectedRow;
    private groupState;
    rowsPerPageHandler(newValue: number): void;
    /**
     * When a row is selected
     */
    kupRowSelected: EventEmitter<{
        row: Row;
    }>;
    componentWillLoad(): void;
    private getColumns;
    private getRows;
    private isGrouping;
    private getFilteredRows;
    private onColumnSort;
    private onFilterChange;
    private onGlobalFilterChange;
    private groupRows;
    private sortRows;
    private compareCell;
    private paginateRows;
    private getSortIcon;
    private handlePageChanged;
    private handleRowsPerPageChanged;
    private onRowClick;
    private onRowExpand;
    private renderHeader;
    renderFooter(rows: Array<Row>): JSXElements.HTMLAttributes<HTMLTableSectionElement> | null;
    private renderRow;
    render(): JSX.Element;
}
