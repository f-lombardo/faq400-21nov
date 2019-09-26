import { r as registerInstance, c as createEvent, h, g as getElement } from './chunk-1851c479.js';
import './chunk-d8060b98.js';
import { n as numeral, r as moment, d as isNumber, t as isDate, o as getColumnByName$1 } from './chunk-6abc1eda.js';
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
        return numeral(cell.obj.k).value();
    }
    return numeral(cell.value).value();
}
function formatToMomentDate(cell) {
    var format = 'YYYYMMDD';
    if (cell.obj) {
        var obj = cell.obj;
        if ('D8' === obj.t && '*DMYY' === obj.p) {
            format = 'DDMMYYYY';
        }
        return moment(cell.obj.k, format);
    }
    return moment(cell.value, 'DD/MM/YYYY');
}
// TODO this should be in a "data-table" utility file
function getColumnByName(name, columns) {
    for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        if (name === column.name) {
            return column;
        }
    }
    return null;
}
var convertColumns = function (data, _a) {
    var series = _a.series, axis = _a.axis;
    if (!data || !series) {
        return [];
    }
    var columns = [];
    // axis
    var axisColumn = getColumnByName(axis, data.columns);
    if (axisColumn) {
        columns.push(axisColumn);
    }
    // series
    series.map(function (serie) {
        // searching colum
        var c = getColumnByName(serie, data.columns);
        if (c) {
            columns.push(c);
        }
    });
    return columns;
};
var convertRows = function (data, columns, showMarks) {
    if (!data) {
        return [];
    }
    var rows = [];
    if (data.rows) {
        data.rows.forEach(function (r) {
            var cells = r.cells;
            var currentRow = [];
            columns.forEach(function (c, index) {
                var cell = cells[c.name];
                if (cell && cell.obj) {
                    var addMark = showMarks && index > 0;
                    if (isNumber(cell.obj)) {
                        var value = formatToNumber(cell);
                        currentRow.push(value);
                        if (addMark) {
                            currentRow.push(value.toString());
                        }
                    }
                    else if (isDate(cell.obj)) {
                        var value = formatToMomentDate(cell).toDate();
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
var KupChart = /** @class */ (function () {
    function KupChart(hostRef) {
        registerInstance(this, hostRef);
        this.types = [ChartType.Hbar];
        this.colors = [];
        this.legend = true;
        this.stacked = false;
        this.showMarks = false;
        /**
         * Google chart version to load
         */
        this.version = '45.2';
        this.kupChartClicked = createEvent(this, "kupChartClicked", 6);
    }
    KupChart.prototype.componentDidLoad = function () {
        var _this = this;
        if (!this.axis || !this.series) {
            // cannot create chart
            return;
        }
        // loading charts
        if (google) {
            // getting google charts css from main document
            document
                .querySelectorAll("link[href^=\"https://www.gstatic.com/charts/" + this.version + "/css\"]")
                .forEach(function (node) { return _this.el.shadowRoot.appendChild(node.cloneNode()); });
            try {
                this.loadGoogleChart();
            }
            catch (err) {
                console.error(err);
            }
        }
    };
    KupChart.prototype.componentWillUpdate = function () {
        if (this.gChart) {
            this.gChart.clearChart();
        }
    };
    KupChart.prototype.componentDidUpdate = function () {
        this.loadGoogleChart();
    };
    KupChart.prototype.loadGoogleChart = function () {
        google.charts.setOnLoadCallback(this.createChart.bind(this));
    };
    KupChart.prototype.createGoogleChart = function () {
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
    };
    KupChart.prototype.getMainChartType = function () {
        if (this.types.length > 0) {
            return this.types[0];
        }
        return ChartType.Unk;
    };
    KupChart.prototype.isComboChart = function () {
        return this.types.length > 1;
    };
    KupChart.prototype.createGoogleChartOptions = function () {
        var opts = {
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
            this.types.forEach(function (type, index) {
                var serieType = 'bars';
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
    };
    KupChart.prototype.createChart = function () {
        var tableColumns = convertColumns(this.data, {
            axis: this.axis,
            series: this.series,
        });
        var tableRows = convertRows(this.data, tableColumns, this.showMarks);
        var dataTableColumns = [];
        for (var i = 0; i < tableColumns.length; i++) {
            var c = tableColumns[i];
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
            dataTableColumns
        ].concat(tableRows));
        this.gChartView = new google.visualization.DataView(this.gChartDataTable);
        this.gChart = this.createGoogleChart();
        var options = this.createGoogleChartOptions();
        this.gChart.draw(this.gChartView, options);
        google.visualization.events.addListener(this.gChart, 'select', this.onChartSelect.bind(this));
    };
    KupChart.prototype.onChartSelect = function () {
        var selectedItem = this.gChart.getSelection()[0];
        if (selectedItem) {
            var event = {};
            if (selectedItem.date) {
                // calendar chart
                event.datetime = selectedItem.date;
                if (selectedItem.row || selectedItem.row == 0) {
                    var rowIndex = this.gChartView.getTableRowIndex(selectedItem.row);
                    event.row = this.data.rows[rowIndex];
                }
                else {
                    return;
                }
            }
            else {
                // any other chart
                var rowIndex = selectedItem.row;
                var colIndex = selectedItem.column;
                var originalRowIndex = this.gChartView.getTableRowIndex(rowIndex != null ? rowIndex : 0);
                event.row = this.data.rows[originalRowIndex];
                if (this.series.length > 1) {
                    var originalColIndex = this.gChartView.getTableColumnIndex(colIndex != null ? colIndex : 0);
                    // checking if col is annotation
                    if ('annotation' ===
                        this.gChartDataTable.getColumnProperty(originalColIndex, 'role')) {
                        --originalColIndex;
                    }
                    event.column = getColumnByName$1(this.data.columns, this.series[originalColIndex - 1]);
                }
                else {
                    event.column = getColumnByName$1(this.data.columns, this.series[0]);
                }
            }
            this.kupChartClicked.emit(event);
        }
    };
    KupChart.prototype.render = function () {
        var _this = this;
        return h("div", { id: "chart", ref: function (el) { return (_this.chartContainer = el); } });
    };
    Object.defineProperty(KupChart.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return KupChart;
}());
export { KupChart as kup_chart };
