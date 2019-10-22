import { EventEmitter } from '../../stencil.core';
import { Cell, Column, KupDataTableCellButtonClick, GenericMap, GroupObject, LoadMoreMode, PaginatorPos, Row, RowAction, ShowGrid, SortObject, TableData, TotalsMap, KupDataTableSortedColumnIndexes } from './kup-data-table-declarations';
export declare class KupDataTable {
    columnsWidth: Array<{
        column: string;
        width: number;
    }>;
    data: TableData;
    /**
     * Enables sorting of the columns by dragging them into different columns
     */
    enableSortableColumns: boolean;
    expandGroups: boolean;
    filters: GenericMap;
    globalFilter: boolean;
    groups: Array<GroupObject>;
    hoverScroll: boolean;
    /**
     * If table header is visible and this prop is set to true, the header will be visible while scrolling the table.
     * To make this work, it must be configured together with the data-table CSS property --kup-data-table_header-offset.
     * It uses CSS position: sticky.
     * @version 1.0
     * @namespace KupDataTable.headerIsPersistent
     * @see KupDataTable.showHeader
     * @see https://caniuse.com/#feat=css-sticky
     */
    headerIsPersistent: boolean;
    multiSelection: boolean;
    /**
     * Sets a maximum limit of new records which can be required by the load more functionality.
     */
    loadMoreLimit: number;
    /**
     * The number of records which will be requested to be downloaded when clicking on the load more button.
     *
     * This property is regulated also by loadMoreMode.
     * @see loadMoreMode
     * @see loadMoreLimit
     */
    loadMoreStep: number;
    /**
     * Establish the modality of how many new records will be downloaded.
     *
     * This property is regulated also by loadMoreStep.
     * @see loadMoreStep
     * @see loadMoreLimit
     */
    loadMoreMode: LoadMoreMode;
    paginatorPos: PaginatorPos;
    rowsPerPage: number;
    rowActions: Array<RowAction>;
    selectRow: number;
    /**
     * Enables rendering of the table header.
     * @namespace KupDataTable.showHeader
     */
    showHeader: boolean;
    showFilters: boolean;
    showGrid: ShowGrid;
    /**
     * If set to true, displays the button to load more records.
     */
    showLoadMore: boolean;
    sortEnabled: boolean;
    sort: Array<SortObject>;
    /**
     * If set to true, when a column is dragged to be sorted the component directly mutates the data.columns property
     * and then fires the event
     */
    sortableColumnsMutateData: boolean;
    totals: TotalsMap;
    private globalFilterValue;
    private currentPage;
    private currentRowsPerPage;
    private selectedRows;
    private groupState;
    scrollOnHoverStatus: number;
    scrollOnHoverX: number;
    scrollOnHoverY: number;
    scrollTimeout: any;
    /**
     * name of the column with an open menu
     */
    private openedMenu;
    private topFontSizePanelVisible;
    private botFontSizePanelVisible;
    private density;
    private fontsize;
    private topDensityPanelVisible;
    private botDensityPanelVisible;
    rowsPerPageHandler(newValue: number): void;
    expandGroupsHandler(): void;
    recalculateRows(): void;
    private rows;
    private paginatedRows;
    private footer;
    private renderedRows;
    private columnOverTimeout;
    private loadMoreEventCounter;
    private loadMoreEventPreviousQuantity;
    /**
     * Internal not reactive state used to keep track if a column is being dragged.
     * @private
     */
    private columnsAreBeingDragged;
    /**
     * Attribute to set when a column is being dragged on the whole thead element
     * @const
     * @default 'columns-dragging'
     * @private
     */
    private dragFlagAttribute;
    /**
     * The string representing the drag over attribute
     * @const
     * @default 'drag-over'
     * @private
     */
    private dragOverAttribute;
    /**
     * The string representing the drag starter attribute to set onto the element
     * @const
     * @default 'drag-starter'
     * @private
     */
    private dragStarterAttribute;
    /**
     * Reference for the thead element
     * @private
     */
    private theadRef;
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
    kupLoadMoreClicked: EventEmitter<{
        loadItems: number;
    }>;
    kupCellButtonClicked: EventEmitter<KupDataTableCellButtonClick>;
    kupDataTableSortedColumn: EventEmitter<KupDataTableSortedColumnIndexes>;
    /**
     * When a tooltip request initial data
     */
    kupLoadRequest: EventEmitter<{
        cell: Cell;
        tooltip: EventTarget;
    }>;
    /**
     * When a tooltip request detail data
     */
    kupDetailRequest: EventEmitter<{
        cell: Cell;
        tooltip: EventTarget;
    }>;
    onDocumentClick: () => void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private hasTooltip;
    private getColumns;
    private getVisibleColumns;
    private getGroupByName;
    private getRows;
    private initRows;
    private filterRows;
    private isGrouping;
    private hasRowActions;
    private removeGroup;
    private removeGroupFromRow;
    private hasTotals;
    private forceGroupExpansion;
    private forceRowGroupExpansion;
    private adjustPaginator;
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
    private onJ4btnClicked;
    private groupRows;
    private onLoadMoreClick;
    private adjustGroupState;
    private adjustGroupStateFromRow;
    private sortRows;
    private getSortIcon;
    private calculateColspan;
    private isGroupExpanded;
    private handleColumnSort;
    private moveSortedColumns;
    defaultSortingFunction(columns: Column[], receivingColumnIndex: number, sortedColumnIndex: number, useNewObject?: boolean): Promise<Column[]>;
    private toggleFontSizeVisibility;
    private toggleDensityVisibility;
    private renderHeader;
    renderFooter(): any;
    private renderRow;
    private renderActions;
    /**
     * FActory function for cells.
     * @param cell - cell object
     * @param column - the cell's column name
     * @param previousRowCellValue - An optional value of the previous cell on the same column. If set and equal to the value of the current cell, makes the value of the current cell go blank.
     * @param cellData - Additional data for the current cell.
     * @param cellData.column - The column object to which the cell belongs.
     * @param cellData.row - The row object to which the cell belongs.
     */
    private renderCell;
    private renderLoadMoreButton;
    private onCustomSettingsClick;
    private renderPaginator;
    private renderFontSizePanel;
    private renderDensityPanel;
    private handleScroll;
    private startScrollOnHover;
    private killScroll;
    render(): any;
}
