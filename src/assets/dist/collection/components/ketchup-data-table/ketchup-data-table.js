import { PaginatorPos, SortMode, } from './ketchup-data-table-declarations';
import { calcTotals, filterRows, groupRows, sortRows, } from './ketchup-data-table-helper';
export class KetchupDataTable {
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
        this.showGrid = true;
        this.groups = [];
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
    componentWillLoad() {
        this.rowsPerPageHandler(this.rowsPerPage);
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
    getFilteredRows() {
        return filterRows(this.getRows(), this.filters, this.globalFilterValue, this.getVisibleColumns().map((c) => c.name));
    }
    isGrouping() {
        return this.groups && this.groups.length > 0;
    }
    removeGroup(group) {
        const index = this.groups.indexOf(group);
        if (index >= 0) {
            this.groups.splice(index, 1);
            this.groups = [...this.groups];
            this.groupState = {};
        }
    }
    hasTotals() {
        return this.totals && Object.keys(this.totals).length > 0;
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
            if (target.tagName === 'TD') {
                clickedColumn = target.dataset.column;
            }
        }
        this.kupRowSelected.emit({
            selectedRows: this.selectedRows,
            clickedColumn,
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
            this.kupRowSelected.emit({
                selectedRows: this.selectedRows,
                clickedColumn: null,
            });
        }
        else {
            const index = this.selectedRows.indexOf(row);
            if (index >= 0) {
                this.selectedRows.splice(index, 1);
                this.selectedRows = [...this.selectedRows];
            }
        }
    }
    onRowExpand(row) {
        row.group.expanded = !row.group.expanded;
        this.groupState[row.group.label].expanded = row.group.expanded;
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
    onColumnMouseOver(column) {
        this.openedMenu = column;
    }
    onColumnMouseLeave(column) {
        if (this.openedMenu === column) {
            this.openedMenu = null;
        }
    }
    switchColumnGroup(group, column) {
        this.openedMenu = null;
        if (group !== null) {
            const index = this.groups.indexOf(group);
            this.groups.splice(index, 1);
            this.groups = [...this.groups];
            this.groupState = {};
        }
        else {
            this.groups = [...this.groups, { column, visible: true }];
            this.groupState = {};
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
        let groupFromState = this.groupState[group.label];
        if (!groupFromState) {
            this.groupState[group.label] = group;
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
                filter = (h("div", null,
                    h("kup-text-input", { class: "datatable-filter", initialValue: filterValue, "data-col": column.name, onKetchupTextInputUpdated: (e) => {
                            this.onFilterChange(e, column.name);
                        } })));
            }
            let sort = null;
            if (this.sortEnabled) {
                sort = (h("span", { class: "column-sort" },
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
                " ",
                groupLabel));
            columnMenuItems.push(h("li", { role: "menuitem", onClick: () => this.kupAddColumn.emit({ column: column.name }) },
                h("span", { class: "mdi mdi-table-column-plus-after" }),
                "Aggiungi colonna"));
            let columnMenu = null;
            if (columnMenuItems.length !== 0) {
                const style = {
                    display: this.openedMenu === column.name ? 'block' : 'none',
                };
                columnMenu = (h("div", { style: style, class: "column-menu" },
                    h("ul", { role: "menubar" }, columnMenuItems)));
            }
            return (h("th", { style: thStyle, onMouseOver: () => this.onColumnMouseOver(column.name), onMouseLeave: () => this.onColumnMouseLeave(column.name) },
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
        return [multiSelectColumn, groupColumn, ...dataColumns];
    }
    renderFooter(rows) {
        if (!this.hasTotals()) {
            return null;
        }
        const footerRow = calcTotals(rows, this.totals);
        const footerCells = this.getVisibleColumns().map(({ name }) => (h("td", null, footerRow[name])));
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
                    h("span", { role: "button", "aria-label": "Row expander", class: icon, onClick: () => this.onRowExpand(row) }),
                    row.group.label));
                for (let column of visibleColumns) {
                    cells.push(h("td", null, row.group.totals[column.name]));
                }
                jsxRows.push(h("tr", null, cells));
            }
            else {
                jsxRows.push(h("tr", { class: "group" },
                    h("td", { colSpan: this.calculateColspan() },
                        indent,
                        h("span", { role: "button", "aria-label": "Row expander", class: `row-expander ${icon}`, onClick: () => this.onRowExpand(row) }),
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
                return (h("td", { "data-column": name, style: cell.style },
                    indend,
                    cell.value,
                    options));
            });
            let rowClass = null;
            if (this.selectedRows.includes(row)) {
                rowClass = 'selected';
            }
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
            return (h("tr", { class: rowClass, onClick: (e) => this.onRowClick(e, row) },
                selectRowCell,
                groupingCell,
                cells));
        }
    }
    render() {
        this.renderedRows = [];
        const filteredRows = this.getFilteredRows();
        const sortedRows = this.sortRows(filteredRows);
        const footer = this.renderFooter(sortedRows);
        const grouped = this.groupRows(sortedRows);
        const paginatedRows = this.paginateRows(grouped);
        let rows = null;
        if (paginatedRows.length === 0) {
            rows = (h("tr", null,
                h("td", { colSpan: this.calculateColspan() }, "Empty data")));
        }
        else {
            rows = [];
            paginatedRows
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
        let globalFilter = null;
        if (this.globalFilter) {
            globalFilter = (h("div", { id: "globalFilter" },
                h("kup-text-input", { label: "Global filter", onKetchupTextInputUpdated: (event) => this.onGlobalFilterChange(event) })));
        }
        let paginatorTop = null;
        if (PaginatorPos.TOP === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorTop = (h("kup-paginator", { id: "top-paginator", max: filteredRows.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: (e) => this.handlePageChanged(e), onKupRowsPerPageChanged: (e) => this.handleRowsPerPageChanged(e) }));
        }
        let paginatorBottom = null;
        if (PaginatorPos.BOTTOM === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorBottom = (h("kup-paginator", { id: "bottom-paginator", max: filteredRows.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: (e) => this.handlePageChanged(e), onKupRowsPerPageChanged: (e) => this.handleRowsPerPageChanged(e) }));
        }
        let tableClass = `density-${this.density}`;
        if (!this.showGrid) {
            tableClass += ' noGrid';
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
            h("kup-button", { flat: true, iconClass: "mdi mdi-format-align-justify", onClick: () => (this.density = 'small') }),
            h("kup-button", { flat: true, iconClass: "mdi mdi-menu", onClick: () => (this.density = 'medium') }),
            h("kup-button", { flat: true, iconClass: "mdi mdi-view-sequential", onClick: () => (this.density = 'big') })));
        return (h("div", null,
            groupChips,
            paginatorTop,
            globalFilter,
            densityPanel,
            h("div", { id: "data-table-wrapper" },
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
            "state": true
        },
        "currentRowsPerPage": {
            "state": true
        },
        "data": {
            "type": "Any",
            "attr": "data"
        },
        "density": {
            "state": true
        },
        "filters": {
            "type": "Any",
            "attr": "filters",
            "mutable": true
        },
        "globalFilter": {
            "type": Boolean,
            "attr": "global-filter"
        },
        "globalFilterValue": {
            "state": true
        },
        "groups": {
            "type": "Any",
            "attr": "groups",
            "mutable": true
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
        "rowsPerPage": {
            "type": Number,
            "attr": "rows-per-page",
            "watchCallbacks": ["rowsPerPageHandler"]
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
            "type": Boolean,
            "attr": "show-grid"
        },
        "showHeader": {
            "type": Boolean,
            "attr": "show-header"
        },
        "sort": {
            "type": "Any",
            "attr": "sort",
            "mutable": true
        },
        "sortEnabled": {
            "type": Boolean,
            "attr": "sort-enabled"
        },
        "totals": {
            "type": "Any",
            "attr": "totals"
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
        }]; }
    static get style() { return "/**style-placeholder:kup-data-table:**/"; }
}
