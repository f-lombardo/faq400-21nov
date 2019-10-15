import { EventEmitter } from '../../stencil.core';
import { ChartType, ChartAspect, ChartClickedEvent } from './kup-chart-declarations';
import { DataTable } from '../kup-data-table/kup-data-table-declarations';
export declare class KupChart {
    data: DataTable;
    types: ChartType[];
    axis: string;
    series: string[];
    asp: ChartAspect;
    colors: string[];
    width: number;
    height: number;
    legend: boolean;
    stacked: boolean;
    graphTitle: string;
    graphTitleColor: string;
    graphTitleSize: number;
    showMarks: boolean;
    /**
     * Google chart version to load
     */
    version: string;
    el: HTMLElement;
    /**
     * Triggered when a chart serie is clicked
     */
    kupChartClicked: EventEmitter<ChartClickedEvent>;
    private chartContainer?;
    private gChart;
    private gChartDataTable;
    private gChartView;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    private loadGoogleChart;
    private createGoogleChart;
    private getMainChartType;
    private isComboChart;
    private createGoogleChartOptions;
    private createChart;
    private onChartSelect;
    render(): any;
}
