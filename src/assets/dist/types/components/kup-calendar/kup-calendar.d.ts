import { EventEmitter } from '../../stencil.core';
import { DataTable, Row } from '../kup-data-table/kup-data-table-declarations';
export declare class KupCalendar {
    data: DataTable;
    dateCol: string;
    descrCol: string;
    styleCol: string;
    iconCol: string;
    imageCol: string;
    startCol: string;
    endCol: string;
    weekView: boolean;
    hideNavigation: boolean;
    initialDate: string;
    /**
     * When an event is clicked
     */
    kupCalendarEventClicked: EventEmitter<Row>;
    /**
     * When a date is clicked
     */
    kupCalendarDateClicked: EventEmitter<Date>;
    /**
     * When a date is dropped
     */
    kupCalendarEventDropped: EventEmitter<{
        fromDate: {
            start: Date;
            end: Date;
        };
        toDate: {
            start: Date;
            end: Date;
        };
    }>;
    /**
     * When the navigation change
     */
    kupCalendarViewChanged: EventEmitter<{
        from: Date;
        to: Date;
    }>;
    private calendar;
    private calendarContainer;
    private getColumns;
    private getRows;
    private getEvents;
    private onPrev;
    private onNext;
    private emitNavEvent;
    private onToday;
    componentDidLoad(): void;
    componentDidUnload(): void;
    render(): any;
}
