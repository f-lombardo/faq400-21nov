import { h } from '@stencil/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { formatToMomentDate } from '../../utils/cell-formatter';
import { getColumnByName } from '../kup-data-table/kup-data-table-helper';
import moment from 'moment';
export class KupCalendar {
    constructor() {
        this.weekView = false;
        this.hideNavigation = false;
        this.calendarContainer = null;
    }
    // ---- Private methods ----
    getColumns() {
        if (this.data && this.data.rows) {
            return this.data.columns;
        }
        return [];
    }
    getRows() {
        if (this.data && this.data.rows) {
            return this.data.rows;
        }
        return [];
    }
    getEvents() {
        const isHourRange = this.startCol &&
            this.endCol &&
            getColumnByName(this.getColumns(), this.startCol) &&
            getColumnByName(this.getColumns(), this.endCol);
        return this.getRows().map((row) => {
            const startDate = formatToMomentDate(row.cells[this.dateCol]);
            const endDate = formatToMomentDate(row.cells[this.dateCol]);
            if (isHourRange) {
                const startCell = row.cells[this.startCol];
                const endCell = row.cells[this.endCol];
                if (startCell && endCell) {
                    const momentStart = moment(startCell.value, 'HH:mm:ss');
                    const momentEnd = moment(endCell.value, 'HH:mm:ss');
                    startDate.hours(momentStart.hours());
                    startDate.minutes(momentStart.minutes());
                    startDate.seconds(momentStart.seconds());
                    endDate.hours(momentEnd.hours());
                    endDate.minutes(momentEnd.minutes());
                    endDate.seconds(momentEnd.seconds());
                }
            }
            const allDay = !isHourRange;
            return {
                title: row.cells[this.descrCol].value,
                allDay,
                start: startDate.toISOString(),
                end: endDate.toISOString(),
                extendedProps: {
                    row,
                },
            };
        });
    }
    onPrev() {
        this.calendar.prev();
        this.emitNavEvent();
    }
    onNext() {
        this.calendar.next();
        this.emitNavEvent();
    }
    emitNavEvent() {
        // see https://fullcalendar.io/docs/view-object
        const to = moment(this.calendar.view.currentEnd)
            .subtract(1, 'day')
            .toDate();
        this.kupCalendarViewChanged.emit({
            from: this.calendar.view.currentStart,
            to,
        });
    }
    onToday() {
        this.calendar.today();
    }
    // ---- Lifecycle ----
    componentDidLoad() {
        const plugins = [interactionPlugin];
        if (this.weekView) {
            plugins.push(timeGridPlugin);
        }
        else {
            plugins.push(dayGridPlugin);
        }
        this.calendar = new Calendar(this.calendarContainer, {
            plugins,
            events: this.getEvents(),
            header: {
                left: '',
                center: 'title',
                right: '',
            },
            defaultView: this.weekView ? 'timeGridWeek' : 'dayGridMonth',
            defaultDate: this.initialDate ? this.initialDate : null,
            editable: true,
            eventRender: (info) => {
                if (this.styleCol) {
                    const row = info.event.extendedProps.row;
                    const cell = row.cells[this.styleCol];
                    if (cell && cell.style) {
                        Object.keys(cell.style).forEach((k) => (info.el.style[k] = cell.style[k]));
                    }
                }
                if (this.iconCol) {
                    const row = info.event.extendedProps.row;
                    const cell = row.cells[this.iconCol];
                    if (cell && cell.value) {
                        const wrapper = document.createElement('div');
                        wrapper.classList.add('icon-wrapper');
                        cell.value.split(';').forEach((icon) => {
                            const span = document.createElement('span');
                            span.className = icon;
                            wrapper.appendChild(span);
                        });
                        info.el.appendChild(wrapper);
                    }
                }
                if (this.imageCol) {
                    const row = info.event.extendedProps.row;
                    const cell = row.cells[this.imageCol];
                    if (cell && cell.value) {
                        const wrapper = document.createElement('div');
                        wrapper.classList.add('image-wrapper');
                        cell.value.split(';').forEach((icon) => {
                            const img = document.createElement('img');
                            img.src = icon;
                            wrapper.appendChild(img);
                        });
                        info.el.appendChild(wrapper);
                    }
                }
            },
            eventClick: ({ event }) => {
                // see https://fullcalendar.io/docs/eventClick
                this.kupCalendarEventClicked.emit(event.extendedProps.row);
            },
            eventDrop: ({ event, oldEvent }) => {
                // https://fullcalendar.io/docs/eventDrop
                this.kupCalendarEventDropped.emit({
                    fromDate: {
                        start: oldEvent.start,
                        end: oldEvent.end,
                    },
                    toDate: {
                        start: event.start,
                        end: event.end,
                    },
                });
            },
            dateClick: ({ date }) => {
                // see https://fullcalendar.io/docs/dateClick
                this.kupCalendarDateClicked.emit(date);
            },
        });
        this.calendar.render();
    }
    componentDidUnload() {
        if (this.calendar) {
            this.calendar.destroy();
        }
    }
    render() {
        return (h("div", { id: "kup-calendar" },
            this.hideNavigation ? null : (h("div", { id: "kup-calendar__menu" },
                h("kup-button", { iconClass: "mdi mdi-chevron-left", onKupButtonClicked: () => this.onPrev() }),
                h("kup-button", { iconClass: "mdi mdi-chevron-right", onKupButtonClicked: () => this.onNext() }),
                h("kup-button", { iconClass: "mdi mdi-calendar-today", onKupButtonClicked: () => this.onToday() }))),
            h("div", { ref: (el) => (this.calendarContainer = el) })));
    }
    static get is() { return "kup-calendar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-calendar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-calendar.css"]
    }; }
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
        "dateCol": {
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
            "attribute": "date-col",
            "reflect": true
        },
        "descrCol": {
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
            "attribute": "descr-col",
            "reflect": true
        },
        "styleCol": {
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
            "attribute": "style-col",
            "reflect": true
        },
        "iconCol": {
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
            "attribute": "icon-col",
            "reflect": true
        },
        "imageCol": {
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
            "attribute": "image-col",
            "reflect": true
        },
        "startCol": {
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
            "attribute": "start-col",
            "reflect": true
        },
        "endCol": {
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
            "attribute": "end-col",
            "reflect": true
        },
        "weekView": {
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
            "attribute": "week-view",
            "reflect": true,
            "defaultValue": "false"
        },
        "hideNavigation": {
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
            "attribute": "hide-navigation",
            "reflect": true,
            "defaultValue": "false"
        },
        "initialDate": {
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
            "attribute": "initial-date",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "kupCalendarEventClicked",
            "name": "kupCalendarEventClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When an event is clicked"
            },
            "complexType": {
                "original": "Row",
                "resolved": "Row",
                "references": {
                    "Row": {
                        "location": "import",
                        "path": "../kup-data-table/kup-data-table-declarations"
                    }
                }
            }
        }, {
            "method": "kupCalendarDateClicked",
            "name": "kupCalendarDateClicked",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When a date is clicked"
            },
            "complexType": {
                "original": "Date",
                "resolved": "Date",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            }
        }, {
            "method": "kupCalendarEventDropped",
            "name": "kupCalendarEventDropped",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When a date is dropped"
            },
            "complexType": {
                "original": "{\n        fromDate: {\n            start: Date;\n            end: Date;\n        };\n        toDate: {\n            start: Date;\n            end: Date;\n        };\n    }",
                "resolved": "{ fromDate: { start: Date; end: Date; }; toDate: { start: Date; end: Date; }; }",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            }
        }, {
            "method": "kupCalendarViewChanged",
            "name": "kupCalendarViewChanged",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When the navigation change"
            },
            "complexType": {
                "original": "{\n        from: Date;\n        to: Date;\n    }",
                "resolved": "{ from: Date; to: Date; }",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            }
        }]; }
}
