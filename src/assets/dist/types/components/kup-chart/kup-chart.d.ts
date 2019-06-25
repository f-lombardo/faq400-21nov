import '../../stencil.core';
import { ChartConfig } from './kup-chart-declarations';
export declare class KupChart {
    data: any;
    config: ChartConfig;
    private chartContainer?;
    private gChart;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    private _loadGoogleChart;
    private _createGoogleChart;
    private _createGoogleChartOptions;
    private _createChart;
    render(): JSX.Element;
}
