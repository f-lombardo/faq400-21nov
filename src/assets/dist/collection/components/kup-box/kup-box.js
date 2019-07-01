import { SortMode, } from '../kup-data-table/kup-data-table-declarations';
import { isImage, isButton } from '../../utils/object-utils';
import { filterRows, sortRows } from '../kup-data-table/kup-data-table-helper';
import { generateRandomID } from '../../utils/utils';
export class KupBox {
    constructor() {
        this.columns = 1;
        this.sortEnabled = false;
        this.filterEnabled = false;
        this.multiSelection = false;
        this.globalFilterValue = '';
        this.collapsedSection = {};
        this.rows = [];
        this.selectedRows = [];
    }
    recalculateRows() {
        this.initRows();
    }
    onDataChanged() {
        this.checkLayout();
    }
    componentWillLoad() {
        this.checkLayout();
        this.initRows();
    }
    getColumns() {
        return this.data && this.data.columns
            ? this.data.columns
            : [{ title: '', name: '', size: 0 }];
    }
    getVisibleColumns() {
        return this.getColumns().filter((column) => {
            if (column.hasOwnProperty('visible')) {
                return column.visible;
            }
            return true;
        });
    }
    getRows() {
        return this.data && this.data.rows ? this.data.rows : [];
    }
    initRows() {
        let filteredRows = this.getRows();
        if (this.filterEnabled && this.globalFilterValue) {
            filteredRows = filterRows(this.getRows(), null, this.globalFilterValue, this.getVisibleColumns().map((column) => column.name));
        }
        this.rows = this.sortRows(filteredRows);
    }
    sortRows(rows) {
        let sortedRows = rows;
        if (this.sortBy) {
            const sortObject = {
                column: this.sortBy,
                sortMode: SortMode.A,
            };
            sortedRows = sortRows(sortedRows, [sortObject]);
        }
        return sortedRows;
    }
    checkLayout() {
        if (this.layout) {
            this.boxLayout = this.layout;
            return;
        }
        const section = {
            horizontal: false,
            children: [],
            style: {
                textAlign: 'center',
            },
        };
        section.content = this.getVisibleColumns().map((column) => {
            const boxObject = {
                column: column.name,
            };
            return boxObject;
        });
        this.boxLayout = {
            sections: [section],
        };
    }
    onSortChange(kupComboEvent) {
        this.sortBy = kupComboEvent.value.id;
        this.initRows();
    }
    onGlobalFilterChange({ detail }) {
        this.globalFilterValue = detail.value;
    }
    isSectionExpanded(row, section) {
        if (!row.id || !section.id) {
            return false;
        }
        return (this.collapsedSection[section.id] &&
            this.collapsedSection[section.id][row.id]);
    }
    onBoxClick({ target }, row) {
        if (!(target instanceof HTMLElement)) {
            return;
        }
        let element = target;
        let classList = element.classList;
        while (!classList.contains('box-object') &&
            !classList.contains('box-section') &&
            !classList.contains('box')) {
            element = element.parentElement;
            if (element === null) {
                break;
            }
            classList = element.classList;
        }
        let column = null;
        if (classList.contains('box-object')) {
            column = element.dataset.column;
        }
        this.kupBoxClicked.emit({ row, column });
    }
    onSelectionCheckChange(row) {
        const index = this.selectedRows.indexOf(row);
        if (index >= 0) {
            this.selectedRows.splice(index, 1);
            this.selectedRows = [...this.selectedRows];
        }
        else {
            this.selectedRows = [...this.selectedRows, row];
        }
        this.kupBoxSelected.emit({
            rows: this.selectedRows,
        });
    }
    toggleSectionExpand(row, section) {
        if (!section.id) {
            section.id = generateRandomID();
        }
        if (!row.id) {
            row.id = generateRandomID();
        }
        if (!this.collapsedSection[section.id]) {
            this.collapsedSection[section.id] = {};
            this.collapsedSection[section.id][row.id] = true;
        }
        else {
            const s = this.collapsedSection[section.id];
            if (!s[row.id]) {
                s[row.id] = true;
            }
            else {
                s[row.id] = !s[row.id];
            }
        }
        this.collapsedSection = Object.assign({}, this.collapsedSection);
    }
    renderRow(row) {
        let boxContent = null;
        if (this.boxLayout && this.boxLayout.sections) {
            const visibleColumns = this.getVisibleColumns();
            boxContent = this.boxLayout.sections.map((section) => this.renderSection(section, row, visibleColumns));
        }
        let multiSel = null;
        if (this.multiSelection) {
            multiSel = (h("div", { class: "box-selection" },
                h("input", { type: "checkbox", checked: this.selectedRows.includes(row), onChange: () => this.onSelectionCheckChange(row) })));
        }
        return (h("div", { class: "box", onClick: (e) => this.onBoxClick(e, row) },
            multiSel,
            boxContent));
    }
    renderSection(section, row, visibleColumns) {
        let sectionContent = null;
        if (section.children && section.children.length > 0) {
            sectionContent = section.children.map((child) => this.renderSection(child, row, visibleColumns));
        }
        else if (section.content) {
            sectionContent = section.content.map((content) => this.renderBoxObject(content.column, row));
        }
        else if (visibleColumns.length > 0) {
            const column = visibleColumns.splice(0, 1)[0];
            sectionContent = this.renderBoxObject(column.name, row);
        }
        const sectionExpanded = this.isSectionExpanded(row, section);
        const sectionClass = {
            'box-section': true,
            open: sectionExpanded,
            column: !section.horizontal,
        };
        const sectionStyle = section.style || {};
        if (section.dim) {
            sectionStyle.maxWidth = section.dim;
            sectionStyle.flex = `0 0 ${section.dim}`;
        }
        let sectionContainer = null;
        if (section.collapsible) {
            sectionClass['collapse-section'] = true;
            const contentClass = {
                content: true,
            };
            sectionContainer = (h("div", { class: sectionClass, style: sectionStyle },
                h("div", { class: contentClass }, sectionContent),
                h("div", { class: "header", role: "button", onClick: (e) => {
                        e.stopPropagation();
                        this.toggleSectionExpand(row, section);
                    } },
                    h("div", { class: "header-content" },
                        h("span", null, sectionExpanded ? 'Collassa' : 'Espandi'),
                        h("span", { class: "mdi mdi-chevron-down" })))));
        }
        else {
            sectionContainer = (h("div", { class: sectionClass, style: sectionStyle }, sectionContent));
        }
        return sectionContainer;
    }
    renderBoxObject(column, row) {
        let boContent = null;
        if (column) {
            const cell = row.cells[column];
            if (cell) {
                if (isImage(cell.obj)) {
                    let badges = null;
                    if (cell.config && cell.config.badges) {
                        badges = cell.config.badges;
                    }
                    boContent = h("kup-image", { src: cell.value, badges: badges });
                }
                else if (isButton(cell.obj)) {
                    let label = cell.value;
                    let textMode = 'Hint';
                    let icon = null;
                    let flat = true;
                    let showtext = false;
                    let fillspace = false;
                    if (cell.config) {
                        const config = cell.config;
                        icon = config.icon;
                        if (config.hasOwnProperty('showtext')) {
                            showtext = config.showtext;
                        }
                        if (config.hasOwnProperty('fillspace')) {
                            fillspace = config.fillspace;
                        }
                        if (config.hasOwnProperty('flat')) {
                            flat = config.flat;
                        }
                        if (config.hasOwnProperty('fillspace')) {
                            fillspace = config.fillspace;
                        }
                    }
                    boContent = (h("kup-button", { flat: flat, iconClass: icon, label: label, textmode: textMode, showtext: showtext, fillspace: fillspace }));
                }
                else {
                    boContent = cell.value;
                }
            }
        }
        return (h("div", { "data-column": column, class: "box-object" }, boContent));
    }
    render() {
        let sortPanel = null;
        if (this.sortEnabled) {
            let initialValue = { value: '', id: '' };
            const visibleColumnsItems = this.getVisibleColumns().map((column) => {
                const item = {
                    value: column.title,
                    id: column.name,
                };
                if (column.name === this.sortBy) {
                    initialValue = item;
                }
                return item;
            });
            const items = [{ value: '', id: '' }, ...visibleColumnsItems];
            sortPanel = (h("div", { id: "sort-panel" },
                h("kup-combo", { displayedField: "value", items: items, initialValue: initialValue, onKetchupComboSelected: (e) => this.onSortChange(e.detail) })));
        }
        let filterPanel = null;
        if (this.filterEnabled) {
            filterPanel = (h("div", { id: "filter-panel" },
                h("kup-text-input", { placeholder: "Cerca", onKetchupTextInputUpdated: (event) => this.onGlobalFilterChange(event) })));
        }
        let boxContent = null;
        if (this.rows.length === 0) {
            boxContent = h("p", { id: "empty-data-message" }, "Empty data");
        }
        else {
            boxContent = this.rows.map((row) => this.renderRow(row));
        }
        const containerStyle = {
            'grid-template-columns': `repeat(${this.columns}, 1fr)`,
        };
        return (h("div", null,
            sortPanel,
            filterPanel,
            h("div", { id: "box-container", style: containerStyle }, boxContent)));
    }
    static get is() { return "kup-box"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "collapsedSection": {
            "state": true
        },
        "columns": {
            "type": Number,
            "attr": "columns"
        },
        "data": {
            "type": "Any",
            "attr": "data",
            "watchCallbacks": ["recalculateRows", "onDataChanged"]
        },
        "filterEnabled": {
            "type": Boolean,
            "attr": "filter-enabled"
        },
        "globalFilterValue": {
            "state": true,
            "watchCallbacks": ["recalculateRows"]
        },
        "layout": {
            "type": "Any",
            "attr": "layout"
        },
        "multiSelection": {
            "type": Boolean,
            "attr": "multi-selection"
        },
        "sortBy": {
            "type": String,
            "attr": "sort-by",
            "mutable": true,
            "watchCallbacks": ["recalculateRows"]
        },
        "sortEnabled": {
            "type": Boolean,
            "attr": "sort-enabled"
        }
    }; }
    static get events() { return [{
            "name": "kupBoxClicked",
            "method": "kupBoxClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "kupBoxSelected",
            "method": "kupBoxSelected",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:kup-box:**/"; }
}
