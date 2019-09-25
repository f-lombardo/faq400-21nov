import { EventEmitter } from '../../stencil.core';
import { PaginatorMode } from './kup-paginator-declarations';
export declare class KupPaginator {
    max: number;
    perPage: number;
    selectedPerPage: number;
    currentPage: number;
    mode: PaginatorMode;
    /**
     * When the current page change
     */
    kupPageChanged: EventEmitter<{
        newPage: number;
    }>;
    /**
     * When the rows per page change
     */
    kupRowsPerPageChanged: EventEmitter<{
        newRowsPerPage: number;
    }>;
    private isPrevPageDisabled;
    private isNextPageDisabled;
    private onPageChange;
    private onPrevPage;
    private onNextPage;
    private onRowsPerPage;
    private getGoToPageItems;
    private getRowsPerPageItems;
    render(): any;
}
