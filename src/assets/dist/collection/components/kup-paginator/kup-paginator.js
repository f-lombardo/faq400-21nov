import { h } from '@stencil/core';
export class KupPaginator {
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
    // render functions
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
            // adding 'max' option
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
                h("slot", { name: "more-results" }),
                "Mostra",
                h("select", { onChange: (e) => this.onRowsPerPage(e) }, rowsPerPageOptions),
                "righe per pagina")));
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
