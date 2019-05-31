import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class KetchupPaginator {
    private max;
    private perPage;
    private selectedPerPage;
    private currentPage;
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
