import { PaginatorPos, SortMode, TotalMode, } from './ketchup-data-table-declarations';
import numeral from 'numeral';
import moment from 'moment';
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
        this.globalFilterValue = '';
        this.currentPage = 1;
        this.currentRowsPerPage = 10;
        this.selectedRow = null;
        this.groupState = {};
    }
    rowsPerPageHandler(newValue) {
        this.currentRowsPerPage = newValue;
    }
    componentWillLoad() {
        this.rowsPerPageHandler(this.rowsPerPage);
        if (this.selectRow && this.selectRow > 0) {
            const sortedRows = this.sortRows(this.getFilteredRows());
            if (this.selectRow <= sortedRows.length) {
                this.selectedRow = sortedRows[this.selectRow - 1];
                this.kupRowSelected.emit({ row: this.selectedRow });
            }
        }
    }
    getColumns() {
        return this.data && this.data.columns
            ? this.data.columns
            : [{ title: '', name: '', size: 0 }];
    }
    getRows() {
        return this.data && this.data.rows ? this.data.rows : [];
    }
    isGrouping() {
        return this.groups && this.groups.length > 0;
    }
    getFilteredRows() {
        if ((this.filters && Object.keys(this.filters).length > 0) ||
            this.globalFilter) {
            const keys = Object.keys(this.filters);
            return this.getRows().filter((r) => {
                if (this.globalFilter) {
                    let found = false;
                    for (let i = 0; i < this.data.columns.length; i++) {
                        const c = this.data.columns[i];
                        const cellValue = r.cells[c.name].value;
                        if (cellValue
                            .toLowerCase()
                            .includes(this.globalFilterValue.toLocaleLowerCase())) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        return false;
                    }
                }
                return (keys.filter((key) => {
                    const filterValue = this.filters[key];
                    const cellValue = r.cells[key];
                    if (!cellValue || !cellValue.value) {
                        return false;
                    }
                    if (cellValue.value
                        .toLowerCase()
                        .includes(filterValue.toLowerCase())) {
                        return true;
                    }
                }).length === keys.length);
            });
        }
        return this.getRows();
    }
    onColumnSort(e) {
        const columnName = e.target.dataset.col;
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
            if (e.ctrlKey) {
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
            if (e.ctrlKey) {
                this.sort = [...this.sort, sortObj];
            }
            else {
                this.sort = [sortObj];
            }
        }
    }
    onFilterChange(event) {
        this.currentPage = 1;
        const columnName = event.target.dataset.col;
        const newFilters = Object.assign({}, this.filters);
        if (event.detail.value.length === 0) {
            delete newFilters[columnName];
        }
        else {
            newFilters[columnName] = event.detail.value;
        }
        this.filters = newFilters;
    }
    onGlobalFilterChange(event) {
        this.currentPage = 1;
        this.globalFilterValue = event.detail.value;
    }
    groupRows(rows) {
        if (!this.isGrouping()) {
            return rows;
        }
        const groupRows = [];
        this.getRows().forEach((row) => {
            const columnName = this.groups[0].column;
            const cellValue = row.cells[columnName].value;
            let groupRow = null;
            for (let i = 0; i < groupRows.length; i++) {
                const currentGroupRow = groupRows[i];
                if (currentGroupRow.group.label === cellValue) {
                    groupRow = currentGroupRow;
                    break;
                }
            }
            if (groupRow === null) {
                groupRow = {
                    group: {
                        expanded: false,
                        label: cellValue,
                        children: [],
                    },
                    cells: {},
                };
                groupRows.push(groupRow);
            }
            const isExpanded = this.groupState[cellValue]
                ? this.groupState[cellValue].expanded
                : false;
            groupRow.group.expanded = isExpanded;
            this.groupState[cellValue] = {
                expanded: groupRow.group.expanded,
            };
            groupRow.group.children.push(row);
        });
        return groupRows;
    }
    sortRows(rows) {
        if (this.sort.length === 0) {
            return rows;
        }
        const isMultiSort = this.sort.length > 1;
        return rows.sort((r1, r2) => {
            if (isMultiSort) {
                for (let i = 0; i < this.sort.length; i++) {
                    const sortObj = this.sort[i];
                    const cell1 = r1.cells[sortObj.column];
                    const cell2 = r2.cells[sortObj.column];
                    const compare = this.compareCell(cell1, cell2, sortObj.sortMode);
                    if (compare !== 0) {
                        return compare;
                    }
                }
                return 0;
            }
            else {
                const sortObj = this.sort[0];
                const cell1 = r1.cells[sortObj.column];
                const cell2 = r2.cells[sortObj.column];
                return this.compareCell(cell1, cell2, sortObj.sortMode);
            }
        });
    }
    compareCell(cell1, cell2, sortMode) {
        const sm = sortMode === 'A' ? 1 : -1;
        const obj1 = cell1.obj;
        const obj2 = cell2.obj;
        if (!(obj1.t === obj2.t && obj1.p === obj2.p)) {
            let compare = obj1.t.localeCompare(obj2.t);
            if (compare === 0) {
                compare = obj1.p.localeCompare(obj2.p);
            }
            return compare;
        }
        if ('NR' === obj1.t) {
            const n1 = numeral(obj1.k).value();
            const n2 = numeral(obj2.k).value();
            if (n1 === n2) {
                return 0;
            }
            if (n1 > n2) {
                return sm * 1;
            }
            else {
                return sm * -1;
            }
        }
        if ('D8' === obj1.t) {
            let m1;
            let m2;
            if (obj1.p === '*YYMD') {
                m1 = moment(obj1.k, 'YYYYMMDD');
                m2 = moment(obj2.k, 'YYYYMMDD');
            }
            else if (obj1.p === '*DMYY') {
                m1 = moment(obj1.k, 'DDMMYYYY');
                m2 = moment(obj2.k, 'DDMMYYYY');
            }
            else {
                return obj1.k.localeCompare(obj2.k);
            }
            if (m1.isSame(m2)) {
                return 0;
            }
            if (m1.isBefore(m2)) {
                return sm * -1;
            }
            else {
                return sm * 1;
            }
        }
        let value1 = cell1.value;
        let value2 = cell2.value;
        return sm * value1.localeCompare(value2);
    }
    paginateRows(rows) {
        const start = this.currentPage * this.currentRowsPerPage -
            this.currentRowsPerPage;
        return rows.slice(start, start + this.currentRowsPerPage);
    }
    getSortIcon(columnName) {
        for (let i = 0; i < this.sort.length; i++) {
            const sortObj = this.sort[i];
            if (sortObj.column === columnName) {
                return 'A' === sortObj.sortMode
                    ? 'mdi-sort-ascending'
                    : 'mdi-sort-descending';
            }
        }
        return 'mdi-sort';
    }
    handlePageChanged({ detail }) {
        this.currentPage = detail.newPage;
    }
    handleRowsPerPageChanged({ detail }) {
        this.currentRowsPerPage = detail.newRowsPerPage;
    }
    onRowClick(row) {
        this.kupRowSelected.emit({ row });
        this.selectedRow = row;
    }
    onRowExpand(row) {
        row.group.expanded = !row.group.expanded;
        this.groupState[row.group.label].expanded = row.group.expanded;
        this.groupState = Object.assign({}, this.groupState);
    }
    renderHeader() {
        const hasCustomColumnsWidth = this.columnsWidth.length > 0;
        const dataColumns = this.getColumns().map((column) => {
            let filter = null;
            if (this.showFilters) {
                let filterValue = '';
                if (this.filters && this.filters[column.name]) {
                    filterValue = this.filters[column.name];
                }
                filter = (h("div", null,
                    h("kup-text-input", { initialValue: filterValue, "data-col": column.name, onKetchupTextInputUpdated: (e) => {
                            this.onFilterChange(e);
                        } })));
            }
            let sort = null;
            if (this.sortEnabled) {
                sort = (h("span", { class: "column-sort" },
                    h("icon", { class: 'mdi ' + this.getSortIcon(column.name), "data-col": column.name, onClick: (e) => this.onColumnSort(e) })));
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
            return (h("th", { style: thStyle },
                h("span", { class: "column-title" }, column.title),
                sort,
                filter));
        });
        return dataColumns;
    }
    renderFooter(rows) {
        if (!this.totals) {
            return null;
        }
        const keys = Object.keys(this.totals);
        const footerRow = {};
        let onlyCount = keys.length === 0 ||
            keys.every((key) => this.totals[key] === TotalMode.COUNT);
        if (onlyCount) {
            keys.forEach((columnName) => (footerRow[columnName] = rows.length));
        }
        else {
            rows.forEach((r) => {
                keys.filter((key) => TotalMode.COUNT !== this.totals[key]).forEach((key) => {
                    const cell = r.cells[key];
                    if (cell.obj.t === 'NR') {
                        const cellValue = numeral(cell.obj.k);
                        const currentFooterValue = footerRow[key] || 0;
                        footerRow[key] = cellValue
                            .add(currentFooterValue)
                            .value();
                    }
                });
            });
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (this.totals[key] === TotalMode.AVARAGE) {
                    const sum = footerRow[key];
                    if (sum && rows.length > 0) {
                        footerRow[key] = numeral(sum)
                            .divide(rows.length)
                            .value();
                    }
                }
                else if (this.totals[key] === TotalMode.COUNT) {
                    footerRow[key] = rows.length;
                }
            }
        }
        const footerCells = this.getColumns().map(({ name }) => (h("td", null, footerRow[name])));
        const footer = (h("tfoot", null,
            h("tr", null, footerCells)));
        return footer;
    }
    renderRow(row, level = 0) {
        if (row.group) {
            let icon = 'mdi mdi-chevron-' + (row.group.expanded ? 'right' : 'down');
            const jsxRows = [];
            jsxRows.push(h("tr", { class: "group" },
                h("td", { colSpan: this.getColumns().length },
                    h("icon", { class: icon, onClick: () => this.onRowExpand(row) }),
                    row.group.label)));
            if (row.group.expanded) {
                row.group.children
                    .map((r) => this.renderRow(r, level + 1))
                    .forEach((jsxRow) => jsxRows.push(jsxRow));
            }
            return jsxRows;
        }
        else {
            const cells = this.getColumns().map(({ name }, index) => {
                let indend = [];
                if (index === 0) {
                    for (let i = 0; i < level; i++) {
                        indend.push(h("span", { class: "indent" }));
                    }
                }
                return (h("td", null,
                    indend,
                    row.cells[name].value));
            });
            let rowClass = null;
            if (this.selectedRow === row) {
                rowClass = 'selected';
            }
            return (h("tr", { class: rowClass, onClick: () => this.onRowClick(row) }, cells));
        }
    }
    render() {
        const header = this.renderHeader();
        const filteredRows = this.getFilteredRows();
        const footer = this.renderFooter(filteredRows);
        const sortedRows = this.sortRows(filteredRows);
        const grouped = this.groupRows(sortedRows);
        const paginatedRows = this.paginateRows(grouped);
        let rows = null;
        if (paginatedRows.length === 0) {
            rows = (h("tr", null,
                h("td", { colSpan: this.getColumns().length }, "Empty data")));
        }
        else {
            rows = paginatedRows.map((row) => this.renderRow(row));
        }
        let globalFilter = null;
        if (this.globalFilter) {
            globalFilter = (h("div", { id: "globalFilter" },
                h("kup-text-input", { label: "Global filter", onKetchupTextInputUpdated: (event) => this.onGlobalFilterChange(event) })));
        }
        let paginatorTop = null;
        if (PaginatorPos.TOP === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorTop = (h("kup-paginator", { max: filteredRows.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: (e) => this.handlePageChanged(e), onKupRowsPerPageChanged: (e) => this.handleRowsPerPageChanged(e) }));
        }
        let paginatorBottom = null;
        if (PaginatorPos.BOTTOM === this.paginatorPos ||
            PaginatorPos.BOTH === this.paginatorPos) {
            paginatorBottom = (h("kup-paginator", { max: filteredRows.length, perPage: this.rowsPerPage, selectedPerPage: this.currentRowsPerPage, currentPage: this.currentPage, onKupPageChanged: (e) => this.handlePageChanged(e), onKupRowsPerPageChanged: (e) => this.handleRowsPerPageChanged(e) }));
        }
        let tableClass = null;
        if (!this.showGrid) {
            tableClass = 'noGrid';
        }
        return (h("div", null,
            paginatorTop,
            globalFilter,
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
            "attr": "groups"
        },
        "groupState": {
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
        "selectedRow": {
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
            "name": "kupRowSelected",
            "method": "kupRowSelected",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:kup-data-table:**/"; }
}
