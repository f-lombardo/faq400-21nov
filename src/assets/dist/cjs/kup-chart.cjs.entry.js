'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-c31c1549.js');
require('./chunk-d83edcd4.js');
const __chunk_3 = require('./chunk-866cce30.js');

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
var ChartAspect;
(function (ChartAspect) {
    ChartAspect["D2"] = "2D";
    ChartAspect["D3"] = "3D";
})(ChartAspect || (ChartAspect = {}));

function formatToNumber(cell) {
    if (cell.obj) {
        return __chunk_3.numeral(cell.obj.k).value();
    }
    return __chunk_3.numeral(cell.value).value();
}
function formatToMomentDate(cell) {
    let format = 'YYYYMMDD';
    if (cell.obj) {
        const obj = cell.obj;
        if ('D8' === obj.t && '*DMYY' === obj.p) {
            format = 'DDMMYYYY';
        }
        return __chunk_3.moment(cell.obj.k, format);
    }
    return __chunk_3.moment(cell.value, 'DD/MM/YYYY');
}

// TODO this should be in a "data-table" utility file
function getColumnByName(name, columns) {
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        if (name === column.name) {
            return column;
        }
    }
    return null;
}
const convertColumns = (data, { series, axis }) => {
    if (!data || !series) {
        return [];
    }
    const columns = [];
    // axis
    const axisColumn = getColumnByName(axis, data.columns);
    if (axisColumn) {
        columns.push(axisColumn);
    }
    // series
    series.map((serie) => {
        // searching colum
        const c = getColumnByName(serie, data.columns);
        if (c) {
            columns.push(c);
        }
    });
    return columns;
};
const convertRows = (data, columns, showMarks) => {
    if (!data) {
        return [];
    }
    const rows = [];
    if (data.rows) {
        data.rows.forEach((r) => {
            const cells = r.cells;
            const currentRow = [];
            columns.forEach((c, index) => {
                const cell = cells[c.name];
                if (cell && cell.obj) {
                    const addMark = showMarks && index > 0;
                    if (__chunk_3.isNumber(cell.obj)) {
                        const value = formatToNumber(cell);
                        currentRow.push(value);
                        if (addMark) {
                            currentRow.push(value.toString());
                        }
                    }
                    else if (__chunk_3.isDate(cell.obj)) {
                        const value = formatToMomentDate(cell).toDate();
                        currentRow.push(value);
                        if (addMark) {
                            currentRow.push(value.toString());
                        }
                    }
                    else {
                        currentRow.push(cell.obj.k);
                        if (addMark) {
                            currentRow.push(cell.value);
                        }
                    }
                }
            });
            rows.push(currentRow);
        });
    }
    return rows;
};

class KupChart {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.types = [ChartType.Hbar];
        this.colors = [];
        this.legend = true;
        this.stacked = false;
        this.showMarks = false;
        /**
         * Google chart version to load
         */
        this.version = '45.2';
        this.kupChartClicked = __chunk_1.createEvent(this, "kupChartClicked", 6);
    }
    componentDidLoad() {
        if (!this.axis || !this.series) {
            // cannot create chart
            return;
        }
        // loading charts
        if (google) {
            // getting google charts css from main document
            document
                .querySelectorAll(`link[href^="https://www.gstatic.com/charts/${this.version}/css"]`)
                .forEach((node) => this.el.shadowRoot.appendChild(node.cloneNode()));
            try {
                this.loadGoogleChart();
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    componentWillUpdate() {
        if (this.gChart) {
            this.gChart.clearChart();
        }
    }
    componentDidUpdate() {
        this.loadGoogleChart();
    }
    loadGoogleChart() {
        google.charts.setOnLoadCallback(this.createChart.bind(this));
    }
    createGoogleChart() {
        if (this.isComboChart()) {
            return new google.visualization.ComboChart(this.chartContainer);
        }
        else if (this.types.length === 1) {
            switch (this.types[0]) {
                case ChartType.Area:
                    return new google.visualization.AreaChart(this.chartContainer);
                case ChartType.Bubble:
                    return new google.visualization.BubbleChart(this.chartContainer);
                case ChartType.Cal:
                    return new google.visualization.Calendar(this.chartContainer);
                case ChartType.Candlestick:
                    return new google.visualization.CandlestickChart(this.chartContainer);
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
    }
    getMainChartType() {
        if (this.types.length > 0) {
            return this.types[0];
        }
        return ChartType.Unk;
    }
    isComboChart() {
        return this.types.length > 1;
    }
    createGoogleChartOptions() {
        const opts = {
            is3D: ChartAspect.D3 === this.asp,
        };
        if (this.colors && this.colors.length > 0) {
            opts.colors = this.colors;
        }
        if (this.width) {
            opts.width = this.width;
        }
        if (this.height) {
            opts.height = this.height;
        }
        if (!this.legend) {
            opts.legend = {
                position: 'none',
            };
        }
        if (this.stacked &&
            (ChartType.Hbar === this.getMainChartType() ||
                ChartType.Vbar === this.getMainChartType())) {
            opts.isStacked = true;
        }
        if (this.graphTitle) {
            opts.title = this.graphTitle;
            opts.titleTextStyle = {};
            if (this.graphTitleColor) {
                opts.titleTextStyle.color = this.graphTitleColor;
            }
            if (this.graphTitleSize) {
                opts.titleTextStyle.fontSize = this.graphTitleSize;
            }
        }
        // series for combo chart
        if (this.isComboChart()) {
            opts.series = {};
            this.types.forEach((type, index) => {
                let serieType = 'bars';
                if (ChartType.Line === type) {
                    serieType = 'line';
                }
                else if (ChartType.Area === type) {
                    serieType = 'area';
                }
                opts.series[index.toString()] = {
                    type: serieType,
                };
            });
        }
        return opts;
    }
    createChart() {
        const tableColumns = convertColumns(this.data, {
            axis: this.axis,
            series: this.series,
        });
        const tableRows = convertRows(this.data, tableColumns, this.showMarks);
        const dataTableColumns = [];
        for (let i = 0; i < tableColumns.length; i++) {
            const c = tableColumns[i];
            dataTableColumns.push({
                label: c.name,
            });
            if (i > 0 && this.showMarks) {
                dataTableColumns.push({
                    type: 'string',
                    role: 'annotation',
                });
            }
        }
        this.gChartDataTable = new google.visualization.arrayToDataTable([
            dataTableColumns,
            ...tableRows,
        ]);
        this.gChartView = new google.visualization.DataView(this.gChartDataTable);
        this.gChart = this.createGoogleChart();
        const options = this.createGoogleChartOptions();
        this.gChart.draw(this.gChartView, options);
        google.visualization.events.addListener(this.gChart, 'select', this.onChartSelect.bind(this));
    }
    onChartSelect() {
        const selectedItem = this.gChart.getSelection()[0];
        if (selectedItem) {
            const event = {};
            if (selectedItem.date) {
                // calendar chart
                event.datetime = selectedItem.date;
                if (selectedItem.row || selectedItem.row == 0) {
                    const rowIndex = this.gChartView.getTableRowIndex(selectedItem.row);
                    event.row = this.data.rows[rowIndex];
                }
                else {
                    return;
                }
            }
            else {
                // any other chart
                const rowIndex = selectedItem.row;
                const colIndex = selectedItem.column;
                const originalRowIndex = this.gChartView.getTableRowIndex(rowIndex != null ? rowIndex : 0);
                event.row = this.data.rows[originalRowIndex];
                if (this.series.length > 1) {
                    let originalColIndex = this.gChartView.getTableColumnIndex(colIndex != null ? colIndex : 0);
                    // checking if col is annotation
                    if ('annotation' ===
                        this.gChartDataTable.getColumnProperty(originalColIndex, 'role')) {
                        --originalColIndex;
                    }
                    event.column = __chunk_3.getColumnByName(this.data.columns, this.series[originalColIndex - 1]);
                }
                else {
                    event.column = __chunk_3.getColumnByName(this.data.columns, this.series[0]);
                }
            }
            this.kupChartClicked.emit(event);
        }
    }
    render() {
        return __chunk_1.h("div", { id: "chart", ref: (el) => (this.chartContainer = el) });
    }
    get el() { return __chunk_1.getElement(this); }
}

exports.kup_chart = KupChart;
