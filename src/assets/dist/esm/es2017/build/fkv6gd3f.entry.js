import { h } from '../mycomponent.core.js';

import { b as generateRandomID, c as eventFromElement } from './chunk-cc6d1815.js';
import { a as filterRows, b as SortMode, c as sortRows, d as isImage, e as isButton } from './chunk-30ec9921.js';
import './chunk-77ecfe7f.js';
import { a as getElementOffset } from './chunk-e4adee8b.js';

class KupBox {
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
    static get style() { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);:host{--int_color:var(--kup-box_color,#707070);--int_border-color:var(--kup-box_border-color,#d0d0d0);--int_border-radius:var(--kup-box_border-radius,3px);--int_img-border-radius:var(--kup-box_img-border-radius,4px);--int_expand-panel-color:var(--kup-box_expand-panel-color,#4e908f)}#box-container{display:grid;grid-gap:1rem;color:var(--int_color)}#box-container *{-webkit-box-sizing:border-box;box-sizing:border-box}#box-container .box{cursor:pointer;position:relative;border-radius:var(--int_border-radius);border:1px solid var(--int_border-color)}#box-container .box .box-section{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;padding:3px 4px;-ms-flex:1 1 1%;flex:1 1 1%;-ms-flex-wrap:wrap;flex-wrap:wrap}#box-container .box .box-section.column{-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}#box-container .box .box-section .box-object{padding:1px 4px}#box-container .box .box-section .box-object img{border-radius:var(--int_img-border-radius);height:auto}#box-container .box .box-section.collapse-section .header{border-top:1px solid var(--int_border-color);color:var(--int_expand-panel-color);display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;width:100%}#box-container .box .box-section.collapse-section .header .header-content{margin:.5rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}#box-container .box .box-section.collapse-section .header .header-content .mdi{margin-left:5px}#box-container .box .box-section.collapse-section .content{display:none;opacity:0}#box-container .box .box-section.collapse-section.open .header .header-content .mdi:before{-webkit-animation:rotate-icon .5s ease-out forwards;animation:rotate-icon .5s ease-out forwards}#box-container .box .box-section.collapse-section.open .content{display:block;opacity:1;-webkit-transition:opacity 1s ease-in;transition:opacity 1s ease-in}#box-container .box .box-selection{position:absolute;top:.5rem;right:.5rem}#filter-panel,#sort-panel{margin-bottom:1rem}#filter-panel kup-text-input{--kup-text-input_border-color:#d0d0d0}\@-webkit-keyframes rotate-icon{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}\@-moz-keyframes rotate-icon{0%{transform:rotate(0deg)}to{transform:rotate(180deg)}}\@-o-keyframes rotate-icon{0%{transform:rotate(0deg)}to{transform:rotate(180deg)}}\@keyframes rotate-icon{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}"; }
}

class KupCombo {
    constructor() {
        this.displayedField = 'id';
        this.initialValue = null;
        this.isClearable = false;
        this.items = [];
        this.label = '';
        this.valueField = 'id';
        this.usePortal = false;
        this.value = '';
        this.filter = '';
        this.isOpen = false;
        this.selected = null;
        this.portalRef = null;
        this.clickFunction = this.onDocumentClick.bind(this);
        this.comboPosition = {
            isRight: false,
            isTop: false
        };
        this.baseClass = 'kup-combo';
    }
    componentWillLoad() {
        this.reflectInitialValue(this.initialValue);
    }
    componentDidLoad() {
        document.addEventListener('click', this.clickFunction);
    }
    componentDidUnload() {
        document.removeEventListener('click', this.clickFunction);
    }
    closeCombo() {
        this.isOpen = false;
    }
    openCombo() {
        this.comboPosition = this.calcBoxPosition();
        this.isOpen = true;
    }
    reflectInitialValue(newValue, oldValue) {
        if (!oldValue || newValue[this.valueField] !== oldValue[this.valueField]) {
            this.onComboSelected(newValue, oldValue);
        }
    }
    reflectValueField(newValue) {
        this.value = this.selected ? this.selected[newValue] : '';
    }
    calcBoxPosition() {
        const windowX = document.documentElement.clientWidth;
        const windowY = document.documentElement.clientHeight;
        const { height, left, top, width } = this.comboText.getBoundingClientRect();
        return {
            isRight: left + width / 2 > windowX / 2,
            isTop: top + height / 2 > windowY / 2
        };
    }
    onClearClick() {
        this.onComboSelected(null, this.selected);
    }
    onComboClick() {
        this.openCombo();
    }
    async onDocumentClick(event) {
        let response = null;
        if (this.usePortal) {
            response = await this.portalRef.getPortalInstance();
        }
        try {
            if (event.composedPath().indexOf(this.comboEl) < 0 && event.composedPath().indexOf(response) < 0) {
                this.closeCombo();
            }
        }
        catch (e) {
            const ele = event.target;
            if (!eventFromElement(this.comboEl, ele) && !eventFromElement(response, ele)) {
                this.closeCombo();
            }
        }
    }
    onFilterUpdate(event) {
        console.log(event);
        this.filter = event.detail.value.toLowerCase();
    }
    onItemSelected(item) {
        if (item[this.valueField] !== this.value) {
            this.onComboSelected(item, this.selected);
        }
        this.closeCombo();
    }
    onComboSelected(item, oldItem) {
        this.ketchupComboSelected.emit({
            value: item,
            oldValue: oldItem,
            info: {
                obj: this.obj
            }
        });
        this.selected = item;
        this.value = item ? item[this.valueField] : null;
    }
    composeList() {
        return h("div", { class: this.baseClass + '__menu' + (this.isOpen ? ' is-open' : '') +
                (this.comboPosition.isRight ? ' is-right' : '') + (this.comboPosition.isTop ? ' is-top' : '')
                + (this.usePortal ? ' is-using-portal' : '') },
            h("div", { class: this.baseClass + '__filter' },
                h("kup-text-input", { onKetchupTextInputUpdated: this.onFilterUpdate.bind(this) })),
            h("ul", { class: this.baseClass + '__list' }, this.items.filter(item => !this.filter || item[this.displayedField].toLowerCase().indexOf(this.filter) >= 0)
                .map(item => h("li", { onClick: () => this.onItemSelected(item) },
                h("span", null, item[this.displayedField])))));
    }
    render() {
        const containerClass = this.baseClass + '__container';
        return ([
            h("div", { class: containerClass + (this.isClearable ? ' ' + containerClass + '--clearable' : ''), ref: (el) => this.comboText = el },
                h("span", { class: this.baseClass + '__current-value', onClick: this.onComboClick.bind(this) },
                    this.selected ? this.selected[this.displayedField] : '',
                    h("svg", { class: this.baseClass + '__icon ' + this.baseClass + '__chevron' + (this.isOpen ? ' ' + this.baseClass + '__chevron--open' : ''), viewBox: "0 0 24 24" },
                        h("path", { d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" }))),
                this.isClearable ?
                    h("button", { "aria-label": "Close", class: this.baseClass + '__clear', role: "button", onClick: this.onClearClick.bind(this) },
                        h("svg", { class: this.baseClass + '__icon', viewBox: "0 0 24 24" },
                            h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }))) :
                    null),
            this.usePortal ?
                h("kup-portal", { cssVarsRef: this.comboEl, isVisible: this.isOpen, mirroredCssVars: ['--cmb_menu-background', '--cmb_tr-duration'], nodes: this.composeList(), ref: el => this.portalRef = el, refOffset: getElementOffset(this.comboText, this.comboPosition), styleNode: this.comboEl.shadowRoot.querySelector('style') })
                :
                    this.composeList()
        ]);
    }
    static get is() { return "kup-combo"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "closeCombo": {
            "method": true
        },
        "comboEl": {
            "elementRef": true
        },
        "displayedField": {
            "type": String,
            "attr": "displayed-field"
        },
        "filter": {
            "state": true
        },
        "initialValue": {
            "type": "Any",
            "attr": "initial-value",
            "watchCallbacks": ["reflectInitialValue"]
        },
        "isClearable": {
            "type": Boolean,
            "attr": "is-clearable"
        },
        "isOpen": {
            "state": true
        },
        "items": {
            "type": "Any",
            "attr": "items"
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "obj": {
            "type": "Any",
            "attr": "obj"
        },
        "openCombo": {
            "method": true
        },
        "usePortal": {
            "type": Boolean,
            "attr": "use-portal"
        },
        "value": {
            "state": true
        },
        "valueField": {
            "type": String,
            "attr": "value-field",
            "watchCallbacks": ["reflectValueField"]
        }
    }; }
    static get events() { return [{
            "name": "ketchupComboSelected",
            "method": "ketchupComboSelected",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return ":host{--cmb_font-size:var(--kup-combo_input_font-size,14px);--cmb_border-color:var(--kup-combo_input_border-color,grey);--cmb_border-color--selected:var(--kup-combo_input_border-color,#676767);--cmb_tr-duration:var(--kup-combo_input_transition-duration,0.6s);--cmb_icon-color:var(--kup-combo_icon_color,grey);--cmb_icon-color--hover:var(--kup-combo_icon_color--hover,#676767);--cmb_menu-background:var(--kup-combo_menu_background,#fff);display:inline-block;position:relative;z-index:1}.kup-combo__container{background-color:#fff;border:1px solid var(--cmb_border-color);border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-inline-flexbox;display:inline-flex;outline:none}.kup-combo__container:focus,.kup-combo__container:hover{border-color:var(--cmb_border-color--selected)}.kup-combo__icon{fill:var(--cmb_icon-color);height:var(--cmb_font-size);-webkit-transition:fill var(--cmb_tr-duration),-webkit-transform var(--cmb_tr-duration);transition:fill var(--cmb_tr-duration),-webkit-transform var(--cmb_tr-duration);transition:fill var(--cmb_tr-duration),transform var(--cmb_tr-duration);transition:fill var(--cmb_tr-duration),transform var(--cmb_tr-duration),-webkit-transform var(--cmb_tr-duration);width:var(--cmb_font-size)}.kup-combo__current-value{-ms-flex-align:center;align-items:center;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;font-size:var(--cmb_font-size);-ms-flex-pack:center;justify-content:center;padding:4px 6px}.kup-combo__chevron{margin-left:16px}.kup-combo__chevron--open{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.kup-combo__clear{-ms-flex-align:center;align-items:center;background-color:transparent;border:none;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;margin:0;outline:none;padding:4px}.kup-combo__clear:hover>svg{fill:var(--cmb_icon-color--hover)}.kup-combo__menu{background-color:var(--cmb_menu-background);border-radius:2px;-webkit-box-shadow:0 1px 5px rgba(0,0,0,.5);box-shadow:0 1px 5px rgba(0,0,0,.5);display:inline-block;left:0;opacity:0;position:absolute;-webkit-transition:opacity var(--cmb_tr-duration);transition:opacity var(--cmb_tr-duration);top:100%;visibility:hidden;z-index:1}.kup-combo__menu.is-open{opacity:1;visibility:visible}.kup-combo__menu.is-top{bottom:100%;top:auto}.kup-combo__menu.is-right{left:auto;right:0}.kup-combo__menu.is-using-portal{position:relative}.kup-combo__filter{-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;padding:4px}.kup-combo__list{display:block;list-style-type:none;padding:0;max-height:400px;margin:0;overflow:auto}.kup-combo__list>li{border-bottom:1px solid #e8eae9;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;display:block;padding:6px 8px 5px}.kup-combo__list>li.is-selected,.kup-combo__list>li:hover{background-color:#f0f0f0}.kup-combo__list>li:last-of-type{border-bottom:none}"; }
}

var BadgePosition;
(function (BadgePosition) {
    BadgePosition["TOP_LEFT"] = "TL";
    BadgePosition["TOP_RIGHT"] = "TR";
    BadgePosition["BOTTOM_RIGHT"] = "BR";
    BadgePosition["BOTTOM_LEFT"] = "BL";
})(BadgePosition || (BadgePosition = {}));

class KupImage {
    constructor() {
        this.src = '';
        this.alt = '';
        this.width = 64;
        this.height = 64;
    }
    render() {
        let badgesElem = null;
        if (this.badges) {
            badgesElem = this.badges.map((badge) => {
                const text = badge.text || '';
                const isTopRight = BadgePosition.TOP_RIGHT === badge.position;
                const isBottomRight = BadgePosition.BOTTOM_RIGHT === badge.position;
                const isBottomLeft = BadgePosition.BOTTOM_LEFT === badge.position;
                const badgeClass = {
                    badge: true,
                    topLeft: !isTopRight && !isBottomRight && !isBottomLeft,
                    topRight: isTopRight,
                    bottomRight: isBottomRight,
                    bottomLeft: isBottomLeft,
                };
                if (!text && badge.icon) {
                    badgeClass[badge.icon] = badge.icon;
                }
                return h("span", { class: badgeClass }, text);
            });
        }
        return (h("div", { id: "image-wrapper" },
            h("img", { src: this.src, alt: this.alt, width: this.width, height: this.height }),
            badgesElem));
    }
    static get is() { return "kup-image"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "alt": {
            "type": String,
            "attr": "alt"
        },
        "badges": {
            "type": "Any",
            "attr": "badges"
        },
        "height": {
            "type": Number,
            "attr": "height"
        },
        "src": {
            "type": String,
            "attr": "src"
        },
        "width": {
            "type": Number,
            "attr": "width"
        }
    }; }
    static get style() { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);:host{--int_badge-background-color:var(--kup-image_badge-background-color,#95a5a6);--int_badge-color:var(--kup-image_badge-color,#fff)}*{-webkit-box-sizing:border-box;box-sizing:border-box}#image-wrapper{position:relative;display:inline-block}#image-wrapper .badge{position:absolute;background-color:var(--int_badge-background-color);color:var(--int_badge-color);padding:1px 2px;min-width:20px;max-width:70%;line-height:14px;font-size:11px;border-radius:3px;text-align:center}#image-wrapper .badge.topLeft{top:-3px;left:-4px}#image-wrapper .badge.topRight{top:-3px;right:-4px}#image-wrapper .badge.bottomLeft{bottom:3px;left:-4px}#image-wrapper .badge.bottomRight{bottom:3px;right:-4px}"; }
}

export { KupBox, KupCombo, KupImage };
