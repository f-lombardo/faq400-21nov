import '../../stencil.core';
import { EventEmitter, JSXElements } from '../../stencil.core';
import { Column, PaginatorPos, SortObject, Row, GenericMap, GroupObject, TotalsMap, RowAction, ShowGrid } from './kup-data-table-declarations';
export declare class KupDataTable {
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
    showGrid: ShowGrid;
    selectRow: number;
    groups: Array<GroupObject>;
    expandGroups: boolean;
    multiSelection: boolean;
    rowActions: Array<RowAction>;
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
    expandGroupsHandler(): void;
    recalculateRows(): void;
    private rows;
    private paginatedRows;
    private footer;
    private renderedRows;
    private columnOverTimeout;
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
    /**
     * When a row action is clicked
     */
    kupRowActionClicked: EventEmitter<{
        type: 'default' | 'variable' | 'expander';
        row: Row;
        action?: RowAction;
        index?: number;
    }>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private getColumns;
    private getVisibleColumns;
    private getColumnByName;
    private getGroupByName;
    private getRows;
    private initRows;
    private getFilteredRows;
    private isGrouping;
    private hasRowActions;
    private removeGroup;
    private hasTotals;
    private forceGroupExpansion;
    private forceRowGroupExpansion;
    private onColumnSort;
    private onFilterChange;
    private onGlobalFilterChange;
    private handlePageChanged;
    private handleRowsPerPageChanged;
    private onRowClick;
    private onDefaultRowActionClick;
    private onRowActionExpanderClick;
    private handleRowSelect;
    private onRowCheckboxSelection;
    private onRowExpand;
    private onSelectAll;
    private onColumnMouseEnter;
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
    private isGroupExpanded;
    private renderHeader;
    renderFooter(): JSXElements.HTMLAttributes<HTMLTableSectionElement> | null;
    private renderRow;
    private renderActions;
    private renderCell;
    render(): JSX.Element;
}
