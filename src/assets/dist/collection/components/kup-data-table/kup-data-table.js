import { PaginatorPos, SortMode, ShowGrid, } from './kup-data-table-declarations';
import { calcTotals, filterRows, groupRows, sortRows, } from './kup-data-table-helper';
import { isIcon, isImage, isLink, isNumber, isVoCodver, isBar, } from '../../utils/object-utils';
export class KupDataTable {
    constructor() {
        this.showFilters = false;
        this.filters = {};
        this.globalFilter = false;
        this.sortEnabled = true;
        this.sort = [];
        this.rowsPerPage = 10;
        this.paginatorPos = PaginatorPos.TOP;
        this.columnsWidth = [];
        this.showHeader = true;
        this.showGrid = ShowGrid.NONE;
        this.groups = [];
        this.expandGroups = false;
        this.multiSelection = false;
        this.globalFilterValue = '';
        this.currentPage = 1;
        this.currentRowsPerPage = 10;
        this.selectedRows = [];
        this.groupState = {};
        this.openedMenu = null;
        this.density = 'medium';
        this.renderedRows = [];
    }
    rowsPerPageHandler(newValue) {
        this.currentRowsPerPage = newValue;
    }
    expandGroupsHandler() {
        this.forceGroupExpansion();
    }
    recalculateRows() {
        this.initRows();
    }
    componentWillLoad() {
        this.rowsPerPageHandler(this.rowsPerPage);
        this.initRows();
        if (this.expandGroups) {
            this.forceGroupExpansion();
        }
    }
    componentDidLoad() {
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
        if (this.isGrouping()) {
            return visibleColumns.filter((column) => {
                let group = null;
                for (let currentGroup of this.groups) {
                    if (currentGroup.column === column.name) {
                        group = currentGroup;
                        break;
                    }
                }
                if (group) {
                    return !group.hasOwnProperty('visible') || group.visible;
                }
                return true;
            });
        }
        return visibleColumns;
    }
    getColumnByName(name) {
        for (let column of this.getColumns()) {
            if (column.name === name) {
                return column;
            }
        }
        return null;
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
        const filteredRows = this.getFilteredRows();
        const sortedRows = this.sortRows(filteredRows);
        this.footer = calcTotals(sortedRows, this.totals);
        this.rows = this.groupRows(sortedRows);
        this.paginatedRows = this.paginateRows(this.rows);
    }
    getFilteredRows() {
        return filterRows(this.getRows(), this.filters, this.globalFilterValue, this.getVisibleColumns().map((c) => c.name));
    }
    isGrouping() {
        return this.groups && this.groups.length > 0;
    }
    hasRowActions() {
        return this.rowActions !== undefined;
    }
    removeGroup(group) {
        this.groupState = {};
        const index = this.groups.indexOf(group);
        if (index >= 0) {
            this.groups.splice(index, 1);
            this.groups = [...this.groups];
        }
    }
    hasTotals() {
        return this.totals && Object.keys(this.totals).length > 0;
    }
    forceGroupExpansion() {
        this.rows.forEach((row) => this.forceRowGroupExpansion(row));
        console.log(this.groupState);
    }
    forceRowGroupExpansion(row) {
        if (!row.group) {
            return;
        }
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
    onColumnSort({ ctrlKey }, columnName) {
        let i = 0;
        for (; i < this.sort.length; i++) {
            const sortObj = this.sort[i];
            if (sortObj.column === columnName) {
                break;
            }
        }
        if (i < this.sort.length) {
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
            if (ctrlKey) {
                this.sort = [...this.sort, sortObj];
            }
            else {
                this.sort = [sortObj];
            }
        }
    }
    onFilterChange({ detail }, column) {
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
        this.handleRowSelect(row, event.ctrlKey);
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
                    this.selectedRows = [...this.selectedRows, row];
                }
                else {
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
        row.group.expanded = !row.group.expanded;
        this.groupState[row.group.id].expanded = row.group.expanded;
        this.groupState = Object.assign({}, this.groupState);
    }
    onSelectAll({ target }) {
        if (target.checked) {
            this.selectedRows = this.renderedRows;
        }
        else {
            this.selectedRows = [];
        }
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
        clearTimeout(this.columnOverTimeout);
        if (this.openedMenu === column) {
            this.openedMenu = null;
        }
    }
    switchColumnGroup(group, column) {
        this.openedMenu = null;
        this.groupState = {};
        if (group !== null) {
            const index = this.groups.indexOf(group);
            this.groups.splice(index, 1);
            this.groups = [...this.groups];
        }
        else {
            this.groups = [...this.groups, { column, visible: true }];
        }
    }
    onOptionClicked(column, row) {
        this.kupOptionClicked.emit({
            column,
            row,
        });
    }
    groupRows(rows) {
        if (!this.isGrouping()) {
            return rows;
        }
        const groupedRows = groupRows(rows, this.groups, this.totals);
        this.adjustGroupState(groupedRows);
        return groupedRows;
    }
    adjustGroupState(rows) {
        if (!rows || rows.length === 0 || !rows[0].hasOwnProperty('group')) {
            return;
        }
        rows.forEach((r) => this.adjustGroupStateFromRow(r));
    }
    adjustGroupStateFromRow(row) {
        if (!row || !row.hasOwnProperty('group')) {
            return;
        }
        const group = row.group;
        let groupFromState = this.groupState[group.id];
        if (!groupFromState) {
            this.groupState[group.id] = group;
        }
        else {
            group.expanded = groupFromState.expanded;
        }
        group.children.forEach((child) => this.adjustGroupStateFromRow(child));
    }
    sortRows(rows) {
        return sortRows(rows, this.sort);
    }
    paginateRows(rows) {
        const start = this.currentPage * this.currentRowsPerPage -
            this.currentRowsPerPage;
        return rows.slice(start, start + this.currentRowsPerPage);
    }
    getSortIcon(columnName) {
        for (let sortObj of this.sort) {
            if (sortObj.column === columnName) {
                return 'A' === sortObj.sortMode
                    ? 'mdi-sort-ascending'
                    : 'mdi-sort-descending';
            }
        }
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
    renderHeader() {
        const hasCustomColumnsWidth = this.columnsWidth.length > 0;
        const dataColumns = this.getVisibleColumns().map((column) => {
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
            let sort = null;
            if (this.sortEnabled) {
                sort = (h("span", { class: "column-sort", onMouseEnter: () => this.onColumnMouseLeave(column.name), onMouseLeave: () => this.onColumnMouseEnter(column.name) },
                    h("span", { role: "button", "aria-label": "Sort column", class: 'mdi ' + this.getSortIcon(column.name), onClick: (e) => this.onColumnSort(e, column.name) })));
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
            return (h("th", { style: thStyle, onMouseEnter: () => this.onColumnMouseEnter(column.name), onMouseLeave: () => this.onColumnMouseLeave(column.name) },
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
    renderRow(row, level = 0) {
        const visibleColumns = this.getVisibleColumns();
        if (row.group) {
            if (row.group.children.length === 0) {
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
                const colSpan = this.multiSelection ? 2 : 1;
                cells.push(h("td", { colSpan: colSpan },
                    indent,
                    h("span", { role: "button", "aria-label": "Row expander", class: icon, onClick: (e) => {
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
                        h("span", { role: "button", "aria-label": "Row expander", class: `row-expander ${icon}`, onClick: (e) => {
                                e.stopPropagation();
                                this.onRowExpand(row);
                            } }),
                        row.group.label)));
            }
            if (row.group.expanded) {
                row.group.children
                    .map((r) => {
                    return this.renderRow(r, level + 1);
                })
                    .forEach((jsxRow) => {
                    if (Array.isArray(jsxRow)) {
                        jsxRow.forEach((jr) => jsxRows.push(jr));
                    }
                    else {
                        jsxRows.push(jsxRow);
                    }
                });
            }
            return jsxRows;
        }
        else {
            const cells = visibleColumns.map(({ name }, index) => {
                let indend = [];
                if (index === 0 && !(this.isGrouping() && this.hasTotals())) {
                    for (let i = 0; i < level; i++) {
                        indend.push(h("span", { class: "indent" }));
                    }
                }
                const cell = row.cells[name];
                let options = null;
                if (cell.options) {
                    options = (h("span", { class: "options", role: "button", "aria-label": "Opzioni oggetto", title: "Opzioni oggetto", onClick: () => this.onOptionClicked(name, row) },
                        h("i", { class: "mdi mdi-settings" })));
                }
                const jsxCell = this.renderCell(cell, name);
                const cellClass = {
                    number: isNumber(cell.obj),
                };
                return (h("td", { "data-column": name, style: cell.style, class: cellClass },
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
            this.renderedRows.push(row);
            let rowActionsCell = null;
            if (this.hasRowActions()) {
                const defaultRowActions = this.renderActions(this.rowActions, row, 'default');
                let rowActionExpander = null;
                let variableActions = null;
                if (row.actions) {
                    variableActions = this.renderActions(row.actions, row, 'variable');
                }
                else {
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
    renderCell(cell, column) {
        let content = cell.value;
        if (isIcon(cell.obj) || isVoCodver(cell.obj)) {
            content = h("span", { class: cell.value });
        }
        else if (isImage(cell.obj)) {
            content = h("img", { src: cell.value, alt: "", width: "64", height: "64" });
        }
        else if (isLink(cell.obj)) {
            content = (h("a", { href: cell.value, target: "_blank" }, cell.value));
        }
        else if (isBar(cell.obj)) {
            const props = {
                value: cell.value,
            };
            if (this.columnsWidth && this.columnsWidth[column]) {
                props.width = this.columnsWidth[column];
            }
            content = h("kup-graphic-cell", Object.assign({}, props));
        }
        return h("span", { class: "cell-content" }, content);
    }
    render() {
        this.renderedRows = [];
        let rows = null;
        if (this.paginatedRows.length === 0) {
            rows = (h("tr", null,
                h("td", { colSpan: this.calculateColspan() }, "Empty data")));
        }
        else {
            rows = [];
            this.paginatedRows
                .map((row) => this.renderRow(row))
                .forEach((jsxRow) => {
                if (Array.isArray(jsxRow)) {
                    jsxRow.forEach((jr) => rows.push(jr));
                }
                else {
                    rows.push(jsxRow);
                }
            });
        }
        const header = this.renderHeader();
        const footer = this.renderFooter();
        let globalFilter = null;
        if (this.globalFilter) {
            globalFilter = (h("div", { id: "globalFilter" },
                h("kup-text-input", { label: "Global filter", onKetchupTextInputUpdated: (event) => this.onGlobalFilterChange(event) })));
        }
        let paginatorTop = null;
        if (PaginatorPos.TOP === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorTop = (h("kup-paginator", { id: "top-paginator", max: this.rows.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: (e) => this.handlePageChanged(e), onKupRowsPerPageChanged: (e) => this.handleRowsPerPageChanged(e) }));
        }
        let paginatorBottom = null;
        if (PaginatorPos.BOTTOM === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorBottom = (h("kup-paginator", { id: "bottom-paginator", max: this.rows.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: (e) => this.handlePageChanged(e), onKupRowsPerPageChanged: (e) => this.handleRowsPerPageChanged(e) }));
        }
        let groupChips = null;
        if (this.isGrouping()) {
            const chips = this.groups.map((group) => {
                const column = this.getColumnByName(group.column);
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
                    h("thead", { hidden: !this.showHeader },
                        h("tr", null, header)),
                    h("tbody", null, rows),
                    footer)),
            paginatorBottom));
    }
    static get is() { return "kup-data-table"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "columnsWidth": {
            "type": "Any",
            "attr": "columns-width"
        },
        "currentPage": {
            "state": true,
            "watchCallbacks": ["recalculateRows"]
        },
        "currentRowsPerPage": {
            "state": true,
            "watchCallbacks": ["recalculateRows"]
        },
        "data": {
            "type": "Any",
            "attr": "data",
            "watchCallbacks": ["recalculateRows"]
        },
        "density": {
            "state": true
        },
        "expandGroups": {
            "type": Boolean,
            "attr": "expand-groups",
            "watchCallbacks": ["expandGroupsHandler"]
        },
        "filters": {
            "type": "Any",
            "attr": "filters",
            "mutable": true,
            "watchCallbacks": ["recalculateRows"]
        },
        "globalFilter": {
            "type": Boolean,
            "attr": "global-filter"
        },
        "globalFilterValue": {
            "state": true,
            "watchCallbacks": ["recalculateRows"]
        },
        "groups": {
            "type": "Any",
            "attr": "groups",
            "mutable": true,
            "watchCallbacks": ["recalculateRows"]
        },
        "groupState": {
            "state": true
        },
        "multiSelection": {
            "type": Boolean,
            "attr": "multi-selection"
        },
        "openedMenu": {
            "state": true
        },
        "paginatorPos": {
            "type": String,
            "attr": "paginator-pos"
        },
        "rowActions": {
            "type": "Any",
            "attr": "row-actions"
        },
        "rowsPerPage": {
            "type": Number,
            "attr": "rows-per-page",
            "watchCallbacks": ["rowsPerPageHandler", "recalculateRows"]
        },
        "selectedRows": {
            "state": true
        },
        "selectRow": {
            "type": Number,
            "attr": "select-row"
        },
        "showFilters": {
            "type": Boolean,
            "attr": "show-filters"
        },
        "showGrid": {
            "type": String,
            "attr": "show-grid"
        },
        "showHeader": {
            "type": Boolean,
            "attr": "show-header"
        },
        "sort": {
            "type": "Any",
            "attr": "sort",
            "mutable": true,
            "watchCallbacks": ["recalculateRows"]
        },
        "sortEnabled": {
            "type": Boolean,
            "attr": "sort-enabled"
        },
        "totals": {
            "type": "Any",
            "attr": "totals",
            "watchCallbacks": ["recalculateRows"]
        }
    }; }
    static get events() { return [{
            "name": "kupAutoRowSelect",
            "method": "kupAutoRowSelect",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "kupRowSelected",
            "method": "kupRowSelected",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "kupOptionClicked",
            "method": "kupOptionClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "kupAddColumn",
            "method": "kupAddColumn",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "kupRowActionClicked",
            "method": "kupRowActionClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:kup-data-table:**/"; }
}
