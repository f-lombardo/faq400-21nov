var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h } from './chunk-1851c479.js';
import './chunk-d8060b98.js';
import { L as LoadMoreMode, P as PaginatorPos, S as ShowGrid, c as calcTotals, p as paginateRows, f as filterRows, a as SortMode, g as groupRows, s as sortRows, n as numeral, b as getColumnByName, K as KupDataTableColumnDragType, d as styleHasBorderRadius } from './chunk-93a43134.js';
import { i as isBar, a as isButton, b as isCheckbox, c as isIcon, d as isImage, e as isLink, f as isNumber, g as isVoCodver, h as createJ4objButtonConfig } from './chunk-a5dfc366.js';
var KupDataTable = /** @class */ (function () {
    function KupDataTable(hostRef) {
        var _this = this;
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
        this.onDocumentClick = function () {
            _this.topFontSizePanelVisible = false;
            _this.botFontSizePanelVisible = false;
            _this.topDensityPanelVisible = false;
            _this.botDensityPanelVisible = false;
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
    KupDataTable.prototype.rowsPerPageHandler = function (newValue) {
        this.currentRowsPerPage = newValue;
    };
    KupDataTable.prototype.expandGroupsHandler = function () {
        // reset group state
        this.groupState = {};
        this.forceGroupExpansion();
    };
    KupDataTable.prototype.recalculateRows = function () {
        this.initRows();
    };
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
    KupDataTable.prototype.componentWillLoad = function () {
        this.rowsPerPageHandler(this.rowsPerPage);
        this.initRows();
        if (this.expandGroups) {
            this.forceGroupExpansion();
        }
    };
    KupDataTable.prototype.componentDidLoad = function () {
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
    };
    KupDataTable.prototype.componentDidUnload = function () {
        document.removeEventListener('click', this.onDocumentClick);
    };
    KupDataTable.prototype.hasTooltip = function (cell) {
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
    };
    KupDataTable.prototype.getColumns = function () {
        return this.data && this.data.columns
            ? this.data.columns
            : [{ title: '', name: '', size: 0 }];
    };
    KupDataTable.prototype.getVisibleColumns = function () {
        var _this = this;
        var visibleColumns = this.getColumns().filter(function (column) {
            if (column.hasOwnProperty('visible')) {
                return column.visible;
            }
            return true;
        });
        // check grouping
        if (this.isGrouping()) {
            // filtering column based on group visibility
            return visibleColumns.filter(function (column) {
                // check if in group
                var group = null;
                for (var _i = 0, _a = _this.groups; _i < _a.length; _i++) {
                    var currentGroup = _a[_i];
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
    };
    KupDataTable.prototype.getGroupByName = function (column) {
        if (!this.isGrouping()) {
            return null;
        }
        for (var _i = 0, _a = this.groups; _i < _a.length; _i++) {
            var group = _a[_i];
            if (group.column === column) {
                return group;
            }
        }
        return null;
    };
    KupDataTable.prototype.getRows = function () {
        return this.data && this.data.rows ? this.data.rows : [];
    };
    KupDataTable.prototype.initRows = function () {
        this.filterRows();
        this.footer = calcTotals(this.rows, this.totals);
        this.groupRows();
        this.sortRows();
        this.paginatedRows = paginateRows(this.rows, this.currentPage, this.currentRowsPerPage);
    };
    KupDataTable.prototype.filterRows = function () {
        this.rows = filterRows(this.getRows(), this.filters, this.globalFilterValue, this.getVisibleColumns().map(function (c) { return c.name; }));
    };
    KupDataTable.prototype.isGrouping = function () {
        return this.groups && this.groups.length > 0;
    };
    KupDataTable.prototype.hasRowActions = function () {
        return this.rowActions !== undefined;
    };
    KupDataTable.prototype.removeGroup = function (group) {
        // resetting group state
        this.groupState = {};
        var index = this.groups.indexOf(group);
        if (index >= 0) {
            // removing group from prop
            this.groups.splice(index, 1);
            this.groups = this.groups.slice();
        }
    };
    KupDataTable.prototype.removeGroupFromRow = function (group) {
        if (!group) {
            return;
        }
        // resetting group state
        this.groupState = {};
        // search group
        var index = -1;
        for (var i = 0; i < this.groups.length; i++) {
            var g = this.groups[i];
            if (g.column === group.column) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            // removing group from prop
            this.groups.splice(index, 1);
            this.groups = this.groups.slice();
        }
    };
    KupDataTable.prototype.hasTotals = function () {
        return this.totals && Object.keys(this.totals).length > 0;
    };
    KupDataTable.prototype.forceGroupExpansion = function () {
        var _this = this;
        this.rows.forEach(function (row) { return _this.forceRowGroupExpansion(row); });
    };
    KupDataTable.prototype.forceRowGroupExpansion = function (row) {
        var _this = this;
        // check if row is group
        if (!row.group) {
            return;
        }
        // forcing row expanded
        row.group.expanded = true;
        // updating group state
        // check if already present
        var groupState = this.groupState[row.group.id];
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
            row.group.children.forEach(function (childRow) { return _this.forceRowGroupExpansion(childRow); });
        }
    };
    KupDataTable.prototype.adjustPaginator = function () {
        var numberOfRows = this.rows.length;
        // check if current page is valid
        var numberOfPages = Math.ceil(numberOfRows / this.currentRowsPerPage);
        if (this.currentPage > numberOfPages) {
            // reset page
            this.currentPage = 1;
        }
    };
    // event listeners
    KupDataTable.prototype.onColumnSort = function (_a, columnName) {
        var ctrlKey = _a.ctrlKey;
        // check if columnName is already in sort array
        var i = 0;
        for (; i < this.sort.length; i++) {
            var sortObj = this.sort[i];
            if (sortObj.column === columnName) {
                break;
            }
        }
        if (i < this.sort.length) {
            // already in array... switching sort
            var sortObj = this.sort[i];
            var newSortObj = Object.assign({}, sortObj, { sortMode: sortObj.sortMode === SortMode.A ? SortMode.D : SortMode.A });
            if (ctrlKey) {
                var newSort = this.sort.slice();
                newSort[i] = newSortObj;
                this.sort = newSort;
            }
            else {
                this.sort = [newSortObj];
            }
        }
        else {
            var sortObj = {
                column: columnName,
                sortMode: SortMode.A,
            };
            // if CTRL is pressed, push to array
            // else, replace current array
            if (ctrlKey) {
                this.sort = this.sort.concat([sortObj]);
            }
            else {
                this.sort = [sortObj];
            }
        }
    };
    KupDataTable.prototype.onFilterChange = function (_a, column) {
        var detail = _a.detail;
        // resetting current page
        this.currentPage = 1;
        var newFilters = Object.assign({}, this.filters);
        if (detail.value.length === 0) {
            delete newFilters[column];
        }
        else {
            newFilters[column] = detail.value;
        }
        this.filters = newFilters;
    };
    KupDataTable.prototype.onGlobalFilterChange = function (_a) {
        var detail = _a.detail;
        // resetting current page
        this.currentPage = 1;
        this.globalFilterValue = detail.value;
    };
    KupDataTable.prototype.handlePageChanged = function (_a) {
        var detail = _a.detail;
        this.currentPage = detail.newPage;
    };
    KupDataTable.prototype.handleRowsPerPageChanged = function (_a) {
        var detail = _a.detail;
        this.currentRowsPerPage = detail.newRowsPerPage;
        this.adjustPaginator();
    };
    KupDataTable.prototype.onRowClick = function (event, row) {
        // selecting row
        this.handleRowSelect(row, event.ctrlKey);
        // checking target
        var target = event.target;
        var clickedColumn = null;
        if (target instanceof HTMLElement) {
            if (target.tagName !== 'TR') {
                var currentElement = target;
                while (currentElement.tagName !== 'TD') {
                    currentElement = currentElement.parentElement;
                }
                clickedColumn = currentElement.dataset.column;
            }
        }
        this.kupRowSelected.emit({
            selectedRows: this.selectedRows,
            clickedColumn: clickedColumn,
        });
    };
    KupDataTable.prototype.onDefaultRowActionClick = function (e, _a) {
        var action = _a.action, row = _a.row, type = _a.type, index = _a.index;
        e.stopPropagation();
        this.kupRowActionClicked.emit({
            action: action,
            index: index,
            row: row,
            type: type,
        });
    };
    KupDataTable.prototype.onRowActionExpanderClick = function (e, row) {
        e.stopPropagation();
        this.kupRowActionClicked.emit({
            row: row,
            type: 'expander',
        });
    };
    KupDataTable.prototype.handleRowSelect = function (row, ctrlKey) {
        if (this.multiSelection) {
            if (ctrlKey && this.selectedRows) {
                var index = this.selectedRows.indexOf(row);
                if (index < 0) {
                    // adding
                    this.selectedRows = this.selectedRows.concat([row]);
                }
                else {
                    // removing
                    this.selectedRows.splice(index, 1);
                    this.selectedRows = this.selectedRows.slice();
                }
            }
            else {
                this.selectedRows = [row];
            }
        }
        else {
            this.selectedRows = [row];
        }
    };
    KupDataTable.prototype.onRowCheckboxSelection = function (_a, row) {
        var target = _a.target;
        if (target.checked) {
            if (this.selectedRows.length > 0) {
                this.selectedRows = this.selectedRows.concat([row]);
            }
            else {
                this.selectedRows = [row];
            }
        }
        else {
            var index = this.selectedRows.indexOf(row);
            if (index >= 0) {
                this.selectedRows.splice(index, 1);
                this.selectedRows = this.selectedRows.slice();
            }
        }
        this.kupRowSelected.emit({
            selectedRows: this.selectedRows,
            clickedColumn: null,
        });
    };
    KupDataTable.prototype.onRowExpand = function (row) {
        // row should be a 'group' row
        row.group.expanded = !row.group.expanded;
        // updating group map
        this.groupState[row.group.id].expanded = row.group.expanded;
        // changing group state to trigger rendering
        this.groupState = Object.assign({}, this.groupState);
    };
    KupDataTable.prototype.onSelectAll = function (_a) {
        var target = _a.target;
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
    };
    KupDataTable.prototype.onColumnMouseEnter = function (column) {
        var _this = this;
        this.columnOverTimeout = setTimeout(function () {
            _this.openedMenu = column;
        }, 500);
    };
    KupDataTable.prototype.onColumnMouseLeave = function (column) {
        // clearing timeout
        clearTimeout(this.columnOverTimeout);
        if (this.openedMenu === column) {
            this.openedMenu = null;
        }
    };
    KupDataTable.prototype.switchColumnGroup = function (group, column) {
        // resetting opened menu
        this.openedMenu = null;
        // reset group state
        this.groupState = {};
        if (group !== null) {
            // remove from grouping
            var index = this.groups.indexOf(group);
            this.groups.splice(index, 1);
            this.groups = this.groups.slice();
        }
        else {
            // add to groups
            this.groups = this.groups.concat([{ column: column, visible: true }]);
        }
    };
    KupDataTable.prototype.onOptionClicked = function (column, row) {
        this.kupOptionClicked.emit({
            column: column,
            row: row,
        });
    };
    KupDataTable.prototype.onJ4btnClicked = function (row, column, cell) {
        // Since this function is called with bind, the event from the kup-button gets passed into the arguments array
        var buttonEvent = arguments[3];
        if (buttonEvent) {
            // Prevents double events to be fired.
            buttonEvent.stopPropagation();
        }
        else {
            throw 'kup-data-table error: missing event';
        }
        this.kupCellButtonClicked.emit({
            cell: cell,
            column: column,
            row: row,
        });
    };
    // utility methods
    KupDataTable.prototype.groupRows = function () {
        if (!this.isGrouping()) {
            return;
        }
        this.rows = groupRows(this.getColumns(), this.rows, this.groups, this.totals);
        this.adjustGroupState();
    };
    // Handler for loadMore button is clicked.
    KupDataTable.prototype.onLoadMoreClick = function () {
        var loadItems = 0;
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
            loadItems: loadItems,
        });
        this.loadMoreEventPreviousQuantity = loadItems;
        this.loadMoreEventCounter++;
    };
    KupDataTable.prototype.adjustGroupState = function () {
        var _this = this;
        if (!this.rows ||
            this.rows.length === 0 ||
            !this.rows[0].hasOwnProperty('group')) {
            // no grouping
            return;
        }
        this.rows.forEach(function (r) { return _this.adjustGroupStateFromRow(r); });
    };
    KupDataTable.prototype.adjustGroupStateFromRow = function (row) {
        var _this = this;
        if (!row || !row.hasOwnProperty('group')) {
            // not a groping row, nothing to do
            return;
        }
        var group = row.group;
        // check if already in group state
        var groupFromState = this.groupState[group.id];
        if (!groupFromState) {
            // add to state
            this.groupState[group.id] = group;
        }
        else {
            // update expanded
            group.expanded = groupFromState.expanded;
        }
        group.children.forEach(function (child) { return _this.adjustGroupStateFromRow(child); });
    };
    KupDataTable.prototype.sortRows = function () {
        this.rows = sortRows(this.rows, this.sort);
    };
    KupDataTable.prototype.getSortIcon = function (columnName) {
        // check if column in sort array
        for (var _i = 0, _a = this.sort; _i < _a.length; _i++) {
            var sortObj = _a[_i];
            if (sortObj.column === columnName) {
                return 'A' === sortObj.sortMode
                    ? 'mdi-sort-ascending'
                    : 'mdi-sort-descending';
            }
        }
        // default
        return 'mdi-sort';
    };
    KupDataTable.prototype.calculateColspan = function () {
        var colSpan = this.getVisibleColumns().length;
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
    };
    KupDataTable.prototype.isGroupExpanded = function (_a) {
        var group = _a.group;
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
    };
    //==== Column sort order methods ====
    KupDataTable.prototype.handleColumnSort = function (receivingColumn, sortedColumn) {
        // Get receiving column position
        var receivingColIndex = this.data.columns.findIndex(function (col) { return col.name === receivingColumn.name &&
            col.title === receivingColumn.title; });
        // Get sorted column current position
        var sortedColIndex = this.data.columns.findIndex(function (col) { return col.name === sortedColumn.name &&
            col.title === sortedColumn.title; });
        // Moves the sortedColumn into the correct position
        if (this.sortableColumnsMutateData) {
            this.moveSortedColumns(this.data.columns, receivingColIndex, sortedColIndex);
        }
        // fires event
        this.kupDataTableSortedColumn.emit({
            receivingColumnIndex: receivingColIndex,
            sortedColumnIndex: sortedColIndex,
        });
    };
    KupDataTable.prototype.moveSortedColumns = function (columns, receivingColumnIndex, sortedColumnIndex) {
        var remove = columns.splice(sortedColumnIndex, 1);
        columns.splice(receivingColumnIndex, 0, remove[0]);
    };
    KupDataTable.prototype.defaultSortingFunction = function (columns, receivingColumnIndex, sortedColumnIndex, useNewObject) {
        if (useNewObject === void 0) { useNewObject = false; }
        return __awaiter(this, void 0, void 0, function () {
            var toSort;
            return __generator(this, function (_a) {
                toSort = !useNewObject ? columns : columns.slice();
                this.moveSortedColumns(toSort, receivingColumnIndex, sortedColumnIndex);
                return [2 /*return*/, toSort];
            });
        });
    };
    KupDataTable.prototype.toggleFontSizeVisibility = function (event, top) {
        event.stopPropagation();
        if (top) {
            this.topFontSizePanelVisible = !this.topFontSizePanelVisible;
            this.botFontSizePanelVisible = false;
        }
        else {
            this.topFontSizePanelVisible = false;
            this.botFontSizePanelVisible = !this.botFontSizePanelVisible;
        }
    };
    KupDataTable.prototype.toggleDensityVisibility = function (event, top) {
        event.stopPropagation();
        if (top) {
            this.topDensityPanelVisible = !this.topDensityPanelVisible;
            this.botDensityPanelVisible = false;
        }
        else {
            this.topDensityPanelVisible = false;
            this.botDensityPanelVisible = !this.botDensityPanelVisible;
        }
    };
    //======== render methods ========
    KupDataTable.prototype.renderHeader = function () {
        var _this = this;
        var hasCustomColumnsWidth = this.columnsWidth.length > 0;
        var dataColumns = this.getVisibleColumns().map(function (column) {
            // filter
            var filter = null;
            if (_this.showFilters) {
                var filterValue = '';
                if (_this.filters && _this.filters[column.name]) {
                    filterValue = _this.filters[column.name];
                }
                filter = (h("div", null, h("kup-text-input", { class: "datatable-filter", initialValue: filterValue, "data-col": column.name, onKetchupTextInputUpdated: function (e) {
                        _this.onFilterChange(e, column.name);
                    } })));
            }
            // sort
            var sort = null;
            if (_this.sortEnabled) {
                sort = (h("span", { class: "column-sort" }, h("span", { role: "button", "aria-label": "Sort column" // TODO
                    ,
                    class: 'mdi ' + _this.getSortIcon(column.name), onClick: function (e) { return _this.onColumnSort(e, column.name); } })));
            }
            var thStyle = null;
            if (hasCustomColumnsWidth) {
                for (var i = 0; i < _this.columnsWidth.length; i++) {
                    var currentCol = _this.columnsWidth[i];
                    if (currentCol.column === column.name) {
                        var width = currentCol.width.toString() + 'px';
                        thStyle = {
                            width: width,
                            minWidth: width,
                            maxWidth: width,
                        };
                        break;
                    }
                }
            }
            var columnMenuItems = [];
            // adding grouping
            var group = _this.getGroupByName(column.name);
            var groupLabel = group != null
                ? 'Disattiva raggruppamento'
                : 'Attiva raggruppamento';
            columnMenuItems.push(h("li", { role: "menuitem", onClick: function () { return _this.switchColumnGroup(group, column.name); } }, h("span", { class: "mdi mdi-book" }), groupLabel));
            columnMenuItems.push(h("li", { role: "menuitem", onClick: function () { return _this.kupAddColumn.emit({ column: column.name }); } }, h("span", { class: "mdi mdi-table-column-plus-after" }), "Aggiungi colonna"));
            var columnMenu = null;
            if (columnMenuItems.length !== 0) {
                var menuClass = _this.openedMenu === column.name ? 'open' : 'closed';
                columnMenu = (h("div", { class: "column-menu " + menuClass }, h("ul", { role: "menubar" }, columnMenuItems)));
            }
            // Check if columns are droppable and sets their handlers
            // TODO set better typing.
            var dragHandlers = {};
            if (_this.enableSortableColumns) {
                // Reference for drag events and what they permit or not
                // https://html.spec.whatwg.org/multipage/dnd.html#concept-dnd-p
                dragHandlers = {
                    draggable: true,
                    onDragStart: function (e) {
                        // Sets drag data and the type of drag
                        e.dataTransfer.setData(KupDataTableColumnDragType, JSON.stringify(column));
                        e.dataTransfer.effectAllowed = 'move';
                        // Remember that the current target is different from the one print out in the console
                        // Sets which element has started the drag
                        e.target.setAttribute(_this.dragStarterAttribute, '');
                        _this.theadRef.setAttribute(_this.dragFlagAttribute, '');
                        _this.columnsAreBeingDragged = true;
                    },
                    onDragLeave: function (e) {
                        if (e.dataTransfer.types.indexOf(KupDataTableColumnDragType) >= 0) {
                            e.target.removeAttribute(_this.dragOverAttribute);
                        }
                    },
                    onDragOver: function (e) {
                        if (e.dataTransfer.types.indexOf(KupDataTableColumnDragType) >= 0) {
                            var overElement = e.target;
                            overElement.setAttribute(_this.dragOverAttribute, '');
                            // If element can have a drop effect
                            if (!overElement.hasAttribute(_this.dragStarterAttribute) &&
                                _this.columnsAreBeingDragged) {
                                e.preventDefault(); // Mandatory to allow drop
                                e.dataTransfer.effectAllowed = 'move';
                            }
                            else {
                                e.dataTransfer.effectAllowed = 'none';
                            }
                        }
                    },
                    onDragEnd: function (e) {
                        // When the drag has ended, checks if the element still exists or it was destroyed by the JSX
                        var dragStarter = e.target;
                        if (dragStarter) {
                            // IF it still exists, removes the attribute so that it can perform a new drag again
                            dragStarter.removeAttribute(_this.dragStarterAttribute);
                        }
                        _this.theadRef.removeAttribute(_this.dragFlagAttribute);
                        _this.columnsAreBeingDragged = false;
                    },
                    onDrop: function (e) {
                        if (e.dataTransfer.types.indexOf(KupDataTableColumnDragType) >= 0) {
                            var transferredData = JSON.parse(e.dataTransfer.getData(KupDataTableColumnDragType));
                            e.preventDefault();
                            e.target.removeAttribute(_this.dragOverAttribute);
                            // We are sure the tables have been dropped in a valid location -> starts sorting the columns
                            _this.handleColumnSort(column, transferredData);
                        }
                    },
                };
            }
            var columnClass = {};
            if (column.obj) {
                columnClass = {
                    number: isNumber(column.obj),
                };
            }
            return (h("th", Object.assign({ class: columnClass, style: thStyle, onMouseEnter: function () { return _this.onColumnMouseEnter(column.name); }, onMouseLeave: function () { return _this.onColumnMouseLeave(column.name); } }, dragHandlers), h("span", { class: "column-title" }, column.title), sort, filter, columnMenu));
        });
        var multiSelectColumn = null;
        if (this.multiSelection) {
            var style = {
                width: '30px',
                margin: '0 auto',
            };
            multiSelectColumn = (h("th", { style: style }, h("input", { type: "checkbox", onChange: function (e) { return _this.onSelectAll(e); }, title: "selectedRow: " + this.selectedRows.length + " - renderedRows: " + this.renderedRows.length, checked: this.selectedRows.length > 0 &&
                    this.selectedRows.length ===
                        this.renderedRows.length })));
        }
        var groupColumn = null;
        if (this.isGrouping() && this.hasTotals()) {
            groupColumn = h("th", null);
        }
        var actionsColumn = null;
        if (this.hasRowActions()) {
            actionsColumn = h("th", null);
        }
        return [multiSelectColumn, groupColumn, actionsColumn].concat(dataColumns);
    };
    KupDataTable.prototype.renderFooter = function () {
        var _this = this;
        if (!this.hasTotals()) {
            // no footer
            return null;
        }
        var footerCells = this.getVisibleColumns().map(function (_a) {
            var name = _a.name;
            return (h("td", null, _this.footer[name]));
        });
        var selectRowCell = null;
        if (this.multiSelection) {
            selectRowCell = h("td", null);
        }
        var groupingCell = null;
        if (this.isGrouping() && this.hasTotals()) {
            groupingCell = h("td", null);
        }
        var footer = (h("tfoot", null, h("tr", null, selectRowCell, groupingCell, footerCells)));
        return footer;
    };
    KupDataTable.prototype.renderRow = function (row, level, previousRow) {
        var _this = this;
        if (level === void 0) { level = 0; }
        var visibleColumns = this.getVisibleColumns();
        if (row.group) {
            if (row.group.children.length === 0) {
                // empty group
                return null;
            }
            var icon = row.group.expanded ? (h("path", { d: "M19,13H5V11H19V13Z" })) : (h("path", { d: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" }));
            var jsxRows_1 = [];
            var indent = [];
            for (var i = 0; i < level; i++) {
                indent.push(h("span", { class: "indent" }));
            }
            if (this.hasTotals()) {
                var cells = [];
                // adding 'grouping' cell
                var colSpan = this.multiSelection ? 2 : 1;
                cells.push(h("td", { colSpan: colSpan }, indent, h("span", { class: "group-cell-content" }, h("span", { role: "button", "aria-label": "Row expander" // TODO change this label
                    ,
                    title: "Expand/collapse group", tabindex: "0", onClick: function (e) {
                        e.stopPropagation();
                        _this.onRowExpand(row);
                    } }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", class: "group-expander" }, icon)), row.group.label, h("span", { role: "button", "aria-label": "Remove group" // TODO change this label
                    ,
                    title: "Remove group", tabindex: "0", onClick: function (e) {
                        e.stopPropagation();
                        _this.removeGroupFromRow(row.group);
                    } }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", class: "group-remove" }, h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }))))));
                for (var _i = 0, visibleColumns_1 = visibleColumns; _i < visibleColumns_1.length; _i++) {
                    var column = visibleColumns_1[_i];
                    cells.push(h("td", { class: "total" }, row.group.totals[column.name]));
                }
                jsxRows_1.push(h("tr", { class: "group", onClick: function () { return _this.onRowExpand(row); } }, cells));
            }
            else {
                jsxRows_1.push(h("tr", { class: "group", onClick: function () { return _this.onRowExpand(row); } }, h("td", { colSpan: this.calculateColspan() }, indent, h("span", { class: "group-cell-content" }, h("span", { role: "button", "aria-label": "Row expander" // TODO change this label
                    ,
                    title: "Expand/collapse group", tabindex: "0", onClick: function (e) {
                        e.stopPropagation();
                        _this.onRowExpand(row);
                    } }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", class: "group-expander" }, icon)), h("span", { class: "text" }, row.group.label), h("span", { role: "button", "aria-label": "Remove group" // TODO change this label
                    ,
                    title: "Remove group", tabindex: "0", onClick: function (e) {
                        e.stopPropagation();
                        _this.removeGroupFromRow(row.group);
                    } }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", class: "group-remove" }, h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })))))));
            }
            // if group is expanded, add children
            if (this.isGroupExpanded(row)) {
                row.group.children
                    // We must pass the previous element of the array to check if we must hide or display the value of the cell
                    // When the column has specified the parameter hideValuesRepetitions
                    .map(function (row, groupRowIndex, currentArray) { return _this.renderRow(row, level + 1, groupRowIndex > 0
                    ? currentArray[groupRowIndex - 1]
                    : null); })
                    .forEach(function (jsxRow) {
                    if (Array.isArray(jsxRow)) {
                        jsxRow.forEach(function (jr) { return jsxRows_1.push(jr); });
                    }
                    else {
                        jsxRows_1.push(jsxRow);
                    }
                });
            }
            // grouping row
            return jsxRows_1;
        }
        else {
            var cells = visibleColumns.map(function (currentColumn, index) {
                var name = currentColumn.name, hideValuesRepetitions = currentColumn.hideValuesRepetitions;
                var indend = [];
                if (index === 0 && !(_this.isGrouping() && _this.hasTotals())) {
                    for (var i = 0; i < level; i++) {
                        indend.push(h("span", { class: "indent" }));
                    }
                }
                var cell = row.cells[name];
                var options = null;
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
                    options = (h("span", { class: "options", role: "button", "aria-label": "Opzioni oggetto", title: "Opzioni oggetto", onClick: function () { return _this.onOptionClicked(name, row); } }, h("i", { class: "mdi mdi-settings" })));
                }
                var jsxCell = _this.renderCell(cell, name, 
                // The previous value must be passed only if repeated values can be hidden and we have a previous row.
                {
                    row: row,
                    column: currentColumn,
                }, hideValuesRepetitions && previousRow
                    ? previousRow.cells[name].value
                    : null);
                var cellClass = {
                    number: isNumber(cell.obj),
                };
                var cellStyle = null;
                if (!styleHasBorderRadius(cell)) {
                    cellStyle = cell.style;
                }
                return (h("td", { "data-column": name, style: cellStyle, class: cellClass }, indend, jsxCell, options));
            });
            var selectRowCell = null;
            if (this.multiSelection) {
                selectRowCell = (h("td", null, h("input", { type: "checkbox", checked: this.selectedRows.includes(row), onClick: function (e) { return e.stopPropagation(); }, onChange: function (e) { return _this.onRowCheckboxSelection(e, row); } })));
            }
            var groupingCell = null;
            if (this.isGrouping() && this.hasTotals()) {
                groupingCell = h("td", null);
            }
            // adding row to rendered rows
            this.renderedRows.push(row);
            var rowActionsCell = null;
            if (this.hasRowActions()) {
                var defaultRowActions = this.renderActions(this.rowActions, row, 'default');
                var rowActionExpander = null;
                var variableActions = null;
                if (row.actions) {
                    // adding variable actions
                    variableActions = this.renderActions(row.actions, row, 'variable');
                }
                else {
                    // adding expander
                    rowActionExpander = (h("span", { title: "Espandi voci", class: "row-action mdi mdi-chevron-right", onClick: function (e) { return _this.onRowActionExpanderClick(e, row); }, role: "button", "aria-label": "Espandi voci" }));
                }
                rowActionsCell = (h("td", null, defaultRowActions, rowActionExpander, variableActions));
            }
            var rowClass = {
                selected: this.selectedRows.includes(row),
            };
            return (h("tr", { class: rowClass, onClick: function (e) { return _this.onRowClick(e, row); } }, selectRowCell, groupingCell, rowActionsCell, cells));
        }
    };
    KupDataTable.prototype.renderActions = function (actions, row, type) {
        var _this = this;
        return actions.map(function (action, index) {
            return (h("span", { title: action.text, class: "row-action " + action.icon, onClick: function (e) { return _this.onDefaultRowActionClick(e, {
                    action: action,
                    index: index,
                    row: row,
                    type: type,
                }); }, role: "button", "aria-label": action.text }));
        });
    };
    /**
     * FActory function for cells.
     * @param cell - cell object
     * @param column - the cell's column name
     * @param previousRowCellValue - An optional value of the previous cell on the same column. If set and equal to the value of the current cell, makes the value of the current cell go blank.
     * @param cellData - Additional data for the current cell.
     * @param cellData.column - The column object to which the cell belongs.
     * @param cellData.row - The row object to which the cell belongs.
     */
    KupDataTable.prototype.renderCell = function (cell, column, cellData, previousRowCellValue) {
        var _this = this;
        var clazz = {
            'cell-content': true,
        };
        // When the previous row value is different from the current value, we can show the current value.
        var valueToDisplay = previousRowCellValue !== cell.value ? cell.value : '';
        // Sets the default value
        var content = valueToDisplay;
        if (isIcon(cell.obj) || isVoCodver(cell.obj)) {
            content = h("span", { class: valueToDisplay });
        }
        else if (isNumber(cell.obj)) {
            content = valueToDisplay;
            if (content) {
                var cellValue = numeral(cell.obj.k).value();
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
            var props = {
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
        var style = null;
        if (styleHasBorderRadius(cell)) {
            style = cell.style;
        }
        if (this.hasTooltip(cell)) {
            content = (h("kup-tooltip", { class: "datatable-tooltip", onKupTooltipLoadData: function (ev) { return _this.kupLoadRequest.emit({
                    cell: cell,
                    tooltip: ev.srcElement,
                }); }, onKupTooltipLoadDetail: function (ev) { return _this.kupDetailRequest.emit({
                    cell: cell,
                    tooltip: ev.srcElement,
                }); } }, content));
        }
        return (h("span", { class: clazz, style: style }, content));
    };
    KupDataTable.prototype.renderLoadMoreButton = function (isSlotted) {
        var _this = this;
        if (isSlotted === void 0) { isSlotted = true; }
        var label = 'Mostra altri dati';
        return (h("button", { "aria-label": label, class: "loadmore-button mdi mdi-plus", role: "button", slot: isSlotted ? 'more-results' : null, tabindex: "0", title: label, onClick: function () { return _this.onLoadMoreClick(); } }, h("span", { class: "paginator-tab-text" }, "Pi\u00F9 risultati"), ' '));
    };
    KupDataTable.prototype.onCustomSettingsClick = function (event) {
        var t = event.target;
        var elPanel = t
            .closest('.paginator-wrapper')
            .getElementsByClassName('customize-panel')[0];
        var elButton = t
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
    };
    KupDataTable.prototype.renderPaginator = function (top) {
        var _this = this;
        return (h("div", { class: "paginator-wrapper" }, h("div", { class: "paginator-tabs" }, h("kup-paginator", { id: top ? 'top-paginator' : 'bottom-paginator', max: this.rows.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: function (e) { return _this.handlePageChanged(e); }, onKupRowsPerPageChanged: function (e) { return _this.handleRowsPerPageChanged(e); } }), h("button", { title: "Mostra opzioni di personalizzazione", class: "paginator-button mdi mdi-settings custom-settings", onClick: function (e) { return _this.onCustomSettingsClick(e); } }, h("div", { class: "customize-panel" }, this.renderDensityPanel(top), this.renderFontSizePanel(top))), this.showLoadMore ? this.renderLoadMoreButton() : null)));
    };
    KupDataTable.prototype.renderFontSizePanel = function (top) {
        var _this = this;
        var fontSize;
        {
            this.fontsize === 'medium'
                ? (fontSize = 'Media')
                : this.fontsize === 'big'
                    ? (fontSize = 'Grande')
                    : this.fontsize === 'small'
                        ? (fontSize = 'Piccolo')
                        : (fontSize = '');
        }
        var fontSizeTypeString = 'Dimensione carattere: ' + fontSize;
        return (h("div", { class: "fontsize-panel" }, h("span", { title: fontSizeTypeString, class: "panel-label" }, "Dimensione carattere"), h("span", { class: "fontsize-label", onClick: function (e) { return _this.toggleFontSizeVisibility(e, top); } }, fontSize), h("div", { role: "button", onClick: function (e) { return _this.toggleFontSizeVisibility(e, top); }, tabindex: "0" }, h("svg", { version: "1.1", width: "24", height: "24", viewBox: "0 0 24 24" }, h("path", { d: "M7,10L12,15L17,10H7Z" }))), h("div", { class: {
                'fontsize-panel-overlay': true,
                open: top
                    ? this.topFontSizePanelVisible
                    : this.botFontSizePanelVisible,
            } }, h("div", { class: {
                wrapper: true,
                active: this.fontsize === 'small',
            }, onClick: function () { return (_this.fontsize = 'small'); }, role: "button", tabindex: "0", "aria-pressed": this.fontsize === 'small' ? 'true' : 'false' }, h("span", { title: "Piccolo", class: "fontsize-icon-panel mdi mdi-format-font-size-decrease" })), h("div", { class: {
                wrapper: true,
                active: this.fontsize === 'medium',
            }, onClick: function () { return (_this.fontsize = 'medium'); }, role: "button", tabindex: "0", "aria-pressed": this.fontsize === 'medium' ? 'true' : 'false' }, h("span", { title: "Normale", class: "fontsize-icon-panel mdi mdi-format-color-text" })), h("div", { class: {
                wrapper: true,
                active: this.fontsize === 'big',
            }, onClick: function () { return (_this.fontsize = 'big'); }, role: "button", tabindex: "0", "aria-pressed": this.fontsize === 'big' ? 'true' : 'false' }, h("span", { title: "Grande", class: "fontsize-icon-panel mdi mdi-format-font-size-increase" })))));
    };
    KupDataTable.prototype.renderDensityPanel = function (top) {
        var _this = this;
        var densityType;
        {
            this.density === 'medium'
                ? (densityType = 'Normale')
                : this.density === 'big'
                    ? (densityType = 'Ampia')
                    : this.density === 'small'
                        ? (densityType = 'Compatta')
                        : (densityType = '');
        }
        var densityTypeString = 'Densità righe: ' + densityType;
        return (h("div", { class: "density-panel" }, h("span", { title: densityTypeString, class: "panel-label" }, "Densit\u00E0 righe"), h("span", { class: "density-label", onClick: function (e) { return _this.toggleDensityVisibility(e, top); } }, densityType), h("div", { role: "button", onClick: function (e) { return _this.toggleDensityVisibility(e, top); }, tabindex: "0" }, h("svg", { version: "1.1", width: "24", height: "24", viewBox: "0 0 24 24" }, h("path", { d: "M7,10L12,15L17,10H7Z" }))), h("div", { class: {
                'density-panel-overlay': true,
                open: top
                    ? this.topDensityPanelVisible
                    : this.botDensityPanelVisible,
            } }, h("div", { class: {
                wrapper: true,
                active: this.density === 'small',
            }, onClick: function () { return (_this.density = 'small'); }, role: "button", tabindex: "0", "aria-pressed": this.density === 'small' ? 'true' : 'false' }, h("span", { title: "Compatta", class: "density-icon-panel mdi mdi-format-align-justify" })), h("div", { class: {
                wrapper: true,
                active: this.density === 'medium',
            }, onClick: function () { return (_this.density = 'medium'); }, role: "button", tabindex: "0", "aria-pressed": this.density === 'medium' ? 'true' : 'false' }, h("span", { title: "Normale", class: "density-icon-panel mdi mdi-reorder-horizontal" })), h("div", { class: {
                wrapper: true,
                active: this.density === 'big',
            }, onClick: function () { return (_this.density = 'big'); }, role: "button", tabindex: "0", "aria-pressed": this.density === 'big' ? 'true' : 'false' }, h("span", { title: "Ampia", class: "density-icon-panel mdi mdi-view-sequential" })))));
    };
    KupDataTable.prototype.handleScroll = function (event) {
        var _this = this;
        this.scrollOnHoverX = event.clientX;
        this.scrollOnHoverY = event.clientY;
        var el = event.target
            .closest('.hover-scrolling-parent')
            .querySelectorAll('.hover-scrolling-el')[0];
        var arrowContainter = el.querySelectorAll('#container-scrolling-arrow')[0];
        var trueWidth = el.clientWidth;
        arrowContainter.style.top = this.scrollOnHoverY + 'px';
        arrowContainter.style.left = this.scrollOnHoverX + 'px';
        if (trueWidth === 0) {
            trueWidth = el.offsetWidth;
        }
        if (el.scrollWidth > trueWidth + 10) {
            if (trueWidth !== 0 && this.scrollTimeout === 'off') {
                var percRight_1 = trueWidth - trueWidth * 0.1;
                var percLeft_1 = trueWidth - trueWidth * 0.9;
                var elOffset = this.scrollOnHoverX - el.offsetLeft;
                var maxScrollLeft_1 = el.scrollWidth - trueWidth;
                var leftArrow = el.querySelectorAll('#container-scrolling-arrow .left-scrolling-arrow');
                var rightArrow = el.querySelectorAll('#container-scrolling-arrow .right-scrolling-arrow');
                if (elOffset < percLeft_1) {
                    if (el.scrollLeft !== 0) {
                        for (var i = 0; i < leftArrow.length; i++) {
                            leftArrow[i].classList.add('activated');
                        }
                        this.scrollTimeout = setTimeout(function () {
                            _this.startScrollOnHover(el, leftArrow, maxScrollLeft_1, arrowContainter, percRight_1, percLeft_1, event, 'left');
                        }, 500);
                    }
                }
                else if (elOffset > percRight_1) {
                    if (el.scrollLeft !== maxScrollLeft_1) {
                        for (var i = 0; i < rightArrow.length; i++) {
                            rightArrow[i].classList.add('activated');
                        }
                        this.scrollTimeout = setTimeout(function () {
                            _this.startScrollOnHover(el, rightArrow, maxScrollLeft_1, arrowContainter, percRight_1, percLeft_1, event, 'right');
                        }, 500);
                    }
                }
            }
        }
    };
    ;
    KupDataTable.prototype.startScrollOnHover = function (el, arrow, maxScrollLeft, arrowContainter, percRight, percLeft, event, direction) {
        var _this = this;
        var elOffset = this.scrollOnHoverX - el.offsetLeft;
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
        for (var i = 0; i < arrow.length; i++) {
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
        setTimeout(function () {
            _this.startScrollOnHover(el, arrow, maxScrollLeft, arrowContainter, percRight, percLeft, event, direction);
        }, 50);
        //Doppio lancio per aumentare la velocità ad ogni giro (in cascata)
        setTimeout(function () {
            _this.startScrollOnHover(el, arrow, maxScrollLeft, arrowContainter, percRight, percLeft, event, direction);
        }, 250);
    };
    KupDataTable.prototype.killScroll = function (el) {
        this.scrollTimeout = 'off';
        clearTimeout(this.scrollTimeout);
        var leftArrow = el.querySelectorAll('#container-scrolling-arrow .left-scrolling-arrow');
        var rightArrow = el.querySelectorAll('#container-scrolling-arrow .right-scrolling-arrow');
        for (var i = 0; i < leftArrow.length; i++) {
            leftArrow[i].classList.remove('activated');
            leftArrow[i].classList.remove('animated');
        }
        for (var i = 0; i < rightArrow.length; i++) {
            rightArrow[i].classList.remove('activated');
            rightArrow[i].classList.remove('animated');
        }
    };
    ;
    KupDataTable.prototype.render = function () {
        var _this = this;
        // resetting rows
        this.renderedRows = [];
        var rows = null;
        if (this.paginatedRows.length === 0) {
            rows = (h("tr", null, h("td", { colSpan: this.calculateColspan() }, "Empty data")));
        }
        else {
            rows = [];
            this.paginatedRows
                // We must pass the previous element of the array to check if we must hide or display the value of the cell
                // When the column has specified the parameter hideValuesRepetitions
                .map(function (row, rowIndex, currentArray) { return _this.renderRow(row, 0, rowIndex > 0 ? currentArray[rowIndex - 1] : null); })
                .forEach(function (jsxRow) {
                if (Array.isArray(jsxRow)) {
                    jsxRow.forEach(function (jr) { return rows.push(jr); });
                }
                else {
                    rows.push(jsxRow);
                }
            });
        }
        // header
        // for multi selection purposes, this should be called before this.renderedRows has been evaluated
        var header = this.renderHeader();
        // footer
        var footer = this.renderFooter();
        var globalFilter = null;
        if (this.globalFilter) {
            globalFilter = (h("div", { id: "globalFilter" }, h("kup-text-input", { label: "Global filter", onKetchupTextInputUpdated: function (event) { return _this.onGlobalFilterChange(event); } })));
        }
        var paginatorTop = null;
        if (PaginatorPos.TOP === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorTop = this.renderPaginator(true);
        }
        var paginatorBottom = null;
        if (PaginatorPos.BOTTOM === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorBottom = this.renderPaginator(false);
        }
        var groupChips = null;
        if (this.isGrouping()) {
            var chips = this.groups.map(function (group) {
                var column = getColumnByName(_this.getColumns(), group.column);
                if (column) {
                    return (h("kup-chip", { closable: true, onClose: function () { return _this.removeGroup(group); } }, column.title));
                }
                else {
                    return null;
                }
            });
            groupChips = h("div", { id: "group-chips" }, chips);
        }
        var tableClass = {
            'column-separation': ShowGrid.COMPLETE === this.showGrid ||
                ShowGrid.COL === this.showGrid,
            'row-separation': ShowGrid.COMPLETE === this.showGrid ||
                ShowGrid.ROW === this.showGrid,
            'persistent-header': this.headerIsPersistent,
        };
        tableClass["density-" + this.density] = true;
        tableClass["fontsize-" + this.fontsize] = true;
        return (h("div", { id: "data-table-wrapper", class: "hover-scrolling-parent" }, h("div", { class: "above-wrapper" }, paginatorTop, globalFilter), h("div", { class: "below-wrapper hover-scrolling-el", onMouseMove: function (e) { return _this.handleScroll(e); }, onMouseLeave: function (e) { return _this.killScroll(e.target); } }, groupChips, h("table", { class: tableClass }, h("thead", { hidden: !this.showHeader, ref: function (el) { return (_this.theadRef = el); } }, h("tr", null, header)), h("tbody", null, rows), footer), h("div", { id: "container-scrolling-arrow" }, h("div", { class: "left-scrolling-arrow arrow-3" }), h("div", { class: "left-scrolling-arrow arrow-2" }), h("div", { class: "left-scrolling-arrow arrow-1" }), h("div", { class: "right-scrolling-arrow arrow-1" }), h("div", { class: "right-scrolling-arrow arrow-2" }), h("div", { class: "right-scrolling-arrow arrow-3" }))), paginatorBottom));
    };
    Object.defineProperty(KupDataTable, "watchers", {
        get: function () {
            return {
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
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupDataTable, "style", {
        get: function () { return "\@import url(https://cdn.materialdesignicons.com/4.5.95/css/materialdesignicons.min.css);:host{--dtt_background-color:var(--kup-data-table_background-color,#fff);--dtt_border-color:var(--kup-data-table_border-color,#bdbdbd);--dtt_box-shadow:var(--kup-data-table_box-shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5));--dtt_color:var(--kup-data-table_color,#1a1a1a);--dtt_drag-over--allowed:var(--kup-data-table_drag-over--allowed,rgba(78,144,143,0.24));--dtt_drag-over--forbidden:var(--kup-data-table_drag-over--forbidden,rgba(240,66,60,0.24));--dtt_filter-border-color:var(--kup-data-table_filter-border-color,#d0d0d0);--dtt_filter-background-color:var(--kup-data-table_filter-background-color,#fff);--dtt_group-background-color:var(--kup-data-table_group-background-color,#f9f9f9);--dtt_hover-color:var(--kup-data-table_hover-color,#545454);--dtt_head-background-color:var(--kup-data-table_head-background-color,#f4f4f4);--dtt_header-offset:var(--kup-data-table_header-offset,50px);--dtt_hover-background-color:var(--kup-data-table_hover-background-color,#f0f0f0);--dtt_icons-color:var(--kup-data-table_icons-color,grey);--dtt_icons-hover-color:var(--kup-data-table_icons-hover-color,#4e908f);--dtt_font-size:var(--kup-data-table_font-size,0.9375rem);--dtt_main-color:var(--kup-data-table_main-color,#6aaaa7);--dtt_main-color-lighter:var(--kup-data-table_main-color-lighter,#65acab);--dtt_main-color-darker:var(--kup-data-table_main-color-darker,#3c6f6e);--dtt_text-on-main-color:var(--kup-data-table_text-on-main-color,#fff);--dtt_negative-number-color:var(--kup-data-table_negative-number-color,#d91e18);--dtt_density-box-shadow:var(--kup-data-table_density-box-shadow,none);--dtt_density-icon-background:var(--kup-data-table_density-icon-background,transparent);--dtt_density-icon-color:var(--kup-data-table_density-icon-color,#545454);--dtt_remove-icon-color:var(--kup-data-table_remove-icon-color,#d91e18);--dtt_remove-icon-color-hover:var(--kup-data-table_remove-icon-color-hover,#e9403b);--dtt_paginator-background:var(--kup-data-table_paginator-background,transparent)}.hover-scrolling-el{overflow:auto}#data-table-wrapper{background-color:var(--dtt_background-color)}#data-table-wrapper table{color:var(--dtt_color);width:100%;min-width:intrinsic;min-width:-moz-max-content;min-width:-webkit-max-content;border-collapse:collapse;text-align:left;font-size:var(--dtt_font-size)}#data-table-wrapper table>thead,#data-table-wrapper table>thead th{background:var(--dtt_head-background-color)}#data-table-wrapper table>thead th{position:relative;padding:.5rem .3125rem;white-space:nowrap;border-bottom:2px solid var(--dtt_border-color);border-right:1px solid var(--dtt_border-color);position:-webkit-sticky;position:sticky;top:0}#data-table-wrapper table>thead th.number{text-align:right}#data-table-wrapper table>thead th kup-text-input.datatable-filter{--kup-text-input_border-color:var(--dtt_filter-border-color);--kup-text-input_background-color:var(--dtt_filter-background-color)}#data-table-wrapper table>thead th .column-sort{margin-left:.5rem;cursor:pointer}#data-table-wrapper table>thead th .column-sort .mdi{color:var(--dtt_icons-color);-webkit-transition:color .2s ease-in-out;transition:color .2s ease-in-out}#data-table-wrapper table>thead th .column-sort .mdi:hover{color:var(--dtt_icons-hover-color)}#data-table-wrapper table>thead th .column-sort .mdi-sort-ascending,#data-table-wrapper table>thead th .column-sort .mdi-sort-descending{color:var(--dtt_main-color)}#data-table-wrapper table>thead th .column-menu{background-color:var(--dtt_background-color);-webkit-box-shadow:var(--dtt_box-shadow);box-shadow:var(--dtt_box-shadow);color:var(--dtt_color);position:absolute;z-index:100;font-weight:400;min-width:200px;min-width:-moz-max-content;min-width:-webkit-max-content}#data-table-wrapper table>thead th .column-menu.closed{display:none}#data-table-wrapper table>thead th .column-menu.open{display:block;-webkit-animation:display-none-transition .5s both;-webkit-animation-timing-function:cubic-bezier(.67,-.81,.89,.71);animation:display-none-transition .5s both;animation-timing-function:cubic-bezier(.67,-.81,.89,.71)}#data-table-wrapper table>thead th .column-menu ul{list-style-type:none;margin:0;padding:0;text-align:left}#data-table-wrapper table>thead th .column-menu ul>li{padding:.8rem;-webkit-transition:color .2s ease-in-out;transition:color .2s ease-in-out;color:var(--dtt_color);-webkit-transition:color .25s,background-color .25s,opacity .25s;transition:color .25s,background-color .25s,opacity .25s}#data-table-wrapper table>thead th .column-menu ul>li:hover{cursor:pointer;color:var(--dtt_hover-color);background-color:var(--dtt_hover-background-color)}#data-table-wrapper table>thead th .column-menu ul>li .mdi{margin-right:.5rem}#data-table-wrapper table>thead[columns-dragging] [drag-over]{background-color:var(--dtt_drag-over--allowed)}#data-table-wrapper table>thead[columns-dragging] [drag-over]>*{pointer-events:none}#data-table-wrapper table>thead[columns-dragging] [drag-over][drag-starter]{background-color:var(--dtt_drag-over--forbidden)}#data-table-wrapper table>tbody{border:1px solid var(--dtt_border-color);cursor:pointer}#data-table-wrapper table>tbody>tr.selected>td,#data-table-wrapper table>tbody>tr:hover>td{color:var(--dtt_hover-color);background-color:var(--dtt_hover-background-color);-webkit-transition:background-color .25s ease-in-out;transition:background-color .25s ease-in-out}#data-table-wrapper table>tbody>tr.group{background:var(--dtt_group-background-color);font-weight:700;border-top:1px solid var(--dtt_border-color)}#data-table-wrapper table>tbody>tr.group>td{padding:1rem 0}#data-table-wrapper table>tbody>tr.group>td .group-cell-content svg{cursor:pointer;width:var(--dtt_font-size);height:var(--dtt_font-size);margin:0 .3rem;fill:var(--dtt_color)}#data-table-wrapper table>tbody>tr.group>td .group-cell-content svg.group-expander{padding:.2rem;margin-right:1rem;margin-left:.5rem}#data-table-wrapper table>tbody>tr.group>td .group-cell-content svg.group-remove{fill:var(--dtt_remove-icon-color)}#data-table-wrapper table>tbody>tr.group>td .group-cell-content svg.group-remove:hover{fill:var(--dtt_remove-icon-color-hover)}#data-table-wrapper table>tbody>tr.group>td .group-cell-content>span{display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle;outline:none}#data-table-wrapper table>tbody>tr.group>td.total{text-align:right;padding-right:1rem}#data-table-wrapper table>tbody>tr>td{padding:.5rem .3125rem}#data-table-wrapper table>tbody>tr>td kup-tooltip.datatable-tooltip{--kup-tlt_display:table-row}#data-table-wrapper table>tbody>tr>td.number{text-align:right}#data-table-wrapper table>tbody>tr>td .row-expander{margin-right:.5rem}#data-table-wrapper table>tbody>tr>td .indent{display:inline-block;height:1rem;width:2rem}#data-table-wrapper table>tbody>tr>td .options{margin-left:.5rem;color:var(--dtt_icons-color)}#data-table-wrapper table>tbody>tr>td .options:hover{color:var(--dtt_icons-hover-color);-webkit-transition:color .25s ease-out;transition:color .25s ease-out}#data-table-wrapper table>tbody>tr>td .row-action{margin-right:.2rem}#data-table-wrapper table>tbody>tr>td .cell-content.negative-number{color:var(--dtt_negative-number-color)}#data-table-wrapper table.row-separation>tbody>tr{border-bottom:1px solid var(--dtt_border-color)}#data-table-wrapper table.column-separation>tbody>tr>td{border-right:1px solid var(--dtt_border-color)}#data-table-wrapper table.persistent-header{border-top:1px solid var(--dtt_border-color);position:relative}#data-table-wrapper table.persistent-header>thead{border-color:var(--dtt_border-color);border-style:solid;border-width:0 1px 0}#data-table-wrapper table.persistent-header>thead>th{background-color:var(--dtt_head-background-color);-webkit-box-shadow:var(--dtt_box-shadow);box-shadow:var(--dtt_box-shadow);position:-webkit-sticky;position:sticky;top:var(--dtt_header-offset);will-change:transform}#data-table-wrapper table.persistent-header>thead>th.number{text-align:right}#data-table-wrapper table.persistent-header>tbody{border-top:3px solid var(--dtt_border-color)}#data-table-wrapper table>tfoot td{text-align:right;font-weight:700;padding:.5rem .3125rem}#data-table-wrapper table.noGrid,#data-table-wrapper table.noGrid td{border:none}#data-table-wrapper table.density-small tbody>tr>td{padding-top:.2rem;padding-bottom:.2rem;-webkit-transition:padding .1s;transition:padding .1s}#data-table-wrapper table.density-small tbody>tr.group>td{padding-top:.75rem;padding-bottom:.75rem;-webkit-transition:padding .1s;transition:padding .1s}#data-table-wrapper table.density-big tbody>tr>td{padding-top:1rem;padding-bottom:1rem;-webkit-transition:padding .1s;transition:padding .1s}#data-table-wrapper table.density-big tbody>tr.group>td{padding-top:1.25rem;padding-bottom:1.25rem;-webkit-transition:padding .1s;transition:padding .1s}#data-table-wrapper table.fontsize-small{font-size:calc(var(--dtt_font-size) * .75);-webkit-transition:font-size .1s;transition:font-size .1s}#data-table-wrapper table.fontsize-big{font-size:calc(var(--dtt_font-size) * 1.25);-webkit-transition:font-size .1s;transition:font-size .1s}#data-table-wrapper .paginator-wrapper{background:var(--dtt_paginator-background);display:-ms-flexbox;display:flex;-ms-flex-flow:wrap;flex-flow:wrap;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content}#globalFilter{margin-bottom:.5rem;text-align:center}#group-chips{display:-ms-flexbox;display:flex;margin-bottom:.5rem}#group-chips>.group-chip{display:-ms-flexbox;display:flex;background-color:var(--dtt_main-color);padding:.5rem;color:var(--dtt_text-on-main-color);margin-right:.5rem;cursor:pointer;-webkit-transition:opacity .2s ease-in-out;transition:opacity .2s ease-in-out}#group-chips>.group-chip:hover{opacity:.75}.paginator-tabs{width:100%}.paginator-tabs kup-paginator{display:-ms-inline-flexbox;display:inline-flex}.paginator-tabs .loadmore-button{position:relative;background:none;border:none;height:100%;cursor:pointer;outline:none;margin-left:.25rem;padding:0 .25rem;float:right}.paginator-tabs .loadmore-button .paginator-tab-text{margin-left:.25rem}.paginator-tabs .loadmore-button .paginator-tab-text,.paginator-tabs .loadmore-button:before{-webkit-transition:color .25s ease;transition:color .25s ease}.paginator-tabs .loadmore-button.activated .paginator-tab-text,.paginator-tabs .loadmore-button.activated:before,.paginator-tabs .loadmore-button:hover .paginator-tab-text,.paginator-tabs .loadmore-button:hover:before{color:var(--dtt_main-color)}.paginator-tabs .paginator-button{position:relative;background:none;border:none;height:100%;cursor:pointer;outline:none;margin-left:.25rem;padding:0 .25rem;float:right}.paginator-tabs .paginator-button .customize-panel{cursor:default;opacity:0;pointer-events:none;position:absolute;bottom:-1.25rem;left:0;padding:1rem;z-index:1000;width:200px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;background:var(--dtt_background-color);-webkit-box-shadow:var(--dtt_box-shadow);box-shadow:var(--dtt_box-shadow);-webkit-transition:opacity .25s ease;transition:opacity .25s ease;-webkit-transform:translate(-100%);transform:translate(-100%)}.paginator-tabs .paginator-button .customize-panel.visible{opacity:1;pointer-events:all}.paginator-tabs .paginator-button .customize-panel .panel-label{min-width:150px;text-align:left;text-overflow:ellipsis;max-width:150px;overflow:hidden}.paginator-tabs .paginator-button span{cursor:default}.paginator-tabs .paginator-button:before,.paginator-tabs .paginator-button span.density-label,.paginator-tabs .paginator-button span.fontsize-label{color:var(--dtt_density-icon-color);vertical-align:middle;-webkit-transition:color .25s;transition:color .25s;cursor:pointer}.paginator-tabs .paginator-button:before{font-size:120%}.paginator-tabs .paginator-button span.density-label,.paginator-tabs .paginator-button span.fontsize-label{font-size:var(--dtt_font-size)}.paginator-tabs .paginator-button.activated:before,.paginator-tabs .paginator-button.activated span.density-label,.paginator-tabs .paginator-button.activated span.fontsize-label,.paginator-tabs .paginator-button:hover:before,.paginator-tabs .paginator-button:hover span.density-label,.paginator-tabs .paginator-button:hover span.fontsize-label{color:var(--dtt_main-color)}.paginator-tabs .paginator-button .paginator-tab-text{margin-left:.25rem}.density-panel,.fontsize-panel{position:relative;margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-shadow:var(--dtt_density-box-shadow);box-shadow:var(--dtt_density-box-shadow);width:200px;width:-webkit-max-content;width:-moz-max-content;width:max-content}.density-panel .mdi:before,.density-panel:before,.fontsize-panel .mdi:before,.fontsize-panel:before{color:var(--dtt_density-icon-color);font-size:120%}.density-panel .density-label,.density-panel .fontsize-label,.fontsize-panel .density-label,.fontsize-panel .fontsize-label{padding:.5rem .5rem;cursor:pointer}.density-panel svg,.fontsize-panel svg{height:1.5rem;width:1.5rem}.density-panel [role=button],.fontsize-panel [role=button]{outline:none;cursor:pointer;display:-ms-flexbox;display:flex}.density-panel [role=button] svg,.fontsize-panel [role=button] svg{fill:#bdbdbd}.density-panel .density-panel-overlay,.density-panel .fontsize-panel-overlay,.fontsize-panel .density-panel-overlay,.fontsize-panel .fontsize-panel-overlay{background:var(--dtt_background-color);position:absolute;top:1.6rem;right:0;display:none;opacity:0;z-index:10;-webkit-box-shadow:0 0 7.5px 0 hsla(0,0%,50.2%,.5);box-shadow:0 0 7.5px 0 hsla(0,0%,50.2%,.5);width:100px;width:-webkit-max-content;width:-moz-max-content;width:max-content}.density-panel .density-panel-overlay .wrapper,.density-panel .fontsize-panel-overlay .wrapper,.fontsize-panel .density-panel-overlay .wrapper,.fontsize-panel .fontsize-panel-overlay .wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;outline:none;color:var(--dtt_color);cursor:pointer;padding:.5rem 1rem;-webkit-transition:color .25s,background-color .25s,opacity .25s;transition:color .25s,background-color .25s,opacity .25s}.density-panel .density-panel-overlay .wrapper:first-child,.density-panel .fontsize-panel-overlay .wrapper:first-child,.fontsize-panel .density-panel-overlay .wrapper:first-child,.fontsize-panel .fontsize-panel-overlay .wrapper:first-child{padding-top:.75rem}.density-panel .density-panel-overlay .wrapper:last-child,.density-panel .fontsize-panel-overlay .wrapper:last-child,.fontsize-panel .density-panel-overlay .wrapper:last-child,.fontsize-panel .fontsize-panel-overlay .wrapper:last-child{padding-bottom:.75rem}.density-panel .density-panel-overlay .wrapper svg,.density-panel .fontsize-panel-overlay .wrapper svg,.fontsize-panel .density-panel-overlay .wrapper svg,.fontsize-panel .fontsize-panel-overlay .wrapper svg{margin-right:.5rem;fill:var(--dtt_color)}.density-panel .density-panel-overlay .wrapper.active,.density-panel .density-panel-overlay .wrapper:hover,.density-panel .fontsize-panel-overlay .wrapper.active,.density-panel .fontsize-panel-overlay .wrapper:hover,.fontsize-panel .density-panel-overlay .wrapper.active,.fontsize-panel .density-panel-overlay .wrapper:hover,.fontsize-panel .fontsize-panel-overlay .wrapper.active,.fontsize-panel .fontsize-panel-overlay .wrapper:hover{color:var(--dtt_hover-color);background-color:var(--dtt_hover-background-color)}.density-panel .density-panel-overlay .wrapper.active svg,.density-panel .density-panel-overlay .wrapper:hover svg,.density-panel .fontsize-panel-overlay .wrapper.active svg,.density-panel .fontsize-panel-overlay .wrapper:hover svg,.fontsize-panel .density-panel-overlay .wrapper.active svg,.fontsize-panel .density-panel-overlay .wrapper:hover svg,.fontsize-panel .fontsize-panel-overlay .wrapper.active svg,.fontsize-panel .fontsize-panel-overlay .wrapper:hover svg{fill:var(--dtt_hover-color)}.density-panel .density-panel-overlay.open,.density-panel .fontsize-panel-overlay.open,.fontsize-panel .density-panel-overlay.open,.fontsize-panel .fontsize-panel-overlay.open{opacity:1;display:block}\@-webkit-keyframes display-none-transition{0%{opacity:0}to{opacity:1}}\@keyframes display-none-transition{0%{opacity:0}to{opacity:1}}.load-more-records{background-color:transparent;border:0 none;color:var(--dtt_icons-color);cursor:pointer;display:inline-block;font-size:calc(var(--dtt_font-size) * 1.2);height:calc(var(--dtt_font-size) * 1.2);margin:0 6px;padding:0;-webkit-transition:color .3s;transition:color .3s;width:calc(var(--dtt_font-size) * 1.2)}.load-more-records:hover{color:var(--dtt_icons-hover-color)}.load-more-records:before{height:inherit;width:inherit}#container-scrolling-arrow{position:fixed;top:50%;left:50%;pointer-events:none;z-index:9999}#container-scrolling-arrow .left-scrolling-arrow,#container-scrolling-arrow .right-scrolling-arrow{position:absolute;width:0;height:0;visibility:hidden}#container-scrolling-arrow .left-scrolling-arrow{border-top:8px solid transparent;border-bottom:8px solid transparent;border-right:8px solid var(--dtt_main-color);-webkit-transform:translate(30px,-10px);transform:translate(30px,-10px)}#container-scrolling-arrow .right-scrolling-arrow{border-top:8px solid transparent;border-bottom:8px solid transparent;border-left:8px solid var(--dtt_main-color);-webkit-transform:translate(-30px,-10px);transform:translate(-30px,-10px)}#container-scrolling-arrow .left-scrolling-arrow.activated{visibility:visible}#container-scrolling-arrow .left-scrolling-arrow.activated.animated.arrow-1{-webkit-animation:pulseleft 1.2s infinite;animation:pulseleft 1.2s infinite;-webkit-animation-delay:.4s;animation-delay:.4s}#container-scrolling-arrow .left-scrolling-arrow.activated.animated.arrow-2{-webkit-animation:pulseleft 1.2s infinite;animation:pulseleft 1.2s infinite;-webkit-animation-delay:.2s;animation-delay:.2s}#container-scrolling-arrow .left-scrolling-arrow.activated.animated.arrow-3{-webkit-animation:pulseleft 1.2s infinite;animation:pulseleft 1.2s infinite}#container-scrolling-arrow .right-scrolling-arrow.activated{visibility:visible}#container-scrolling-arrow .right-scrolling-arrow.activated.animated.arrow-1{-webkit-animation:pulseright 1.2s infinite;animation:pulseright 1.2s infinite;-webkit-animation-delay:.4s;animation-delay:.4s}#container-scrolling-arrow .right-scrolling-arrow.activated.animated.arrow-2{-webkit-animation:pulseright 1.2s infinite;animation:pulseright 1.2s infinite;-webkit-animation-delay:.2s;animation-delay:.2s}#container-scrolling-arrow .right-scrolling-arrow.activated.animated.arrow-3{-webkit-animation:pulseright 1.2s infinite;animation:pulseright 1.2s infinite}\@-moz-keyframes pulseleft{0%{opacity:.2;transform:translate(30px,-10px)}to{opacity:1;transform:translate(10px,-10px)}}\@-webkit-keyframes pulseleft{0%{opacity:.2;-webkit-transform:translate(30px,-10px);transform:translate(30px,-10px)}to{opacity:1;-webkit-transform:translate(10px,-10px);transform:translate(10px,-10px)}}\@-o-keyframes pulseleft{0%{opacity:.2;transform:translate(30px,-10px)}to{opacity:1;transform:translate(10px,-10px)}}\@keyframes pulseleft{0%{opacity:.2;-webkit-transform:translate(30px,-10px);transform:translate(30px,-10px)}to{opacity:1;-webkit-transform:translate(10px,-10px);transform:translate(10px,-10px)}}\@-moz-keyframes pulseright{0%{opacity:.2;transform:translate(-30px,-10px)}to{opacity:1;transform:translate(-10px,-10px)}}\@-webkit-keyframes pulseright{0%{opacity:.2;-webkit-transform:translate(-30px,-10px);transform:translate(-30px,-10px)}to{opacity:1;-webkit-transform:translate(-10px,-10px);transform:translate(-10px,-10px)}}\@-o-keyframes pulseright{0%{opacity:.2;transform:translate(-30px,-10px)}to{opacity:1;transform:translate(-10px,-10px)}}\@keyframes pulseright{0%{opacity:.2;-webkit-transform:translate(-30px,-10px);transform:translate(-30px,-10px)}to{opacity:1;-webkit-transform:translate(-10px,-10px);transform:translate(-10px,-10px)}}"; },
        enumerable: true,
        configurable: true
    });
    return KupDataTable;
}());
export { KupDataTable as kup_data_table };
