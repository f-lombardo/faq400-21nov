'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-c31c1549.js');
const __chunk_5 = require('./chunk-a2cd5f7a.js');

class KupPaginator {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.max = 0;
        this.perPage = 10;
        this.selectedPerPage = 10;
        this.currentPage = 1;
        this.mode = __chunk_5.PaginatorMode.FULL;
        this.kupPageChanged = __chunk_1.createEvent(this, "kupPageChanged", 6);
        this.kupRowsPerPageChanged = __chunk_1.createEvent(this, "kupRowsPerPageChanged", 6);
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
        return (__chunk_1.h("div", { id: "paginator" }, __chunk_1.h("div", { class: "align-left" }, __chunk_1.h("div", { class: "nav-section" }, __chunk_1.h("span", { class: "prev-page" }, __chunk_1.h("icon", { className: prevPageClassName, onclick: () => this.onPrevPage() })), __chunk_1.h("kup-combo", { usePortal: true, items: goToPageItems, isFilterable: false, initialValue: {
                id: this.currentPage,
            }, onKetchupComboSelected: (e) => this.onPageChange(e) }), __chunk_1.h("span", { class: "next-page" }, __chunk_1.h("icon", { className: nextPageClassName, onclick: () => this.onNextPage() }))), __chunk_1.h("div", { class: "tot-section" }, __chunk_1.h("span", null, "Righe:"), __chunk_1.h("slot", { name: "more-results" }), __chunk_1.h("kup-combo", { usePortal: true, items: rowsPerPageItems, isFilterable: false, initialValue: {
                id: this.perPage,
            }, onKetchupComboSelected: (e) => this.onRowsPerPage(e) }), __chunk_1.h("slot", { name: "right" }), __chunk_1.h("span", { class: "nextPageGroup" }, "di ", this.max))), __chunk_1.h("div", { class: "align-left" })));
    }
    static get style() { return "\@import url(https://cdn.materialdesignicons.com/4.5.95/css/materialdesignicons.min.css);:host{--int_text-color:var(--kup-paginator_text-color,#545454);--int_font-size:var(--kup-paginator_font-size,1rem);--int_box-shadow:var(--kup-paginator_box-shadow,none);--int_icon-background:var(--kup-paginator_icon-background,transparent);--int_icon-color:var(--kup-paginator_icon-color,#545454)}#paginator{color:var(--int_text-color);margin:.5rem 0;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;font-size:var(--int_font-size)}#paginator .mdi:before{font-size:120%}#paginator .align-left{margin-left:.5rem}#paginator .align-right{margin-right:.5rem}#paginator .align-left,#paginator .align-right{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-shadow:var(--int_box-shadow);box-shadow:var(--int_box-shadow)}#paginator .align-left .counter-icon,#paginator .align-left .paging-icon,#paginator .align-left .row-number-icon,#paginator .align-right .counter-icon,#paginator .align-right .paging-icon,#paginator .align-right .row-number-icon{background:var(--int_icon-background);color:var(--int_icon-color);padding:0 .25rem;cursor:help}#paginator icon{cursor:pointer;opacity:1;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}#paginator icon:hover:not(.disabled){opacity:.75}#paginator icon.disabled{cursor:default;opacity:.3}#paginator .next-page,#paginator .prev-page{margin:0 .25rem}#paginator kup-combo{margin:0 .25rem;--kup-combo_input_border-color:transparent;--kup-combo_input_border-color--selected:transparent}:host([mode=simple]) #paginator .align-left .next-page,:host([mode=simple]) #paginator .align-left .prev-page,:host([mode=simple]) #paginator .align-right{display:none}"; }
}

exports.kup_paginator = KupPaginator;
