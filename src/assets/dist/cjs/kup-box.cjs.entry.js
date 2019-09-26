'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-c31c1549.js');
require('./chunk-d83edcd4.js');
const __chunk_3 = require('./chunk-866cce30.js');
const __chunk_4 = require('./chunk-a2cd5f7a.js');

class KupBox {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
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
        this.kupBoxClicked = __chunk_1.createEvent(this, "kupBoxClicked", 6);
        this.kupBoxSelected = __chunk_1.createEvent(this, "kupBoxSelected", 6);
        this.kupAutoBoxSelect = __chunk_1.createEvent(this, "kupAutoBoxSelect", 6);
        this.kupRowActionMenuClicked = __chunk_1.createEvent(this, "kupRowActionMenuClicked", 6);
        this.kupRowActionClicked = __chunk_1.createEvent(this, "kupRowActionClicked", 6);
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
            this.filteredRows = __chunk_3.filterRows(this.filteredRows, null, this.globalFilterValue, columnNames);
        }
        this.rows = this.sortRows(this.filteredRows);
        if (this.pagination) {
            this.rows = __chunk_3.paginateRows(this.rows, this.currentPage, this.pageSize);
        }
    }
    sortRows(rows) {
        let sortedRows = rows;
        if (this.sortBy) {
            // create 'fake' sortObject
            const sortObject = {
                column: this.sortBy,
                sortMode: __chunk_3.SortMode.A,
            };
            sortedRows = __chunk_3.sortRows(sortedRows, [sortObject]);
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
            multiSel = (__chunk_1.h("div", { class: "box-selection" }, __chunk_1.h("input", { type: "checkbox", checked: isSelected, onClick: (e) => e.stopPropagation(), onChange: () => this.onSelectionCheckChange(row) })));
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
                    return (__chunk_1.h("li", { tabindex: "0", onClick: () => this.onRowActionClicked(row, item, index) }, __chunk_1.h("div", { class: iconClass }), __chunk_1.h("div", { class: "text" }, item.text)));
                });
                rowActionMenuContent = __chunk_1.h("ul", null, actionItems);
            }
            rowObject = (__chunk_1.h("div", { class: "row-actions-wrapper" }, __chunk_1.h("div", { class: "row-actions-toggler" }, __chunk_1.h("svg", { version: "1.1", width: "24", height: "24", viewBox: "0 0 24 24", onClick: () => this.onRowAction(row) }, __chunk_1.h("path", { d: "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" })), __chunk_1.h("div", { class: menuClass }, rowActionMenuContent))));
        }
        let badges = null;
        if (row.badges && row.badges.length > 0) {
            badges = row.badges.map((badge) => (__chunk_1.h("kup-badge", { text: badge.text, position: badge.position, icon: badge.icon, class: "centered" })));
        }
        const boxClass = {
            box: true,
            selected: this.showSelection && isSelected,
            column: !horizontal,
        };
        return (__chunk_1.h("div", { class: "box-wrapper" }, __chunk_1.h("div", { class: boxClass, onClick: (e) => this.onBoxClick(e, row) }, multiSel, boxContent, badges), rowObject));
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
            sectionContainer = (__chunk_1.h("div", { class: sectionClass, style: sectionStyle }, __chunk_1.h("div", { class: contentClass }, sectionContent), __chunk_1.h("div", { class: "header", role: "button", onClick: (e) => {
                    e.stopPropagation();
                    this.toggleSectionExpand(row, section);
                } }, __chunk_1.h("div", { class: "header-content" }, __chunk_1.h("span", null, headerTitle), __chunk_1.h("span", { class: "mdi mdi-chevron-down" })))));
        }
        else {
            const title = section.title ? __chunk_1.h("h3", null, section.title) : null;
            sectionContainer = (__chunk_1.h("div", { class: sectionClass, style: sectionStyle }, title, sectionContent));
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
                if (__chunk_3.isImage(cell.obj)) {
                    let badges = null;
                    if (cell.config && cell.config.badges) {
                        badges = cell.config.badges;
                    }
                    boContent = __chunk_1.h("kup-image", { src: cell.value, badges: badges });
                }
                else if (__chunk_3.isButton(cell.obj)) {
                    boContent = (__chunk_1.h("kup-button", Object.assign({}, __chunk_3.createJ4objButtonConfig(cell))));
                }
                else if (__chunk_3.isProgressBar(cell.obj)) {
                    const value = __chunk_3.numeral(cell.value).value();
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
                    boContent = (__chunk_1.h("div", { style: wrapperStyle }, __chunk_1.h("kup-progress-bar", { value: value, labelText: labelText, hideLabel: hideLabel })));
                }
                else if (__chunk_3.isIcon(cell.obj)) {
                    boContent = __chunk_1.h("span", { class: `icon ${cell.value}` });
                }
                else {
                    boContent = cell.value;
                }
            }
        }
        return (__chunk_1.h("div", { "data-column": boxObject.column, class: "box-object", style: boStyle }, boContent));
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
            sortPanel = (__chunk_1.h("div", { id: "sort-panel" }, __chunk_1.h("kup-combo", { displayedField: "value", items: items, initialValue: initialValue, onKetchupComboSelected: (e) => this.onSortChange(e.detail) })));
        }
        let filterPanel = null;
        if (this.filterEnabled) {
            filterPanel = (__chunk_1.h("div", { id: "filter-panel" }, __chunk_1.h("kup-text-input", { placeholder: "Cerca" // TODO
                ,
                onKetchupTextInputUpdated: (event) => this.onGlobalFilterChange(event) }, __chunk_1.h("svg", { slot: "left", version: "1.1", width: "18", height: "18", viewBox: "0 0 24 24" }, __chunk_1.h("path", { d: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" })))));
        }
        let paginator = null;
        if (this.pagination) {
            paginator = (__chunk_1.h("kup-paginator", { max: this.filteredRows.length, perPage: this.pageSize, currentPage: this.currentPage, onKupPageChanged: (e) => this.handlePageChanged(e), mode: __chunk_4.PaginatorMode.SIMPLE }));
        }
        let boxContent = null;
        if (this.rows.length === 0) {
            boxContent = __chunk_1.h("p", { id: "empty-data-message" }, "Empty data");
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
        return (__chunk_1.h("div", null, sortPanel, filterPanel, paginator, __chunk_1.h("div", { id: "box-container", style: containerStyle }, boxContent)));
    }
    static get watchers() { return {
        "globalFilterValue": ["recalculateRows"],
        "sortBy": ["recalculateRows"],
        "pagination": ["recalculateRows"],
        "pageSize": ["recalculateRows"],
        "currentPage": ["recalculateRows"],
        "data": ["onDataChanged"],
        "layout": ["onLayoutChanged"],
        "selectBox": ["onSelectBoxChanged"]
    }; }
    static get style() { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);:host{--box_color:var(--kup-box_color,#707070);--box_border-color:var(--kup-box_border-color,#d0d0d0);--box_border-radius:var(--kup-box_border-radius,3px);--box_img-border-radius:var(--kup-box_img-border-radius,4px);--box_expand-panel-color:var(--kup-box_expand-panel-color,$smeup-primary);--box_hover-box-shadow:var(--kup-box_hover-box-shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5));--box_titled-section-font-size:var(--kup-box_titled-section-font-size,12px);--box_titled-section-bg-color:var(--kup-box_titled-section-bg-color,#fff);--box_titled-section-top:var(--kup-box_titled-section-top,-9px)}#box-container{display:grid;grid-gap:1rem;color:var(--box_color)}#box-container *{-webkit-box-sizing:border-box;box-sizing:border-box}#box-container .box-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}#box-container .box-wrapper .box{-ms-flex-positive:1;flex-grow:1;cursor:pointer;position:relative;border-radius:var(--box_border-radius);border:1px solid var(--box_border-color);display:-ms-flexbox;display:flex;padding:3px}#box-container .box-wrapper .box.column{-ms-flex-direction:column;flex-direction:column}#box-container .box-wrapper .box.selected,#box-container .box-wrapper .box:hover{-webkit-box-shadow:var(--box_hover-box-shadow);box-shadow:var(--box_hover-box-shadow)}#box-container .box-wrapper .box .box-section{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex:1 1 1%;flex:1 1 1%;-ms-flex-wrap:wrap;flex-wrap:wrap}#box-container .box-wrapper .box .box-section.last-child{margin:3px 4px}#box-container .box-wrapper .box .box-section.column{-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-wrap:unset;flex-wrap:unset}#box-container .box-wrapper .box .box-section.column>.box-section{-ms-flex:0 0 auto;flex:0 0 auto}#box-container .box-wrapper .box .box-section.grid{display:grid}#box-container .box-wrapper .box .box-section .box-object{padding:1px 4px}#box-container .box-wrapper .box .box-section .box-object img{border-radius:var(--box_img-border-radius);height:auto}#box-container .box-wrapper .box .box-section.collapse-section .header{border-top:1px solid var(--box_border-color);color:var(--box_expand-panel-color);display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;width:100%}#box-container .box-wrapper .box .box-section.collapse-section .header .header-content{margin:.5rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}#box-container .box-wrapper .box .box-section.collapse-section .header .header-content .mdi{margin-left:5px}#box-container .box-wrapper .box .box-section.collapse-section .content{display:none;width:100%}#box-container .box-wrapper .box .box-section.collapse-section.open .header .header-content .mdi:before{-webkit-animation:rotate-icon .5s ease-out forwards;animation:rotate-icon .5s ease-out forwards}#box-container .box-wrapper .box .box-section.collapse-section.open .content{display:block}#box-container .box-wrapper .box .box-section.titled{border:1px solid var(--box_border-color);padding-top:5px;position:relative;margin:10px}#box-container .box-wrapper .box .box-section.titled>h3{position:absolute;margin:0;padding:0 3px;top:var(--box_titled-section-top);left:5px;font-size:var(--box_titled-section-font-size);background:var(--box_titled-section-bg-color)}#box-container .box-wrapper .box .box-selection{position:absolute;top:.5rem;right:.5rem}#box-container .box-wrapper .box kup-badge{--bdg_background-color:#f89406;--kup-badge_dimension:24px}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler{position:relative;width:24px;height:24px;margin-left:3px}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler svg{cursor:pointer;opacity:0;fill:#545454;-webkit-transition:opacity .5s ease-out;transition:opacity .5s ease-out}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu{position:absolute;top:0;right:24px;display:none;border:1px solid var(--box_border-color);z-index:10;background:#fff;-webkit-box-shadow:0 0 7.5px 0 hsla(0,0%,50.2%,.5);box-shadow:0 0 7.5px 0 hsla(0,0%,50.2%,.5)}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu ul{list-style-type:none;margin:0;padding:0}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu ul>li{cursor:pointer;white-space:nowrap;padding:0 12px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;line-height:30px}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu ul>li:not(:last-child){border-bottom:1px solid var(--box_border-color)}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu ul>li .icon{margin-right:5px}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu.open{display:block}#box-container .box-wrapper:hover .row-actions-wrapper .row-actions-toggler svg{opacity:1}:host(.no-shadow) #box-container .box{border:none}:host(.no-shadow) #box-container .box.selected,:host(.no-shadow) #box-container .box:hover{-webkit-box-shadow:none;box-shadow:none}#filter-panel,#sort-panel{margin-bottom:1rem}#filter-panel kup-text-input{--kup-text-input_border-color:#d0d0d0;--kup-text-input_color:#545454}#filter-panel svg{fill:grey;margin-left:3px}\@-webkit-keyframes rotate-icon{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}\@-moz-keyframes rotate-icon{0%{transform:rotate(0deg)}to{transform:rotate(180deg)}}\@-o-keyframes rotate-icon{0%{transform:rotate(0deg)}to{transform:rotate(180deg)}}\@keyframes rotate-icon{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}"; }
}

exports.kup_box = KupBox;
