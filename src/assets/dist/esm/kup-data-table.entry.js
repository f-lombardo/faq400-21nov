import { r as registerInstance, c as createEvent, h } from './chunk-1851c479.js';
import './chunk-d8060b98.js';
import { L as LoadMoreMode, P as PaginatorPos, S as ShowGrid, c as calcTotals, p as paginateRows, f as filterRows, a as SortMode, g as groupRows, s as sortRows, n as numeral, b as getColumnByName, K as KupDataTableColumnDragType, d as styleHasBorderRadius } from './chunk-93a43134.js';
import { i as isBar, a as isButton, b as isCheckbox, c as isIcon, d as isImage, e as isLink, f as isNumber, g as isVoCodver, h as createJ4objButtonConfig } from './chunk-a5dfc366.js';

class KupDataTable {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.columnsWidth = [];
        /**
         * Enables sorting of the columns by dragging them into different columns
         */
        this.enableSortableColumns = false;
        this.expandGroups = false;
        this.filters = {};
        this.globalFilter = false;
        this.groups = [];
        this.hoverScroll = true;
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
        this.showGrid = ShowGrid.ROW;
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
        this.scrollOnHoverStatus = 0;
        this.scrollOnHoverX = 0;
        this.scrollOnHoverY = 0;
        this.scrollTimeout = 'off';
        /**
         * name of the column with an open menu
         */
        this.openedMenu = null;
        this.topFontSizePanelVisible = false;
        this.botFontSizePanelVisible = false;
        this.density = 'medium';
        this.fontsize = 'medium';
        this.topDensityPanelVisible = false;
        this.botDensityPanelVisible = false;
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
        this.onDocumentClick = () => {
            this.topFontSizePanelVisible = false;
            this.botFontSizePanelVisible = false;
            this.topDensityPanelVisible = false;
            this.botDensityPanelVisible = false;
        };
        this.kupAutoRowSelect = createEvent(this, "kupAutoRowSelect", 6);
        this.kupRowSelected = createEvent(this, "kupRowSelected", 6);
        this.kupOptionClicked = createEvent(this, "kupOptionClicked", 6);
        this.kupAddColumn = createEvent(this, "kupAddColumn", 6);
        this.kupRowActionClicked = createEvent(this, "kupRowActionClicked", 6);
        this.kupLoadMoreClicked = createEvent(this, "kupLoadMoreClicked", 6);
        this.kupCellButtonClicked = createEvent(this, "kupCellButtonClicked", 6);
        this.kupDataTableSortedColumn = createEvent(this, "kupDataTableSortedColumn", 6);
        this.kupLoadRequest = createEvent(this, "kupLoadRequest", 6);
        this.kupDetailRequest = createEvent(this, "kupDetailRequest", 6);
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
        document.addEventListener('click', this.onDocumentClick);
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
    componentDidUnload() {
        document.removeEventListener('click', this.onDocumentClick);
    }
    hasTooltip(cell) {
        return (cell.obj &&
            cell.obj.t !== '' &&
            !isBar(cell.obj) &&
            !isButton(cell.obj) &&
            !isCheckbox(cell.obj) &&
            !isIcon(cell.obj) &&
            !isImage(cell.obj) &&
            !isLink(cell.obj) &&
            !isNumber(cell.obj) &&
            !isVoCodver(cell.obj));
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
        this.paginatedRows = paginateRows(this.rows, this.currentPage, this.currentRowsPerPage);
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
    removeGroupFromRow(group) {
        if (!group) {
            return;
        }
        // resetting group state
        this.groupState = {};
        // search group
        let index = -1;
        for (let i = 0; i < this.groups.length; i++) {
            const g = this.groups[i];
            if (g.column === group.column) {
                index = i;
                break;
            }
        }
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
    adjustPaginator() {
        const numberOfRows = this.rows.length;
        // check if current page is valid
        const numberOfPages = Math.ceil(numberOfRows / this.currentRowsPerPage);
        if (this.currentPage > numberOfPages) {
            // reset page
            this.currentPage = 1;
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
        this.adjustPaginator();
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
            throw 'kup-data-table error: missing event';
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
    //==== Column sort order methods ====
    handleColumnSort(receivingColumn, sortedColumn) {
        // Get receiving column position
        const receivingColIndex = this.data.columns.findIndex((col) => col.name === receivingColumn.name &&
            col.title === receivingColumn.title);
        // Get sorted column current position
        const sortedColIndex = this.data.columns.findIndex((col) => col.name === sortedColumn.name &&
            col.title === sortedColumn.title);
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
    toggleFontSizeVisibility(event, top) {
        event.stopPropagation();
        if (top) {
            this.topFontSizePanelVisible = !this.topFontSizePanelVisible;
            this.botFontSizePanelVisible = false;
        }
        else {
            this.topFontSizePanelVisible = false;
            this.botFontSizePanelVisible = !this.botFontSizePanelVisible;
        }
    }
    toggleDensityVisibility(event, top) {
        event.stopPropagation();
        if (top) {
            this.topDensityPanelVisible = !this.topDensityPanelVisible;
            this.botDensityPanelVisible = false;
        }
        else {
            this.topDensityPanelVisible = false;
            this.botDensityPanelVisible = !this.botDensityPanelVisible;
        }
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
                filter = (h("div", null, h("kup-text-input", { class: "datatable-filter", initialValue: filterValue, "data-col": column.name, onKetchupTextInputUpdated: (e) => {
                        this.onFilterChange(e, column.name);
                    } })));
            }
            // sort
            let sort = null;
            if (this.sortEnabled) {
                sort = (h("span", { class: "column-sort" }, h("span", { role: "button", "aria-label": "Sort column" // TODO
                    ,
                    class: 'mdi ' + this.getSortIcon(column.name), onClick: (e) => this.onColumnSort(e, column.name) })));
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
            columnMenuItems.push(h("li", { role: "menuitem", onClick: () => this.switchColumnGroup(group, column.name) }, h("span", { class: "mdi mdi-book" }), groupLabel));
            columnMenuItems.push(h("li", { role: "menuitem", onClick: () => this.kupAddColumn.emit({ column: column.name }) }, h("span", { class: "mdi mdi-table-column-plus-after" }), "Aggiungi colonna"));
            let columnMenu = null;
            if (columnMenuItems.length !== 0) {
                const menuClass = this.openedMenu === column.name ? 'open' : 'closed';
                columnMenu = (h("div", { class: `column-menu ${menuClass}` }, h("ul", { role: "menubar" }, columnMenuItems)));
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
                            if (!overElement.hasAttribute(this.dragStarterAttribute) &&
                                this.columnsAreBeingDragged) {
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
            let columnClass = {};
            if (column.obj) {
                columnClass = {
                    number: isNumber(column.obj),
                };
            }
            return (h("th", Object.assign({ class: columnClass, style: thStyle, onMouseEnter: () => this.onColumnMouseEnter(column.name), onMouseLeave: () => this.onColumnMouseLeave(column.name) }, dragHandlers), h("span", { class: "column-title" }, column.title), sort, filter, columnMenu));
        });
        let multiSelectColumn = null;
        if (this.multiSelection) {
            const style = {
                width: '30px',
                margin: '0 auto',
            };
            multiSelectColumn = (h("th", { style: style }, h("input", { type: "checkbox", onChange: (e) => this.onSelectAll(e), title: `selectedRow: ${this.selectedRows.length} - renderedRows: ${this.renderedRows.length}`, checked: this.selectedRows.length > 0 &&
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
        const footer = (h("tfoot", null, h("tr", null, selectRowCell, groupingCell, footerCells)));
        return footer;
    }
    renderRow(row, level = 0, previousRow) {
        const visibleColumns = this.getVisibleColumns();
        if (row.group) {
            if (row.group.children.length === 0) {
                // empty group
                return null;
            }
            const icon = row.group.expanded ? (h("path", { d: "M19,13H5V11H19V13Z" })) : (h("path", { d: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" }));
            const jsxRows = [];
            let indent = [];
            for (let i = 0; i < level; i++) {
                indent.push(h("span", { class: "indent" }));
            }
            if (this.hasTotals()) {
                const cells = [];
                // adding 'grouping' cell
                const colSpan = this.multiSelection ? 2 : 1;
                cells.push(h("td", { colSpan: colSpan }, indent, h("span", { class: "group-cell-content" }, h("span", { role: "button", "aria-label": "Row expander" // TODO change this label
                    ,
                    title: "Expand/collapse group", tabindex: "0", onClick: (e) => {
                        e.stopPropagation();
                        this.onRowExpand(row);
                    } }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", class: "group-expander" }, icon)), row.group.label, h("span", { role: "button", "aria-label": "Remove group" // TODO change this label
                    ,
                    title: "Remove group", tabindex: "0", onClick: (e) => {
                        e.stopPropagation();
                        this.removeGroupFromRow(row.group);
                    } }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", class: "group-remove" }, h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }))))));
                for (let column of visibleColumns) {
                    cells.push(h("td", { class: "total" }, row.group.totals[column.name]));
                }
                jsxRows.push(h("tr", { class: "group", onClick: () => this.onRowExpand(row) }, cells));
            }
            else {
                jsxRows.push(h("tr", { class: "group", onClick: () => this.onRowExpand(row) }, h("td", { colSpan: this.calculateColspan() }, indent, h("span", { class: "group-cell-content" }, h("span", { role: "button", "aria-label": "Row expander" // TODO change this label
                    ,
                    title: "Expand/collapse group", tabindex: "0", onClick: (e) => {
                        e.stopPropagation();
                        this.onRowExpand(row);
                    } }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", class: "group-expander" }, icon)), h("span", { class: "text" }, row.group.label), h("span", { role: "button", "aria-label": "Remove group" // TODO change this label
                    ,
                    title: "Remove group", tabindex: "0", onClick: (e) => {
                        e.stopPropagation();
                        this.removeGroupFromRow(row.group);
                    } }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", class: "group-remove" }, h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })))))));
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
                if (cell.options &&
                    (!hideValuesRepetitions ||
                        (hideValuesRepetitions &&
                            (!previousRow ||
                                previousRow.cells[name].value !== cell.value)))) {
                    options = (h("span", { class: "options", role: "button", "aria-label": "Opzioni oggetto", title: "Opzioni oggetto", onClick: () => this.onOptionClicked(name, row) }, h("i", { class: "mdi mdi-settings" })));
                }
                const jsxCell = this.renderCell(cell, name, 
                // The previous value must be passed only if repeated values can be hidden and we have a previous row.
                {
                    row,
                    column: currentColumn,
                }, hideValuesRepetitions && previousRow
                    ? previousRow.cells[name].value
                    : null);
                const cellClass = {
                    number: isNumber(cell.obj),
                };
                let cellStyle = null;
                if (!styleHasBorderRadius(cell)) {
                    cellStyle = cell.style;
                }
                return (h("td", { "data-column": name, style: cellStyle, class: cellClass }, indend, jsxCell, options));
            });
            let selectRowCell = null;
            if (this.multiSelection) {
                selectRowCell = (h("td", null, h("input", { type: "checkbox", checked: this.selectedRows.includes(row), onClick: (e) => e.stopPropagation(), onChange: (e) => this.onRowCheckboxSelection(e, row) })));
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
                    rowActionExpander = (h("span", { title: "Espandi voci", class: `row-action mdi mdi-chevron-right`, onClick: (e) => this.onRowActionExpanderClick(e, row), role: "button", "aria-label": "Espandi voci" }));
                }
                rowActionsCell = (h("td", null, defaultRowActions, rowActionExpander, variableActions));
            }
            const rowClass = {
                selected: this.selectedRows.includes(row),
            };
            return (h("tr", { class: rowClass, onClick: (e) => this.onRowClick(e, row) }, selectRowCell, groupingCell, rowActionsCell, cells));
        }
    }
    renderActions(actions, row, type) {
        return actions.map((action, index) => {
            return (h("span", { title: action.text, class: `row-action ${action.icon}`, onClick: (e) => this.onDefaultRowActionClick(e, {
                    action,
                    index,
                    row,
                    type,
                }), role: "button", "aria-label": action.text }));
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
        const clazz = {
            'cell-content': true,
        };
        // When the previous row value is different from the current value, we can show the current value.
        const valueToDisplay = previousRowCellValue !== cell.value ? cell.value : '';
        // Sets the default value
        let content = valueToDisplay;
        if (isIcon(cell.obj) || isVoCodver(cell.obj)) {
            content = h("span", { class: valueToDisplay });
        }
        else if (isNumber(cell.obj)) {
            content = valueToDisplay;
            if (content) {
                const cellValue = numeral(cell.obj.k).value();
                if (cellValue < 0) {
                    clazz['negative-number'] = true;
                }
            }
        }
        else if (isImage(cell.obj)) {
            content = (h("img", { src: valueToDisplay, alt: "", width: "64", height: "64" }));
        }
        else if (isLink(cell.obj)) {
            content = (h("a", { href: valueToDisplay, target: "_blank" }, valueToDisplay));
        }
        else if (isCheckbox(cell.obj)) {
            content = (h("kup-checkbox", { checked: !!cell.obj.k, disabled: cellData &&
                    cellData.row &&
                    cellData.row.hasOwnProperty('readOnly')
                    ? cellData.row.readOnly
                    : true }));
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
        if (styleHasBorderRadius(cell)) {
            style = cell.style;
        }
        if (this.hasTooltip(cell)) {
            content = (h("kup-tooltip", { class: "datatable-tooltip", onKupTooltipLoadData: (ev) => this.kupLoadRequest.emit({
                    cell: cell,
                    tooltip: ev.srcElement,
                }), onKupTooltipLoadDetail: (ev) => this.kupDetailRequest.emit({
                    cell: cell,
                    tooltip: ev.srcElement,
                }) }, content));
        }
        return (h("span", { class: clazz, style: style }, content));
    }
    renderLoadMoreButton(isSlotted = true) {
        const label = 'Mostra altri dati';
        return (h("button", { "aria-label": label, class: "loadmore-button mdi mdi-plus", role: "button", slot: isSlotted ? 'more-results' : null, tabindex: "0", title: label, onClick: () => this.onLoadMoreClick() }, h("span", { class: "paginator-tab-text" }, "Pi\u00F9 risultati"), ' '));
    }
    onCustomSettingsClick(event) {
        let t = event.target;
        let elPanel = t
            .closest('.paginator-wrapper')
            .getElementsByClassName('customize-panel')[0];
        let elButton = t
            .closest('.paginator-wrapper')
            .getElementsByClassName('custom-settings')[0];
        if (elButton.classList.contains('activated')) {
            elButton.classList.remove('activated');
            elPanel.classList.remove('visible');
        }
        else {
            elButton.classList.add('activated');
            elPanel.classList.add('visible');
        }
    }
    renderPaginator(top) {
        return (h("div", { class: "paginator-wrapper" }, h("div", { class: "paginator-tabs" }, h("kup-paginator", { id: top ? 'top-paginator' : 'bottom-paginator', max: this.rows.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: (e) => this.handlePageChanged(e), onKupRowsPerPageChanged: (e) => this.handleRowsPerPageChanged(e) }), h("button", { title: "Mostra opzioni di personalizzazione", class: "paginator-button mdi mdi-settings custom-settings", onClick: (e) => this.onCustomSettingsClick(e) }, h("div", { class: "customize-panel" }, this.renderDensityPanel(top), this.renderFontSizePanel(top))), this.showLoadMore ? this.renderLoadMoreButton() : null)));
    }
    renderFontSizePanel(top) {
        let fontSize;
        {
            this.fontsize === 'medium'
                ? (fontSize = 'Media')
                : this.fontsize === 'big'
                    ? (fontSize = 'Grande')
                    : this.fontsize === 'small'
                        ? (fontSize = 'Piccolo')
                        : (fontSize = '');
        }
        let fontSizeTypeString = 'Dimensione carattere: ' + fontSize;
        return (h("div", { class: "fontsize-panel" }, h("span", { title: fontSizeTypeString, class: "panel-label" }, "Dimensione carattere"), h("span", { class: "fontsize-label", onClick: (e) => this.toggleFontSizeVisibility(e, top) }, fontSize), h("div", { role: "button", onClick: (e) => this.toggleFontSizeVisibility(e, top), tabindex: "0" }, h("svg", { version: "1.1", width: "24", height: "24", viewBox: "0 0 24 24" }, h("path", { d: "M7,10L12,15L17,10H7Z" }))), h("div", { class: {
                'fontsize-panel-overlay': true,
                open: top
                    ? this.topFontSizePanelVisible
                    : this.botFontSizePanelVisible,
            } }, h("div", { class: {
                wrapper: true,
                active: this.fontsize === 'small',
            }, onClick: () => (this.fontsize = 'small'), role: "button", tabindex: "0", "aria-pressed": this.fontsize === 'small' ? 'true' : 'false' }, h("span", { title: "Piccolo", class: "fontsize-icon-panel mdi mdi-format-font-size-decrease" })), h("div", { class: {
                wrapper: true,
                active: this.fontsize === 'medium',
            }, onClick: () => (this.fontsize = 'medium'), role: "button", tabindex: "0", "aria-pressed": this.fontsize === 'medium' ? 'true' : 'false' }, h("span", { title: "Normale", class: "fontsize-icon-panel mdi mdi-format-color-text" })), h("div", { class: {
                wrapper: true,
                active: this.fontsize === 'big',
            }, onClick: () => (this.fontsize = 'big'), role: "button", tabindex: "0", "aria-pressed": this.fontsize === 'big' ? 'true' : 'false' }, h("span", { title: "Grande", class: "fontsize-icon-panel mdi mdi-format-font-size-increase" })))));
    }
    renderDensityPanel(top) {
        let densityType;
        {
            this.density === 'medium'
                ? (densityType = 'Normale')
                : this.density === 'big'
                    ? (densityType = 'Ampia')
                    : this.density === 'small'
                        ? (densityType = 'Compatta')
                        : (densityType = '');
        }
        let densityTypeString = 'Densità righe: ' + densityType;
        return (h("div", { class: "density-panel" }, h("span", { title: densityTypeString, class: "panel-label" }, "Densit\u00E0 righe"), h("span", { class: "density-label", onClick: (e) => this.toggleDensityVisibility(e, top) }, densityType), h("div", { role: "button", onClick: (e) => this.toggleDensityVisibility(e, top), tabindex: "0" }, h("svg", { version: "1.1", width: "24", height: "24", viewBox: "0 0 24 24" }, h("path", { d: "M7,10L12,15L17,10H7Z" }))), h("div", { class: {
                'density-panel-overlay': true,
                open: top
                    ? this.topDensityPanelVisible
                    : this.botDensityPanelVisible,
            } }, h("div", { class: {
                wrapper: true,
                active: this.density === 'small',
            }, onClick: () => (this.density = 'small'), role: "button", tabindex: "0", "aria-pressed": this.density === 'small' ? 'true' : 'false' }, h("span", { title: "Compatta", class: "density-icon-panel mdi mdi-format-align-justify" })), h("div", { class: {
                wrapper: true,
                active: this.density === 'medium',
            }, onClick: () => (this.density = 'medium'), role: "button", tabindex: "0", "aria-pressed": this.density === 'medium' ? 'true' : 'false' }, h("span", { title: "Normale", class: "density-icon-panel mdi mdi-reorder-horizontal" })), h("div", { class: {
                wrapper: true,
                active: this.density === 'big',
            }, onClick: () => (this.density = 'big'), role: "button", tabindex: "0", "aria-pressed": this.density === 'big' ? 'true' : 'false' }, h("span", { title: "Ampia", class: "density-icon-panel mdi mdi-view-sequential" })))));
    }
    handleScroll(event) {
        this.scrollOnHoverX = event.clientX;
        this.scrollOnHoverY = event.clientY;
        let el = event.target
            .closest('.hover-scrolling-parent')
            .querySelectorAll('.hover-scrolling-el')[0];
        let arrowContainter = el.querySelectorAll('#container-scrolling-arrow')[0];
        let trueWidth = el.clientWidth;
        arrowContainter.style.top = this.scrollOnHoverY + 'px';
        arrowContainter.style.left = this.scrollOnHoverX + 'px';
        if (trueWidth === 0) {
            trueWidth = el.offsetWidth;
        }
        if (el.scrollWidth > trueWidth + 10) {
            if (trueWidth !== 0 && this.scrollTimeout === 'off') {
                let percRight = trueWidth - trueWidth * 0.1;
                let percLeft = trueWidth - trueWidth * 0.9;
                let elOffset = this.scrollOnHoverX - el.offsetLeft;
                let maxScrollLeft = el.scrollWidth - trueWidth;
                var leftArrow = el.querySelectorAll('#container-scrolling-arrow .left-scrolling-arrow');
                var rightArrow = el.querySelectorAll('#container-scrolling-arrow .right-scrolling-arrow');
                if (elOffset < percLeft) {
                    if (el.scrollLeft !== 0) {
                        for (let i = 0; i < leftArrow.length; i++) {
                            leftArrow[i].classList.add('activated');
                        }
                        this.scrollTimeout = setTimeout(() => {
                            this.startScrollOnHover(el, leftArrow, maxScrollLeft, arrowContainter, percRight, percLeft, event, 'left');
                        }, 500);
                    }
                }
                else if (elOffset > percRight) {
                    if (el.scrollLeft !== maxScrollLeft) {
                        for (let i = 0; i < rightArrow.length; i++) {
                            rightArrow[i].classList.add('activated');
                        }
                        this.scrollTimeout = setTimeout(() => {
                            this.startScrollOnHover(el, rightArrow, maxScrollLeft, arrowContainter, percRight, percLeft, event, 'right');
                        }, 500);
                    }
                }
            }
        }
    }
    ;
    startScrollOnHover(el, arrow, maxScrollLeft, arrowContainter, percRight, percLeft, event, direction) {
        let elOffset = this.scrollOnHoverX - el.offsetLeft;
        if (this.scrollTimeout === 'off' ||
            (elOffset > percLeft && elOffset < percRight)) {
            this.killScroll(el);
            return;
        }
        if (direction === 'right' && percRight > elOffset) {
            this.killScroll(el);
            return;
        }
        if (direction === 'left' && percLeft < elOffset) {
            this.killScroll(el);
            return;
        }
        var step = el.scrollLeft;
        arrowContainter.style.top = this.scrollOnHoverY + 'px';
        arrowContainter.style.left = this.scrollOnHoverX + 'px';
        for (let i = 0; i < arrow.length; i++) {
            arrow[i].classList.add('animated');
        }
        var firstArrow = arrow[0];
        if (firstArrow.classList.contains('left-scrolling-arrow')) {
            if (step === 0) {
                this.killScroll(el);
                return;
            }
            step = step - parseInt('1', 10); //subtracting 1 without this trick caused Safari to have problems: it subtracted decimal values instead of 1
        }
        else {
            if (step === maxScrollLeft) {
                this.killScroll(el);
                return;
            }
            step = step + parseInt('1', 10); //subtracting 1 without this trick caused Safari to have problems: it subtracted decimal values instead of 1
        }
        el.scrollLeft = step;
        setTimeout(() => {
            this.startScrollOnHover(el, arrow, maxScrollLeft, arrowContainter, percRight, percLeft, event, direction);
        }, 50);
        //Doppio lancio per aumentare la velocità ad ogni giro (in cascata)
        setTimeout(() => {
            this.startScrollOnHover(el, arrow, maxScrollLeft, arrowContainter, percRight, percLeft, event, direction);
        }, 250);
    }
    killScroll(el) {
        this.scrollTimeout = 'off';
        clearTimeout(this.scrollTimeout);
        var leftArrow = el.querySelectorAll('#container-scrolling-arrow .left-scrolling-arrow');
        var rightArrow = el.querySelectorAll('#container-scrolling-arrow .right-scrolling-arrow');
        for (let i = 0; i < leftArrow.length; i++) {
            leftArrow[i].classList.remove('activated');
            leftArrow[i].classList.remove('animated');
        }
        for (let i = 0; i < rightArrow.length; i++) {
            rightArrow[i].classList.remove('activated');
            rightArrow[i].classList.remove('animated');
        }
    }
    ;
    render() {
        // resetting rows
        this.renderedRows = [];
        let rows = null;
        if (this.paginatedRows.length === 0) {
            rows = (h("tr", null, h("td", { colSpan: this.calculateColspan() }, "Empty data")));
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
            globalFilter = (h("div", { id: "globalFilter" }, h("kup-text-input", { label: "Global filter", onKetchupTextInputUpdated: (event) => this.onGlobalFilterChange(event) })));
        }
        let paginatorTop = null;
        if (PaginatorPos.TOP === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorTop = this.renderPaginator(true);
        }
        let paginatorBottom = null;
        if (PaginatorPos.BOTTOM === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorBottom = this.renderPaginator(false);
        }
        let groupChips = null;
        if (this.isGrouping()) {
            const chips = this.groups.map((group) => {
                const column = getColumnByName(this.getColumns(), group.column);
                if (column) {
                    return (h("kup-chip", { closable: true, onClose: () => this.removeGroup(group) }, column.title));
                }
                else {
                    return null;
                }
            });
            groupChips = h("div", { id: "group-chips" }, chips);
        }
        const tableClass = {
            'column-separation': ShowGrid.COMPLETE === this.showGrid ||
                ShowGrid.COL === this.showGrid,
            'row-separation': ShowGrid.COMPLETE === this.showGrid ||
                ShowGrid.ROW === this.showGrid,
            'persistent-header': this.headerIsPersistent,
        };
        tableClass[`density-${this.density}`] = true;
        tableClass[`fontsize-${this.fontsize}`] = true;
        return (h("div", { id: "data-table-wrapper", class: "hover-scrolling-parent" }, h("div", { class: "above-wrapper" }, paginatorTop, globalFilter), h("div", { class: "below-wrapper hover-scrolling-el", onMouseMove: (e) => this.handleScroll(e), onMouseLeave: (e) => this.killScroll(e.target) }, groupChips, h("table", { class: tableClass }, h("thead", { hidden: !this.showHeader, ref: (el) => (this.theadRef = el) }, h("tr", null, header)), h("tbody", null, rows), footer), h("div", { id: "container-scrolling-arrow" }, h("div", { class: "left-scrolling-arrow arrow-3" }), h("div", { class: "left-scrolling-arrow arrow-2" }), h("div", { class: "left-scrolling-arrow arrow-1" }), h("div", { class: "right-scrolling-arrow arrow-1" }), h("div", { class: "right-scrolling-arrow arrow-2" }), h("div", { class: "right-scrolling-arrow arrow-3" }))), paginatorBottom));
    }
    static get watchers() { return {
        "rowsPerPage": ["rowsPerPageHandler", "recalculateRows"],
        "expandGroups": ["expandGroupsHandler"],
        "data": ["recalculateRows"],
        "sort": ["recalculateRows"],
        "filters": ["recalculateRows"],
        "globalFilterValue": ["recalculateRows"],
        "groups": ["recalculateRows"],
        "totals": ["recalculateRows"],
        "currentPage": ["recalculateRows"],
        "currentRowsPerPage": ["recalculateRows"]
    }; }
    static get style() { return "\@import url(https://cdn.materialdesignicons.com/4.5.95/css/materialdesignicons.min.css);:host{--dtt_background-color:var(--kup-data-table_background-color,#fff);--dtt_border-color:var(--kup-data-table_border-color,#bdbdbd);--dtt_box-shadow:var(--kup-data-table_box-shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5));--dtt_color:var(--kup-data-table_color,#1a1a1a);--dtt_drag-over--allowed:var(--kup-data-table_drag-over--allowed,rgba(78,144,143,0.24));--dtt_drag-over--forbidden:var(--kup-data-table_drag-over--forbidden,rgba(240,66,60,0.24));--dtt_filter-border-color:var(--kup-data-table_filter-border-color,#d0d0d0);--dtt_filter-background-color:var(--kup-data-table_filter-background-color,#fff);--dtt_group-background-color:var(--kup-data-table_group-background-color,#f9f9f9);--dtt_hover-color:var(--kup-data-table_hover-color,#545454);--dtt_head-background-color:var(--kup-data-table_head-background-color,#f4f4f4);--dtt_header-offset:var(--kup-data-table_header-offset,50px);--dtt_hover-background-color:var(--kup-data-table_hover-background-color,#f0f0f0);--dtt_icons-color:var(--kup-data-table_icons-color,grey);--dtt_icons-hover-color:var(--kup-data-table_icons-hover-color,#4e908f);--dtt_font-size:var(--kup-data-table_font-size,0.9375rem);--dtt_main-color:var(--kup-data-table_main-color,#6aaaa7);--dtt_main-color-lighter:var(--kup-data-table_main-color-lighter,#65acab);--dtt_main-color-darker:var(--kup-data-table_main-color-darker,#3c6f6e);--dtt_text-on-main-color:var(--kup-data-table_text-on-main-color,#fff);--dtt_negative-number-color:var(--kup-data-table_negative-number-color,#d91e18);--dtt_density-box-shadow:var(--kup-data-table_density-box-shadow,none);--dtt_density-icon-background:var(--kup-data-table_density-icon-background,transparent);--dtt_density-icon-color:var(--kup-data-table_density-icon-color,#545454);--dtt_remove-icon-color:var(--kup-data-table_remove-icon-color,#d91e18);--dtt_remove-icon-color-hover:var(--kup-data-table_remove-icon-color-hover,#e9403b);--dtt_paginator-background:var(--kup-data-table_paginator-background,transparent)}.hover-scrolling-el{overflow:auto}#data-table-wrapper{background-color:var(--dtt_background-color)}#data-table-wrapper table{color:var(--dtt_color);width:100%;min-width:intrinsic;min-width:-moz-max-content;min-width:-webkit-max-content;border-collapse:collapse;text-align:left;font-size:var(--dtt_font-size)}#data-table-wrapper table>thead,#data-table-wrapper table>thead th{background:var(--dtt_head-background-color)}#data-table-wrapper table>thead th{position:relative;padding:.5rem .3125rem;white-space:nowrap;border-bottom:2px solid var(--dtt_border-color);border-right:1px solid var(--dtt_border-color);position:-webkit-sticky;position:sticky;top:0}#data-table-wrapper table>thead th.number{text-align:right}#data-table-wrapper table>thead th kup-text-input.datatable-filter{--kup-text-input_border-color:var(--dtt_filter-border-color);--kup-text-input_background-color:var(--dtt_filter-background-color)}#data-table-wrapper table>thead th .column-sort{margin-left:.5rem;cursor:pointer}#data-table-wrapper table>thead th .column-sort .mdi{color:var(--dtt_icons-color);-webkit-transition:color .2s ease-in-out;transition:color .2s ease-in-out}#data-table-wrapper table>thead th .column-sort .mdi:hover{color:var(--dtt_icons-hover-color)}#data-table-wrapper table>thead th .column-sort .mdi-sort-ascending,#data-table-wrapper table>thead th .column-sort .mdi-sort-descending{color:var(--dtt_main-color)}#data-table-wrapper table>thead th .column-menu{background-color:var(--dtt_background-color);-webkit-box-shadow:var(--dtt_box-shadow);box-shadow:var(--dtt_box-shadow);color:var(--dtt_color);position:absolute;z-index:100;font-weight:400;min-width:200px;min-width:-moz-max-content;min-width:-webkit-max-content}#data-table-wrapper table>thead th .column-menu.closed{display:none}#data-table-wrapper table>thead th .column-menu.open{display:block;-webkit-animation:display-none-transition .5s both;-webkit-animation-timing-function:cubic-bezier(.67,-.81,.89,.71);animation:display-none-transition .5s both;animation-timing-function:cubic-bezier(.67,-.81,.89,.71)}#data-table-wrapper table>thead th .column-menu ul{list-style-type:none;margin:0;padding:0;text-align:left}#data-table-wrapper table>thead th .column-menu ul>li{padding:.8rem;-webkit-transition:color .2s ease-in-out;transition:color .2s ease-in-out;color:var(--dtt_color);-webkit-transition:color .25s,background-color .25s,opacity .25s;transition:color .25s,background-color .25s,opacity .25s}#data-table-wrapper table>thead th .column-menu ul>li:hover{cursor:pointer;color:var(--dtt_hover-color);background-color:var(--dtt_hover-background-color)}#data-table-wrapper table>thead th .column-menu ul>li .mdi{margin-right:.5rem}#data-table-wrapper table>thead[columns-dragging] [drag-over]{background-color:var(--dtt_drag-over--allowed)}#data-table-wrapper table>thead[columns-dragging] [drag-over]>*{pointer-events:none}#data-table-wrapper table>thead[columns-dragging] [drag-over][drag-starter]{background-color:var(--dtt_drag-over--forbidden)}#data-table-wrapper table>tbody{border:1px solid var(--dtt_border-color);cursor:pointer}#data-table-wrapper table>tbody>tr.selected>td,#data-table-wrapper table>tbody>tr:hover>td{color:var(--dtt_hover-color);background-color:var(--dtt_hover-background-color);-webkit-transition:background-color .25s ease-in-out;transition:background-color .25s ease-in-out}#data-table-wrapper table>tbody>tr.group{background:var(--dtt_group-background-color);font-weight:700;border-top:1px solid var(--dtt_border-color)}#data-table-wrapper table>tbody>tr.group>td{padding:1rem 0}#data-table-wrapper table>tbody>tr.group>td .group-cell-content svg{cursor:pointer;width:var(--dtt_font-size);height:var(--dtt_font-size);margin:0 .3rem;fill:var(--dtt_color)}#data-table-wrapper table>tbody>tr.group>td .group-cell-content svg.group-expander{padding:.2rem;margin-right:1rem;margin-left:.5rem}#data-table-wrapper table>tbody>tr.group>td .group-cell-content svg.group-remove{fill:var(--dtt_remove-icon-color)}#data-table-wrapper table>tbody>tr.group>td .group-cell-content svg.group-remove:hover{fill:var(--dtt_remove-icon-color-hover)}#data-table-wrapper table>tbody>tr.group>td .group-cell-content>span{display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle;outline:none}#data-table-wrapper table>tbody>tr.group>td.total{text-align:right;padding-right:1rem}#data-table-wrapper table>tbody>tr>td{padding:.5rem .3125rem}#data-table-wrapper table>tbody>tr>td kup-tooltip.datatable-tooltip{--kup-tlt_display:table-row}#data-table-wrapper table>tbody>tr>td.number{text-align:right}#data-table-wrapper table>tbody>tr>td .row-expander{margin-right:.5rem}#data-table-wrapper table>tbody>tr>td .indent{display:inline-block;height:1rem;width:2rem}#data-table-wrapper table>tbody>tr>td .options{margin-left:.5rem;color:var(--dtt_icons-color)}#data-table-wrapper table>tbody>tr>td .options:hover{color:var(--dtt_icons-hover-color);-webkit-transition:color .25s ease-out;transition:color .25s ease-out}#data-table-wrapper table>tbody>tr>td .row-action{margin-right:.2rem}#data-table-wrapper table>tbody>tr>td .cell-content.negative-number{color:var(--dtt_negative-number-color)}#data-table-wrapper table.row-separation>tbody>tr{border-bottom:1px solid var(--dtt_border-color)}#data-table-wrapper table.column-separation>tbody>tr>td{border-right:1px solid var(--dtt_border-color)}#data-table-wrapper table.persistent-header{border-top:1px solid var(--dtt_border-color);position:relative}#data-table-wrapper table.persistent-header>thead{border-color:var(--dtt_border-color);border-style:solid;border-width:0 1px 0}#data-table-wrapper table.persistent-header>thead>th{background-color:var(--dtt_head-background-color);-webkit-box-shadow:var(--dtt_box-shadow);box-shadow:var(--dtt_box-shadow);position:-webkit-sticky;position:sticky;top:var(--dtt_header-offset);will-change:transform}#data-table-wrapper table.persistent-header>thead>th.number{text-align:right}#data-table-wrapper table.persistent-header>tbody{border-top:3px solid var(--dtt_border-color)}#data-table-wrapper table>tfoot td{text-align:right;font-weight:700;padding:.5rem .3125rem}#data-table-wrapper table.noGrid,#data-table-wrapper table.noGrid td{border:none}#data-table-wrapper table.density-small tbody>tr>td{padding-top:.2rem;padding-bottom:.2rem;-webkit-transition:padding .1s;transition:padding .1s}#data-table-wrapper table.density-small tbody>tr.group>td{padding-top:.75rem;padding-bottom:.75rem;-webkit-transition:padding .1s;transition:padding .1s}#data-table-wrapper table.density-big tbody>tr>td{padding-top:1rem;padding-bottom:1rem;-webkit-transition:padding .1s;transition:padding .1s}#data-table-wrapper table.density-big tbody>tr.group>td{padding-top:1.25rem;padding-bottom:1.25rem;-webkit-transition:padding .1s;transition:padding .1s}#data-table-wrapper table.fontsize-small{font-size:calc(var(--dtt_font-size) * .75);-webkit-transition:font-size .1s;transition:font-size .1s}#data-table-wrapper table.fontsize-big{font-size:calc(var(--dtt_font-size) * 1.25);-webkit-transition:font-size .1s;transition:font-size .1s}#data-table-wrapper .paginator-wrapper{background:var(--dtt_paginator-background);display:-ms-flexbox;display:flex;-ms-flex-flow:wrap;flex-flow:wrap;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}#globalFilter{margin-bottom:.5rem;text-align:center}#group-chips{display:-ms-flexbox;display:flex;margin-bottom:.5rem}#group-chips>.group-chip{display:-ms-flexbox;display:flex;background-color:var(--dtt_main-color);padding:.5rem;color:var(--dtt_text-on-main-color);margin-right:.5rem;cursor:pointer;-webkit-transition:opacity .2s ease-in-out;transition:opacity .2s ease-in-out}#group-chips>.group-chip:hover{opacity:.75}.paginator-tabs{width:100%}.paginator-tabs kup-paginator{display:-ms-inline-flexbox;display:inline-flex}.paginator-tabs .loadmore-button{position:relative;background:none;border:none;height:100%;cursor:pointer;outline:none;margin-left:.25rem;padding:0 .25rem;float:right}.paginator-tabs .loadmore-button .paginator-tab-text{margin-left:.25rem}.paginator-tabs .loadmore-button .paginator-tab-text,.paginator-tabs .loadmore-button:before{-webkit-transition:color .25s ease;transition:color .25s ease}.paginator-tabs .loadmore-button.activated .paginator-tab-text,.paginator-tabs .loadmore-button.activated:before,.paginator-tabs .loadmore-button:hover .paginator-tab-text,.paginator-tabs .loadmore-button:hover:before{color:var(--dtt_main-color)}.paginator-tabs .paginator-button{position:relative;background:none;border:none;height:100%;cursor:pointer;outline:none;margin-left:.25rem;padding:0 .25rem;float:right}.paginator-tabs .paginator-button .customize-panel{cursor:default;opacity:0;pointer-events:none;position:absolute;bottom:-1.25rem;left:0;padding:1rem;z-index:1000;width:200px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;background:var(--dtt_background-color);-webkit-box-shadow:var(--dtt_box-shadow);box-shadow:var(--dtt_box-shadow);-webkit-transition:opacity .25s ease;transition:opacity .25s ease;-webkit-transform:translate(-100%);transform:translate(-100%)}.paginator-tabs .paginator-button .customize-panel.visible{opacity:1;pointer-events:all}.paginator-tabs .paginator-button .customize-panel .panel-label{min-width:150px;text-align:left;text-overflow:ellipsis;max-width:150px;overflow:hidden}.paginator-tabs .paginator-button span{cursor:default}.paginator-tabs .paginator-button:before,.paginator-tabs .paginator-button span.density-label,.paginator-tabs .paginator-button span.fontsize-label{color:var(--dtt_density-icon-color);vertical-align:middle;-webkit-transition:color .25s;transition:color .25s;cursor:pointer}.paginator-tabs .paginator-button:before{font-size:120%}.paginator-tabs .paginator-button span.density-label,.paginator-tabs .paginator-button span.fontsize-label{font-size:var(--dtt_font-size)}.paginator-tabs .paginator-button.activated:before,.paginator-tabs .paginator-button.activated span.density-label,.paginator-tabs .paginator-button.activated span.fontsize-label,.paginator-tabs .paginator-button:hover:before,.paginator-tabs .paginator-button:hover span.density-label,.paginator-tabs .paginator-button:hover span.fontsize-label{color:var(--dtt_main-color)}.paginator-tabs .paginator-button .paginator-tab-text{margin-left:.25rem}.density-panel,.fontsize-panel{position:relative;margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-shadow:var(--dtt_density-box-shadow);box-shadow:var(--dtt_density-box-shadow);width:200px;width:-webkit-max-content;width:-moz-max-content;width:max-content}.density-panel .mdi:before,.density-panel:before,.fontsize-panel .mdi:before,.fontsize-panel:before{color:var(--dtt_density-icon-color);font-size:120%}.density-panel .density-label,.density-panel .fontsize-label,.fontsize-panel .density-label,.fontsize-panel .fontsize-label{padding:.5rem .5rem;cursor:pointer}.density-panel svg,.fontsize-panel svg{height:1.5rem;width:1.5rem}.density-panel [role=button],.fontsize-panel [role=button]{outline:none;cursor:pointer;display:-ms-flexbox;display:flex}.density-panel [role=button] svg,.fontsize-panel [role=button] svg{fill:#bdbdbd}.density-panel .density-panel-overlay,.density-panel .fontsize-panel-overlay,.fontsize-panel .density-panel-overlay,.fontsize-panel .fontsize-panel-overlay{background:var(--dtt_background-color);position:absolute;top:1.6rem;right:0;display:none;opacity:0;z-index:10;-webkit-box-shadow:0 0 7.5px 0 hsla(0,0%,50.2%,.5);box-shadow:0 0 7.5px 0 hsla(0,0%,50.2%,.5);width:100px;width:-webkit-max-content;width:-moz-max-content;width:max-content}.density-panel .density-panel-overlay .wrapper,.density-panel .fontsize-panel-overlay .wrapper,.fontsize-panel .density-panel-overlay .wrapper,.fontsize-panel .fontsize-panel-overlay .wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;outline:none;color:var(--dtt_color);cursor:pointer;padding:.5rem 1rem;-webkit-transition:color .25s,background-color .25s,opacity .25s;transition:color .25s,background-color .25s,opacity .25s}.density-panel .density-panel-overlay .wrapper:first-child,.density-panel .fontsize-panel-overlay .wrapper:first-child,.fontsize-panel .density-panel-overlay .wrapper:first-child,.fontsize-panel .fontsize-panel-overlay .wrapper:first-child{padding-top:.75rem}.density-panel .density-panel-overlay .wrapper:last-child,.density-panel .fontsize-panel-overlay .wrapper:last-child,.fontsize-panel .density-panel-overlay .wrapper:last-child,.fontsize-panel .fontsize-panel-overlay .wrapper:last-child{padding-bottom:.75rem}.density-panel .density-panel-overlay .wrapper svg,.density-panel .fontsize-panel-overlay .wrapper svg,.fontsize-panel .density-panel-overlay .wrapper svg,.fontsize-panel .fontsize-panel-overlay .wrapper svg{margin-right:.5rem;fill:var(--dtt_color)}.density-panel .density-panel-overlay .wrapper.active,.density-panel .density-panel-overlay .wrapper:hover,.density-panel .fontsize-panel-overlay .wrapper.active,.density-panel .fontsize-panel-overlay .wrapper:hover,.fontsize-panel .density-panel-overlay .wrapper.active,.fontsize-panel .density-panel-overlay .wrapper:hover,.fontsize-panel .fontsize-panel-overlay .wrapper.active,.fontsize-panel .fontsize-panel-overlay .wrapper:hover{color:var(--dtt_hover-color);background-color:var(--dtt_hover-background-color)}.density-panel .density-panel-overlay .wrapper.active svg,.density-panel .density-panel-overlay .wrapper:hover svg,.density-panel .fontsize-panel-overlay .wrapper.active svg,.density-panel .fontsize-panel-overlay .wrapper:hover svg,.fontsize-panel .density-panel-overlay .wrapper.active svg,.fontsize-panel .density-panel-overlay .wrapper:hover svg,.fontsize-panel .fontsize-panel-overlay .wrapper.active svg,.fontsize-panel .fontsize-panel-overlay .wrapper:hover svg{fill:var(--dtt_hover-color)}.density-panel .density-panel-overlay.open,.density-panel .fontsize-panel-overlay.open,.fontsize-panel .density-panel-overlay.open,.fontsize-panel .fontsize-panel-overlay.open{opacity:1;display:block}\@-webkit-keyframes display-none-transition{0%{opacity:0}to{opacity:1}}\@keyframes display-none-transition{0%{opacity:0}to{opacity:1}}.load-more-records{background-color:transparent;border:0 none;color:var(--dtt_icons-color);cursor:pointer;display:inline-block;font-size:calc(var(--dtt_font-size) * 1.2);height:calc(var(--dtt_font-size) * 1.2);margin:0 6px;padding:0;-webkit-transition:color .3s;transition:color .3s;width:calc(var(--dtt_font-size) * 1.2)}.load-more-records:hover{color:var(--dtt_icons-hover-color)}.load-more-records:before{height:inherit;width:inherit}#container-scrolling-arrow{position:fixed;top:50%;left:50%;pointer-events:none;z-index:9999}#container-scrolling-arrow .left-scrolling-arrow,#container-scrolling-arrow .right-scrolling-arrow{position:absolute;width:0;height:0;visibility:hidden}#container-scrolling-arrow .left-scrolling-arrow{border-top:8px solid transparent;border-bottom:8px solid transparent;border-right:8px solid var(--dtt_main-color);-webkit-transform:translate(30px,-10px);transform:translate(30px,-10px)}#container-scrolling-arrow .right-scrolling-arrow{border-top:8px solid transparent;border-bottom:8px solid transparent;border-left:8px solid var(--dtt_main-color);-webkit-transform:translate(-30px,-10px);transform:translate(-30px,-10px)}#container-scrolling-arrow .left-scrolling-arrow.activated{visibility:visible}#container-scrolling-arrow .left-scrolling-arrow.activated.animated.arrow-1{-webkit-animation:pulseleft 1.2s infinite;animation:pulseleft 1.2s infinite;-webkit-animation-delay:.4s;animation-delay:.4s}#container-scrolling-arrow .left-scrolling-arrow.activated.animated.arrow-2{-webkit-animation:pulseleft 1.2s infinite;animation:pulseleft 1.2s infinite;-webkit-animation-delay:.2s;animation-delay:.2s}#container-scrolling-arrow .left-scrolling-arrow.activated.animated.arrow-3{-webkit-animation:pulseleft 1.2s infinite;animation:pulseleft 1.2s infinite}#container-scrolling-arrow .right-scrolling-arrow.activated{visibility:visible}#container-scrolling-arrow .right-scrolling-arrow.activated.animated.arrow-1{-webkit-animation:pulseright 1.2s infinite;animation:pulseright 1.2s infinite;-webkit-animation-delay:.4s;animation-delay:.4s}#container-scrolling-arrow .right-scrolling-arrow.activated.animated.arrow-2{-webkit-animation:pulseright 1.2s infinite;animation:pulseright 1.2s infinite;-webkit-animation-delay:.2s;animation-delay:.2s}#container-scrolling-arrow .right-scrolling-arrow.activated.animated.arrow-3{-webkit-animation:pulseright 1.2s infinite;animation:pulseright 1.2s infinite}\@-moz-keyframes pulseleft{0%{opacity:.2;transform:translate(30px,-10px)}to{opacity:1;transform:translate(10px,-10px)}}\@-webkit-keyframes pulseleft{0%{opacity:.2;-webkit-transform:translate(30px,-10px);transform:translate(30px,-10px)}to{opacity:1;-webkit-transform:translate(10px,-10px);transform:translate(10px,-10px)}}\@-o-keyframes pulseleft{0%{opacity:.2;transform:translate(30px,-10px)}to{opacity:1;transform:translate(10px,-10px)}}\@keyframes pulseleft{0%{opacity:.2;-webkit-transform:translate(30px,-10px);transform:translate(30px,-10px)}to{opacity:1;-webkit-transform:translate(10px,-10px);transform:translate(10px,-10px)}}\@-moz-keyframes pulseright{0%{opacity:.2;transform:translate(-30px,-10px)}to{opacity:1;transform:translate(-10px,-10px)}}\@-webkit-keyframes pulseright{0%{opacity:.2;-webkit-transform:translate(-30px,-10px);transform:translate(-30px,-10px)}to{opacity:1;-webkit-transform:translate(-10px,-10px);transform:translate(-10px,-10px)}}\@-o-keyframes pulseright{0%{opacity:.2;transform:translate(-30px,-10px)}to{opacity:1;transform:translate(-10px,-10px)}}\@keyframes pulseright{0%{opacity:.2;-webkit-transform:translate(-30px,-10px);transform:translate(-30px,-10px)}to{opacity:1;-webkit-transform:translate(-10px,-10px);transform:translate(-10px,-10px)}}"; }
}

export { KupDataTable as kup_data_table };
