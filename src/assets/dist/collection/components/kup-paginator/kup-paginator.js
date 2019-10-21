import { h } from '@stencil/core';
import { PaginatorMode } from './kup-paginator-declarations';
export class KupPaginator {
    constructor() {
        this.max = 0;
        this.perPage = 10;
        this.selectedPerPage = 10;
        this.currentPage = 1;
        this.mode = PaginatorMode.FULL;
    }
    isPrevPageDisabled() {
        return this.currentPage == 1;
    }
    isNextPageDisabled() {
        return this.currentPage * this.perPage >= this.max;
    }
    onPageChange(event) {
        event.stopPropagation();
        if (event.detail.value) {
            this.kupPageChanged.emit({
                newPage: event.detail.value['id'],
            });
        }
    }
    onPrevPage() {
        if (this.isPrevPageDisabled()) {
            return;
        }
        // fire next page event
        this.kupPageChanged.emit({
            newPage: this.currentPage - 1,
        });
    }
    onNextPage() {
        if (this.isNextPageDisabled()) {
            return;
        }
        // fire next page event
        this.kupPageChanged.emit({
            newPage: this.currentPage + 1,
        });
    }
    onRowsPerPage(event) {
        event.stopPropagation();
        if (event.detail.value) {
            this.kupRowsPerPageChanged.emit({
                newRowsPerPage: event.detail.value.id,
            });
        }
    }
    // render functions
    getGoToPageItems(maxNumberOfPage) {
        const goToPageItems = [];
        for (let i = 1; i <= maxNumberOfPage; i++) {
            const item = {};
            item['id'] = i;
            goToPageItems.push(item);
        }
        return goToPageItems;
    }
    getRowsPerPageItems() {
        const rowsPerPageItems = [];
        if (this.currentPage !== this.max) {
            let i = this.perPage;
            if (i === 0) {
                return rowsPerPageItems;
            }
            while (i < this.max) {
                rowsPerPageItems.push({
                    id: i,
                });
                i = i * 2;
            }
            // adding 'max' option
            rowsPerPageItems.push({
                id: this.max,
            });
        }
        else {
            rowsPerPageItems.push({
                id: this.perPage,
            });
        }
        return rowsPerPageItems;
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
        const goToPageItems = this.getGoToPageItems(maxNumberOfPage);
        const rowsPerPageItems = this.getRowsPerPageItems();
        return (h("div", { id: "paginator" },
            h("div", { class: "align-left" },
                h("div", { class: "nav-section" },
                    h("span", { class: "prev-page" },
                        h("icon", { className: prevPageClassName, onclick: () => this.onPrevPage() })),
                    h("kup-combo", { usePortal: true, items: goToPageItems, isFilterable: false, initialValue: {
                            id: this.currentPage,
                        }, onKetchupComboSelected: (e) => this.onPageChange(e) }),
                    h("span", { class: "next-page" },
                        h("icon", { className: nextPageClassName, onclick: () => this.onNextPage() }))),
                h("div", { class: "tot-section" },
                    h("span", null, "Righe:"),
                    h("slot", { name: "more-results" }),
                    h("kup-combo", { usePortal: true, items: rowsPerPageItems, isFilterable: false, initialValue: {
                            id: this.perPage,
                        }, onKetchupComboSelected: (e) => this.onRowsPerPage(e) }),
                    h("slot", { name: "right" }),
                    h("span", { class: "nextPageGroup" },
                        "di ",
                        this.max))),
            h("div", { class: "align-left" })));
    }
    static get is() { return "kup-paginator"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-paginator.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-paginator.css"]
    }; }
    static get properties() { return {
        "max": {
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
                "text": ""
            },
            "attribute": "max",
            "reflect": false,
            "defaultValue": "0"
        },
        "perPage": {
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
                "text": ""
            },
            "attribute": "per-page",
            "reflect": false,
            "defaultValue": "10"
        },
        "selectedPerPage": {
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
                "text": ""
            },
            "attribute": "selected-per-page",
            "reflect": false,
            "defaultValue": "10"
        },
        "currentPage": {
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
                "text": ""
            },
            "attribute": "current-page",
            "reflect": false,
            "defaultValue": "1"
        },
        "mode": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "PaginatorMode",
                "resolved": "PaginatorMode.FULL | PaginatorMode.SIMPLE",
                "references": {
                    "PaginatorMode": {
                        "location": "import",
                        "path": "./kup-paginator-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "mode",
            "reflect": true,
            "defaultValue": "PaginatorMode.FULL"
        }
    }; }
    static get events() { return [{
            "method": "kupPageChanged",
            "name": "kupPageChanged",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When the current page change"
            },
            "complexType": {
                "original": "{ newPage: number }",
                "resolved": "{ newPage: number; }",
                "references": {}
            }
        }, {
            "method": "kupRowsPerPageChanged",
            "name": "kupRowsPerPageChanged",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When the rows per page change"
            },
            "complexType": {
                "original": "{ newRowsPerPage: number }",
                "resolved": "{ newRowsPerPage: number; }",
                "references": {}
            }
        }]; }
}
