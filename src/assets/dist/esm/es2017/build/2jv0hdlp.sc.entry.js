import { h } from '../mycomponent.core.js';

var ChartType;
(function (ChartType) {
    ChartType["Area"] = "Area";
    ChartType["Bubble"] = "Bubble";
    ChartType["Cal"] = "Cal";
    ChartType["Candlestick"] = "Candlestick";
    ChartType["Combo"] = "Combo";
    ChartType["Geo"] = "Geo";
    ChartType["Hbar"] = "Hbar";
    ChartType["Line"] = "Line";
    ChartType["Ohlc"] = "Ohlc";
    ChartType["Pie"] = "Pie";
    ChartType["Sankey"] = "Sankey";
    ChartType["Scatter"] = "Scatter";
    ChartType["Unk"] = "Unk";
    ChartType["Vbar"] = "Vbar";
})(ChartType || (ChartType = {}));

const convertColumns = (data, config) => {
    if (!data || !config || !config.series) {
        return [];
    }
    const columns = [];
    columns.push(config.axe);
    config.series.map((serie) => {
        let c;
        for (let i = 0; i < data.columns.length; i++) {
            const column = data.columns[i];
            if (serie === column.name) {
                c = column;
                break;
            }
        }
        if (c) {
            columns.push(c.name);
        }
    });
    return columns;
};
const convertRows = (data, series) => {
    if (!data) {
        return [];
    }
    const rows = [];
    if (data.rows) {
        data.rows.forEach((r) => {
            const cells = r.cells;
            const currentRow = [];
            series.forEach((serie) => {
                const cell = cells[serie];
                if (cell && cell.obj) {
                    if ('NR' === cell.obj.t) {
                        currentRow.push(parseFloat(cell.obj.k));
                    }
                    else {
                        currentRow.push(cell.obj.k);
                    }
                }
            });
            rows.push(currentRow);
        });
    }
    return rows;
};

class KetchupChart {
    constructor() {
        this.config = {
            type: ChartType.Hbar,
            axe: 'Col1',
            series: ['Col2', 'Col3'],
        };
    }
    componentDidLoad() {
        if (!this.config.axe || !this.config.series) {
            return;
        }
        if (google) {
            try {
                this._loadGoogleChart();
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    componentWillUpdate() {
        if (this.gChart) {
            this.gChart.clearChart();
        }
    }
    componentDidUpdate() {
        this._loadGoogleChart();
    }
    _loadGoogleChart() {
        google.charts.setOnLoadCallback(this._createChart.bind(this));
    }
    _createGoogleChart() {
        switch (this.config.type) {
            case ChartType.Area:
                return new google.visualization.AreaChart(this.chartContainer);
            case ChartType.Bubble:
                return new google.visualization.BubbleChart(this.chartContainer);
            case ChartType.Cal:
                return new google.visualization.Calendar(this.chartContainer);
            case ChartType.Candlestick:
                return new google.visualization.CandlestickChart(this.chartContainer);
            case ChartType.Combo:
                return new google.visualization.ComboChart(this.chartContainer);
            case ChartType.Geo:
                return new google.visualization.GeoChart(this.chartContainer);
            case ChartType.Hbar:
                return new google.visualization.BarChart(this.chartContainer);
            case ChartType.Line:
                return new google.visualization.LineChart(this.chartContainer);
            case ChartType.Pie:
                return new google.visualization.PieChart(this.chartContainer);
            case ChartType.Sankey:
                return new google.visualization.Sankey(this.chartContainer);
            case ChartType.Scatter:
                return new google.visualization.ScatterChart(this.chartContainer);
            default:
                return new google.visualization.ColumnChart(this.chartContainer);
        }
    }
    _createGoogleChartOptions() {
        if (!this.config) {
            return {};
        }
        const opts = {};
        opts.is3D = '3D' === this.config.asp;
        if (this.config.colors) {
            opts.colors = this.config.colors;
        }
        if (this.config.width) {
            try {
                opts.width = this.config.width;
            }
            catch (e) {
                console.error(e);
            }
        }
        if (this.config.height) {
            try {
                opts.height = this.config.height;
            }
            catch (e) {
                console.error(e);
            }
        }
        if (this.config.hasOwnProperty('leg') && !this.config.leg) {
            opts.legend = {
                position: 'none',
            };
        }
        if (this.config.stacked &&
            (ChartType.Hbar === this.config.type ||
                ChartType.Vbar === this.config.type)) {
            opts.isStacked = true;
        }
        if (this.config.title) {
            opts.title = this.config.title;
            opts.titleTextStyle = {};
            if (this.config.titleColor) {
                opts.titleTextStyle.color = this.config.titleColor;
            }
            if (this.config.titleSize) {
                opts.titleTextStyle.fontSize = this.config.titleSize;
            }
        }
        return opts;
    }
    _createChart() {
        const tableColumns = convertColumns(this.data, this.config);
        const tableRows = convertRows(this.data, tableColumns);
        const dataTable = new google.visualization.arrayToDataTable([
            tableColumns,
            ...tableRows,
        ]);
        this.gChart = this._createGoogleChart();
        const options = this._createGoogleChartOptions();
        this.gChart.draw(dataTable, options);
    }
    render() {
        return (h("div", { id: "chart", ref: (el) => (this.chartContainer = el) }));
    }
    static get is() { return "ketchup-chart"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "data": {
            "type": "Any",
            "attr": "data"
        }
    }; }
    static get style() { return ""; }
}

export { KetchupChart };
