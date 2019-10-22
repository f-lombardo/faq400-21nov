import { EventEmitter } from '../../stencil.core';
import { Column, RowAction } from '../kup-data-table/kup-data-table-declarations';
import { BoxRow, Layout } from './kup-box-declarations';
export declare class KupBox {
    /**
     * Data
     */
    data: {
        columns?: Column[];
        rows?: BoxRow[];
    };
    /**
     * How the field will be displayed. If not present, a default one will be created.
     */
    layout: Layout;
    /**
     * Number of columns
     */
    columns: number;
    /**
     * Enable sorting
     */
    sortEnabled: boolean;
    /**
     * If sorting is enabled, specifies which column to sort
     */
    sortBy: string;
    /**
     * Enable filtering
     */
    filterEnabled: boolean;
    /**
     * Enable multi selection
     */
    multiSelection: boolean;
    /**
     * Automatically selects the box at the specified index
     */
    selectBox: number;
    /**
     * If enabled, highlights the selected box/boxes
     */
    showSelection: boolean;
    /**
     * If enabled, a button to load / display the row actions
     * will be displayed on the right of every box
     */
    enableRowActions: boolean;
    /**
     * Enables pagination
     */
    pagination: boolean;
    /**
     * Number of boxes per page
     */
    pageSize: number;
    private globalFilterValue;
    private collapsedSection;
    private selectedRows;
    /**
     * Row that has the row object menu open
     */
    private rowActionMenuOpened;
    private currentPage;
    /**
     * Triggered when a box is clicked
     */
    kupBoxClicked: EventEmitter<{
        row: BoxRow;
        column?: string;
    }>;
    /**
     * Triggered when the multi selection checkbox changes value
     */
    kupBoxSelected: EventEmitter<{
        rows: BoxRow[];
    }>;
    /**
     * Triggered when a box is auto selected via selectBox prop
     */
    kupAutoBoxSelect: EventEmitter<{
        row: BoxRow;
    }>;
    /**
     * When the row menu action icon is clicked
     */
    kupRowActionMenuClicked: EventEmitter<{
        row: BoxRow;
    }>;
    /**
     * When the row menu action icon is clicked
     */
    kupRowActionClicked: EventEmitter<{
        row: BoxRow;
        action: RowAction;
        index: number;
    }>;
    private boxLayout;
    private visibleColumns;
    private rows;
    private filteredRows;
    recalculateRows(): void;
    onDataChanged(): void;
    onLayoutChanged(): void;
    onSelectBoxChanged(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    loadRowActions(row: BoxRow, actions: RowAction[]): Promise<void>;
    private getColumns;
    private initVisibleColumns;
    private getRows;
    private initRows;
    private sortRows;
    private checkLayout;
    private onSortChange;
    private onGlobalFilterChange;
    private isSectionExpanded;
    private handleAutomaticBoxSelection;
    /**
     * Checks if the element is the svg that opens the "row actions menu"
     * @param element the element to check
     */
    private checkIfElementIsActionMenuIcon;
    private onBoxClick;
    private onSelectionCheckChange;
    private toggleSectionExpand;
    private onRowAction;
    private onRowActionClicked;
    /**
     * see onDocumentClick in kup-combo
     */
    private clickFunction;
    private handlePageChanged;
    private renderRow;
    private renderSection;
    private renderBoxObject;
    render(): any;
}
