import { h } from '@stencil/core';
import { ChartType, ChartAspect, } from './kup-chart-declarations';
import { convertColumns, convertRows } from './kup-chart-builder';
import { getColumnByName } from '../kup-data-table/kup-data-table-helper';
export class KupChart {
    constructor() {
        this.types = [ChartType.Hbar];
        this.colors = [];
        this.legend = true;
        this.stacked = false;
        this.showMarks = false;
        /**
         * Google chart version to load
         */
        this.version = '45.2';
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
                    event.column = getColumnByName(this.data.columns, this.series[originalColIndex - 1]);
                }
                else {
                    event.column = getColumnByName(this.data.columns, this.series[0]);
                }
            }
            this.kupChartClicked.emit(event);
        }
    }
    render() {
        return h("div", { id: "chart", ref: (el) => (this.chartContainer = el) });
    }
    static get is() { return "kup-chart"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "data": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DataTable",
                "resolved": "DataTable",
                "references": {
                    "DataTable": {
                        "location": "import",
                        "path": "../kup-data-table/kup-data-table-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "types": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "ChartType[]",
                "resolved": "ChartType[]",
                "references": {
                    "ChartType": {
                        "location": "import",
                        "path": "./kup-chart-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[ChartType.Hbar]"
        },
        "axis": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "axis",
            "reflect": false
        },
        "series": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "asp": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ChartAspect",
                "resolved": "ChartAspect.D2 | ChartAspect.D3",
                "references": {
                    "ChartAspect": {
                        "location": "import",
                        "path": "./kup-chart-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "asp",
            "reflect": false
        },
        "colors": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "width": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "width",
            "reflect": false
        },
        "height": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "height",
            "reflect": false
        },
        "legend": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "legend",
            "reflect": false,
            "defaultValue": "true"
        },
        "stacked": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "stacked",
            "reflect": false,
            "defaultValue": "false"
        },
        "graphTitle": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "graph-title",
            "reflect": false
        },
        "graphTitleColor": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "graph-title-color",
            "reflect": false
        },
        "graphTitleSize": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "graph-title-size",
            "reflect": false
        },
        "showMarks": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "show-marks",
            "reflect": false,
            "defaultValue": "false"
        },
        "version": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Google chart version to load"
            },
            "attribute": "version",
            "reflect": false,
            "defaultValue": "'45.2'"
        }
    }; }
    static get events() { return [{
            "method": "kupChartClicked",
            "name": "kupChartClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Triggered when a chart serie is clicked"
            },
            "complexType": {
                "original": "ChartClickedEvent",
                "resolved": "ChartClickedEvent",
                "references": {
                    "ChartClickedEvent": {
                        "location": "import",
                        "path": "./kup-chart-declarations"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
}
