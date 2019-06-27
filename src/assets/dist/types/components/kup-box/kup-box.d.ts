import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Column, Row } from '../kup-data-table/kup-data-table-declarations';
import { Layout } from './kup-box-declarations';
export declare class KupBox {
    data: {
        columns?: Array<Column>;
        rows?: Array<Row>;
    };
    layout: Layout;
    columns: number;
    sortEnabled: boolean;
    filterEnabled: boolean;
    sortBy: string;
    multiSelection: boolean;
    private globalFilterValue;
    private collapsedSection;
    kupBoxClicked: EventEmitter<{
        row: Row;
        column?: string;
    }>;
    kupBoxSelected: EventEmitter<{
        rows: Row[];
    }>;
    private boxLayout;
    private rows;
    private selectedRows;
    recalculateRows(): void;
    onDataChanged(): void;
    componentWillLoad(): void;
    private getColumns;
    private getVisibleColumns;
    private getRows;
    private initRows;
    private sortRows;
    private checkLayout;
    private onSortChange;
    private onGlobalFilterChange;
    private isSectionExpanded;
    private onBoxClick;
    private onSelectionCheckChange;
    private toggleSectionExpand;
    private renderRow;
    private renderSection;
    private renderBoxObject;
    render(): JSX.Element;
}
