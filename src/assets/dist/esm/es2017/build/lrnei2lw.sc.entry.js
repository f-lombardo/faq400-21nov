import { h } from '../mycomponent.core.js';

class KetchupBtn {
    constructor() {
        this.buttonClass = '';
        this.fillspace = false;
        this.showtext = true;
        this.showicon = true;
        this.horizontal = true;
        this.rounded = false;
        this.flat = false;
        this.transparent = false;
        this.showSelection = false;
        this.btnStyle = {};
    }
    onShowSelectionChanged(newValue) {
        if (!newValue && this.buttons) {
            this.selectedBtnIndex = -1;
        }
    }
    onBtnClicked(event) {
        if (this.showSelection) {
            this.selectedBtnIndex = parseInt(event.target.dataset.id);
        }
    }
    render() {
        let buttonsInGrid = [];
        if (this.columns && this.columns > 0) {
            this.buttons.forEach((btn, index) => {
                const mod = index % this.columns;
                if (mod === 0) {
                    buttonsInGrid.push([]);
                }
                buttonsInGrid[buttonsInGrid.length - 1].push(btn);
            });
        }
        else {
            if (this.horizontal) {
                buttonsInGrid[0] = this.buttons;
            }
            else {
                buttonsInGrid = this.buttons.map(b => {
                    const arr = [];
                    arr.push(b);
                    return arr;
                });
            }
        }
        let buttonsJsx = null;
        let id = 0;
        if (buttonsInGrid.length > 0) {
            buttonsJsx = buttonsInGrid.map(btns => {
                const btnsJsx = btns.map(btn => {
                    let btnClass = this.buttonClass || '';
                    if (id === this.selectedBtnIndex) {
                        btnClass += ' btn-selected';
                    }
                    return (h("td", null,
                        h("ketchup-button", { iconUrl: this.iconUrl, label: btn.value, iconClass: btn.iconClass, fillspace: this.fillspace, showtext: this.showtext, showicon: this.showicon, rounded: this.rounded, textmode: this.textmode, transparent: this.transparent, borderColor: this.borderColor, buttonClass: btnClass, flat: this.flat, "data-id": id++, onKetchupButtonClicked: ev => this.onBtnClicked(ev), align: this.align, class: this.fillspace ? 'fillspace' : '', btnStyle: this.btnStyle })));
                });
                return h("tr", null, btnsJsx);
            });
        }
        let compClass = 'btn-container';
        if (this.fillspace) {
            compClass += ' fillspace';
        }
        if (!this.horizontal) {
            compClass += ' vertical';
        }
        return (h("table", { class: compClass },
            h("tbody", null, buttonsJsx)));
    }
    static get is() { return "ketchup-btn"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "align": {
            "type": String,
            "attr": "align"
        },
        "borderColor": {
            "type": String,
            "attr": "border-color"
        },
        "btnStyle": {
            "type": "Any",
            "attr": "btn-style"
        },
        "buttonClass": {
            "type": String,
            "attr": "button-class"
        },
        "buttons": {
            "type": "Any",
            "attr": "buttons"
        },
        "columns": {
            "type": Number,
            "attr": "columns"
        },
        "fillspace": {
            "type": Boolean,
            "attr": "fillspace"
        },
        "flat": {
            "type": Boolean,
            "attr": "flat"
        },
        "horizontal": {
            "type": Boolean,
            "attr": "horizontal"
        },
        "iconUrl": {
            "type": String,
            "attr": "icon-url"
        },
        "rounded": {
            "type": Boolean,
            "attr": "rounded"
        },
        "selectedBtnIndex": {
            "state": true
        },
        "showicon": {
            "type": Boolean,
            "attr": "showicon"
        },
        "showSelection": {
            "type": Boolean,
            "attr": "show-selection",
            "watchCallbacks": ["onShowSelectionChanged"]
        },
        "showtext": {
            "type": Boolean,
            "attr": "showtext"
        },
        "textmode": {
            "type": String,
            "attr": "textmode"
        },
        "transparent": {
            "type": Boolean,
            "attr": "transparent"
        }
    }; }
    static get style() { return ".btn-container.sc-ketchup-btn{border-collapse:collapse}.btn-container.fillspace.sc-ketchup-btn{width:100%}.btn-container.sc-ketchup-btn   tbody.sc-ketchup-btn   tr.sc-ketchup-btn   td.sc-ketchup-btn{padding:3px}"; }
}

export { KetchupBtn };
