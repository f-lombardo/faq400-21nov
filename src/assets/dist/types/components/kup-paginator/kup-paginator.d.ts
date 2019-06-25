import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class KupPaginator {
    max: number;
    perPage: number;
    selectedPerPage: number;
    currentPage: number;
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
    private onPrevPage;
    private onNextPage;
    private onGoToPage;
    private onRowsPerPage;
    private getGoToPageOptions;
    private getRowsPerPageOptions;
    render(): JSX.Element;
}
