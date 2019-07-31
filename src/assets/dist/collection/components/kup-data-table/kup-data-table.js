import { h } from '@stencil/core';
import { LoadMoreMode, PaginatorPos, ShowGrid, SortMode, KupDataTableColumnDragType, } from './kup-data-table-declarations';
import { calcTotals, filterRows, groupRows, sortRows, getColumnByName, } from './kup-data-table-helper';
import { isBar, isButton, isCheckbox, isIcon, isImage, isLink, isNumber, isVoCodver, createJ4objButtonConfig, } from '../../utils/object-utils';
export class KupDataTable {
    constructor() {
        this.columnsWidth = [];
        /**
         * Enables sorting of the columns by dragging them into different columns
         */
        this.enableSortableColumns = false;
        this.expandGroups = false;
        this.filters = {};
        this.globalFilter = false;
        this.groups = [];
        /**
         * If table header is visible and this prop is set to true, the header will be visible while scrolling the table.
         * To make this work, it must be configured together with the data-table CSS property --kup-data-table_header-offset.
         * It uses CSS position: sticky.
         * @version 1.0
         * @namespace KupDataTable.headerIsPersistent
         * @see KupDataTable.showHeader
         * @see https://caniuse.com/#feat=css-sticky
         */
        this.headerIsPersistent = false;
        this.multiSelection = false;
        /**
         * Sets a maximum limit of new records which can be required by the load more functionality.
         */
        this.loadMoreLimit = 1000;
        /**
         * The number of records which will be requested to be downloaded when clicking on the load more button.
         *
         * This property is regulated also by loadMoreMode.
         * @see loadMoreMode
         * @see loadMoreLimit
         */
        this.loadMoreStep = 60;
        /**
         * Establish the modality of how many new records will be downloaded.
         *
         * This property is regulated also by loadMoreStep.
         * @see loadMoreStep
         * @see loadMoreLimit
         */
        this.loadMoreMode = LoadMoreMode.PROGRESSIVE_THRESHOLD;
        this.paginatorPos = PaginatorPos.TOP;
        this.rowsPerPage = 10;
        /**
         * Enables rendering of the table header.
         * @namespace KupDataTable.showHeader
         */
        this.showHeader = true;
        this.showFilters = false;
        this.showGrid = ShowGrid.COMPLETE;
        /**
         * If set to true, displays the button to load more records.
         */
        this.showLoadMore = false;
        this.sortEnabled = true;
        this.sort = [];
        /**
         * If set to true, when a column is dragged to be sorted the component directly mutates the data.columns property
         * and then fires the event
         */
        this.sortableColumnsMutateData = true;
        //---- State ----
        this.globalFilterValue = '';
        this.currentPage = 1;
        this.currentRowsPerPage = 10;
        this.selectedRows = [];
        this.groupState = {};
        /**
         * name of the column with an open menu
         */
        this.openedMenu = null;
        this.density = 'medium';
        this.renderedRows = [];
        this.loadMoreEventCounter = 0;
        this.loadMoreEventPreviousQuantity = 0;
        /**
         * Internal not reactive state used to keep track if a column is being dragged.
         * @private
         */
        this.columnsAreBeingDragged = false;
        /**
         * Attribute to set when a column is being dragged on the whole thead element
         * @const
         * @default 'columns-dragging'
         * @private
         */
        this.dragFlagAttribute = 'columns-dragging';
        /**
         * The string representing the drag over attribute
         * @const
         * @default 'drag-over'
         * @private
         */
        this.dragOverAttribute = 'drag-over';
        /**
         * The string representing the drag starter attribute to set onto the element
         * @const
         * @default 'drag-starter'
         * @private
         */
        this.dragStarterAttribute = 'drag-starter';
    }
    rowsPerPageHandler(newValue) {
        this.currentRowsPerPage = newValue;
    }
    expandGroupsHandler() {
        // reset group state
        this.groupState = {};
        this.forceGroupExpansion();
    }
    recalculateRows() {
        this.initRows();
    }
    // private theadObserver = new IntersectionObserver(
    //     (entries) => {
    //         entries.forEach((entry) => {
    //             if (entry.intersectionRatio === 1) {
    //                 // fully visible
    //                 console.log('fully visible', entry.target);
    //             } else if (entry.intersectionRatio === 0) {
    //                 // hidden
    //                 console.log('hidden', entry.target);
    //             }
    //         });
    //     },
    //     {
    //         threshold: [0, 0.5, 1],
    //         rootMargin: '-100px 0px 0px 0px',
    //     }
    // );
    // lifecycle
    componentWillLoad() {
        this.rowsPerPageHandler(this.rowsPerPage);
        this.initRows();
        if (this.expandGroups) {
            this.forceGroupExpansion();
        }
    }
    componentDidLoad() {
        // observing table
        // this.theadObserver.observe(this.theadRef);
        // automatic row selection
        if (this.selectRow && this.selectRow > 0) {
            if (this.selectRow <= this.renderedRows.length) {
                this.selectedRows = [];
                this.selectedRows.push(this.renderedRows[this.selectRow - 1]);
                this.kupAutoRowSelect.emit({
                    selectedRow: this.selectedRows[0],
                });
            }
        }
    }
    getColumns() {
        return this.data && this.data.columns
            ? this.data.columns
            : [{ title: '', name: '', size: 0 }];
    }
    getVisibleColumns() {
        const visibleColumns = this.getColumns().filter((column) => {
            if (column.hasOwnProperty('visible')) {
                return column.visible;
            }
            return true;
        });
        // check grouping
        if (this.isGrouping()) {
            // filtering column based on group visibility
            return visibleColumns.filter((column) => {
                // check if in group
                let group = null;
                for (let currentGroup of this.groups) {
                    if (currentGroup.column === column.name) {
                        group = currentGroup;
                        break;
                    }
                }
                if (group) {
                    // return true if
                    // 1) group obj has not the 'visible' property or
                    // 2) group has 'visible' property and it is true
                    return !group.hasOwnProperty('visible') || group.visible;
                }
                // not in group -> visible
                return true;
            });
        }
        return visibleColumns;
    }
    getGroupByName(column) {
        if (!this.isGrouping()) {
            return null;
        }
        for (let group of this.groups) {
            if (group.column === column) {
                return group;
            }
        }
        return null;
    }
    getRows() {
        return this.data && this.data.rows ? this.data.rows : [];
    }
    initRows() {
        this.filterRows();
        this.footer = calcTotals(this.rows, this.totals);
        this.groupRows();
        this.sortRows();
        this.paginatedRows = this.paginateRows(this.rows);
    }
    filterRows() {
        this.rows = filterRows(this.getRows(), this.filters, this.globalFilterValue, this.getVisibleColumns().map((c) => c.name));
    }
    isGrouping() {
        return this.groups && this.groups.length > 0;
    }
    hasRowActions() {
        return this.rowActions !== undefined;
    }
    removeGroup(group) {
        // resetting group state
        this.groupState = {};
        const index = this.groups.indexOf(group);
        if (index >= 0) {
            // removing group from prop
            this.groups.splice(index, 1);
            this.groups = [...this.groups];
        }
    }
    hasTotals() {
        return this.totals && Object.keys(this.totals).length > 0;
    }
    forceGroupExpansion() {
        this.rows.forEach((row) => this.forceRowGroupExpansion(row));
    }
    forceRowGroupExpansion(row) {
        // check if row is group
        if (!row.group) {
            return;
        }
        // forcing row expanded
        row.group.expanded = true;
        // updating group state
        // check if already present
        let groupState = this.groupState[row.group.id];
        if (!groupState) {
            groupState = {
                expanded: this.expandGroups,
            };
        }
        else {
            groupState.expanded = this.expandGroups;
        }
        this.groupState[row.group.id] = groupState;
        if (row.group.children) {
            row.group.children.forEach((childRow) => this.forceRowGroupExpansion(childRow));
        }
    }
    // event listeners
    onColumnSort({ ctrlKey }, columnName) {
        // check if columnName is already in sort array
        let i = 0;
        for (; i < this.sort.length; i++) {
            const sortObj = this.sort[i];
            if (sortObj.column === columnName) {
                break;
            }
        }
        if (i < this.sort.length) {
            // already in array... switching sort
            const sortObj = this.sort[i];
            const newSortObj = Object.assign({}, sortObj, { sortMode: sortObj.sortMode === SortMode.A ? SortMode.D : SortMode.A });
            if (ctrlKey) {
                const newSort = [...this.sort];
                newSort[i] = newSortObj;
                this.sort = newSort;
            }
            else {
                this.sort = [newSortObj];
            }
        }
        else {
            const sortObj = {
                column: columnName,
                sortMode: SortMode.A,
            };
            // if CTRL is pressed, push to array
            // else, replace current array
            if (ctrlKey) {
                this.sort = [...this.sort, sortObj];
            }
            else {
                this.sort = [sortObj];
            }
        }
    }
    onFilterChange({ detail }, column) {
        // resetting current page
        this.currentPage = 1;
        const newFilters = Object.assign({}, this.filters);
        if (detail.value.length === 0) {
            delete newFilters[column];
        }
        else {
            newFilters[column] = detail.value;
        }
        this.filters = newFilters;
    }
    onGlobalFilterChange({ detail }) {
        // resetting current page
        this.currentPage = 1;
        this.globalFilterValue = detail.value;
    }
    handlePageChanged({ detail }) {
        this.currentPage = detail.newPage;
    }
    handleRowsPerPageChanged({ detail }) {
        this.currentRowsPerPage = detail.newRowsPerPage;
    }
    onRowClick(event, row) {
        // selecting row
        this.handleRowSelect(row, event.ctrlKey);
        // checking target
        const target = event.target;
        let clickedColumn = null;
        if (target instanceof HTMLElement) {
            if (target.tagName !== 'TR') {
                let currentElement = target;
                while (currentElement.tagName !== 'TD') {
                    currentElement = currentElement.parentElement;
                }
                clickedColumn = currentElement.dataset.column;
            }
        }
        this.kupRowSelected.emit({
            selectedRows: this.selectedRows,
            clickedColumn,
        });
    }
    onDefaultRowActionClick(e, { action, row, type, index }) {
        e.stopPropagation();
        this.kupRowActionClicked.emit({
            action,
            index,
            row,
            type,
        });
    }
    onRowActionExpanderClick(e, row) {
        e.stopPropagation();
        this.kupRowActionClicked.emit({
            row,
            type: 'expander',
        });
    }
    handleRowSelect(row, ctrlKey) {
        if (this.multiSelection) {
            if (ctrlKey && this.selectedRows) {
                const index = this.selectedRows.indexOf(row);
                if (index < 0) {
                    // adding
                    this.selectedRows = [...this.selectedRows, row];
                }
                else {
                    // removing
                    this.selectedRows.splice(index, 1);
                    this.selectedRows = [...this.selectedRows];
                }
            }
            else {
                this.selectedRows = [row];
            }
        }
        else {
            this.selectedRows = [row];
        }
    }
    onRowCheckboxSelection({ target }, row) {
        if (target.checked) {
            if (this.selectedRows.length > 0) {
                this.selectedRows = [...this.selectedRows, row];
            }
            else {
                this.selectedRows = [row];
            }
        }
        else {
            const index = this.selectedRows.indexOf(row);
            if (index >= 0) {
                this.selectedRows.splice(index, 1);
                this.selectedRows = [...this.selectedRows];
            }
        }
        this.kupRowSelected.emit({
            selectedRows: this.selectedRows,
            clickedColumn: null,
        });
    }
    onRowExpand(row) {
        // row should be a 'group' row
        row.group.expanded = !row.group.expanded;
        // updating group map
        this.groupState[row.group.id].expanded = row.group.expanded;
        // changing group state to trigger rendering
        this.groupState = Object.assign({}, this.groupState);
    }
    onSelectAll({ target }) {
        if (target.checked) {
            // select all rows
            this.selectedRows = this.renderedRows;
        }
        else {
            // deselect all rows
            this.selectedRows = [];
        }
        // triggering event
        this.kupRowSelected.emit({
            selectedRows: this.selectedRows,
            clickedColumn: null,
        });
    }
    onColumnMouseEnter(column) {
        this.columnOverTimeout = setTimeout(() => {
            this.openedMenu = column;
        }, 500);
    }
    onColumnMouseLeave(column) {
        // clearing timeout
        clearTimeout(this.columnOverTimeout);
        if (this.openedMenu === column) {
            this.openedMenu = null;
        }
    }
    switchColumnGroup(group, column) {
        // resetting opened menu
        this.openedMenu = null;
        // reset group state
        this.groupState = {};
        if (group !== null) {
            // remove from grouping
            const index = this.groups.indexOf(group);
            this.groups.splice(index, 1);
            this.groups = [...this.groups];
        }
        else {
            // add to groups
            this.groups = [...this.groups, { column, visible: true }];
        }
    }
    onOptionClicked(column, row) {
        this.kupOptionClicked.emit({
            column,
            row,
        });
    }
    onJ4btnClicked(row, column, cell) {
        // Since this function is called with bind, the event from the kup-button gets passed into the arguments array
        const buttonEvent = arguments[3];
        if (buttonEvent) {
            // Prevents double events to be fired.
            buttonEvent.stopPropagation();
        }
        else {
            throw "kup-data-table error: missing event";
        }
        this.kupCellButtonClicked.emit({
            cell,
            column,
            row,
        });
    }
    // utility methods
    groupRows() {
        if (!this.isGrouping()) {
            return;
        }
        this.rows = groupRows(this.getColumns(), this.rows, this.groups, this.totals);
        this.adjustGroupState();
    }
    // Handler for loadMore button is clicked.
    onLoadMoreClick() {
        let loadItems = 0;
        switch (this.loadMoreMode) {
            case LoadMoreMode.CONSTANT:
                loadItems = this.loadMoreStep;
                break;
            case LoadMoreMode.CONSTANT_INCREMENT:
                loadItems = this.loadMoreStep * (this.loadMoreEventCounter + 1);
                break;
            case LoadMoreMode.PROGRESSIVE_THRESHOLD:
                loadItems =
                    Math.max(this.loadMoreEventPreviousQuantity, this.loadMoreStep) * Math.min(this.loadMoreEventCounter + 1, 2);
                break;
        }
        if (loadItems > this.loadMoreLimit) {
            loadItems = this.loadMoreLimit;
        }
        this.kupLoadMoreClicked.emit({
            loadItems,
        });
        this.loadMoreEventPreviousQuantity = loadItems;
        this.loadMoreEventCounter++;
    }
    adjustGroupState() {
        if (!this.rows ||
            this.rows.length === 0 ||
            !this.rows[0].hasOwnProperty('group')) {
            // no grouping
            return;
        }
        this.rows.forEach((r) => this.adjustGroupStateFromRow(r));
    }
    adjustGroupStateFromRow(row) {
        if (!row || !row.hasOwnProperty('group')) {
            // not a groping row, nothing to do
            return;
        }
        const group = row.group;
        // check if already in group state
        let groupFromState = this.groupState[group.id];
        if (!groupFromState) {
            // add to state
            this.groupState[group.id] = group;
        }
        else {
            // update expanded
            group.expanded = groupFromState.expanded;
        }
        group.children.forEach((child) => this.adjustGroupStateFromRow(child));
    }
    sortRows() {
        this.rows = sortRows(this.rows, this.sort);
    }
    paginateRows(rows) {
        const start = this.currentPage * this.currentRowsPerPage -
            this.currentRowsPerPage;
        return rows.slice(start, start + this.currentRowsPerPage);
    }
    getSortIcon(columnName) {
        // check if column in sort array
        for (let sortObj of this.sort) {
            if (sortObj.column === columnName) {
                return 'A' === sortObj.sortMode
                    ? 'mdi-sort-ascending'
                    : 'mdi-sort-descending';
            }
        }
        // default
        return 'mdi-sort';
    }
    calculateColspan() {
        let colSpan = this.getVisibleColumns().length;
        if (this.multiSelection) {
            colSpan += 1;
        }
        if (this.isGrouping() && this.hasTotals()) {
            colSpan += 1;
        }
        if (this.hasRowActions()) {
            colSpan += 1;
        }
        return colSpan;
    }
    isGroupExpanded({ group }) {
        if (!group) {
            return false;
        }
        // check if in group state
        if (this.groupState[group.id]) {
            return this.groupState[group.id].expanded;
        }
        else {
            return false;
        }
    }
    styleHasBorderRadius(cell) {
        if (cell && cell.style && cell.style.borderRadius) {
            return true;
        }
        return false;
    }
    //==== Column sort order methods ====
    handleColumnSort(receivingColumn, sortedColumn) {
        // Get receiving column position
        const receivingColIndex = this.data.columns.findIndex(col => col.name === receivingColumn.name && col.title === receivingColumn.title);
        // Get sorted column current position
        const sortedColIndex = this.data.columns.findIndex(col => col.name === sortedColumn.name && col.title === sortedColumn.title);
        // Moves the sortedColumn into the correct position
        if (this.sortableColumnsMutateData) {
            this.moveSortedColumns(this.data.columns, receivingColIndex, sortedColIndex);
        }
        // fires event
        this.kupDataTableSortedColumn.emit({
            receivingColumnIndex: receivingColIndex,
            sortedColumnIndex: sortedColIndex,
        });
    }
    moveSortedColumns(columns, receivingColumnIndex, sortedColumnIndex) {
        const remove = columns.splice(sortedColumnIndex, 1);
        columns.splice(receivingColumnIndex, 0, remove[0]);
    }
    async defaultSortingFunction(columns, receivingColumnIndex, sortedColumnIndex, useNewObject = false) {
        const toSort = !useNewObject ? columns : [...columns];
        this.moveSortedColumns(toSort, receivingColumnIndex, sortedColumnIndex);
        return toSort;
    }
    //======== render methods ========
    renderHeader() {
        const hasCustomColumnsWidth = this.columnsWidth.length > 0;
        const dataColumns = this.getVisibleColumns().map((column) => {
            // filter
            let filter = null;
            if (this.showFilters) {
                let filterValue = '';
                if (this.filters && this.filters[column.name]) {
                    filterValue = this.filters[column.name];
                }
                filter = (h("div", { onMouseEnter: () => this.onColumnMouseLeave(column.name), onMouseLeave: () => this.onColumnMouseEnter(column.name) },
                    h("kup-text-input", { class: "datatable-filter", initialValue: filterValue, "data-col": column.name, onKetchupTextInputUpdated: (e) => {
                            this.onFilterChange(e, column.name);
                        } })));
            }
            // sort
            let sort = null;
            if (this.sortEnabled) {
                sort = (h("span", { class: "column-sort", onMouseEnter: () => this.onColumnMouseLeave(column.name), onMouseLeave: () => this.onColumnMouseEnter(column.name) },
                    h("span", { role: "button", "aria-label": "Sort column" // TODO
                        , class: 'mdi ' + this.getSortIcon(column.name), onClick: (e) => this.onColumnSort(e, column.name) })));
            }
            let thStyle = null;
            if (hasCustomColumnsWidth) {
                for (let i = 0; i < this.columnsWidth.length; i++) {
                    const currentCol = this.columnsWidth[i];
                    if (currentCol.column === column.name) {
                        const width = currentCol.width.toString() + 'px';
                        thStyle = {
                            width,
                            minWidth: width,
                            maxWidth: width,
                        };
                        break;
                    }
                }
            }
            const columnMenuItems = [];
            // adding grouping
            const group = this.getGroupByName(column.name);
            const groupLabel = group != null
                ? 'Disattiva raggruppamento'
                : 'Attiva raggruppamento';
            columnMenuItems.push(h("li", { role: "menuitem", onClick: () => this.switchColumnGroup(group, column.name) },
                h("span", { class: "mdi mdi-book" }),
                groupLabel));
            columnMenuItems.push(h("li", { role: "menuitem", onClick: () => this.kupAddColumn.emit({ column: column.name }) },
                h("span", { class: "mdi mdi-table-column-plus-after" }),
                "Aggiungi colonna"));
            let columnMenu = null;
            if (columnMenuItems.length !== 0) {
                const menuClass = this.openedMenu === column.name ? 'open' : 'closed';
                columnMenu = (h("div", { class: `column-menu ${menuClass}` },
                    h("ul", { role: "menubar" }, columnMenuItems)));
            }
            // Check if columns are droppable and sets their handlers
            // TODO set better typing.
            let dragHandlers = {};
            if (this.enableSortableColumns) {
                // Reference for drag events and what they permit or not
                // https://html.spec.whatwg.org/multipage/dnd.html#concept-dnd-p
                dragHandlers = {
                    draggable: true,
                    onDragStart: (e) => {
                        // Sets drag data and the type of drag
                        e.dataTransfer.setData(KupDataTableColumnDragType, JSON.stringify(column));
                        e.dataTransfer.effectAllowed = 'move';
                        // Remember that the current target is different from the one print out in the console
                        // Sets which element has started the drag
                        e.target.setAttribute(this.dragStarterAttribute, '');
                        this.theadRef.setAttribute(this.dragFlagAttribute, '');
                        this.columnsAreBeingDragged = true;
                    },
                    onDragLeave: (e) => {
                        if (e.dataTransfer.types.indexOf(KupDataTableColumnDragType) >= 0) {
                            e.target.removeAttribute(this.dragOverAttribute);
                        }
                    },
                    onDragOver: (e) => {
                        if (e.dataTransfer.types.indexOf(KupDataTableColumnDragType) >= 0) {
                            const overElement = e.target;
                            overElement.setAttribute(this.dragOverAttribute, '');
                            // If element can have a drop effect
                            if (!overElement.hasAttribute(this.dragStarterAttribute) && this.columnsAreBeingDragged) {
                                e.preventDefault(); // Mandatory to allow drop
                                e.dataTransfer.effectAllowed = 'move';
                            }
                            else {
                                e.dataTransfer.effectAllowed = 'none';
                            }
                        }
                    },
                    onDragEnd: (e) => {
                        // When the drag has ended, checks if the element still exists or it was destroyed by the JSX
                        const dragStarter = e.target;
                        if (dragStarter) {
                            // IF it still exists, removes the attribute so that it can perform a new drag again
                            dragStarter.removeAttribute(this.dragStarterAttribute);
                        }
                        this.theadRef.removeAttribute(this.dragFlagAttribute);
                        this.columnsAreBeingDragged = false;
                    },
                    onDrop: (e) => {
                        if (e.dataTransfer.types.indexOf(KupDataTableColumnDragType) >= 0) {
                            const transferredData = JSON.parse(e.dataTransfer.getData(KupDataTableColumnDragType));
                            e.preventDefault();
                            e.target.removeAttribute(this.dragOverAttribute);
                            // We are sure the tables have been dropped in a valid location -> starts sorting the columns
                            this.handleColumnSort(column, transferredData);
                        }
                    },
                };
            }
            return (h("th", Object.assign({ style: thStyle, onMouseEnter: () => this.onColumnMouseEnter(column.name), onMouseLeave: () => this.onColumnMouseLeave(column.name) }, dragHandlers),
                h("span", { class: "column-title" }, column.title),
                sort,
                filter,
                columnMenu));
        });
        let multiSelectColumn = null;
        if (this.multiSelection) {
            const style = {
                width: '30px',
                margin: '0 auto',
            };
            multiSelectColumn = (h("th", { style: style },
                h("input", { type: "checkbox", onChange: (e) => this.onSelectAll(e), title: `selectedRow: ${this.selectedRows.length} - renderedRows: ${this.renderedRows.length}`, checked: this.selectedRows.length > 0 &&
                        this.selectedRows.length ===
                            this.renderedRows.length })));
        }
        let groupColumn = null;
        if (this.isGrouping() && this.hasTotals()) {
            groupColumn = h("th", null);
        }
        let actionsColumn = null;
        if (this.hasRowActions()) {
            actionsColumn = h("th", null);
        }
        return [multiSelectColumn, groupColumn, actionsColumn, ...dataColumns];
    }
    renderFooter() {
        if (!this.hasTotals()) {
            // no footer
            return null;
        }
        const footerCells = this.getVisibleColumns().map(({ name }) => (h("td", null, this.footer[name])));
        let selectRowCell = null;
        if (this.multiSelection) {
            selectRowCell = h("td", null);
        }
        let groupingCell = null;
        if (this.isGrouping() && this.hasTotals()) {
            groupingCell = h("td", null);
        }
        const footer = (h("tfoot", null,
            h("tr", null,
                selectRowCell,
                groupingCell,
                footerCells)));
        return footer;
    }
    renderRow(row, level = 0, previousRow) {
        const visibleColumns = this.getVisibleColumns();
        if (row.group) {
            if (row.group.children.length === 0) {
                // empty group
                return null;
            }
            let icon = 'mdi mdi-chevron-' + (row.group.expanded ? 'right' : 'down');
            const jsxRows = [];
            let indent = [];
            for (let i = 0; i < level; i++) {
                indent.push(h("span", { class: "indent" }));
            }
            if (this.hasTotals()) {
                const cells = [];
                // adding 'grouping' cell
                const colSpan = this.multiSelection ? 2 : 1;
                cells.push(h("td", { colSpan: colSpan },
                    indent,
                    h("span", { role: "button", "aria-label": "Row expander" // TODO change this label
                        , class: icon, onClick: (e) => {
                            e.stopPropagation();
                            this.onRowExpand(row);
                        } }),
                    row.group.label));
                for (let column of visibleColumns) {
                    cells.push(h("td", { class: "total" }, row.group.totals[column.name]));
                }
                jsxRows.push(h("tr", { class: "group", onClick: () => this.onRowExpand(row) }, cells));
            }
            else {
                jsxRows.push(h("tr", { class: "group", onClick: () => this.onRowExpand(row) },
                    h("td", { colSpan: this.calculateColspan() },
                        indent,
                        h("span", { role: "button", "aria-label": "Row expander" // TODO change this label
                            , class: `row-expander ${icon}`, onClick: (e) => {
                                e.stopPropagation();
                                this.onRowExpand(row);
                            } }),
                        row.group.label)));
            }
            // if group is expanded, add children
            if (this.isGroupExpanded(row)) {
                row.group.children
                    // We must pass the previous element of the array to check if we must hide or display the value of the cell
                    // When the column has specified the parameter hideValuesRepetitions
                    .map((row, groupRowIndex, currentArray) => this.renderRow(row, level + 1, groupRowIndex > 0
                    ? currentArray[groupRowIndex - 1]
                    : null))
                    .forEach((jsxRow) => {
                    if (Array.isArray(jsxRow)) {
                        jsxRow.forEach((jr) => jsxRows.push(jr));
                    }
                    else {
                        jsxRows.push(jsxRow);
                    }
                });
            }
            // grouping row
            return jsxRows;
        }
        else {
            const cells = visibleColumns.map((currentColumn, index) => {
                const { name, hideValuesRepetitions } = currentColumn;
                let indend = [];
                if (index === 0 && !(this.isGrouping() && this.hasTotals())) {
                    for (let i = 0; i < level; i++) {
                        indend.push(h("span", { class: "indent" }));
                    }
                }
                const cell = row.cells[name];
                let options = null;
                /**
                 * Options must be rendered when the option field is specified AND (one of the following):
                 * 1 - Column do not have to hide repetitions
                 * 2 - Column has to hide repetitions but we are printing the first row.
                 * 3 - Column has to hide repetitions but the value of the previous row is not equal to the current row cell.
                 * @todo Move this rendering, if possible, inside renderCell()
                 */
                if (cell.options && (!hideValuesRepetitions || (hideValuesRepetitions && (!previousRow || previousRow.cells[name].value !== cell.value)))) {
                    options = (h("span", { class: "options", role: "button", "aria-label": "Opzioni oggetto", title: "Opzioni oggetto", onClick: () => this.onOptionClicked(name, row) },
                        h("i", { class: "mdi mdi-settings" })));
                }
                const jsxCell = this.renderCell(cell, name, 
                // The previous value must be passed only if repeated values can be hidden and we have a previous row.
                {
                    row,
                    column: currentColumn
                }, hideValuesRepetitions && previousRow ? previousRow.cells[name].value : null);
                const cellClass = {
                    number: isNumber(cell.obj),
                };
                let cellStyle = null;
                if (!this.styleHasBorderRadius(cell)) {
                    cellStyle = cell.style;
                }
                return (h("td", { "data-column": name, style: cellStyle, class: cellClass },
                    indend,
                    jsxCell,
                    options));
            });
            let selectRowCell = null;
            if (this.multiSelection) {
                selectRowCell = (h("td", null,
                    h("input", { type: "checkbox", checked: this.selectedRows.includes(row), onClick: (e) => e.stopPropagation(), onChange: (e) => this.onRowCheckboxSelection(e, row) })));
            }
            let groupingCell = null;
            if (this.isGrouping() && this.hasTotals()) {
                groupingCell = h("td", null);
            }
            // adding row to rendered rows
            this.renderedRows.push(row);
            let rowActionsCell = null;
            if (this.hasRowActions()) {
                const defaultRowActions = this.renderActions(this.rowActions, row, 'default');
                let rowActionExpander = null;
                let variableActions = null;
                if (row.actions) {
                    // adding variable actions
                    variableActions = this.renderActions(row.actions, row, 'variable');
                }
                else {
                    // adding expander
                    rowActionExpander = (h("span", { title: "Espandi voci", class: `row-action mdi mdi-chevron-right`, onClick: (e) => this.onRowActionExpanderClick(e, row), role: "button", "aria-label": "Espandi voci", "aria-pressed": "false" }));
                }
                rowActionsCell = (h("td", null,
                    defaultRowActions,
                    rowActionExpander,
                    variableActions));
            }
            const rowClass = {
                selected: this.selectedRows.includes(row),
            };
            return (h("tr", { class: rowClass, onClick: (e) => this.onRowClick(e, row) },
                selectRowCell,
                groupingCell,
                rowActionsCell,
                cells));
        }
    }
    renderActions(actions, row, type) {
        return actions.map((action, index) => {
            return (h("span", { title: action.text, class: `row-action ${action.icon}`, onClick: (e) => this.onDefaultRowActionClick(e, {
                    action,
                    index,
                    row,
                    type,
                }), role: "button", "aria-label": action.text, "aria-pressed": "false" }));
        });
    }
    /**
     * FActory function for cells.
     * @param cell - cell object
     * @param column - the cell's column name
     * @param previousRowCellValue - An optional value of the previous cell on the same column. If set and equal to the value of the current cell, makes the value of the current cell go blank.
     * @param cellData - Additional data for the current cell.
     * @param cellData.column - The column object to which the cell belongs.
     * @param cellData.row - The row object to which the cell belongs.
     */
    renderCell(cell, column, cellData, previousRowCellValue) {
        // When the previous row value is different from the current value, we can show the current value.
        const valueToDisplay = previousRowCellValue !== cell.value ? cell.value : '';
        // Sets the default value
        let content = valueToDisplay;
        if (isIcon(cell.obj) || isVoCodver(cell.obj)) {
            content = h("span", { class: valueToDisplay });
        }
        else if (isImage(cell.obj)) {
            content = (h("img", { src: valueToDisplay, alt: "", width: "64", height: "64" }));
        }
        else if (isLink(cell.obj)) {
            content = (h("a", { href: valueToDisplay, target: "_blank" }, valueToDisplay));
        }
        else if (isCheckbox(cell.obj)) {
            content = h("kup-checkbox", { checked: !!cell.obj.k, disabled: cellData && cellData.row && cellData.row.hasOwnProperty('readOnly') ? cellData.row.readOnly : true });
        }
        else if (isButton(cell.obj)) {
            /**
             * Here either using .bind() or () => {} function would bring more or less the same result.
             * Both those syntax would create at run time a new function for each cell on which they're rendered.
             * (See references below.)
             *
             * Another solution would be to simply bind an event handler like this:
             * onKupButtonClicked={this.onJ4btnClicked}
             *
             * The problem here is that, by using that syntax:
             * 1 - Each time a cell is rendered with an object item, either the cell or button must have a data-row,
             *      data-column and data-cell-name attributes which stores the index of cell's and the name of the clicked cell;
             * 2 - each time a click event is triggered, the handler reads the row and column index set on the element;
             * 3 - searches those column and row inside the current data for the table;
             * 4 - once the data is found, creates the custom event with the data to be sent.
             *
             * Currently there is no reason to perform such a search, but it may arise if on large data tables
             * there is a significant performance loss.
             * @see https://reactjs.org/docs/handling-events.html
             */
            content = (h("kup-button", Object.assign({}, createJ4objButtonConfig(cell), { onKupButtonClicked: this.onJ4btnClicked.bind(this, cellData ? cellData.row : null, cellData ? cellData.column : null, cell) })));
        }
        else if (isBar(cell.obj)) {
            const props = {
                value: cell.value,
            };
            // check if column has width
            if (this.columnsWidth && this.columnsWidth[column]) {
                props.width = this.columnsWidth[column];
            }
            // Controls if we should display this cell value
            content = valueToDisplay ? h("kup-graphic-cell", Object.assign({}, props)) : null;
        }
        // TODO
        // else if (isProgressBar(cell.obj)) {
        //     content = <kup-progress-bar />;
        // }
        // if cell.style has border, apply style to cellcontent
        let style = null;
        if (this.styleHasBorderRadius(cell)) {
            style = cell.style;
        }
        return (h("span", { class: "cell-content", style: style }, content));
    }
    renderLoadMoreButton(isSlotted = true) {
        const label = 'Carica altri dati';
        return (h("button", { "aria-label": label, class: "load-more-records mdi mdi-plus-circle", role: "button", slot: isSlotted ? 'more-results' : null, tabindex: "0", title: label, onClick: () => this.onLoadMoreClick() }));
    }
    render() {
        // resetting rows
        this.renderedRows = [];
        let rows = null;
        if (this.paginatedRows.length === 0) {
            rows = (h("tr", null,
                h("td", { colSpan: this.calculateColspan() }, "Empty data")));
        }
        else {
            rows = [];
            this.paginatedRows
                // We must pass the previous element of the array to check if we must hide or display the value of the cell
                // When the column has specified the parameter hideValuesRepetitions
                .map((row, rowIndex, currentArray) => this.renderRow(row, 0, rowIndex > 0 ? currentArray[rowIndex - 1] : null))
                .forEach((jsxRow) => {
                if (Array.isArray(jsxRow)) {
                    jsxRow.forEach((jr) => rows.push(jr));
                }
                else {
                    rows.push(jsxRow);
                }
            });
        }
        // header
        // for multi selection purposes, this should be called before this.renderedRows has been evaluated
        const header = this.renderHeader();
        // footer
        const footer = this.renderFooter();
        let globalFilter = null;
        if (this.globalFilter) {
            globalFilter = (h("div", { id: "globalFilter" },
                h("kup-text-input", { label: "Global filter", onKetchupTextInputUpdated: (event) => this.onGlobalFilterChange(event) })));
        }
        let paginatorTop = null;
        if (PaginatorPos.TOP === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorTop = (h("kup-paginator", { id: "top-paginator", max: this.rows.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: (e) => this.handlePageChanged(e), onKupRowsPerPageChanged: (e) => this.handleRowsPerPageChanged(e) }, this.showLoadMore ? this.renderLoadMoreButton() : null));
        }
        let paginatorBottom = null;
        if (PaginatorPos.BOTTOM === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorBottom = (h("kup-paginator", { id: "bottom-paginator", max: this.rows.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: (e) => this.handlePageChanged(e), onKupRowsPerPageChanged: (e) => this.handleRowsPerPageChanged(e) }, this.showLoadMore ? this.renderLoadMoreButton() : null));
        }
        let groupChips = null;
        if (this.isGrouping()) {
            const chips = this.groups.map((group) => {
                const column = getColumnByName(this.getColumns(), group.column);
                if (column) {
                    return (h("div", { class: "group-chip", tabIndex: 0, onClick: () => this.removeGroup(group) },
                        h("span", { class: "mdi mdi-close-circle" }),
                        column.title));
                }
                else {
                    return null;
                }
            });
            groupChips = h("div", { id: "group-chips" }, chips);
        }
        const densityPanel = (h("div", { id: "density-panel" },
            h("kup-button", { class: { active: this.density === 'small' }, iconClass: "mdi mdi-format-align-justify", onClick: () => (this.density = 'small') }),
            h("kup-button", { class: { active: this.density === 'medium' }, iconClass: "mdi mdi-menu", onClick: () => (this.density = 'medium') }),
            h("kup-button", { class: { active: this.density === 'big' }, iconClass: "mdi mdi-view-sequential", onClick: () => (this.density = 'big') })));
        const tableClass = {
            'column-separation': ShowGrid.COMPLETE === this.showGrid ||
                ShowGrid.COL === this.showGrid,
            'row-separation': ShowGrid.COMPLETE === this.showGrid ||
                ShowGrid.ROW === this.showGrid,
            'persistent-header': this.headerIsPersistent,
        };
        tableClass[`density-${this.density}`] = true;
        return (h("div", { id: "data-table-wrapper" },
            h("div", { class: "above-wrapper" },
                paginatorTop,
                globalFilter,
                densityPanel),
            h("div", { class: "below-wrapper" },
                groupChips,
                h("table", { class: tableClass },
                    h("thead", { hidden: !this.showHeader, ref: (el) => this.theadRef = el },
                        h("tr", null, header)),
                    h("tbody", null, rows),
                    footer)),
            paginatorBottom));
    }
    static get is() { return "kup-data-table"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-data-table.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-data-table.css"]
    }; }
    static get properties() { return {
        "columnsWidth": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<{\r\n        column: string;\r\n        width: number;\r\n    }>",
                "resolved": "{ column: string; width: number; }[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "data": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "TableData",
                "resolved": "TableData",
                "references": {
                    "TableData": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "enableSortableColumns": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Enables sorting of the columns by dragging them into different columns"
            },
            "attribute": "enable-sortable-columns",
            "reflect": false,
            "defaultValue": "false"
        },
        "expandGroups": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "expand-groups",
            "reflect": false,
            "defaultValue": "false"
        },
        "filters": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "GenericMap",
                "resolved": "GenericMap",
                "references": {
                    "GenericMap": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "{}"
        },
        "globalFilter": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "global-filter",
            "reflect": false,
            "defaultValue": "false"
        },
        "groups": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "Array<GroupObject>",
                "resolved": "GroupObject[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "GroupObject": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "headerIsPersistent": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "1.0",
                        "name": "version"
                    }, {
                        "text": "KupDataTable.headerIsPersistent",
                        "name": "namespace"
                    }, {
                        "text": "KupDataTable.showHeader",
                        "name": "see"
                    }, {
                        "text": "https://caniuse.com/#feat=css-sticky",
                        "name": "see"
                    }],
                "text": "If table header is visible and this prop is set to true, the header will be visible while scrolling the table.\r\nTo make this work, it must be configured together with the data-table CSS property --kup-data-table_header-offset.\r\nIt uses CSS position: sticky."
            },
            "attribute": "header-is-persistent",
            "reflect": true,
            "defaultValue": "false"
        },
        "multiSelection": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "multi-selection",
            "reflect": false,
            "defaultValue": "false"
        },
        "loadMoreLimit": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Sets a maximum limit of new records which can be required by the load more functionality."
            },
            "attribute": "load-more-limit",
            "reflect": false,
            "defaultValue": "1000"
        },
        "loadMoreStep": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "loadMoreMode",
                        "name": "see"
                    }, {
                        "text": "loadMoreLimit",
                        "name": "see"
                    }],
                "text": "The number of records which will be requested to be downloaded when clicking on the load more button.\r\n\r\nThis property is regulated also by loadMoreMode."
            },
            "attribute": "load-more-step",
            "reflect": false,
            "defaultValue": "60"
        },
        "loadMoreMode": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "LoadMoreMode",
                "resolved": "LoadMoreMode.CONSTANT | LoadMoreMode.CONSTANT_INCREMENT | LoadMoreMode.PROGRESSIVE_THRESHOLD",
                "references": {
                    "LoadMoreMode": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "loadMoreStep",
                        "name": "see"
                    }, {
                        "text": "loadMoreLimit",
                        "name": "see"
                    }],
                "text": "Establish the modality of how many new records will be downloaded.\r\n\r\nThis property is regulated also by loadMoreStep."
            },
            "attribute": "load-more-mode",
            "reflect": false,
            "defaultValue": "LoadMoreMode.PROGRESSIVE_THRESHOLD"
        },
        "paginatorPos": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "PaginatorPos",
                "resolved": "PaginatorPos.BOTH | PaginatorPos.BOTTOM | PaginatorPos.TOP",
                "references": {
                    "PaginatorPos": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "paginator-pos",
            "reflect": false,
            "defaultValue": "PaginatorPos.TOP"
        },
        "rowsPerPage": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "rows-per-page",
            "reflect": false,
            "defaultValue": "10"
        },
        "rowActions": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<RowAction>",
                "resolved": "RowAction[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "RowAction": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "selectRow": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "select-row",
            "reflect": false
        },
        "showHeader": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "KupDataTable.showHeader",
                        "name": "namespace"
                    }],
                "text": "Enables rendering of the table header."
            },
            "attribute": "show-header",
            "reflect": true,
            "defaultValue": "true"
        },
        "showFilters": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "show-filters",
            "reflect": false,
            "defaultValue": "false"
        },
        "showGrid": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ShowGrid",
                "resolved": "ShowGrid.COL | ShowGrid.COMPLETE | ShowGrid.NONE | ShowGrid.ROW",
                "references": {
                    "ShowGrid": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "show-grid",
            "reflect": false,
            "defaultValue": "ShowGrid.COMPLETE"
        },
        "showLoadMore": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If set to true, displays the button to load more records."
            },
            "attribute": "show-load-more",
            "reflect": true,
            "defaultValue": "false"
        },
        "sortEnabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "sort-enabled",
            "reflect": false,
            "defaultValue": "true"
        },
        "sort": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "Array<SortObject>",
                "resolved": "SortObject[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "SortObject": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "sortableColumnsMutateData": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If set to true, when a column is dragged to be sorted the component directly mutates the data.columns property\r\nand then fires the event"
            },
            "attribute": "sortable-columns-mutate-data",
            "reflect": false,
            "defaultValue": "true"
        },
        "totals": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "TotalsMap",
                "resolved": "TotalsMap",
                "references": {
                    "TotalsMap": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get states() { return {
        "globalFilterValue": {},
        "currentPage": {},
        "currentRowsPerPage": {},
        "selectedRows": {},
        "groupState": {},
        "openedMenu": {},
        "density": {}
    }; }
    static get events() { return [{
            "method": "kupAutoRowSelect",
            "name": "kupAutoRowSelect",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When a row is auto selected via selectRow prop"
            },
            "complexType": {
                "original": "{\r\n        selectedRow: Row;\r\n    }",
                "resolved": "{ selectedRow: Row; }",
                "references": {
                    "Row": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            }
        }, {
            "method": "kupRowSelected",
            "name": "kupRowSelected",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When a row is selected"
            },
            "complexType": {
                "original": "{\r\n        selectedRows: Array<Row>;\r\n        clickedColumn: string;\r\n    }",
                "resolved": "{ selectedRows: Row[]; clickedColumn: string; }",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "Row": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            }
        }, {
            "method": "kupOptionClicked",
            "name": "kupOptionClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When cell option is clicked"
            },
            "complexType": {
                "original": "{\r\n        column: string;\r\n        row: Row;\r\n    }",
                "resolved": "{ column: string; row: Row; }",
                "references": {
                    "Row": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            }
        }, {
            "method": "kupAddColumn",
            "name": "kupAddColumn",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When 'add column' menu item is clicked"
            },
            "complexType": {
                "original": "{ column: string }",
                "resolved": "{ column: string; }",
                "references": {}
            }
        }, {
            "method": "kupRowActionClicked",
            "name": "kupRowActionClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When a row action is clicked"
            },
            "complexType": {
                "original": "{\r\n        type: 'default' | 'variable' | 'expander';\r\n        row: Row;\r\n        action?: RowAction;\r\n        index?: number;\r\n    }",
                "resolved": "{ type: \"default\" | \"variable\" | \"expander\"; row: Row; action?: RowAction; index?: number; }",
                "references": {
                    "Row": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    },
                    "RowAction": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            }
        }, {
            "method": "kupLoadMoreClicked",
            "name": "kupLoadMoreClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "{\r\n        loadItems: number;\r\n    }",
                "resolved": "{ loadItems: number; }",
                "references": {}
            }
        }, {
            "method": "kupCellButtonClicked",
            "name": "kupCellButtonClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "KupDataTableCellButtonClick",
                "resolved": "KupDataTableCellButtonClick",
                "references": {
                    "KupDataTableCellButtonClick": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            }
        }, {
            "method": "kupDataTableSortedColumn",
            "name": "kupDataTableSortedColumn",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "KupDataTableSortedColumnIndexes",
                "resolved": "KupDataTableSortedColumnIndexes",
                "references": {
                    "KupDataTableSortedColumnIndexes": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "defaultSortingFunction": {
            "complexType": {
                "signature": "(columns: Column[], receivingColumnIndex: number, sortedColumnIndex: number, useNewObject?: boolean) => Promise<Column[]>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Column": {
                        "location": "import",
                        "path": "./kup-data-table-declarations"
                    }
                },
                "return": "Promise<Column[]>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get watchers() { return [{
            "propName": "rowsPerPage",
            "methodName": "rowsPerPageHandler"
        }, {
            "propName": "expandGroups",
            "methodName": "expandGroupsHandler"
        }, {
            "propName": "data",
            "methodName": "recalculateRows"
        }, {
            "propName": "sort",
            "methodName": "recalculateRows"
        }, {
            "propName": "filters",
            "methodName": "recalculateRows"
        }, {
            "propName": "globalFilterValue",
            "methodName": "recalculateRows"
        }, {
            "propName": "rowsPerPage",
            "methodName": "recalculateRows"
        }, {
            "propName": "groups",
            "methodName": "recalculateRows"
        }, {
            "propName": "totals",
            "methodName": "recalculateRows"
        }, {
            "propName": "currentPage",
            "methodName": "recalculateRows"
        }, {
            "propName": "currentRowsPerPage",
            "methodName": "recalculateRows"
        }]; }
}
