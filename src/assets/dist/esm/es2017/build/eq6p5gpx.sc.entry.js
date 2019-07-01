import { h } from '../mycomponent.core.js';

import { f as PaginatorPos, g as ShowGrid, h as calcTotals, a as filterRows, b as SortMode, i as groupRows, c as sortRows, j as isNumber, k as isIcon, l as isVoCodver, d as isImage, m as isLink, n as isBar } from './chunk-30ec9921.js';
import './chunk-77ecfe7f.js';

class KupDataTable {
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
        this.groupState = {};
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
    }
    forceRowGroupExpansion(row) {
        if (!row.group) {
            return;
        }
        row.group.expanded = true;
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
    isGroupExpanded({ group }) {
        if (!group) {
            return false;
        }
        if (this.groupState[group.id]) {
            return this.groupState[group.id].expanded;
        }
        else {
            return false;
        }
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
            if (this.isGroupExpanded(row)) {
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
    static get style() { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);.sc-kup-data-table-h{--int_background-color:var(--kup-data-table_background-color,#fff);--int_main-color:var(--kup-data-table_main-color,#6aaaa7);--int_text-on-main-color:var(--kup-data-table_text-on-main-color,#fff);--int_color:var(--kup-data-table_color,#545454);--int_stronger-color:var(--kup-data-table_stronger-color,#111);--int_hover-color:var(--kup-data-table_hover-color,#545454);--int_hover-background-color:var(--kup-data-table_hover-background-color,#e0e0e0);--int_border-color:var(--kup-data-table_border-color,#000);--int_head-background-color:var(--kup-data-table_head-background-color,#f5f5f5);--int_group-background-color:var(--kup-data-table_group-background-color,#f5f5f5);--int_group-border-color:var(--kup-data-table_group-border-color,#6aaaa7);--int_filter-border-color:var(--kup-data-table_filter-border-color,#dadada);--int_icons-color:var(--kup-data-table_icons-color,grey);--int_icons-hover-color:var(--kup-data-table_icons-hover-color,#a0a0a0);--int_box-shadow:var(--kup-data-table_box-shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5));--int_font-size:var(--kup-data-table_font-size,1rem)}#data-table-wrapper.sc-kup-data-table{background-color:var(--int_background-color)}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table{color:var(--int_stronger-color);width:100%;min-width:intrinsic;min-width:-moz-max-content;min-width:-webkit-max-content;border-collapse:collapse;text-align:left;font-size:var(--int_font-size)}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   td.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   th.sc-kup-data-table{padding:.5rem 1rem}#data-table-wrapper.sc-kup-data-table   table.row-separation.sc-kup-data-table   tr.sc-kup-data-table{border-bottom:1px solid var(--int_border-color)}#data-table-wrapper.sc-kup-data-table   table.column-separation.sc-kup-data-table   td.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table   table.column-separation.sc-kup-data-table   th.sc-kup-data-table{border-right:1px solid var(--int_border-color)}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   .column-sort.sc-kup-data-table{margin-left:.5rem;cursor:pointer}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   .column-sort.sc-kup-data-table   .mdi.sc-kup-data-table{-webkit-transition:color .2s ease-in-out;transition:color .2s ease-in-out}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   .column-sort.sc-kup-data-table   .mdi-sort-ascending.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   .column-sort.sc-kup-data-table   .mdi-sort-descending.sc-kup-data-table{color:var(--int_main-color)}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   th.sc-kup-data-table   kup-text-input.datatable-filter.sc-kup-data-table{--int_border-color:var(--int_filter-border-color)}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   th.sc-kup-data-table   input.sc-kup-data-table{display:block}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   thead.sc-kup-data-table{background:var(--int_head-background-color);border:1px solid var(--int_border-color);border-bottom:3px solid var(--int_border-color);font-size:115%}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   thead.sc-kup-data-table   th.sc-kup-data-table{position:relative}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table{border:1px solid var(--int_border-color);cursor:pointer;font-size:100%}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.selected.sc-kup-data-table > td.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table:hover > td.sc-kup-data-table{color:var(--int_hover-color);background-color:var(--int_hover-background-color)}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table{background:var(--int_group-background-color);font-weight:700;border-top:1px solid var(--int_border-color)}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table   td.sc-kup-data-table{padding:1rem 0}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table   td.total.sc-kup-data-table{text-align:right;padding-right:1rem}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table   icon.sc-kup-data-table{margin-right:.5rem}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.number.sc-kup-data-table{text-align:right}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table   .row-expander.sc-kup-data-table{margin-right:.5rem}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table   .indent.sc-kup-data-table{display:inline-block;height:1rem;width:2rem}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table   .options.sc-kup-data-table{font-size:100%;margin-left:.5rem;color:var(--int_icons-color)}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table   .options.sc-kup-data-table:hover{color:var(--int_icons-hover-color)}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table   .row-action.sc-kup-data-table{margin-right:.2rem}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tfoot.sc-kup-data-table{font-size:110%}#data-table-wrapper.sc-kup-data-table   table.sc-kup-data-table   tfoot.sc-kup-data-table   td.sc-kup-data-table{text-align:right}#data-table-wrapper.sc-kup-data-table   table.noGrid.sc-kup-data-table, #data-table-wrapper.sc-kup-data-table   table.noGrid.sc-kup-data-table   td.sc-kup-data-table{border:none}#data-table-wrapper.sc-kup-data-table   table.density-small.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table{padding-top:.2rem;padding-bottom:.2rem}#data-table-wrapper.sc-kup-data-table   table.density-small.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table > td.sc-kup-data-table{padding-top:.75rem;padding-bottom:.75rem}#data-table-wrapper.sc-kup-data-table   table.density-big.sc-kup-data-table   tbody.sc-kup-data-table > tr.sc-kup-data-table > td.sc-kup-data-table{padding-top:1rem;padding-bottom:1rem}#data-table-wrapper.sc-kup-data-table   table.density-big.sc-kup-data-table   tbody.sc-kup-data-table > tr.group.sc-kup-data-table > td.sc-kup-data-table{padding-top:1.25rem;padding-bottom:1.25rem}#globalFilter.sc-kup-data-table{margin-bottom:.5rem;text-align:center}#group-chips.sc-kup-data-table{display:-ms-flexbox;display:flex;margin-bottom:.5rem}#group-chips.sc-kup-data-table > .group-chip.sc-kup-data-table{display:-ms-flexbox;display:flex;background-color:var(--int_main-color);padding:.5rem;color:var(--int_text-on-main-color);margin-right:.5rem;cursor:pointer;-webkit-transition:opacity .2s ease-in-out;transition:opacity .2s ease-in-out}#group-chips.sc-kup-data-table > .group-chip.sc-kup-data-table   icon.sc-kup-data-table{margin-right:.5rem}#group-chips.sc-kup-data-table > .group-chip.sc-kup-data-table:hover{opacity:.75}.column-menu.sc-kup-data-table{background-color:var(--int_background-color);-webkit-box-shadow:var(--int_box-shadow);box-shadow:var(--int_box-shadow);color:var(--int_color);position:absolute;z-index:100;font-weight:400;-webkit-transition:opacity .2s ease-in-out;transition:opacity .2s ease-in-out;min-width:200px;min-width:-moz-max-content;min-width:-webkit-max-content}.column-menu.closed.sc-kup-data-table{display:none;opacity:0}.column-menu.open.sc-kup-data-table{display:block;opacity:1;-webkit-animation:display-none-transition .5s both;-webkit-animation-timing-function:cubic-bezier(.67,-.81,.89,.71);animation:display-none-transition .5s both;animation-timing-function:cubic-bezier(.67,-.81,.89,.71)}.column-menu.sc-kup-data-table   ul.sc-kup-data-table{list-style-type:none;margin:0;padding:0}.column-menu.sc-kup-data-table   ul.sc-kup-data-table > li.sc-kup-data-table{padding:.8rem;font-size:1rem;-webkit-transition:color .2s ease-in-out;transition:color .2s ease-in-out}.column-menu.sc-kup-data-table   ul.sc-kup-data-table > li.sc-kup-data-table:hover{cursor:pointer;color:var(--int_main-color)}.column-menu.sc-kup-data-table   ul.sc-kup-data-table > li.sc-kup-data-table   .mdi.sc-kup-data-table{margin-right:.5rem}#density-panel.sc-kup-data-table{text-align:center}#density-panel.sc-kup-data-table   kup-button.sc-kup-data-table{--kup-button_main-color:transparent;--kup-button_opacity:0.25;--kup-button_icon-color:var(--int_main-color);--kup-button_box-shadow:none}#density-panel.sc-kup-data-table   kup-button.sc-kup-data-table:hover{--kup-button_opacity:0.75}#density-panel.sc-kup-data-table   kup-button.active.sc-kup-data-table{--kup-button_opacity:1}\@-webkit-keyframes display-none-transition{0%{opacity:0}}\@keyframes display-none-transition{0%{opacity:0}}"; }
}

function getColorFromString(rgb) {
    const rIndex = rgb.indexOf('R');
    const gIndex = rgb.indexOf('G');
    const bIndex = rgb.indexOf('B');
    if (rIndex < 0 || gIndex < 0 || bIndex < 0) {
        return;
    }
    const r = rgb.substring(rIndex + 1, rIndex + 4);
    const g = rgb.substring(gIndex + 1, gIndex + 4);
    const b = rgb.substring(bIndex + 1, bIndex + 4);
    try {
        return new Color(parseInt(r), parseInt(g), parseInt(b));
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

class GraphicElement {
    constructor() {
        this.width = 100.0;
        this.height = 100.0;
        this.color = null;
        this.shape = 'bar';
    }
    init(markers) {
        markers.forEach((marker) => {
            if (marker.toUpperCase().startsWith('HEIGHT;')) {
                this.initHeight(marker);
            }
            else if (marker.toUpperCase().startsWith('SHAPE;')) {
                this.initShape(marker);
            }
            else if (marker.toUpperCase().startsWith('BCOLOR;')) ;
            else {
                this.initColor(marker);
            }
        });
    }
    initColor(rgb) {
        if (rgb.length > 11 && this.isValidColor(rgb)) {
            this.color = getColorFromString(rgb.substring(0, 12));
            try {
                this.width = parseFloat(rgb.substring(13).replace(',', '.'));
            }
            catch (e) {
                console.error(e);
            }
        }
        else if (rgb.startsWith('*NONE')) {
            try {
                this.width = parseFloat(rgb.substring(6).replace(',', '.'));
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    isTrasparent() {
        return this.color === null;
    }
    initHeight(height) {
        if (height) {
            const toBeParsed = height
                .substring('HEIGHT;'.length)
                .replace(',', '.');
            try {
                this.height = parseFloat(toBeParsed);
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    initShape(shape) {
        shape = shape.substring('SHAPE;'.length);
        const vLastSemicolonIndex = shape.indexOf(';');
        let vShapeTypeString = shape;
        if (vLastSemicolonIndex > -1) {
            vShapeTypeString = shape.substring(0, vLastSemicolonIndex);
            try {
                this.width = parseFloat(shape.substring(vLastSemicolonIndex + 1).replace(',', '.'));
            }
            catch (err) {
                console.error(err);
            }
        }
        switch (vShapeTypeString.toLocaleLowerCase()) {
            case 'circle':
                this.shape = 'circle';
                break;
            case 'tril':
                this.shape = 'tril';
                break;
            case 'trir':
                this.shape = 'trir';
                break;
        }
    }
    isValidColor(color) {
        if (!color) {
            return false;
        }
        color = color.trim();
        const vRgb = [];
        let vError = false;
        let vColorKey = null;
        let vIndex = color.indexOf('R');
        if (vIndex > -1) {
            vColorKey = color.substring(vIndex + 1, vIndex + 4);
            vRgb[0] = parseInt(vColorKey);
            if (isNaN(vRgb[0])) {
                vError = true;
            }
        }
        vIndex = color.indexOf('G');
        if (vIndex > -1) {
            vColorKey = color.substring(vIndex + 1, vIndex + 4);
            vRgb[1] = parseInt(vColorKey);
            if (isNaN(vRgb[1])) {
                vError = true;
            }
        }
        vIndex = color.indexOf('B');
        if (vIndex > -1) {
            vColorKey = color.substring(vIndex + 1, vIndex + 4);
            vRgb[2] = parseInt(vColorKey);
            if (isNaN(vRgb[2])) {
                vError = true;
            }
        }
        if (vError) {
            const vIndexR = color.indexOf('R');
            const vIndexG = color.indexOf('G');
            const vIndexB = color.indexOf('B');
            vColorKey = color.substring(vIndexR + 1, vIndexG);
            vRgb[0] = parseInt(vColorKey);
            if (isNaN(vRgb[0])) {
                vError = true;
            }
            vColorKey = color.substring(vIndexG + 1, vIndexB);
            vRgb[1] = parseInt(vColorKey);
            if (isNaN(vRgb[1])) {
                vError = true;
            }
            vColorKey = color.substring(vIndexB + 1);
            vRgb[2] = parseInt(vColorKey);
            if (isNaN(vRgb[2])) {
                vError = true;
            }
            if (vError) {
                return false;
            }
        }
        if (vRgb[0] < 0 ||
            vRgb[0] > 255 ||
            vRgb[1] < 0 ||
            vRgb[1] > 255 ||
            vRgb[2] < 0 ||
            vRgb[2] > 255) {
            return false;
        }
        return true;
    }
    getHeight() {
        return this.height;
    }
    getWidth() {
        return this.width;
    }
    getShape() {
        return this.shape;
    }
    getColor() {
        return this.color;
    }
}
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    toString() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }
}

class KupGraphicCell {
    constructor() {
        this.height = 30;
        this.width = 300;
        this.graphic_element_marker_splitter = '\\\\';
        this.graphic_element_splitter = '\\\\AND\\\\';
        this.background_color = 'BCOLOR;R255G000B000';
        this.default_color = new Color(0, 0, 0);
    }
    onValueChange() {
        this.draw();
    }
    componentDidLoad() {
        this.draw();
    }
    draw() {
        if (!this.value) {
            return;
        }
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.drawGraphicCell();
        }
    }
    drawGraphicCell() {
        const vGraphicElementDefinitionArr = this.value.split(this.graphic_element_splitter);
        vGraphicElementDefinitionArr.forEach((graphicElem, index) => {
            let vShapeMarker = 'SHAPE;BAR';
            let vBGColorMarker = this.background_color;
            let vHeightPctMarker = 'HEIGHT;100';
            const vMarkersArray = graphicElem.split(this.graphic_element_marker_splitter);
            const shapesArray = [];
            const vSeparatorsList = [];
            vMarkersArray.forEach((vString) => {
                if (this.isShapeMarker(vString)) {
                    vShapeMarker = vString;
                }
                else if (this.isBgColorMarker(vString)) {
                    vBGColorMarker = vString;
                }
                else if (this.isHeightMarker(vString)) {
                    vHeightPctMarker = vString;
                }
                else if (this.isDecoratorMarker(vString)) {
                    vSeparatorsList.push(vString);
                }
                else {
                    shapesArray.push(vString);
                }
            });
            const vGraphicElementArray = shapesArray.map((shape) => {
                const elem = new GraphicElement();
                elem.init([
                    vShapeMarker,
                    vBGColorMarker,
                    vHeightPctMarker,
                    shape,
                ]);
                return elem;
            });
            if (index === 0 && vBGColorMarker !== this.background_color) {
                const bgColor = getColorFromString(vBGColorMarker.substring('BCOLOR;'.length));
                this.drawRect(0, 0, this.canvas.width, this.canvas.height, bgColor);
            }
            let startX = 0;
            vGraphicElementArray.forEach((elem) => {
                switch (elem.getShape()) {
                    case 'circle':
                        startX = this.getNewStarXFromCircle(startX, elem);
                        break;
                    case 'tril':
                        startX = this.getNewStarXFromTril(startX, elem);
                        break;
                    case 'trir':
                        startX = this.getNewStarXFromTrir(startX, elem);
                        break;
                    default:
                        startX = this.getNewStarXFromBar(startX, elem);
                        break;
                }
            });
            vSeparatorsList.forEach((sep) => {
                if (sep.startsWith('SEP') || sep.startsWith('DIV')) {
                    this.drawSeparator(sep);
                }
                else if (sep.startsWith('ARW')) {
                    this.drawArrow(sep);
                }
                else if (sep.startsWith('GRID')) {
                    this.drawGrid(sep);
                }
            });
        });
    }
    isShapeMarker(value) {
        return value && value.toUpperCase().startsWith('SHAPE;');
    }
    isBgColorMarker(value) {
        return value && value.toUpperCase().startsWith('BCOLOR;');
    }
    isHeightMarker(value) {
        return value && value.toUpperCase().startsWith('HEIGHT;');
    }
    isDecoratorMarker(value) {
        return (value &&
            (value.toUpperCase().startsWith('SEP;') ||
                value.toUpperCase().startsWith('DIV;') ||
                value.toUpperCase().startsWith('ARW;') ||
                value.toUpperCase().startsWith('GRID;')));
    }
    getDim(dimPixel, dimPerc) {
        return Math.floor((dimPixel / 100) * dimPerc);
    }
    getNewStarXFromBar(startX, elem) {
        const elemWidth = this.getDim(this.canvas.width, elem.getWidth());
        const elemHeight = this.getDim(this.canvas.height, elem.getHeight());
        const y = this.canvas.height - elemHeight;
        if (!elem.isTrasparent()) {
            this.drawRect(startX, y, elemWidth, elemHeight, elem.getColor());
        }
        return elemWidth;
    }
    getNewStarXFromCircle(startX, circle) {
        const newStartX = this.getDim(this.canvas.width, circle.getWidth());
        const x = (startX + newStartX) / 2;
        if (!circle.isTrasparent()) {
            this.drawArc(x, this.canvas.height / 2, circle.getColor());
        }
        return newStartX;
    }
    getNewStarXFromTril(startX, triLeft) {
        const newStartX = this.getDim(this.canvas.width, triLeft.getWidth());
        if (!triLeft.isTrasparent()) {
            this.drawTri(newStartX, 0, startX, this.canvas.height / 2, triLeft.getColor());
        }
        return newStartX;
    }
    getNewStarXFromTrir(startX, triRight) {
        const newStartX = this.getDim(this.canvas.width, triRight.getWidth());
        if (!triRight.isTrasparent()) {
            this.drawTri(startX, 0, newStartX, this.canvas.height / 2, triRight.getColor());
        }
        return newStartX;
    }
    drawArc(x, radius, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.beginPath();
        this.ctx.arc(x, radius, radius, 0, 2 * Math.PI, true);
        this.ctx.fill();
    }
    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.fillRect(x, y, width, height);
    }
    drawTri(x1, y1, x2, y2, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x1, this.canvas.height);
        this.ctx.fill();
    }
    drawArrow(sep) {
        let vPart = sep.substring('ARW;'.length);
        if (vPart.indexOf(',') > -1) {
            vPart = vPart.replace(',', '.');
        }
        this.ctx.fillStyle = this.default_color.toString();
        const startX = this.getDim(this.canvas.width, parseFloat(vPart));
        const height = this.canvas.height;
        const arrSpan = Math.floor(height / 3);
        const arrSpanHalf = arrSpan / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, 0);
        this.ctx.lineTo(startX - arrSpan, height / 2);
        this.ctx.lineTo(startX - arrSpanHalf, height / 2);
        this.ctx.lineTo(startX - arrSpanHalf, height);
        this.ctx.lineTo(startX + arrSpanHalf, height);
        this.ctx.lineTo(startX + arrSpanHalf, height / 2);
        this.ctx.lineTo(startX + arrSpan, height / 2);
        this.ctx.fill();
    }
    drawGrid(sep) {
        let vPart = sep.substring('GRID;'.length);
        if (vPart.indexOf(',') > -1) {
            vPart = vPart.replace(',', '.');
        }
        const vTickNum = parseInt(vPart);
        const vTickDist = this.canvas.width / vTickNum;
        const tickH = this.canvas.height / 5;
        const y = this.canvas.height - tickH;
        const tickW = 1;
        for (let i = vTickDist; i < this.canvas.width; i = i + vTickDist) {
            this.drawRect(i, y, tickW, tickH, this.default_color);
        }
    }
    drawSeparator(sep) {
        const vSeparatorPart = sep.substring('SEP;'.length).split(';');
        let vColor = 'R000G000B000';
        let vThickness = 2;
        let vPositionPart = vSeparatorPart[0];
        if (vSeparatorPart.length > 1) {
            vColor = vSeparatorPart[1];
        }
        if (vSeparatorPart.length > 2) {
            vThickness = parseInt(vSeparatorPart[2]);
        }
        if (vPositionPart.indexOf(',') > -1) {
            vPositionPart = vPositionPart.replace(',', '.');
        }
        const x = this.getDim(this.canvas.width, parseFloat(vPositionPart));
        this.drawRect(x, 0, vThickness, this.canvas.height, getColorFromString(vColor));
    }
    render() {
        return (h("canvas", { ref: (el) => (this.canvas = el), height: this.height, width: this.width }, this.value));
    }
    static get is() { return "kup-graphic-cell"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "height": {
            "type": Number,
            "attr": "height"
        },
        "value": {
            "type": String,
            "attr": "value",
            "watchCallbacks": ["onValueChange"]
        },
        "width": {
            "type": Number,
            "attr": "width"
        }
    }; }
}

class KupPaginator {
    constructor() {
        this.max = 0;
        this.perPage = 10;
        this.selectedPerPage = 10;
        this.currentPage = 1;
    }
    isPrevPageDisabled() {
        return this.currentPage == 1;
    }
    isNextPageDisabled() {
        return this.currentPage * this.perPage >= this.max;
    }
    onPrevPage() {
        if (this.isPrevPageDisabled()) {
            return;
        }
        this.kupPageChanged.emit({
            newPage: this.currentPage - 1,
        });
    }
    onNextPage() {
        if (this.isNextPageDisabled()) {
            return;
        }
        this.kupPageChanged.emit({
            newPage: this.currentPage + 1,
        });
    }
    onGoToPage({ target }) {
        this.kupPageChanged.emit({
            newPage: parseInt(target.value),
        });
    }
    onRowsPerPage({ target }) {
        this.kupRowsPerPageChanged.emit({
            newRowsPerPage: parseInt(target.value),
        });
    }
    getGoToPageOptions(maxNumberOfPage) {
        const goToPageOptions = [];
        goToPageOptions.push(h("option", { value: "1", selected: this.currentPage === 1 }, "1"));
        for (let i = 2; i <= maxNumberOfPage; i++) {
            goToPageOptions.push(h("option", { value: i, selected: this.currentPage === i }, i));
        }
        return goToPageOptions;
    }
    getRowsPerPageOptions() {
        const rowsPerPageOptions = [];
        if (this.currentPage != this.max) {
            let i = this.perPage;
            if (i === 0) {
                return rowsPerPageOptions;
            }
            while (i < this.max) {
                rowsPerPageOptions.push(h("option", { value: i, selected: i === this.selectedPerPage }, i));
                i = i * 2;
            }
            rowsPerPageOptions.push(h("option", { value: this.max, selected: this.max === this.perPage }, this.max));
        }
        else {
            rowsPerPageOptions.push(h("option", { value: this.perPage, selected: true }, this.perPage));
        }
        return rowsPerPageOptions;
    }
    render() {
        let prevPageClassName = 'mdi mdi-chevron-left';
        if (this.isPrevPageDisabled()) {
            prevPageClassName += ' disabled';
        }
        let nextPageClassName = 'mdi mdi-chevron-right';
        if (this.isNextPageDisabled()) {
            nextPageClassName += ' disabled';
        }
        const maxNumberOfPage = Math.ceil(this.max / this.selectedPerPage);
        const goToPageOptions = this.getGoToPageOptions(maxNumberOfPage);
        const rowsPerPageOptions = this.getRowsPerPageOptions();
        return (h("div", { id: "paginator" },
            h("div", { class: "align-left" },
                "Pagina",
                h("span", { class: "prev-page" },
                    h("icon", { className: prevPageClassName, onclick: () => this.onPrevPage() })),
                h("select", { onChange: (e) => this.onGoToPage(e) }, goToPageOptions),
                h("span", { class: "next-page" },
                    h("icon", { className: nextPageClassName, onclick: () => this.onNextPage() })),
                "Di ",
                maxNumberOfPage),
            h("div", { class: "align-right" },
                h("span", { class: "nextPageGroup" },
                    "Numero risultati: ",
                    this.max),
                "Mostra",
                h("select", { onChange: (e) => this.onRowsPerPage(e) }, rowsPerPageOptions),
                "righe per pagina")));
    }
    static get is() { return "kup-paginator"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "currentPage": {
            "type": Number,
            "attr": "current-page"
        },
        "max": {
            "type": Number,
            "attr": "max"
        },
        "perPage": {
            "type": Number,
            "attr": "per-page"
        },
        "selectedPerPage": {
            "type": Number,
            "attr": "selected-per-page"
        }
    }; }
    static get events() { return [{
            "name": "kupPageChanged",
            "method": "kupPageChanged",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "kupRowsPerPageChanged",
            "method": "kupRowsPerPageChanged",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);.sc-kup-paginator-h{--int_text-color:var(--kup-paginator_text-color,#545454);--int_font-size:var(--kup-paginator_font-size,1rem)}#paginator.sc-kup-paginator{color:var(--int_text-color);margin:.5rem 0;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:justify;justify-content:space-between;font-size:var(--int_font-size)}#paginator.sc-kup-paginator   icon.sc-kup-paginator{cursor:pointer;opacity:1;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}#paginator.sc-kup-paginator   icon.sc-kup-paginator:hover:not(.disabled){opacity:.75}#paginator.sc-kup-paginator   icon.disabled.sc-kup-paginator{cursor:default;opacity:.3}#paginator.sc-kup-paginator   .nextPageGroup.sc-kup-paginator, #paginator.sc-kup-paginator   select.sc-kup-paginator{margin:0 .5rem}#paginator.sc-kup-paginator   .next-page.sc-kup-paginator, #paginator.sc-kup-paginator   .prev-page.sc-kup-paginator{margin:0 .25rem}#paginator.sc-kup-paginator   .nextPageGroup.sc-kup-paginator{padding-right:1.5rem}"; }
}

export { KupDataTable, KupGraphicCell, KupPaginator };
