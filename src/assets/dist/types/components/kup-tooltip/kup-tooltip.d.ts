import { EventEmitter } from '../../stencil.core';
import { DataTable, Row } from '../kup-data-table/kup-data-table-declarations';
import { TooltipData } from './kup-tooltip-declarations';
export declare class KupTooltip {
    /**
     * Layout used to display the items
     */
    layout: string;
    /**
     * Data for top section
     */
    data: TooltipData;
    /**
     * Data for the detail
     */
    detailData: DataTable;
    visible: boolean;
    tooltipEl: HTMLElement;
    kupTooltipLoadData: EventEmitter;
    kupTooltipLoadDetail: EventEmitter;
    onDataChanged(): void;
    private tooltipPosition;
    private tooltipTimeout;
    private loadDetailTimeout;
    private wrapperEl;
    private hasDetailData;
    private resetTimeouts;
    private loadDetail;
    readonly rows: Row[];
    private getImage;
    private getTitle;
    private getContent;
    private onMouseOver;
    private onMouseLeave;
    private getDefaultLayout;
    private getLayout2;
    private getLayout3;
    private getInfos;
    private positionRecalc;
    private createTooltip;
    render(): any;
}
