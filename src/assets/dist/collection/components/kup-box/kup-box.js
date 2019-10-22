import { h } from '@stencil/core';
import numeral from 'numeral';
import { SortMode, } from '../kup-data-table/kup-data-table-declarations';
import { isImage, isButton, createJ4objButtonConfig, isProgressBar, isIcon, } from '../../utils/object-utils';
import { filterRows, sortRows, paginateRows, } from '../kup-data-table/kup-data-table-helper';
import { PaginatorMode } from '../kup-paginator/kup-paginator-declarations';
export class KupBox {
    constructor() {
        /**
         * Number of columns
         */
        this.columns = 1;
        /**
         * Enable sorting
         */
        this.sortEnabled = false;
        /**
         * Enable filtering
         */
        this.filterEnabled = false;
        /**
         * Enable multi selection
         */
        this.multiSelection = false;
        /**
         * If enabled, highlights the selected box/boxes
         */
        this.showSelection = true;
        /**
         * If enabled, a button to load / display the row actions
         * will be displayed on the right of every box
         */
        this.enableRowActions = false;
        /**
         * Enables pagination
         */
        this.pagination = false;
        /**
         * Number of boxes per page
         */
        this.pageSize = 10;
        this.globalFilterValue = '';
        this.collapsedSection = {};
        this.selectedRows = [];
        this.currentPage = 1;
        this.visibleColumns = [];
        this.rows = [];
        this.filteredRows = [];
    }
    recalculateRows() {
        this.initRows();
    }
    onDataChanged() {
        this.initVisibleColumns();
        this.initRows();
        this.checkLayout();
    }
    onLayoutChanged() {
        this.checkLayout();
    }
    onSelectBoxChanged() {
        this.handleAutomaticBoxSelection();
    }
    // lifecycle hooks
    componentWillLoad() {
        this.onDataChanged();
    }
    componentDidLoad() {
        this.handleAutomaticBoxSelection();
        // When component is created, then the listener is set. @See clickFunction for more details
        document.addEventListener('click', this.clickFunction.bind(this));
    }
    componentDidUnload() {
        // When component is destroyed, then the listener is removed. @See clickFunction for more details
        document.removeEventListener('click', this.clickFunction.bind(this));
    }
    // @Methods
    async loadRowActions(row, actions) {
        row.actions = actions;
        // show menu
        this.rowActionMenuOpened = row;
    }
    // private methods
    getColumns() {
        return this.data && this.data.columns
            ? this.data.columns
            : [{ title: '', name: '', size: 0 }];
    }
    initVisibleColumns() {
        this.visibleColumns = this.getColumns().filter((column) => {
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
        this.filteredRows = this.getRows();
        if (this.filterEnabled && this.globalFilterValue) {
            const visibleCols = this.visibleColumns;
            let size = visibleCols.length;
            let columnNames = [];
            let cnt = 0;
            while (size-- > 0) {
                columnNames.push(visibleCols[cnt++].name);
            }
            // filtering rows
            this.filteredRows = filterRows(this.filteredRows, null, this.globalFilterValue, columnNames);
        }
        this.rows = this.sortRows(this.filteredRows);
        if (this.pagination) {
            this.rows = paginateRows(this.rows, this.currentPage, this.pageSize);
        }
    }
    sortRows(rows) {
        let sortedRows = rows;
        if (this.sortBy) {
            // create 'fake' sortObject
            const sortObject = {
                column: this.sortBy,
                sortMode: SortMode.A,
            };
            sortedRows = sortRows(sortedRows, [sortObject]);
        }
        return sortedRows;
    }
    checkLayout() {
        // check if there is a layout.
        // if not, create a default layout
        if (this.layout) {
            this.boxLayout = this.layout;
            return;
        }
        // only one section, containing all visible fields
        const section = {
            horizontal: false,
            sections: [],
            style: {
                textAlign: 'center',
            },
        };
        // adding box objects to section
        const visibleColumns = this.visibleColumns;
        let size = visibleColumns.length;
        let content = [];
        let cnt = 0;
        while (size-- > 0) {
            content.push({
                column: visibleColumns[cnt++].name,
            });
        }
        section.content = content;
        // creating a new layout
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
    handleAutomaticBoxSelection() {
        // automatic row selection
        if (this.selectBox &&
            this.selectBox > 0 &&
            this.selectBox <= this.rows.length) {
            this.selectedRows = [];
            this.selectedRows.push(this.rows[this.selectBox - 1]);
            this.kupAutoBoxSelect.emit({
                row: this.selectedRows[0],
            });
        }
    }
    /**
     * Checks if the element is the svg that opens the "row actions menu"
     * @param element the element to check
     */
    checkIfElementIsActionMenuIcon(element) {
        if (element.tagName && element.parentElement) {
            return (element.tagName === 'svg' &&
                element.parentElement.classList.contains('row-actions-toggler'));
        }
        return false;
    }
    // event listeners
    onBoxClick({ target }, row) {
        if (!(target instanceof HTMLElement)) {
            return;
        }
        // searching parent
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
        // evaluating column
        let column = null;
        if (classList.contains('box-object')) {
            column = element.dataset.column;
        }
        this.kupBoxClicked.emit({ row, column });
        // selecting box
        if (this.multiSelection) {
            // triggering multi selection
            this.onSelectionCheckChange(row);
        }
        else {
            this.selectedRows = [row];
        }
    }
    onSelectionCheckChange(row) {
        const index = this.selectedRows.indexOf(row);
        if (index >= 0) {
            // remove row
            this.selectedRows.splice(index, 1);
            this.selectedRows = [...this.selectedRows];
        }
        else {
            // add row
            this.selectedRows = [...this.selectedRows, row];
        }
        this.kupBoxSelected.emit({
            rows: this.selectedRows,
        });
    }
    toggleSectionExpand(row, section) {
        // check if section / row has id
        if (!section.id) {
            // error
            console.error('cannot expand / collapse a section withoun an ID');
            return;
        }
        if (!row.id) {
            // error
            console.error('cannot expand / collapse a section of a row without ad id');
            return;
        }
        // check if section already in collapsedSection
        if (!this.collapsedSection[section.id]) {
            // adding element and row, setting it to expanded
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
        // triggering rendering
        this.collapsedSection = Object.assign({}, this.collapsedSection);
    }
    onRowAction(row) {
        if (!row) {
            return;
        }
        if (row === this.rowActionMenuOpened) {
            // closing menu
            this.rowActionMenuOpened = null;
            return;
        }
        if (row.actions) {
            // actions already loaded -> show menu
            this.rowActionMenuOpened = row;
        }
        else {
            // no actions -> triggering event
            this.kupRowActionMenuClicked.emit({
                row,
            });
        }
    }
    onRowActionClicked(row, action, index) {
        this.kupRowActionClicked.emit({
            row,
            action,
            index,
        });
    }
    /**
     * see onDocumentClick in kup-combo
     */
    clickFunction(event) {
        try {
            const targets = event.composedPath();
            for (let target of targets) {
                if (this.checkIfElementIsActionMenuIcon(target)) {
                    return;
                }
            }
        }
        catch (err) {
            if (this.checkIfElementIsActionMenuIcon(event.target)) {
                return;
            }
        }
        this.rowActionMenuOpened = null;
    }
    handlePageChanged({ detail }) {
        this.currentPage = detail.newPage;
    }
    // render methods
    renderRow(row) {
        const visibleColumns = [...this.visibleColumns];
        let boxContent = null;
        // if layout in row, use that one
        let rowLayout = row.layout;
        if (!rowLayout) {
            // otherwise, use 'default' layout
            rowLayout = this.boxLayout;
        }
        let horizontal = false;
        if (rowLayout) {
            if (rowLayout.horizontal) {
                horizontal = true;
            }
            const sections = rowLayout.sections;
            let size = sections.length;
            let cnt = 0;
            if (size > 0) {
                boxContent = [];
            }
            // create fake parent section
            const parent = {
                horizontal: horizontal,
            };
            while (size-- > 0) {
                boxContent.push(this.renderSection(sections[cnt++], parent, row, visibleColumns));
            }
        }
        const isSelected = this.selectedRows.includes(row);
        let multiSel = null;
        if (this.multiSelection) {
            multiSel = (h("div", { class: "box-selection" },
                h("input", { type: "checkbox", checked: isSelected, onClick: (e) => e.stopPropagation(), onChange: () => this.onSelectionCheckChange(row) })));
        }
        let rowObject = null;
        if (this.enableRowActions) {
            const menuClass = {
                'row-action-menu': true,
                open: row === this.rowActionMenuOpened,
            };
            let rowActionMenuContent = null;
            if (row.actions) {
                const actionItems = row.actions.map((item, index) => {
                    const iconClass = `icon ${item.icon}`;
                    return (h("li", { tabindex: "0", onClick: () => this.onRowActionClicked(row, item, index) },
                        h("div", { class: iconClass }),
                        h("div", { class: "text" }, item.text)));
                });
                rowActionMenuContent = h("ul", null, actionItems);
            }
            rowObject = (h("div", { class: "row-actions-wrapper" },
                h("div", { class: "row-actions-toggler" },
                    h("svg", { version: "1.1", width: "24", height: "24", viewBox: "0 0 24 24", onClick: () => this.onRowAction(row) },
                        h("path", { d: "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" })),
                    h("div", { class: menuClass }, rowActionMenuContent))));
        }
        let badges = null;
        if (row.badges && row.badges.length > 0) {
            badges = row.badges.map((badge) => (h("kup-badge", { text: badge.text, position: badge.position, icon: badge.icon, class: "centered" })));
        }
        const boxClass = {
            box: true,
            selected: this.showSelection && isSelected,
            column: !horizontal,
        };
        return (h("div", { class: "box-wrapper" },
            h("div", { class: boxClass, onClick: (e) => this.onBoxClick(e, row) },
                multiSel,
                boxContent,
                badges),
            rowObject));
    }
    renderSection(section, parent, row, visibleColumns) {
        let sectionContent = null;
        if (section.sections && section.sections.length > 0) {
            // rendering child
            const sections = section.sections;
            let size = sections.length;
            let cnt = 0;
            if (size > 0) {
                sectionContent = [];
            }
            while (size-- > 0) {
                sectionContent.push(this.renderSection(sections[cnt++], section, row, visibleColumns));
            }
        }
        else if (section.content) {
            // rendering box objects
            const content = section.content;
            let size = content.length;
            let cnt = 0;
            if (size > 0) {
                sectionContent = [];
            }
            while (size-- > 0) {
                sectionContent.push(this.renderBoxObject(content[cnt++], row, visibleColumns));
            }
        }
        else if (visibleColumns.length > 0) {
            // getting first column
            const column = visibleColumns[0];
            // removing first column
            visibleColumns.splice(0, 1);
            sectionContent = this.renderBoxObject({ column: column.name }, row, visibleColumns);
        }
        const sectionExpanded = this.isSectionExpanded(row, section);
        const isGrid = !!section.columns;
        const sectionClass = {
            'box-section': true,
            open: sectionExpanded,
            column: !isGrid && !section.horizontal,
            grid: isGrid,
            titled: !!section.title,
            'last-child': !section.sections || section.sections.length === 0,
        };
        const sectionStyle = section.style || {};
        if (section.dim && parent) {
            sectionStyle.flex = `0 0 ${section.dim}`;
            if (parent.horizontal) {
                sectionStyle.maxWidth = section.dim;
            }
            else {
                sectionStyle.maxHeight = section.dim;
            }
        }
        if (isGrid) {
            sectionStyle['grid-template-columns'] = `repeat(${section.columns}, 1fr)`;
        }
        let sectionContainer = null;
        if (section.collapsible) {
            sectionClass['collapse-section'] = true;
            const contentClass = {
                content: true,
            };
            // TODO I18N
            let headerTitle = '';
            if (section.title) {
                headerTitle = section.title;
            }
            else if (sectionExpanded) {
                headerTitle = 'Collassa';
            }
            else {
                headerTitle = 'Espandi';
            }
            sectionContainer = (h("div", { class: sectionClass, style: sectionStyle },
                h("div", { class: contentClass }, sectionContent),
                h("div", { class: "header", role: "button", onClick: (e) => {
                        e.stopPropagation();
                        this.toggleSectionExpand(row, section);
                    } },
                    h("div", { class: "header-content" },
                        h("span", null, headerTitle),
                        h("span", { class: "mdi mdi-chevron-down" })))));
        }
        else {
            const title = section.title ? h("h3", null, section.title) : null;
            sectionContainer = (h("div", { class: sectionClass, style: sectionStyle },
                title,
                sectionContent));
        }
        return sectionContainer;
    }
    renderBoxObject(boxObject, row, visibleColumns) {
        let boContent = null;
        let boStyle = {};
        // check if fixed value
        if (boxObject.value) {
            boContent = boxObject.value;
        }
        else if (boxObject.column) {
            const cell = row.cells[boxObject.column];
            if (cell) {
                // removing column from visibleColumns
                let index = -1;
                for (let i = 0; i < visibleColumns.length; i++) {
                    const c = visibleColumns[i];
                    if (c.name === boxObject.column) {
                        index = i;
                        break;
                    }
                }
                if (index >= 0) {
                    visibleColumns.splice(index, 1);
                }
                if (cell.style) {
                    boStyle = Object.assign({}, cell.style);
                }
                if (isImage(cell.obj)) {
                    let badges = null;
                    if (cell.config && cell.config.badges) {
                        badges = cell.config.badges;
                    }
                    boContent = h("kup-image", { src: cell.value, badges: badges });
                }
                else if (isButton(cell.obj)) {
                    boContent = (h("kup-button", Object.assign({}, createJ4objButtonConfig(cell))));
                }
                else if (isProgressBar(cell.obj)) {
                    const value = numeral(cell.value).value();
                    let hideLabel = false;
                    let labelText = null;
                    const wrapperStyle = {};
                    if (cell.config) {
                        hideLabel = !!cell.config.hideLabel;
                        if (cell.config.hasOwnProperty('labelText')) {
                            labelText = cell.config.labelText;
                        }
                        if (cell.config.foregroundColor) {
                            wrapperStyle['--kup-pb_foreground-color'] =
                                cell.config.foregroundColor;
                        }
                    }
                    boContent = (h("div", { style: wrapperStyle },
                        h("kup-progress-bar", { value: value, labelText: labelText, hideLabel: hideLabel })));
                }
                else if (isIcon(cell.obj)) {
                    boContent = h("span", { class: `icon ${cell.value}` });
                }
                else {
                    boContent = cell.value;
                }
            }
        }
        return (h("div", { "data-column": boxObject.column, class: "box-object", style: boStyle }, boContent));
    }
    render() {
        let sortPanel = null;
        if (this.sortEnabled) {
            let initialValue = { value: '', id: '' };
            // creating items
            const visibleColumnsItems = this.visibleColumns.map((column) => {
                const item = {
                    value: column.title,
                    id: column.name,
                };
                if (column.name === this.sortBy) {
                    // setting initial value
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
                h("kup-text-input", { placeholder: "Cerca" // TODO
                    , onKetchupTextInputUpdated: (event) => this.onGlobalFilterChange(event) },
                    h("svg", { slot: "left", version: "1.1", width: "18", height: "18", viewBox: "0 0 24 24" },
                        h("path", { d: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" })))));
        }
        let paginator = null;
        if (this.pagination) {
            paginator = (h("kup-paginator", { max: this.filteredRows.length, perPage: this.pageSize, currentPage: this.currentPage, onKupPageChanged: (e) => this.handlePageChanged(e), mode: PaginatorMode.SIMPLE }));
        }
        let boxContent = null;
        if (this.rows.length === 0) {
            boxContent = h("p", { id: "empty-data-message" }, "Empty data");
        }
        else {
            const rows = this.rows;
            let size = rows.length;
            let cnt = 0;
            boxContent = [];
            while (size-- > 0) {
                boxContent.push(this.renderRow(rows[cnt++]));
            }
        }
        const containerStyle = {
            'grid-template-columns': `repeat(${this.columns}, 1fr)`,
        };
        return (h("div", null,
            sortPanel,
            filterPanel,
            paginator,
            h("div", { id: "box-container", style: containerStyle }, boxContent)));
    }
    static get is() { return "kup-box"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-box.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-box.css"]
    }; }
    static get properties() { return {
        "data": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "{ columns?: Column[]; rows?: BoxRow[] }",
                "resolved": "{ columns?: Column[]; rows?: BoxRow[]; }",
                "references": {
                    "Column": {
                        "location": "import",
                        "path": "../kup-data-table/kup-data-table-declarations"
                    },
                    "BoxRow": {
                        "location": "import",
                        "path": "./kup-box-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Data"
            }
        },
        "layout": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Layout",
                "resolved": "Layout",
                "references": {
                    "Layout": {
                        "location": "import",
                        "path": "./kup-box-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "How the field will be displayed. If not present, a default one will be created."
            }
        },
        "columns": {
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
                "text": "Number of columns"
            },
            "attribute": "columns",
            "reflect": false,
            "defaultValue": "1"
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
                "text": "Enable sorting"
            },
            "attribute": "sort-enabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "sortBy": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If sorting is enabled, specifies which column to sort"
            },
            "attribute": "sort-by",
            "reflect": false
        },
        "filterEnabled": {
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
                "text": "Enable filtering"
            },
            "attribute": "filter-enabled",
            "reflect": false,
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
                "text": "Enable multi selection"
            },
            "attribute": "multi-selection",
            "reflect": false,
            "defaultValue": "false"
        },
        "selectBox": {
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
                "text": "Automatically selects the box at the specified index"
            },
            "attribute": "select-box",
            "reflect": false
        },
        "showSelection": {
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
                "text": "If enabled, highlights the selected box/boxes"
            },
            "attribute": "show-selection",
            "reflect": false,
            "defaultValue": "true"
        },
        "enableRowActions": {
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
                "text": "If enabled, a button to load / display the row actions\nwill be displayed on the right of every box"
            },
            "attribute": "enable-row-actions",
            "reflect": false,
            "defaultValue": "false"
        },
        "pagination": {
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
                "text": "Enables pagination"
            },
            "attribute": "pagination",
            "reflect": true,
            "defaultValue": "false"
        },
        "pageSize": {
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
                "text": "Number of boxes per page"
            },
            "attribute": "page-size",
            "reflect": true,
            "defaultValue": "10"
        }
    }; }
    static get states() { return {
        "globalFilterValue": {},
        "collapsedSection": {},
        "selectedRows": {},
        "rowActionMenuOpened": {},
        "currentPage": {}
    }; }
    static get events() { return [{
            "method": "kupBoxClicked",
            "name": "kupBoxClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Triggered when a box is clicked"
            },
            "complexType": {
                "original": "{\n        row: BoxRow;\n        column?: string;\n    }",
                "resolved": "{ row: BoxRow; column?: string; }",
                "references": {
                    "BoxRow": {
                        "location": "import",
                        "path": "./kup-box-declarations"
                    }
                }
            }
        }, {
            "method": "kupBoxSelected",
            "name": "kupBoxSelected",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Triggered when the multi selection checkbox changes value"
            },
            "complexType": {
                "original": "{\n        rows: BoxRow[];\n    }",
                "resolved": "{ rows: BoxRow[]; }",
                "references": {
                    "BoxRow": {
                        "location": "import",
                        "path": "./kup-box-declarations"
                    }
                }
            }
        }, {
            "method": "kupAutoBoxSelect",
            "name": "kupAutoBoxSelect",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Triggered when a box is auto selected via selectBox prop"
            },
            "complexType": {
                "original": "{\n        row: BoxRow;\n    }",
                "resolved": "{ row: BoxRow; }",
                "references": {
                    "BoxRow": {
                        "location": "import",
                        "path": "./kup-box-declarations"
                    }
                }
            }
        }, {
            "method": "kupRowActionMenuClicked",
            "name": "kupRowActionMenuClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When the row menu action icon is clicked"
            },
            "complexType": {
                "original": "{\n        row: BoxRow;\n    }",
                "resolved": "{ row: BoxRow; }",
                "references": {
                    "BoxRow": {
                        "location": "import",
                        "path": "./kup-box-declarations"
                    }
                }
            }
        }, {
            "method": "kupRowActionClicked",
            "name": "kupRowActionClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When the row menu action icon is clicked"
            },
            "complexType": {
                "original": "{\n        row: BoxRow;\n        action: RowAction;\n        index: number;\n    }",
                "resolved": "{ row: BoxRow; action: RowAction; index: number; }",
                "references": {
                    "BoxRow": {
                        "location": "import",
                        "path": "./kup-box-declarations"
                    },
                    "RowAction": {
                        "location": "import",
                        "path": "../kup-data-table/kup-data-table-declarations"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "loadRowActions": {
            "complexType": {
                "signature": "(row: BoxRow, actions: RowAction[]) => Promise<void>",
                "parameters": [{
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
                    "BoxRow": {
                        "location": "import",
                        "path": "./kup-box-declarations"
                    },
                    "RowAction": {
                        "location": "import",
                        "path": "../kup-data-table/kup-data-table-declarations"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get watchers() { return [{
            "propName": "globalFilterValue",
            "methodName": "recalculateRows"
        }, {
            "propName": "sortBy",
            "methodName": "recalculateRows"
        }, {
            "propName": "pagination",
            "methodName": "recalculateRows"
        }, {
            "propName": "pageSize",
            "methodName": "recalculateRows"
        }, {
            "propName": "currentPage",
            "methodName": "recalculateRows"
        }, {
            "propName": "data",
            "methodName": "onDataChanged"
        }, {
            "propName": "layout",
            "methodName": "onLayoutChanged"
        }, {
            "propName": "selectBox",
            "methodName": "onSelectBoxChanged"
        }]; }
}
