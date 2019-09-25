import { r as registerInstance, c as createEvent, h } from './chunk-1851c479.js';
import { P as PaginatorMode } from './chunk-8cdcd574.js';

class KupPaginator {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.max = 0;
        this.perPage = 10;
        this.selectedPerPage = 10;
        this.currentPage = 1;
        this.mode = PaginatorMode.FULL;
        this.kupPageChanged = createEvent(this, "kupPageChanged", 6);
        this.kupRowsPerPageChanged = createEvent(this, "kupRowsPerPageChanged", 6);
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
        return (h("div", { id: "paginator" }, h("div", { class: "align-left" }, "Pagina", h("span", { class: "prev-page" }, h("icon", { className: prevPageClassName, onclick: () => this.onPrevPage() })), h("kup-combo", { usePortal: true, items: goToPageItems, isFilterable: false, initialValue: {
                id: this.currentPage,
            }, onKetchupComboSelected: (e) => this.onPageChange(e) }), h("span", { class: "next-page" }, h("icon", { className: nextPageClassName, onclick: () => this.onNextPage() })), h("span", { class: "number-of-pages" }, "di ", maxNumberOfPage)), h("div", { class: "align-right" }, h("span", { class: "nextPageGroup" }, "Numero risultati: ", this.max), h("slot", { name: "more-results" }), "Mostra", h("kup-combo", { usePortal: true, items: rowsPerPageItems, isFilterable: false, initialValue: {
                id: this.perPage,
            }, onKetchupComboSelected: (e) => this.onRowsPerPage(e) }), h("span", { class: "rows-per-page" }, "righe per pagina"), h("slot", { name: "right" }))));
    }
    static get style() { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);:host{--int_text-color:var(--kup-paginator_text-color,#545454);--int_font-size:var(--kup-paginator_font-size,1rem)}#paginator{color:var(--int_text-color);margin:.5rem 0;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:justify;justify-content:space-between;font-size:var(--int_font-size)}#paginator .align-left,#paginator .align-right{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}#paginator icon{cursor:pointer;opacity:1;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}#paginator icon:hover:not(.disabled){opacity:.75}#paginator icon.disabled{cursor:default;opacity:.3}#paginator .nextPageGroup,#paginator select{margin:0 .5rem}#paginator .next-page,#paginator .prev-page{margin:0 .25rem}#paginator .nextPageGroup{padding-right:1.5rem}#paginator .number-of-pages,#paginator .rows-per-page{color:#bdbdbd}#paginator kup-combo{margin:0 .25rem}:host([mode=simple]) #paginator .align-left .next-page,:host([mode=simple]) #paginator .align-left .prev-page,:host([mode=simple]) #paginator .align-right{display:none}"; }
}

export { KupPaginator as kup_paginator };
