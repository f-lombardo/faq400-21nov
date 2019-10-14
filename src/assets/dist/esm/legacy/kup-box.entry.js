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
import { f as filterRows, p as paginateRows, s as sortRows, i as isImage, a as isButton, c as createJ4objButtonConfig, b as isProgressBar, n as numeral, d as isIcon, S as SortMode } from './chunk-2ee83ce0.js';
import { P as PaginatorMode } from './chunk-8cdcd574.js';
var KupBox = /** @class */ (function () {
    function KupBox(hostRef) {
        registerInstance(this, hostRef);
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
        this.kupBoxClicked = createEvent(this, "kupBoxClicked", 6);
        this.kupBoxSelected = createEvent(this, "kupBoxSelected", 6);
        this.kupAutoBoxSelect = createEvent(this, "kupAutoBoxSelect", 6);
        this.kupRowActionMenuClicked = createEvent(this, "kupRowActionMenuClicked", 6);
        this.kupRowActionClicked = createEvent(this, "kupRowActionClicked", 6);
    }
    KupBox.prototype.recalculateRows = function () {
        this.initRows();
    };
    KupBox.prototype.onDataChanged = function () {
        this.initVisibleColumns();
        this.initRows();
        this.checkLayout();
    };
    KupBox.prototype.onLayoutChanged = function () {
        this.checkLayout();
    };
    KupBox.prototype.onSelectBoxChanged = function () {
        this.handleAutomaticBoxSelection();
    };
    // lifecycle hooks
    KupBox.prototype.componentWillLoad = function () {
        this.onDataChanged();
    };
    KupBox.prototype.componentDidLoad = function () {
        this.handleAutomaticBoxSelection();
        // When component is created, then the listener is set. @See clickFunction for more details
        document.addEventListener('click', this.clickFunction.bind(this));
    };
    KupBox.prototype.componentDidUnload = function () {
        // When component is destroyed, then the listener is removed. @See clickFunction for more details
        document.removeEventListener('click', this.clickFunction.bind(this));
    };
    // @Methods
    KupBox.prototype.loadRowActions = function (row, actions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                row.actions = actions;
                // show menu
                this.rowActionMenuOpened = row;
                return [2 /*return*/];
            });
        });
    };
    // private methods
    KupBox.prototype.getColumns = function () {
        return this.data && this.data.columns
            ? this.data.columns
            : [{ title: '', name: '', size: 0 }];
    };
    KupBox.prototype.initVisibleColumns = function () {
        this.visibleColumns = this.getColumns().filter(function (column) {
            if (column.hasOwnProperty('visible')) {
                return column.visible;
            }
            return true;
        });
    };
    KupBox.prototype.getRows = function () {
        return this.data && this.data.rows ? this.data.rows : [];
    };
    KupBox.prototype.initRows = function () {
        this.filteredRows = this.getRows();
        if (this.filterEnabled && this.globalFilterValue) {
            var visibleCols = this.visibleColumns;
            var size = visibleCols.length;
            var columnNames = [];
            var cnt = 0;
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
    };
    KupBox.prototype.sortRows = function (rows) {
        var sortedRows = rows;
        if (this.sortBy) {
            // create 'fake' sortObject
            var sortObject = {
                column: this.sortBy,
                sortMode: SortMode.A,
            };
            sortedRows = sortRows(sortedRows, [sortObject]);
        }
        return sortedRows;
    };
    KupBox.prototype.checkLayout = function () {
        // check if there is a layout.
        // if not, create a default layout
        if (this.layout) {
            this.boxLayout = this.layout;
            return;
        }
        // only one section, containing all visible fields
        var section = {
            horizontal: false,
            sections: [],
            style: {
                textAlign: 'center',
            },
        };
        // adding box objects to section
        var visibleColumns = this.visibleColumns;
        var size = visibleColumns.length;
        var content = [];
        var cnt = 0;
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
    };
    KupBox.prototype.onSortChange = function (kupComboEvent) {
        this.sortBy = kupComboEvent.value.id;
        this.initRows();
    };
    KupBox.prototype.onGlobalFilterChange = function (_a) {
        var detail = _a.detail;
        this.globalFilterValue = detail.value;
    };
    KupBox.prototype.isSectionExpanded = function (row, section) {
        if (!row.id || !section.id) {
            return false;
        }
        return (this.collapsedSection[section.id] &&
            this.collapsedSection[section.id][row.id]);
    };
    KupBox.prototype.handleAutomaticBoxSelection = function () {
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
    };
    /**
     * Checks if the element is the svg that opens the "row actions menu"
     * @param element the element to check
     */
    KupBox.prototype.checkIfElementIsActionMenuIcon = function (element) {
        if (element.tagName && element.parentElement) {
            return (element.tagName === 'svg' &&
                element.parentElement.classList.contains('row-actions-toggler'));
        }
        return false;
    };
    // event listeners
    KupBox.prototype.onBoxClick = function (_a, row) {
        var target = _a.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }
        // searching parent
        var element = target;
        var classList = element.classList;
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
        var column = null;
        if (classList.contains('box-object')) {
            column = element.dataset.column;
        }
        this.kupBoxClicked.emit({ row: row, column: column });
        // selecting box
        if (this.multiSelection) {
            // triggering multi selection
            this.onSelectionCheckChange(row);
        }
        else {
            this.selectedRows = [row];
        }
    };
    KupBox.prototype.onSelectionCheckChange = function (row) {
        var index = this.selectedRows.indexOf(row);
        if (index >= 0) {
            // remove row
            this.selectedRows.splice(index, 1);
            this.selectedRows = this.selectedRows.slice();
        }
        else {
            // add row
            this.selectedRows = this.selectedRows.concat([row]);
        }
        this.kupBoxSelected.emit({
            rows: this.selectedRows,
        });
    };
    KupBox.prototype.toggleSectionExpand = function (row, section) {
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
            var s = this.collapsedSection[section.id];
            if (!s[row.id]) {
                s[row.id] = true;
            }
            else {
                s[row.id] = !s[row.id];
            }
        }
        // triggering rendering
        this.collapsedSection = Object.assign({}, this.collapsedSection);
    };
    KupBox.prototype.onRowAction = function (row) {
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
                row: row,
            });
        }
    };
    KupBox.prototype.onRowActionClicked = function (row, action, index) {
        this.kupRowActionClicked.emit({
            row: row,
            action: action,
            index: index,
        });
    };
    /**
     * see onDocumentClick in kup-combo
     */
    KupBox.prototype.clickFunction = function (event) {
        try {
            var targets = event.composedPath();
            for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                var target = targets_1[_i];
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
    };
    KupBox.prototype.handlePageChanged = function (_a) {
        var detail = _a.detail;
        this.currentPage = detail.newPage;
    };
    // render methods
    KupBox.prototype.renderRow = function (row) {
        var _this = this;
        var visibleColumns = this.visibleColumns.slice();
        var boxContent = null;
        // if layout in row, use that one
        var rowLayout = row.layout;
        if (!rowLayout) {
            // otherwise, use 'default' layout
            rowLayout = this.boxLayout;
        }
        var horizontal = false;
        if (rowLayout) {
            if (rowLayout.horizontal) {
                horizontal = true;
            }
            var sections = rowLayout.sections;
            var size = sections.length;
            var cnt = 0;
            if (size > 0) {
                boxContent = [];
            }
            // create fake parent section
            var parent = {
                horizontal: horizontal,
            };
            while (size-- > 0) {
                boxContent.push(this.renderSection(sections[cnt++], parent, row, visibleColumns));
            }
        }
        var isSelected = this.selectedRows.includes(row);
        var multiSel = null;
        if (this.multiSelection) {
            multiSel = (h("div", { class: "box-selection" }, h("input", { type: "checkbox", checked: isSelected, onClick: function (e) { return e.stopPropagation(); }, onChange: function () { return _this.onSelectionCheckChange(row); } })));
        }
        var rowObject = null;
        if (this.enableRowActions) {
            var menuClass = {
                'row-action-menu': true,
                open: row === this.rowActionMenuOpened,
            };
            var rowActionMenuContent = null;
            if (row.actions) {
                var actionItems = row.actions.map(function (item, index) {
                    var iconClass = "icon " + item.icon;
                    return (h("li", { tabindex: "0", onClick: function () { return _this.onRowActionClicked(row, item, index); } }, h("div", { class: iconClass }), h("div", { class: "text" }, item.text)));
                });
                rowActionMenuContent = h("ul", null, actionItems);
            }
            rowObject = (h("div", { class: "row-actions-wrapper" }, h("div", { class: "row-actions-toggler" }, h("svg", { version: "1.1", width: "24", height: "24", viewBox: "0 0 24 24", onClick: function () { return _this.onRowAction(row); } }, h("path", { d: "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" })), h("div", { class: menuClass }, rowActionMenuContent))));
        }
        var badges = null;
        if (row.badges && row.badges.length > 0) {
            badges = row.badges.map(function (badge) { return (h("kup-badge", { text: badge.text, position: badge.position, icon: badge.icon, class: "centered" })); });
        }
        var boxClass = {
            box: true,
            selected: this.showSelection && isSelected,
            column: !horizontal,
        };
        return (h("div", { class: "box-wrapper" }, h("div", { class: boxClass, onClick: function (e) { return _this.onBoxClick(e, row); } }, multiSel, boxContent, badges), rowObject));
    };
    KupBox.prototype.renderSection = function (section, parent, row, visibleColumns) {
        var _this = this;
        var sectionContent = null;
        if (section.sections && section.sections.length > 0) {
            // rendering child
            var sections = section.sections;
            var size = sections.length;
            var cnt = 0;
            if (size > 0) {
                sectionContent = [];
            }
            while (size-- > 0) {
                sectionContent.push(this.renderSection(sections[cnt++], section, row, visibleColumns));
            }
        }
        else if (section.content) {
            // rendering box objects
            var content = section.content;
            var size = content.length;
            var cnt = 0;
            if (size > 0) {
                sectionContent = [];
            }
            while (size-- > 0) {
                sectionContent.push(this.renderBoxObject(content[cnt++], row, visibleColumns));
            }
        }
        else if (visibleColumns.length > 0) {
            // getting first column
            var column = visibleColumns[0];
            // removing first column
            visibleColumns.splice(0, 1);
            sectionContent = this.renderBoxObject({ column: column.name }, row, visibleColumns);
        }
        var sectionExpanded = this.isSectionExpanded(row, section);
        var isGrid = !!section.columns;
        var sectionClass = {
            'box-section': true,
            open: sectionExpanded,
            column: !isGrid && !section.horizontal,
            grid: isGrid,
            titled: !!section.title,
            'last-child': !section.sections || section.sections.length === 0,
        };
        var sectionStyle = section.style || {};
        if (section.dim && parent) {
            sectionStyle.flex = "0 0 " + section.dim;
            if (parent.horizontal) {
                sectionStyle.maxWidth = section.dim;
            }
            else {
                sectionStyle.maxHeight = section.dim;
            }
        }
        if (isGrid) {
            sectionStyle['grid-template-columns'] = "repeat(" + section.columns + ", 1fr)";
        }
        var sectionContainer = null;
        if (section.collapsible) {
            sectionClass['collapse-section'] = true;
            var contentClass = {
                content: true,
            };
            // TODO I18N
            var headerTitle = '';
            if (section.title) {
                headerTitle = section.title;
            }
            else if (sectionExpanded) {
                headerTitle = 'Collassa';
            }
            else {
                headerTitle = 'Espandi';
            }
            sectionContainer = (h("div", { class: sectionClass, style: sectionStyle }, h("div", { class: contentClass }, sectionContent), h("div", { class: "header", role: "button", onClick: function (e) {
                    e.stopPropagation();
                    _this.toggleSectionExpand(row, section);
                } }, h("div", { class: "header-content" }, h("span", null, headerTitle), h("span", { class: "mdi mdi-chevron-down" })))));
        }
        else {
            var title = section.title ? h("h3", null, section.title) : null;
            sectionContainer = (h("div", { class: sectionClass, style: sectionStyle }, title, sectionContent));
        }
        return sectionContainer;
    };
    KupBox.prototype.renderBoxObject = function (boxObject, row, visibleColumns) {
        var boContent = null;
        var boStyle = {};
        // check if fixed value
        if (boxObject.value) {
            boContent = boxObject.value;
        }
        else if (boxObject.column) {
            var cell = row.cells[boxObject.column];
            if (cell) {
                // removing column from visibleColumns
                var index = -1;
                for (var i = 0; i < visibleColumns.length; i++) {
                    var c = visibleColumns[i];
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
                    var badges = null;
                    if (cell.config && cell.config.badges) {
                        badges = cell.config.badges;
                    }
                    boContent = h("kup-image", { src: cell.value, badges: badges });
                }
                else if (isButton(cell.obj)) {
                    boContent = (h("kup-button", Object.assign({}, createJ4objButtonConfig(cell))));
                }
                else if (isProgressBar(cell.obj)) {
                    var value = numeral(cell.value).value();
                    var hideLabel = false;
                    var labelText = null;
                    var wrapperStyle = {};
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
                    boContent = (h("div", { style: wrapperStyle }, h("kup-progress-bar", { value: value, labelText: labelText, hideLabel: hideLabel })));
                }
                else if (isIcon(cell.obj)) {
                    boContent = h("span", { class: "icon " + cell.value });
                }
                else {
                    boContent = cell.value;
                }
            }
        }
        return (h("div", { "data-column": boxObject.column, class: "box-object", style: boStyle }, boContent));
    };
    KupBox.prototype.render = function () {
        var _this = this;
        var sortPanel = null;
        if (this.sortEnabled) {
            var initialValue_1 = { value: '', id: '' };
            // creating items
            var visibleColumnsItems = this.visibleColumns.map(function (column) {
                var item = {
                    value: column.title,
                    id: column.name,
                };
                if (column.name === _this.sortBy) {
                    // setting initial value
                    initialValue_1 = item;
                }
                return item;
            });
            var items = [{ value: '', id: '' }].concat(visibleColumnsItems);
            sortPanel = (h("div", { id: "sort-panel" }, h("kup-combo", { displayedField: "value", items: items, initialValue: initialValue_1, onKetchupComboSelected: function (e) { return _this.onSortChange(e.detail); } })));
        }
        var filterPanel = null;
        if (this.filterEnabled) {
            filterPanel = (h("div", { id: "filter-panel" }, h("kup-text-input", { placeholder: "Cerca" // TODO
                ,
                onKetchupTextInputUpdated: function (event) { return _this.onGlobalFilterChange(event); } }, h("svg", { slot: "left", version: "1.1", width: "18", height: "18", viewBox: "0 0 24 24" }, h("path", { d: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" })))));
        }
        var paginator = null;
        if (this.pagination) {
            paginator = (h("kup-paginator", { max: this.filteredRows.length, perPage: this.pageSize, currentPage: this.currentPage, onKupPageChanged: function (e) { return _this.handlePageChanged(e); }, mode: PaginatorMode.SIMPLE }));
        }
        var boxContent = null;
        if (this.rows.length === 0) {
            boxContent = h("p", { id: "empty-data-message" }, "Empty data");
        }
        else {
            var rows = this.rows;
            var size = rows.length;
            var cnt = 0;
            boxContent = [];
            while (size-- > 0) {
                boxContent.push(this.renderRow(rows[cnt++]));
            }
        }
        var containerStyle = {
            'grid-template-columns': "repeat(" + this.columns + ", 1fr)",
        };
        return (h("div", null, sortPanel, filterPanel, paginator, h("div", { id: "box-container", style: containerStyle }, boxContent)));
    };
    Object.defineProperty(KupBox, "watchers", {
        get: function () {
            return {
                "globalFilterValue": ["recalculateRows"],
                "sortBy": ["recalculateRows"],
                "pagination": ["recalculateRows"],
                "pageSize": ["recalculateRows"],
                "currentPage": ["recalculateRows"],
                "data": ["onDataChanged"],
                "layout": ["onLayoutChanged"],
                "selectBox": ["onSelectBoxChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupBox, "style", {
        get: function () { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);:host{--box_color:var(--kup-box_color,#707070);--box_border-color:var(--kup-box_border-color,#d0d0d0);--box_border-radius:var(--kup-box_border-radius,3px);--box_img-border-radius:var(--kup-box_img-border-radius,4px);--box_expand-panel-color:var(--kup-box_expand-panel-color,$smeup-primary);--box_hover-box-shadow:var(--kup-box_hover-box-shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5));--box_titled-section-font-size:var(--kup-box_titled-section-font-size,12px);--box_titled-section-bg-color:var(--kup-box_titled-section-bg-color,#fff);--box_titled-section-top:var(--kup-box_titled-section-top,-9px)}#box-container{display:grid;grid-gap:1rem;color:var(--box_color)}#box-container *{-webkit-box-sizing:border-box;box-sizing:border-box}#box-container .box-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}#box-container .box-wrapper .box{-ms-flex-positive:1;flex-grow:1;cursor:pointer;position:relative;border-radius:var(--box_border-radius);border:1px solid var(--box_border-color);display:-ms-flexbox;display:flex;padding:3px}#box-container .box-wrapper .box.column{-ms-flex-direction:column;flex-direction:column}#box-container .box-wrapper .box.selected,#box-container .box-wrapper .box:hover{-webkit-box-shadow:var(--box_hover-box-shadow);box-shadow:var(--box_hover-box-shadow)}#box-container .box-wrapper .box .box-section{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex:1 1 1%;flex:1 1 1%;-ms-flex-wrap:wrap;flex-wrap:wrap}#box-container .box-wrapper .box .box-section.last-child{margin:3px 4px}#box-container .box-wrapper .box .box-section.column{-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-wrap:unset;flex-wrap:unset}#box-container .box-wrapper .box .box-section.column>.box-section{-ms-flex:0 0 auto;flex:0 0 auto}#box-container .box-wrapper .box .box-section.grid{display:grid}#box-container .box-wrapper .box .box-section .box-object{padding:1px 4px}#box-container .box-wrapper .box .box-section .box-object img{border-radius:var(--box_img-border-radius);height:auto}#box-container .box-wrapper .box .box-section.collapse-section .header{border-top:1px solid var(--box_border-color);color:var(--box_expand-panel-color);display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;width:100%}#box-container .box-wrapper .box .box-section.collapse-section .header .header-content{margin:.5rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}#box-container .box-wrapper .box .box-section.collapse-section .header .header-content .mdi{margin-left:5px}#box-container .box-wrapper .box .box-section.collapse-section .content{display:none;width:100%}#box-container .box-wrapper .box .box-section.collapse-section.open .header .header-content .mdi:before{-webkit-animation:rotate-icon .5s ease-out forwards;animation:rotate-icon .5s ease-out forwards}#box-container .box-wrapper .box .box-section.collapse-section.open .content{display:block}#box-container .box-wrapper .box .box-section.titled{border:1px solid var(--box_border-color);padding-top:5px;position:relative;margin:10px}#box-container .box-wrapper .box .box-section.titled>h3{position:absolute;margin:0;padding:0 3px;top:var(--box_titled-section-top);left:5px;font-size:var(--box_titled-section-font-size);background:var(--box_titled-section-bg-color)}#box-container .box-wrapper .box .box-selection{position:absolute;top:.5rem;right:.5rem}#box-container .box-wrapper .box kup-badge{--bdg_background-color:#f89406;--kup-badge_dimension:24px}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler{position:relative;width:24px;height:24px;margin-left:3px}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler svg{cursor:pointer;opacity:0;fill:#545454;-webkit-transition:opacity .5s ease-out;transition:opacity .5s ease-out}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu{position:absolute;top:0;right:24px;display:none;border:1px solid var(--box_border-color);z-index:10;background:#fff;-webkit-box-shadow:0 0 7.5px 0 hsla(0,0%,50.2%,.5);box-shadow:0 0 7.5px 0 hsla(0,0%,50.2%,.5)}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu ul{list-style-type:none;margin:0;padding:0}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu ul>li{cursor:pointer;white-space:nowrap;padding:0 12px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;line-height:30px}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu ul>li:not(:last-child){border-bottom:1px solid var(--box_border-color)}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu ul>li .icon{margin-right:5px}#box-container .box-wrapper .row-actions-wrapper .row-actions-toggler .row-action-menu.open{display:block}#box-container .box-wrapper:hover .row-actions-wrapper .row-actions-toggler svg{opacity:1}:host(.no-shadow) #box-container .box{border:none}:host(.no-shadow) #box-container .box.selected,:host(.no-shadow) #box-container .box:hover{-webkit-box-shadow:none;box-shadow:none}#filter-panel,#sort-panel{margin-bottom:1rem}#filter-panel kup-text-input{--kup-text-input_border-color:#d0d0d0;--kup-text-input_color:#545454}#filter-panel svg{fill:grey;margin-left:3px}\@-webkit-keyframes rotate-icon{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}\@-moz-keyframes rotate-icon{0%{transform:rotate(0deg)}to{transform:rotate(180deg)}}\@-o-keyframes rotate-icon{0%{transform:rotate(0deg)}to{transform:rotate(180deg)}}\@keyframes rotate-icon{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}"; },
        enumerable: true,
        configurable: true
    });
    return KupBox;
}());
export { KupBox as kup_box };
