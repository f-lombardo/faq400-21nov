import '../../stencil.core';
import { EventEmitter, JSXElements } from '../../stencil.core';
import { Column, PaginatorPos, SortObject, Row, GenericMap, GroupObject, TotalsMap } from './ketchup-data-table-declarations';
export declare class KetchupDataTable {
    data: {
        columns?: Array<Column>;
        rows?: Array<Row>;
    };
    showFilters: boolean;
    filters: GenericMap;
    totals: TotalsMap;
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
    multiSelection: boolean;
    private globalFilterValue;
    private currentPage;
    private currentRowsPerPage;
    private selectedRows;
    private groupState;
    /**
     * name of the column with an open menu
     */
    private openedMenu;
    private density;
    rowsPerPageHandler(newValue: number): void;
    private renderedRows;
    /**
     * When a row is auto selected via selectRow prop
     */
    kupAutoRowSelect: EventEmitter<{
        selectedRow: Row;
    }>;
    /**
     * When a row is selected
     */
    kupRowSelected: EventEmitter<{
        selectedRows: Array<Row>;
        clickedColumn: string;
    }>;
    /**
     * When cell option is clicked
     */
    kupOptionClicked: EventEmitter<{
        column: string;
        row: Row;
    }>;
    /**
     * When 'add column' menu item is clicked
     */
    kupAddColumn: EventEmitter<{
        column: string;
    }>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private getColumns;
    private getVisibleColumns;
    private getColumnByName;
    private getGroupByName;
    private getRows;
    private getFilteredRows;
    private isGrouping;
    private removeGroup;
    private hasTotals;
    private onColumnSort;
    private onFilterChange;
    private onGlobalFilterChange;
    private handlePageChanged;
    private handleRowsPerPageChanged;
    private onRowClick;
    private handleRowSelect;
    private onRowCheckboxSelection;
    private onRowExpand;
    private onSelectAll;
    private onColumnMouseOver;
    private onColumnMouseLeave;
    private switchColumnGroup;
    private onOptionClicked;
    private groupRows;
    private adjustGroupState;
    private adjustGroupStateFromRow;
    private sortRows;
    private paginateRows;
    private getSortIcon;
    private calculateColspan;
    private renderHeader;
    renderFooter(rows: Array<Row>): JSXElements.HTMLAttributes<HTMLTableSectionElement> | null;
    private renderRow;
    render(): JSX.Element;
}
