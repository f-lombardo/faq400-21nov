import '../../stencil.core';
import { ChartConfig } from './ketchup-chart-declarations';
export declare class KetchupChart {
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
