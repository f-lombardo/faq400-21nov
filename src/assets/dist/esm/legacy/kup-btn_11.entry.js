var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, h, c as createEvent, g as getElement, H as Host } from './chunk-1851c479.js';
import { c as commonjsGlobal } from './chunk-d8060b98.js';
var KupBtn = /** @class */ (function () {
    function KupBtn(hostRef) {
        registerInstance(this, hostRef);
        // setup props
        this.config = {};
    }
    KupBtn.prototype.onBtnClicked = function (event) {
        if (this.config.showSelection) {
            this.selectedBtnIndex = parseInt(event.target.dataset.id);
        }
    };
    KupBtn.prototype.render = function () {
        var _this = this;
        var buttonsInGrid = [];
        if (this.buttons) {
            if (this.config.columns && this.config.columns > 0) {
                this.buttons.forEach(function (btn, index) {
                    var mod = index % _this.config.columns;
                    if (mod === 0) {
                        // new row
                        buttonsInGrid.push([]);
                    }
                    buttonsInGrid[buttonsInGrid.length - 1].push(btn);
                });
            }
            else {
                if (this.config.horizontal) {
                    buttonsInGrid[0] = this.buttons;
                }
                else {
                    buttonsInGrid = this.buttons.map(function (b) {
                        var arr = [];
                        arr.push(b);
                        return arr;
                    });
                }
            }
        }
        var buttonsJsx = null;
        var id = 0;
        if (buttonsInGrid.length > 0) {
            buttonsJsx = buttonsInGrid.map(function (btns) {
                var btnsJsx = btns.map(function (btn) {
                    var btnClass = _this.config.buttonClass || '';
                    if (id === _this.selectedBtnIndex) {
                        btnClass += ' btn-selected';
                    }
                    var cls = _this.config.fillspace || !_this.config.horizontal
                        ? 'fillspace'
                        : '';
                    return (h("td", null, h("kup-button", { iconUrl: _this.config.iconUrl, label: btn.value, iconClass: btn.iconClass, fillspace: _this.config.fillspace, showtext: _this.config.showtext, showicon: _this.config.showicon, rounded: _this.config.rounded, textmode: _this.config.textmode, transparent: _this.config.transparent, buttonClass: btnClass, flat: _this.config.flat, "data-id": id++, onKupButtonClicked: function (ev) { return _this.onBtnClicked(ev); }, align: _this.config.align, class: cls })));
                });
                return h("tr", null, btnsJsx);
            });
        }
        var compClass = 'btn-container';
        if (this.config.fillspace) {
            compClass += ' fillspace';
        }
        if (!this.config.horizontal) {
            compClass += ' vertical';
        }
        //- Composes the style of the button -
        // TODO this is how currently JSX can set custom CSS vars. Check periodically for a better way
        // It simply sets them in style inside the html. Not the most elegant way,
        // https://medium.com/geckoboard-under-the-hood/how-we-made-our-product-more-personalized-with-css-variables-and-react-b29298fde608
        // https://medium.com/fbdevclagos/how-to-leverage-styled-components-and-css-variables-to-build-truly-reusable-components-in-react-4bbf50467666
        var commonStyle = {};
        if (this.config.btnStyle) {
            if (this.config.btnStyle.fontColor) {
                commonStyle['--kup-button_text-color'] = this.config.btnStyle.fontColor;
            }
            if (this.config.btnStyle.underline) {
                commonStyle['--kup-button_text-decoration'] = 'underline';
            }
            if (this.config.btnStyle.fontName) {
                commonStyle['--kup-button_font-family'] = this.config.btnStyle.fontName;
            }
            if (this.config.btnStyle.fontSize) {
                commonStyle['--kup-button_font-size'] = this.config.btnStyle.fontSize;
            }
            if (this.config.btnStyle.bold) {
                commonStyle['--kup-button_font-weight'] = 700;
            }
            if (this.config.btnStyle.bckColor) {
                commonStyle['--kup-button_main-color'] = this.config.btnStyle.bckColor;
            }
            if (this.config.btnStyle.italic) {
                commonStyle['--kup-button_font-style'] = 'italic';
            }
            if (this.config.borderColor) {
                commonStyle['--kup-button_border-color'] = this.config.borderColor;
            }
        }
        return (h("table", { class: compClass, style: commonStyle }, h("tbody", null, buttonsJsx)));
    };
    Object.defineProperty(KupBtn, "style", {
        get: function () { return ".btn-container{border-collapse:collapse}.btn-container.fillspace{width:100%}.btn-container tbody tr td{padding:3px}"; },
        enumerable: true,
        configurable: true
    });
    return KupBtn;
}());
var KupButton = /** @class */ (function () {
    function KupButton(hostRef) {
        registerInstance(this, hostRef);
        this.flat = false;
        this.fillspace = false;
        this.showtext = true;
        this.showicon = true;
        this.rounded = false;
        this.transparent = false;
        this.iconUrl = 'https://cdn.materialdesignicons.com/4.5.95/css/materialdesignicons.min.css';
        this.kupButtonClicked = createEvent(this, "kupButtonClicked", 7);
    }
    KupButton.prototype.onBtnClickedHandler = function () {
        this.kupButtonClicked.emit({ id: this.ketchupButtonEl.dataset.id });
    };
    KupButton.prototype._isHint = function () {
        return 'Hint' === this.textmode;
    };
    KupButton.prototype.render = function () {
        var _this = this;
        var btnLabel = null;
        if ((!this._isHint() || (this._isHint() && this.flat)) &&
            this.showtext &&
            this.label) {
            btnLabel = h("span", { class: "button-text" }, this.label);
        }
        var icon = null;
        if (this.showicon && this.iconClass) {
            icon = h("span", { class: 'button-icon ' + this.iconClass });
        }
        var btnClass = '';
        if (this.flat) {
            btnClass = 'flat-btn';
        }
        else {
            if (this.buttonClass) {
                btnClass += this.buttonClass;
            }
            if (this.rounded) {
                btnClass += ' rounded';
            }
            if (this.transparent) {
                btnClass += ' transparent';
            }
        }
        if (this.fillspace) {
            btnClass += ' fillspace';
        }
        if (this.align) {
            if ('right' === this.align) {
                btnClass += ' align-right';
            }
            else if ('left' === this.align) {
                btnClass += ' align-left';
            }
        }
        btnClass = btnClass.trim();
        var title = '';
        if (this._isHint()) {
            title = this.label;
        }
        return [
            h("link", { href: this.iconUrl, rel: "stylesheet", type: "text/css" }),
            h("button", { type: "button", class: btnClass, title: title, onClick: function () { return _this.onBtnClickedHandler(); } }, icon, btnLabel),
        ];
    };
    Object.defineProperty(KupButton.prototype, "ketchupButtonEl", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupButton, "style", {
        get: function () { return ":host{--btn_font-style:var(--kup-button_font-style,\"normal\");--btn_font-size:var(--kup-button_font-size,1rem);--btn_font-weight:var(--kup-button_font-weight,400);--btn_font-family:var(--kup-button_font-family,inherit);--btn_icon-size:var(--kup-button_icon-size,1rem);--btn_main-color:var(--kup-button_main-color,#4e908f);--btn_main-color-hover:var(--kup-button_main-color-hover,#65acab);--btn_main-color-active:var(--kup-button_main-color-active,#3c6f6e);--btn_text-color:var(--kup-button_text-color,#fff);--btn_text-color--transparent:var(--kup-button_text-color--transparent,grey);--btn_text-decoration:var(--kup-button_text-decoration,\"none\");--btn_icon-color:var(--kup-button_icon-color,#fff);--btn_icon--transparent:var(--kup-button_icon-color--transparent,grey);--btn_animation-duration:var(--kup-button_animation-duration,0.3s);--btn_border-color:var(--kup-button_border-color,#4e908f);--btn_opacity:var(--kup-button_opacity,1);--btn_box-shadow:var(--kup-button_box-shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5));--btn_border:var(--kup-button_border,none);--btn_border-radius:var(--kup-button_border-radius,2px);--btn_color-info:var(--kup-color-info,#6a8fd1);--btn_color-danger:var(--kup-danger-danger,#f0423c);--btn_color-danger--hover:var(--kup-danger-color--hover,#d91e18);--btn_color-warning:var(--kup-info-color,#ffd454);--btn_color-selected:var(--kup-info-color,#ffc107)}:host(.fillspace) button{width:100%}button{outline:none;opacity:var(--btn_opacity);background:var(--btn_main-color);border-radius:var(--btn_border-radius);border:var(--btn_border);-webkit-box-shadow:none;box-shadow:none;color:var(--btn_text-color);cursor:pointer;font-family:var(--btn_font-family);font-size:var(--btn_font-size);font-weight:var(--btn_font-weight);padding:.5rem 1rem;text-align:center;-webkit-transition:opacity var(--btn_animation-duration) ease-in-out,background-color var(--btn_animation-duration) ease,-webkit-box-shadow var(--btn_animation-duration);transition:opacity var(--btn_animation-duration) ease-in-out,background-color var(--btn_animation-duration) ease,-webkit-box-shadow var(--btn_animation-duration);transition:box-shadow var(--btn_animation-duration),opacity var(--btn_animation-duration) ease-in-out,background-color var(--btn_animation-duration) ease;transition:box-shadow var(--btn_animation-duration),opacity var(--btn_animation-duration) ease-in-out,background-color var(--btn_animation-duration) ease,-webkit-box-shadow var(--btn_animation-duration);white-space:nowrap}button:hover{-webkit-box-shadow:var(--btn_box-shadow);box-shadow:var(--btn_box-shadow);background:var(--btn_main-color-hover)}button:active{-webkit-box-shadow:none;box-shadow:none;background:var(--btn_main-color-active)}button>.button-icon{display:block;color:var(--btn_icon-color);fill:var(--btn_icon-color);float:left;width:var(--btn_icon-size);margin-right:.5rem}button>.button-text{font-style:var(--btn_font-style);-webkit-text-decoration:var(--btn_text-decoration);text-decoration:var(--btn_text-decoration);vertical-align:15%}button.rounded{border-radius:15px}button.transparent{background-color:transparent;border:1px solid var(--btn_border-color);color:var(--btn_text-color--transparent)}button.transparent>.button-icon{color:var(--btn_icon-color--transparent);fill:var(--btn_icon-color--transparent)}button.btn-info{background:var(--btn_color-info)}button.btn-danger{background:var(--btn_color-danger)}button.btn-danger:hover{background:var(--btn_color-danger--hover)}button.btn-warning{background:var(--btn_color-warning)}button.btn-selected{background:var(--btn_color-selected)}button.flat-btn{background:none;border:none;color:var(--btn_main-color)}button.flat-btn:hover{-webkit-box-shadow:none;box-shadow:none}button.flat-btn:hover .button-text{text-decoration:underline}button.flat-btn>.button-icon{color:var(--btn_main-color);fill:var(--btn_main-color)}button.align-right{text-align:right}button.align-right>.button-icon{float:right;margin-right:0;margin-left:.5rem}button.align-left{text-align:left}button.fillspace{width:100%}"; },
        enumerable: true,
        configurable: true
    });
    return KupButton;
}());
var KupCheckbox = /** @class */ (function () {
    function KupCheckbox(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Sets the checkbox to be disabled
         */
        this.checked = false;
        /**
         * Sets the checkbox to be disabled
         *
         * Must have reflect into the attribute
         */
        this.disabled = false;
        /**
         * The label to set to the component
         */
        this.label = '';
        /**
         * Sets the tabindex of the checkbox
         */
        this.setTabIndex = 0;
        this.kupCheckboxBlur = createEvent(this, "kupCheckboxBlur", 6);
        this.kupCheckboxChange = createEvent(this, "kupCheckboxChange", 6);
        this.kupCheckboxFocus = createEvent(this, "kupCheckboxFocus", 6);
    }
    //---- Methods ----
    //-- Events handlers --
    KupCheckbox.prototype.onCheckboxBlur = function () {
        this.kupCheckboxBlur.emit({ checked: !!this.checkbox.checked });
    };
    KupCheckbox.prototype.onCheckboxChange = function (e) {
        var newValue = !!e.target.checked;
        if (newValue !== this.checked) {
            this.checked = newValue;
            this.kupCheckboxChange.emit({
                checked: newValue,
            });
        }
    };
    KupCheckbox.prototype.onCheckboxFocus = function () {
        this.kupCheckboxFocus.emit({ checked: !!this.checkbox.checked });
    };
    KupCheckbox.prototype.onHostFocus = function () {
        if (this.checkbox) {
            this.checkbox.focus();
        }
    };
    //---- Lifecycle hooks ----
    KupCheckbox.prototype.render = function () {
        var _this = this;
        return (h(Host, { onFocus: this.onHostFocus.bind(this) }, h("div", { class: "kup-checkbox" }, h("input", { ref: function (el) { return _this.checkbox = el; }, "aria-label": this.label ? this.label : null, checked: this.checked, disabled: this.disabled, tabindex: this.setTabIndex, type: "checkbox", onBlur: this.onCheckboxBlur.bind(this), onChange: this.onCheckboxChange.bind(this), onFocus: this.onCheckboxFocus.bind(this) }), h("span", { class: "kup-checkbox__check" }))));
    };
    Object.defineProperty(KupCheckbox, "style", {
        get: function () { return ":host{--checkbox_border-color:var(--kup-checkbox_border-color,grey);--checkbox_border-color-disabled:var(--kup-checkbox_border-color-disabled,#b3b3b3);--checkbox_background-color:var(--kup-checkbox_background-color,#f5f5f5);--checkbox_size:var(--kup-checkbox_size,20px);--checkbox_tick-color:var(--kup-checkbox_tick-color,#4e908f);--checkbox_tick-color-disabled:var(--kup-checkbox_tick-color-disabled,#86bebd)}.kup-checkbox,:host{display:inline-block}.kup-checkbox{border:calc(var(--checkbox_size) / 10) solid var(--checkbox_border-color);border-radius:calc(var(--checkbox_size) / 10);background:var(--checkbox_background-color);height:var(--checkbox_size);position:relative;width:var(--checkbox_size);z-index:0}.kup-checkbox>input{cursor:pointer;height:100%;left:0;margin:0;opacity:0;position:absolute;top:0;width:100%;z-index:2}.kup-checkbox>input:checked~.kup-checkbox__check{border-bottom-color:var(--checkbox_tick-color);border-right-color:var(--checkbox_tick-color);margin-left:calc(var(--checkbox_size) / 5 * 2);margin-top:calc(var(--checkbox_size) / 4);-webkit-transform:rotate(45deg) scale(1.7);transform:rotate(45deg) scale(1.7);-webkit-transition:all .2s ease 0s;transition:all .2s ease 0s}.kup-checkbox .kup-checkbox__check{border-bottom:calc(var(--checkbox_size) / 10) solid transparent;border-right:calc(var(--checkbox_size) / 10) solid transparent;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;height:calc(var(--checkbox_size) / 5 * 2 - var(--checkbox_size) / 20);position:relative;-webkit-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1);-webkit-transition:all .2s ease 0s;transition:all .2s ease 0s;width:calc(var(--checkbox_size) / 5)}:host([disabled]) .kup-checkbox{border-color:var(--checkbox_border-color-disabled)}:host([disabled]) .kup-checkbox>input{cursor:auto}:host([disabled]) .kup-checkbox>input:checked~.kup-checkbox__check{border-bottom-color:var(--checkbox_tick-color-disabled);border-right-color:var(--checkbox_tick-color-disabled)}"; },
        enumerable: true,
        configurable: true
    });
    return KupCheckbox;
}());
function generateUniqueId(field) {
    if (field === void 0) { field = 'def'; }
    return new Date().getTime() + field.trim().replace(/\s/g, '_');
}
function eventFromElement(element, eventSource) {
    while (eventSource) {
        console.log(eventSource);
        if (eventSource === element)
            return true;
        eventSource = eventSource.parentElement;
    }
    return false;
}
/**
 * Given an HTML element, how a third element must be positioned relatively to it and an offset element from which it must be positioned
 * calculates the top or bottom, right or left properties to allow correctly placing that third element.
 *
 * IMPORTANT #1:
 * Changing the offsetEl can lead to bugs. This is due to the fact that by using the documentElement as a reference,
 * scrollbars are already counted inside the the measurements, while in other elements there is no such guarantee.
 *
 * IMPORTANT #2:
 * Previously the bottom property was calculated as it follows:
 * ret.bottom = offsetEl.scrollHeight - scrollTop - rect.top;
 * However, this brought on the following issue:
 * When an absolute element is created inside the body tag, and if neither the body or html tag have a position different from static,
 * then the absolute positioning is referred to the window object.
 * In other words, using bottom property on the absolute element would position it starting from a scrollTop = 0
 * margin bottom window, making all calculations useless. (Try it yourselves)
 * On the other hand, making the component set a position different from static on body or html tag has a lot of side effects:
 * 1 - other elements are influenced by this behaviour,
 * 2 - calculations would once again break down due to the positioning being referenced on an element different from document.
 * The solution was to position the element exactly on top of the 'el' element and then adding a negative translation to it
 * equal to its height.
 *
 * @name getElementOffset
 * @param el - The element relative to which the third element must be placed
 * @param positioning - How the third element must be placed in relation to el (if over or under, left or right aligned)
 * @param [offsetEl] - An optional parameter to specify from which scrollable element calculations must take place. Default: document.documentElement. Change at your own risk and fault: see full comment.
 * @returns the position in pixel to apply to the third element to be placed correctly.
 */
function getElementOffset(el, positioning, offsetEl) {
    if (positioning === void 0) { positioning = { isRight: false, isTop: false }; }
    if (offsetEl === void 0) { offsetEl = document.documentElement; }
    // We must consider the use case where the el element is not available in reality
    // In this case this code will throw an error
    // To avoid that we exit the function when such a case will happen.
    if (!el) {
        return;
    }
    var ret = {};
    // Get rectangle of the component.
    var rect = el.getBoundingClientRect(), scrollLeft = offsetEl.scrollLeft, scrollTop = offsetEl.scrollTop;
    // If left positioned
    if (!positioning.isRight) {
        ret.left = rect.left + scrollLeft;
    }
    else {
        // If right positioned
        ret.right = offsetEl.offsetWidth - rect.left - rect.width;
    }
    // If positioned on the bottom of the el element
    if (!positioning.isTop) {
        ret.top = scrollTop + rect.top + rect.height;
    }
    else {
        // If positioned on the top of the el element
        // See [IMPORTANT #2] on this doc for more info about this calculation
        ret.bottom = scrollTop + rect.top;
    }
    return ret;
}
/**
 * Given an HTMLElement and a position object, sets given positions to that element, while setting the others to initial state.
 *
 * IMPORTANT:
 * When applying a bottom property, the given values is always assigned to top property, while adding a translateY(-100%)
 * to allow the positioning to be correct. See getElementOffset at the bottom of this doc for more info about this issue.
 *
 * @name setElementOffset
 * @param el - The element to position
 * @param position - The position to assign to that element
 * @see getElementOffset
 */
function setElementOffset(el, position) {
    var style = el.style;
    // Always check alterned elements
    if (position.left) {
        style.left = position.left + 'px';
        style.right = 'initial';
    }
    else if (position.right) {
        style.right = position.right + 'px';
        style.left = 'initial';
    }
    // Notice that this piece must ALWAYS return a value.
    // Otherwise the positioning offset will be wrongly placed.
    if (position.top) {
        style.top = position.top + 'px';
        style.bottom = 'initial';
        style.transform = '';
    }
    else if (position.bottom) {
        style.top = position.bottom + 'px';
        style.bottom = 'initial';
        style.transform = 'translateY(-100%)';
    }
}
/*
 * TODO: Control if there can be issues with z-index and elements not correctly triggering the functions to close the combo box list
 * See this article here to use the method to get the current position and avoid opening the menu in the wrong direction
 * https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
 */
var KupCombo = /** @class */ (function () {
    function KupCombo(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Chooses which field of an item object should be used to create the list and be filtered.
         */
        this.displayedField = 'id';
        /**
         * Allows to pass an initial selected item for the combobox
         */
        this.initialValue = null;
        /**
         * Marks the field as clearable, allowing an icon to delete its content
         */
        this.isClearable = false;
        /**
         * Marks the field as filterable, allowing an input text to filter the options
         */
        this.isFilterable = true;
        /**
         * Items which can be selected
         */
        this.items = [];
        /**
         * Label to describe the radio group
         */
        this.label = '';
        /**
         * Chooses which field of an item object should be used to create the list and be filtered.
         */
        this.valueField = 'id';
        /**
         * If true, the combobox uses a Stencil portal to create the menu.
         * Please use this feature carefully, only if needed.
         * @see kup-portal readme for more details.
         */
        this.usePortal = false;
        //-- Validating props --
        //---- Internal state ----
        // Keeps current value based on selectedElement -> shortcut for some controls
        this.value = '';
        // Keeps string for filtering elements when filter mode is active
        this.filter = '';
        // Keeps track when the combobox menu is open or closed
        this.isOpen = false;
        this.selected = null;
        this.portalRef = null;
        /**
         * Creates a variable with an instance of the handler for the click event and binds this instance of the combo box to it.
         * This is used to add and more importantly remove events listeners attached to the body.
         * Sets listener on document to check if a click originated elsewhere
         * In that case closes the combo
         */
        this.clickFunction = this.onDocumentClick.bind(this);
        // Determines the position on which the menu will be open
        this.comboPosition = {
            isRight: false,
            isTop: false,
        };
        // Variable to hold Constructed Style Sheet
        // TODO check if there is a better typing.
        this.constructedStyleSheet = null;
        // For CSS vars
        this.internalCssVars = [
            '--cmb_font-size',
            '--cmb_border-color',
            '--cmb_border-color--selected',
            '--cmb_tr-duration',
            '--cmb_icon-color',
            '--cmb_icon-color--hover',
            '--cmb_menu-background',
            '--cmb_menu-background--hover',
            '--kup-combo_menu_text',
            '--kup-combo_menu_text--hover',
            '--cmb_background-color',
            '--cmb_background-color--hover',
            '--cmb_text-color',
            '--cmb_text-color--hover',
            '--cmb_border-radius',
            '--cmb_box-shadow',
        ];
        //-- Constants --
        this.baseClass = 'kup-combo';
        this.ketchupComboSelected = createEvent(this, "ketchupComboSelected", 6);
    }
    //---- Lifecycle Hooks ----
    KupCombo.prototype.componentWillLoad = function () {
        // When the component is going to be loaded, if there is an initial value set, we can reflect it to internal state
        // This is used because when component is instantiated it does NOT run watchers.
        this.reflectInitialValue(this.initialValue);
    };
    KupCombo.prototype.componentDidLoad = function () {
        // When component is created, then the listener is set. @See clickFunction for more details
        document.addEventListener('click', this.clickFunction);
    };
    KupCombo.prototype.componentDidUnload = function () {
        // When component is destroyed, then the listener is removed. @See clickFunction for more details
        document.removeEventListener('click', this.clickFunction);
    };
    //---- Public Methods ----
    /**
     * Programmatically close the combo box
     * @method closeCombo
     */
    KupCombo.prototype.closeCombo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.isOpen = false;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Programmatically opens the combo box
     * @method openCombo
     */
    KupCombo.prototype.openCombo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.comboPosition = this.calcBoxPosition();
                this.isOpen = true;
                return [2 /*return*/];
            });
        });
    };
    //---- Private methods ----
    // Always reflect changes of initialValue to value element
    KupCombo.prototype.reflectInitialValue = function (newValue, oldValue) {
        // When a new initial value is passed, we control that the new item is different from the old one before updating the state
        if (!oldValue ||
            newValue[this.valueField] !== oldValue[this.valueField]) {
            this.onComboSelected(newValue, oldValue);
        }
    };
    // When valueField changes, then reflects the changes also inside the value prop
    KupCombo.prototype.reflectValueField = function (newValue) {
        this.value = this.selected ? this.selected[newValue] : '';
    };
    // Calculates where the box must be positioned according to the position the text input is placed
    KupCombo.prototype.calcBoxPosition = function () {
        var windowX = document.documentElement.clientWidth;
        var windowY = document.documentElement.clientHeight;
        var _a = this.comboText.getBoundingClientRect(), height = _a.height, left = _a.left, top = _a.top, width = _a.width;
        return {
            isRight: left + width / 2 > windowX / 2,
            isTop: top + height / 2 > windowY / 2,
        };
    };
    //---- Events and handlers ----
    /**
     * Clear the current content inside the the text input
     * @method onClearClick
     */
    KupCombo.prototype.onClearClick = function () {
        this.onComboSelected(null, this.selected);
    };
    /**
     * Opens the combo box when clicked
     * @method onComboClick
     */
    KupCombo.prototype.onComboClick = function () {
        this.openCombo();
    };
    /**
     * Function to trigger when document is clicked.
     * If the event does not come from within the element, then the list is closed.
     *
     * To check when the event comes from this element, you can't rely on event.target.
     * That's because, as stated by ShadowDOM specs, event targets gets rewritten.
     * @see https://polymer-library.polymer-project.org/3.0/docs/devguide/shadow-dom
     * The event.path property is for Chrome only (maybe also Opera) and it is not standard.
     *
     * The specs also specify that the correct way to get from which element the event was effectively originated,
     * the correct and standard method to use is event.composedPath(), which return an array of the elements the event has traversed.
     * In this way, you can correctly detect when to close the menu or not.
     *
     * However, composed path is not supported by all browser, especially those which do not support ShadowDOM.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
     * But in that case you can traverse the DOM starting from the target element and going up.
     */
    KupCombo.prototype.onDocumentClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var response, ele;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = null;
                        if (!this.usePortal) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.portalRef.getPortalInstance()];
                    case 1:
                        response = _a.sent();
                        _a.label = 2;
                    case 2:
                        try {
                            if (event.composedPath().indexOf(this.comboEl) < 0 &&
                                event.composedPath().indexOf(response) < 0) {
                                this.closeCombo();
                            }
                        }
                        catch (e) {
                            ele = event.target;
                            if (!eventFromElement(this.comboEl, ele) &&
                                !eventFromElement(response, ele)) {
                                this.closeCombo();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Function which gets triggered when filter changes
     * @param event
     */
    KupCombo.prototype.onFilterUpdate = function (event) {
        this.filter = event.detail.value.toLowerCase();
    };
    /**
     * When an item gets selected
     * @param item
     */
    KupCombo.prototype.onItemSelected = function (item) {
        if (item[this.valueField] !== this.value) {
            this.onComboSelected(item, this.selected);
        }
        this.closeCombo();
    };
    KupCombo.prototype.onComboSelected = function (item, oldItem) {
        this.ketchupComboSelected.emit({
            value: item,
            oldValue: oldItem,
            info: {
                obj: this.obj,
            },
        });
        // Updates corresponding fields
        this.selected = item;
        this.value = item ? item[this.valueField] : null;
    };
    //---- Rendering functions ----
    // Creates the menu and its items
    KupCombo.prototype.composeList = function () {
        var _this = this;
        var filter = null;
        if (this.isFilterable) {
            filter = (h("div", { class: this.baseClass + '__filter' }, h("kup-text-input", { onKetchupTextInputUpdated: this.onFilterUpdate.bind(this) })));
        }
        return (h("div", { class: this.baseClass +
                '__menu' +
                (this.isOpen ? ' is-open' : '') +
                (this.comboPosition.isRight ? ' is-right' : '') +
                (this.comboPosition.isTop ? ' is-top' : '') +
                (this.usePortal ? ' is-using-portal' : '') }, filter, h("ul", { class: this.baseClass + '__list' }, this.items
            .filter(function (item) { return !_this.filter ||
            item[_this.displayedField]
                .toLowerCase()
                .indexOf(_this.filter) >= 0; })
            .map(function (item) { return (h("li", { onClick: function () { return _this.onItemSelected(item); } }, h("span", null, item[_this.displayedField]))); }))));
    };
    KupCombo.prototype.render = function () {
        var _this = this;
        var containerClass = this.baseClass + '__container';
        return [
            h("div", { class: containerClass +
                    (this.isClearable
                        ? ' ' + containerClass + '--clearable'
                        : ''), ref: function (el) { return (_this.comboText = el); } }, h("span", { class: this.baseClass + '__current-value', onClick: this.onComboClick.bind(this) }, h("span", { class: "value-text" }, this.selected
                ? this.selected[this.displayedField]
                : ''), h("svg", { class: this.baseClass +
                    '__icon ' +
                    this.baseClass +
                    '__chevron' +
                    (this.isOpen
                        ? ' ' + this.baseClass + '__chevron--open'
                        : ''), version: "1.1", width: "24", height: "24", viewBox: "0 0 24 24" }, h("path", { d: "M7,10L12,15L17,10H7Z" }))), this.isClearable ? (h("button", { "aria-label": "Close", class: this.baseClass + '__clear', role: "button", onClick: this.onClearClick.bind(this) }, h("svg", { class: this.baseClass + '__icon', viewBox: "0 0 24 24" }, h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })))) : null),
            this.usePortal ? (h("kup-portal", { isVisible: this.isOpen, mirroredCssVars: this.internalCssVars, nodes: this.composeList(), portalParentRef: this.comboEl, ref: function (el) { return (_this.portalRef = el); },
                // Notice that the portal offset MUST be calculated considering the menu button, not the whole web component
                refOffset: getElementOffset(this.comboText, this.comboPosition), styleNode: this.comboEl.shadowRoot.querySelector('style') })) : (this.composeList()),
        ];
    };
    Object.defineProperty(KupCombo.prototype, "comboEl", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupCombo, "watchers", {
        get: function () {
            return {
                "initialValue": ["reflectInitialValue"],
                "valueField": ["reflectValueField"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupCombo, "style", {
        get: function () { return ":host{--cmb_font-size:var(--kup-combo_input_font-size,1rem);--cmb_border-color:var(--kup-combo_input_border-color,#bdbdbd);--cmb_border-color--selected:var(--kup-combo_input_border-color--selected,#676767);--cmb_tr-duration:var(--kup-combo_input_transition-duration,0.6s);--cmb_icon-color:var(--kup-combo_icon_color,grey);--cmb_icon-color--hover:var(--kup-combo_icon_color--hover,#676767);--cmb_menu-background:var(--kup-combo_menu_background,#fff);--cmb_menu-background--hover:var(--kup-combo_menu_background--hover,#f0f0f0);--cmb_menu-text:var(--kup-combo_menu_text,grey);--cmb_menu-text--hover:var(--kup-combo_menu_text--hover,#555);--cmb_background-color:var(--kup-combo_background-color,#fff);--cmb_background-color--hover:var(--kup-combo_background-color--hover,#f0f0f0);--cmb_text-color:var(--kup-combo_text-color,grey);--cmb_text-color--hover:var(--kup-combo_text-color--hover,#676767);--cmb_border-radius:var(--kup-combo_border-radius,2px);--cmb_box-shadow:var(--kup-combo_box-shadow,0px 0px 7.5px 0px hsla(0,0%,50.2%,0.5));display:inline-block;position:relative;z-index:1}.kup-combo__container{background-color:var(--cmb_background-color);color:var(--cmb_text-color);border:1px solid var(--cmb_border-color);border-radius:var(--cmb_border-radius);-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-inline-flexbox;display:inline-flex;outline:none;-webkit-transition:border-color .25s ease;transition:border-color .25s ease}.kup-combo__container:focus,.kup-combo__container:hover{border-color:var(--cmb_border-color--selected)}.kup-combo__container:focus .value-text,.kup-combo__container:hover .value-text{color:var(--cmb_text-color--hover)}.kup-combo__container:focus svg,.kup-combo__container:hover svg{fill:var(--cmb_icon-color--hover)}.kup-combo__icon{fill:var(--cmb_icon-color);-webkit-transition:fill var(--cmb_tr-duration),-webkit-transform var(--cmb_tr-duration);transition:fill var(--cmb_tr-duration),-webkit-transform var(--cmb_tr-duration);transition:fill var(--cmb_tr-duration),transform var(--cmb_tr-duration);transition:fill var(--cmb_tr-duration),transform var(--cmb_tr-duration),-webkit-transform var(--cmb_tr-duration)}.kup-combo__current-value{-ms-flex-align:center;align-items:center;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;font-size:var(--cmb_font-size);-ms-flex-pack:center;justify-content:center}.kup-combo__current-value .value-text{padding:0 .25rem}.kup-combo__current-value svg{fill:#bdbdbd}.kup-combo__chevron{margin-left:.25rem}.kup-combo__chevron--open{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.kup-combo__clear{-ms-flex-align:center;align-items:center;background-color:transparent;border:none;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;margin:0;outline:none;padding:4px}.kup-combo__clear:hover>svg{fill:var(--cmb_icon-color--hover)}.kup-combo__menu{background-color:var(--cmb_menu-background);color:var(--cmb_menu-text);border-radius:0;-webkit-box-shadow:var(--cmb_box-shadow);box-shadow:var(--cmb_box-shadow);display:inline-block;left:0;opacity:0;position:absolute;-webkit-transition:opacity var(--cmb_tr-duration);transition:opacity var(--cmb_tr-duration);top:100%;visibility:hidden;z-index:1}.kup-combo__menu.is-open{opacity:1;visibility:visible}.kup-combo__menu.is-top{bottom:100%;top:auto}.kup-combo__menu.is-right{left:auto;right:0}.kup-combo__menu.is-using-portal{position:relative}.kup-combo__filter{-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;padding:4px}.kup-combo__list{display:block;list-style-type:none;padding:0;min-width:80px;max-height:400px;margin:0;overflow:auto}.kup-combo__list>li{-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;display:block;padding:6px 8px 5px;-webkit-transition:color var(--cmb_tr-duration),background-color var(--cmb_tr-duration);transition:color var(--cmb_tr-duration),background-color var(--cmb_tr-duration)}.kup-combo__list>li.is-selected,.kup-combo__list>li:hover{background-color:var(--cmb_menu-background--hover);color:var(--cmb_menu-text--hover)}.kup-combo__list>li:last-of-type{border-bottom:none}"; },
        enumerable: true,
        configurable: true
    });
    return KupCombo;
}());
var KupFld = /** @class */ (function () {
    function KupFld(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Data the FLD must parse to fully be configured.
         * It must be either an Object or a JSON parsable string
         */
        this.config = '';
        /**
         * Chooses if there is the need to show the submit button or not
         */
        this.showSubmit = false;
        /**
         * Chooses the submit button label to show
         */
        this.submitLabel = '';
        /**
         * Chooses the submit button position
         */
        this.submitPos = 'right'; // "left / right / top"
        /**
         * Chooses the label to show
         * If set to empty or has only white space chars, the label get removed
         */
        this.label = ''; // Example "Insert user name"
        /**
         * Chooses label position
         */
        this.labelPos = 'left'; // 'left / right / top'
        /**
         * Unsupported props gets propagated down to dynamic component
         */
        this.propagate = {};
        /**
         * Other configurations
         */
        this.extensions = {};
        //-- Not reactive --
        this.radioGeneratedName = generateUniqueId('value');
        this.currentValue = null;
        this.previousValue = null;
        // Generates an instance of the event handler while binding the current component as its this value
        // This is done once per component to improve performance speed
        this.onChangeInstance = this.onChange.bind(this);
        this.onSubmitInstance = this.onSubmit.bind(this);
        this.ketchupFldChanged = createEvent(this, "ketchupFldChanged", 6);
        this.ketchupFldSubmit = createEvent(this, "ketchupFldSubmit", 6);
    }
    //-- Reflect config to internal state --
    KupFld.prototype.updateInternalState = function () {
        var _this = this;
        // Controls type of data passed to the config parameter and if necessary parses it
        var currentData;
        if (typeof this.config === 'string' && this.config) {
            currentData = JSON.parse(this.config);
        }
        else {
            currentData = this.config;
        }
        // Assigns given values to the state
        var keys = Object.keys(currentData);
        var propagate = {};
        keys.forEach(function (key) {
            // Detects if a given key is present in the component as a @State variable
            if (key in _this) {
                _this[key] = currentData[key];
            }
            else {
                // if key is not present, it will be passed down to the component
                propagate[key] = currentData[key];
            }
        });
        this.propagate = propagate;
    };
    //---- Life cycle hooks ----
    KupFld.prototype.componentWillLoad = function () {
        // Mandatory, since on first render the watch directive will not be triggered
        // therefore preventing component to display data
        this.updateInternalState();
    };
    //---- Methods ----
    // When a change or update event must be launched as if it's coming from the Fld itself
    KupFld.prototype.onChange = function (event) {
        var _a = event.detail, value = _a.value, info = _a.info;
        this.ketchupFldChanged.emit({
            originalEvent: event,
            oldValue: this.currentValue,
            value: value,
            info: info,
        });
        this.previousValue = this.currentValue;
        this.currentValue = value;
    };
    // When a submit event must be launched as if it's coming from the Fld itself
    KupFld.prototype.onSubmit = function (event) {
        this.ketchupFldSubmit.emit({
            originalEvent: event,
            value: this.currentValue,
            oldValue: this.previousValue,
            info: {
                obj: event.detail.info && event.detail.info.obj
                    ? event.detail.info.obj
                    : undefined,
            },
        });
    };
    //-- Public --
    /**
     * Provides an interface to get the current value programmatically
     * @method getCurrentValue
     * @returns {any}
     */
    KupFld.prototype.getCurrentValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.currentValue];
            });
        });
    };
    //---- Rendering functions ----
    KupFld.prototype.render = function () {
        var toRender = [];
        var baseClass = 'kup-fld';
        var label = null;
        var submit = null;
        //-- Label --
        if (this.label.trim().length) {
            label = (h("label", { class: baseClass +
                    '__label' +
                    ' ' +
                    baseClass +
                    '--' +
                    this.labelPos }, this.label));
        }
        //-- Submit --
        if (this.showSubmit) {
            submit = (h("kup-button", { class: baseClass +
                    '__submit' +
                    ' ' +
                    baseClass +
                    '--' +
                    this.submitPos, label: this.submitLabel, onKupButtonClicked: this.onSubmitInstance }));
        }
        //-- If a component must be positioned on top of the dynamic one --
        var labelIsTop = this.labelPos === 'top';
        var submitIsTop = this.submitPos === 'top';
        if (labelIsTop || submitIsTop) {
            toRender.push(h("div", { class: baseClass + '__top-container' }, labelIsTop && label ? label : null, submitIsTop && submit ? submit : null));
        }
        //-- Outputs the main dynamic component to render --
        if (!labelIsTop && label) {
            toRender.push(label);
        }
        /**
         * JSX dynamic component notation
         * @see: https://stackoverflow.com/questions/29875869/react-jsx-dynamic-component-name
         */
        var compPrefix = 'kup-';
        var type = '';
        var confObj = {};
        switch (this.type.toLowerCase()) {
            case 'cmb':
                confObj.displayedField = 'value';
                confObj.valueField = 'value';
                confObj.onKetchupComboSelected = this.onChangeInstance;
                type = 'combo';
                break;
            case 'rad':
                confObj.valueField = 'obj';
                confObj.radioName = this.radioGeneratedName; // TODO this must be changed to use a proper data field
                confObj.onKetchupRadioChanged = this.onChangeInstance;
                type = 'radio';
                break;
            case 'itx':
                confObj.onKetchupTextInputUpdated = this.onChangeInstance;
                // When FLD has the text form, it should submit also when a user presses Enter on the text field
                confObj.onKetchupTextInputSubmit = this.onSubmitInstance;
                type = 'text-input';
                break;
            /**/
            case 'fup':
                type = 'upload';
                //TODO ???
                //TODO confObj.formDataName:'WTX_FILE' -> no, usare il nome del campo: "id": "TPLFLD"
                /*
                compPrefix = '';
                type = 'vaadin-upload';
                */
                /*
                compPrefix = '';
                type ='input';
                confObj.type = 'file';
                */
                break;
        }
        var $DynamicComponent = (compPrefix + type); // TODO check if there is a better typing
        /** ... -> spread operator */
        toRender.push(h($DynamicComponent, Object.assign({ class: baseClass + '__component', items: this.data }, confObj, this.propagate)));
        if (!submitIsTop && submit) {
            toRender.push(submit);
        }
        return toRender;
    };
    Object.defineProperty(KupFld, "watchers", {
        get: function () {
            return {
                "config": ["updateInternalState"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupFld, "style", {
        get: function () { return ":host{-ms-flex-wrap:wrap;flex-wrap:wrap;--fld_comp-margin:var(--kup-fld_component-margin,8px)}.kup-fld__top-container,:host{display:-ms-flexbox;display:flex}.kup-fld__top-container{-ms-flex-align:center;align-items:center;-ms-flex-order:0;order:0;width:100%}.kup-fld__label{margin:var(--fld_comp-margin);-ms-flex-order:1;order:1}.kup-fld__label.kup-fld--right{-ms-flex-order:4;order:4}.kup-fld__component{margin:var(--fld_comp-margin);-ms-flex-order:3;order:3}.kup-fld__submit{margin:var(--fld_comp-margin);-ms-flex-order:2;order:2}.kup-fld__submit.kup-fld--right{-ms-flex-order:5;order:5}"; },
        enumerable: true,
        configurable: true
    });
    return KupFld;
}());
var KupGauge = /** @class */ (function () {
    function KupGauge(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Sets how much the arc of the gauge should be thick.
         * @namespace kup-gauge.arcThickness
         * @see kup-gauge.size
         */
        this.arcThickness = 30;
        /**
         * Array of three elements to specify the color of the arcs.
         */
        this.colors = [
            'var(--gau_first-color)',
            'var(--gau_second-color)',
            'var(--gau_third-color)',
        ];
        /**
         * The distance the label and the value has from the gauge graph.
         */
        this.labelDistance = 20;
        /**
         * The maximum value reachable in the current graph.
         */
        this.maxValue = 100;
        /**
         * A string which will be appended to the displayed values of the component.
         */
        this.measurementUnit = '';
        /**
         * The minimum value reachable in the current graph.
         */
        this.minValue = -100;
        /**
         * If set to true, the colors inside the colors array are used in the reversed order.
         */
        this.reverseColors = false;
        /**
         * If set to false, threshold values of the gauge are not displayed.
         */
        this.showLabels = true;
        /**
         * If set to false, the maximum and minimum values of the gauge are not displayed.
         */
        this.showMaxmin = true;
        /**
         * If set to false, the current value of the gauge is not displayed.
         */
        this.showValue = true;
        /**
         * Con be used change the viewbox of the SVG.
         * By manipulating this value, some customizations of the aspect of the gauge is achievable.
         * @namespace kup-gauge.size
         * @see kup-gauge.arcThickness
         */
        this.size = 300;
        /**
         * The current value of the gauge.
         * The gauge's needle points to the percentage based on this prop.
         */
        this.value = 0;
        /**
         * The current size of gauge's value.
         * Correct values are: 0,1,2 or 3.
         */
        this.valueSize = 0;
        /**
         * if true, shows a rounded needle.
         */
        this.needleCircle = false;
        /**
         * if true, ignore threasholds in gauge and show
         * colored value's arc.
         */
        this.onlyValue = false;
        /**
         * Set Width gauge.
         */
        this.widthComponent = '22vw';
        //---- Internal not reactive state ----
        // Arcs generator
        this.arcGenerator = d3.arc();
        /**
         * Holds the maximum positive interval.
         * Percentages are calculated as it follows:
         * MIN = 0 = the value the prop minValue gets transformed to\
         * MAX = ABSOLUTE(minValue - maxValue) = the maxValuePositive holds this value
         * TVALUE = value - minValue = any value, which needs to be represented on the chart
         * @namespace kup-gauge.maxValuePositive
         */
        this.maxValuePositive = 0;
    }
    //---- Utility functions ----
    // Manipulates and transforms degrees to percentage and vice versa.
    KupGauge.prototype.percToDeg = function (perc) {
        return perc * 360;
    };
    KupGauge.prototype.degToRad = function (deg) {
        return (deg * Math.PI) / 180;
    };
    KupGauge.prototype.percToRad = function (perc) {
        return this.degToRad(this.percToDeg(perc));
    };
    /**
     * Given a valid value, minValue <= value <= maxValue, calculates this value as a percentage of the interval [minValue, maxValue]
     * @param {number} valueToPercentage - The value to be calculated as a percentage
     * @see kup-gauge.maxValuePositive
     */
    KupGauge.prototype.calculateValuePercentage = function (valueToPercentage) {
        if (valueToPercentage === void 0) { valueToPercentage = 0; }
        return (valueToPercentage - this.minValue) / this.maxValuePositive;
    };
    KupGauge.prototype.calculateValueFontSize = function () {
        if (this.valueSize > 2)
            return '3vw';
        if (this.valueSize > 1)
            return '2.5vw';
        if (this.valueSize > 0)
            return '2vw';
        return '1.5vw';
    };
    //---- Rendering functions ----
    /**
     * Provided all the necessary data, returns the string necessary for a <path/> element to build the gauge needle.
     * @param needleLength - A pure number of viewbox units indicating the needle lenght.
     * @param needleBaseRadius - Sets the needle radius in viewbox units.
     * @param centerX - X coordinate of the center of the base needle.
     * @param centerY - Y coordinate of the center of the base needle.
     * @param rotationPercentage {number} - A percentage number setting the current rotation of the needle. (0 < rotationPercentage < 1)
     * @returns {string}
     */
    KupGauge.prototype.paintNeedle = function (needleLength, needleBaseRadius, centerX, centerY, rotationPercentage) {
        if (rotationPercentage === void 0) { rotationPercentage = 0; }
        var leftX, leftY, rightX, rightY, thetaRad, topX, topY;
        thetaRad = this.percToRad(rotationPercentage / 2); // Since the gauge is a semicircle, we must divide the percentage in half to have the correct angle
        topX = centerX - needleLength * Math.cos(thetaRad);
        topY = centerY - needleLength * Math.sin(thetaRad);
        leftX = centerX - needleBaseRadius * Math.cos(thetaRad - Math.PI / 2);
        leftY = centerY - needleBaseRadius * Math.sin(thetaRad - Math.PI / 2);
        rightX = centerX - needleBaseRadius * Math.cos(thetaRad + Math.PI / 2);
        rightY = centerY - needleBaseRadius * Math.sin(thetaRad + Math.PI / 2);
        return ('M ' +
            leftX +
            ' ' +
            leftY +
            ' L ' +
            topX +
            ' ' +
            topY +
            ' L ' +
            rightX +
            ' ' +
            rightY);
    };
    KupGauge.prototype.render = function () {
        var _this = this;
        // mathematical operations
        this.maxValuePositive = Math.abs(this.minValue - this.maxValue);
        // Svg constants
        var halvedSize = this.size / 2; // The svg size ratio w : w / 2
        var needleCircleRadius = this.size / 20; // Arbitrary size of the base of the needle
        var needleLength = halvedSize - 2 * this.arcThickness; // Calculates the length of the needle in pure units
        var valueLabelYPosition = halvedSize + needleCircleRadius + this.labelDistance * 1;
        // User provided thresholds
        // TODO these thresholds will be given to the component by a user prop
        var givenThresholds = [];
        if (!this.onlyValue) {
            if (this.firstThreshold || 0 === this.firstThreshold) {
                givenThresholds.push(this.firstThreshold);
            }
            if (this.secondThreshold || 0 === this.secondThreshold) {
                givenThresholds.push(this.secondThreshold);
            }
        }
        else {
            givenThresholds.push(this.value);
        }
        // This creates the various point from which the arcs are generated
        var arcsThresholds = [
            this.minValue
        ].concat(givenThresholds, [
            this.maxValue,
        ]);
        // Creates arc elements and chooses their color orders
        var arcsElements = [];
        var arcsColors;
        if (!this.onlyValue) {
            arcsColors = !this.reverseColors
                ? this.colors
                : this.colors.slice().reverse();
        }
        else {
            var computedcolors = !this.reverseColors
                ? this.colors
                : this.colors.slice().reverse();
            var valuecolor = this.value < this.firstThreshold
                ? computedcolors[0]
                : this.value < this.secondThreshold
                    ? computedcolors[1]
                    : computedcolors[2];
            arcsColors = [valuecolor, 'var(--gau_empty-color)'];
        }
        console.log(arcsThresholds.length);
        for (var i = 0; i < arcsThresholds.length - 1; i++) {
            var currentArcPath = this.arcGenerator({
                innerRadius: halvedSize - this.arcThickness,
                outerRadius: halvedSize,
                startAngle: this.calculateValuePercentage(arcsThresholds[i]) * Math.PI,
                endAngle: this.calculateValuePercentage(arcsThresholds[i + 1]) *
                    Math.PI,
            });
            // If there is no color specified for that arc, we provide a black fallback
            arcsElements.push(h("path", { d: currentArcPath, style: { fill: arcsColors[i] ? arcsColors[i] : '#000000' } }));
        }
        console.log(arcsElements.length);
        // Composes the threshold label elements, if labels must be displayed
        var textElements = this.showLabels || this.showMaxmin
            ? arcsThresholds.map(function (threshold) {
                // Given the
                var thresholdPercentage = _this.calculateValuePercentage(threshold);
                // Decides the position of the text
                // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
                var textPosition = 'end';
                if (thresholdPercentage > 0.5) {
                    textPosition = 'start';
                }
                else if (thresholdPercentage === 0.5) {
                    textPosition = 'middle';
                }
                // Since the gauge is a semicircle, we must divide the percentage in half to have the correct angle
                var thetaRad = _this.percToRad(thresholdPercentage / 2);
                var topX = halvedSize - (needleLength + 2) * Math.cos(thetaRad);
                var topY = halvedSize - (needleLength + 2) * Math.sin(thetaRad);
                var retValue = '';
                if (thresholdPercentage > 0 && thresholdPercentage < 1) {
                    if (_this.showLabels && !_this.onlyValue) {
                        retValue = (h("text", { class: "gauge__label-text", "text-anchor": textPosition, x: topX, y: topY }, threshold));
                    }
                }
                else {
                    if (_this.showMaxmin) {
                        if (thresholdPercentage === 0) {
                            topX = _this.arcThickness;
                            topY = halvedSize + _this.labelDistance;
                        }
                        else {
                            topX = _this.size - _this.arcThickness;
                            topY = halvedSize + _this.labelDistance;
                        }
                        retValue = (h("text", { class: "gauge__label-text", "text-anchor": textPosition, x: topX, y: topY }, threshold));
                    }
                }
                return retValue;
            })
            : [];
        var style = { fontSize: this.calculateValueFontSize() };
        var width = { width: this.widthComponent };
        return (h("div", { class: "gauge__container" }, h("svg", { class: "gauge", style: width, viewBox: "0 0 " + this.size + " " + valueLabelYPosition }, h("g", { transform: "rotate(-90) translate(-" + halvedSize + ", " + halvedSize + ")" }, arcsElements), this.needleCircle ?
            h("circle", { class: "gauge__needle-base", cx: halvedSize, cy: halvedSize, r: needleCircleRadius }) : null, h("path", { class: "gauge__needle", d: this.paintNeedle(needleLength, needleCircleRadius, halvedSize, halvedSize, this.calculateValuePercentage(this.value)) }), textElements), h("div", null, this.showValue ?
            h("div", { class: "gauge__value-text", "text-anchor": "middle", style: style }, this.value + ' ' + this.measurementUnit)
            : null)));
    };
    Object.defineProperty(KupGauge, "style", {
        get: function () { return ":host{--gau_needle-color:var(--kup-gauge_needle-color,#676767);--gau_top-lateral-padding:var(--kup-gauge_top-lateral-padding,30px);--gau_threshold-color:var(--kup-gauge_threshold-color,#676767);--gau_value-color:var(--kup-gauge_value-color,#676767);--gau_empty-color:var(--kup-gauge_empty-color,#e2e2e2);--gau_first-color:var(--kup-gauge_first-color,#eb4d4d);--gau_second-color:var(--kup-gauge_second-color,#f2b203);--gau_third-color:var(--kup-gauge_third-color,#02a045);display:inline-block}:host .gauge{height:auto;overflow:visible}:host .gauge__container{padding:var(--gau_top-lateral-padding) var(--gau_top-lateral-padding) 0}:host .gauge__label-text{fill:var(--gau_threshold-color);text-align:center}:host .gauge__value-text{fill:var(--gau_value-color);color:var(--gau_value-color);text-align:center}:host .gauge__needle,:host .gauge__needle-base{fill:var(--gau_needle-color)}"; },
        enumerable: true,
        configurable: true
    });
    return KupGauge;
}());
var KupHtml = /** @class */ (function () {
    function KupHtml(hostRef) {
        registerInstance(this, hostRef);
        /**
         * The label to show when button isButton is active
         */
        this.label = 'Open in a new window';
        /**
         * If true, the kup-html takes the shape of a button
         */
        this.isButton = false;
        /**
         * The address which must be referenced by the iframe
         */
        this.src = '';
        this.ketchupHtmlError = createEvent(this, "ketchupHtmlError", 6);
        this.ketchupHtmlLoaded = createEvent(this, "ketchupHtmlLoaded", 6);
    }
    KupHtml.prototype.onFrameError = function () {
        this.ketchupHtmlError.emit();
    };
    KupHtml.prototype.onFrameLoaded = function () {
        this.ketchupHtmlLoaded.emit();
    };
    //---- Rendering functions ----
    KupHtml.prototype.render = function () {
        return !this.isButton ?
            h("iframe", { class: "ketchup-frame", onError: this.onFrameError.bind(this), onLoad: this.onFrameLoaded.bind(this), src: this.src }) :
            h("a", { "aria-label": this.label, href: this.src, rel: "noopener", target: "_blank" }, h("kup-button", { align: "right", iconClass: "mdi mdi-open-in-new", label: this.label }));
    };
    Object.defineProperty(KupHtml, "style", {
        get: function () { return ":host{--htm_height:var(--kup-html_height,600px);--htm_width:var(--kup-html_width,100%);display:inline-block;width:100%}:host([is-button]){display:inline-block;width:auto}.ketchup-frame{height:var(--htm_height);width:var(--htm_width)}"; },
        enumerable: true,
        configurable: true
    });
    return KupHtml;
}());
var KupPortal = /** @class */ (function () {
    function KupPortal(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Tells the portal instance if it can be visible or not
         */
        this.isVisible = false;
        /**
         * Array of custom css vars which needs to be mirrored. Their value is computed from cssVarsRef
         */
        this.mirroredCssVars = [];
        /**
         * Calculated offset of where the portal must be positioned
         */
        this.refOffset = {};
        /**
         * The HTML element on which the virtual node must be appended
         */
        this.portalRootNode = document.body;
        //---- Internal state ----
        this.instance = document.createElement('kup-portal-instance');
        this.supportsShadowRoot = false;
        this.supportsAdoptedStyle = false;
    }
    //---- Lifecycle ----
    // Initial operations
    KupPortal.prototype.componentWillLoad = function () {
        // Attach the created element to the designed father
        this.portalRootNode.appendChild(this.instance);
        // Controls if the browsers supports shadow root
        // https://wicg.github.io/construct-stylesheets/
        if (this.instance.shadowRoot) {
            // If it is supported, then stores the portal initial stylesheet
            this.supportsShadowRoot = true;
            // and Construtable Stylesheet Objects
            if ('adoptedStyleSheets' in this.instance.shadowRoot) {
                this.supportsAdoptedStyle = true;
            }
        }
    };
    // Actual operations on the elements to update the portal instance
    // Migrated this hook from componentWillUpdate to componentWillRender
    // https://stenciljs.com/docs/component-lifecycle#componentwillrender-
    // Used this hook because during its execution props will held the new value
    // While componentWillUpdate does not have the correct value inside the props.
    KupPortal.prototype.componentDidUpdate = function () {
        // Updates tree node
        this.instance.vNodes = this.nodes;
        // Creates style node
        if (this.styleNode) {
            var styleNode = this.styleNode.cloneNode(true);
            styleNode.setAttribute('data-portal-style', 'true');
            this.instance.styleNode = styleNode;
        }
        else if (this.portalParentRef && this.supportsAdoptedStyle) {
            this.instance.additionalAdoptedStyleSheets = this.portalParentRef.shadowRoot.adoptedStyleSheets.slice();
        }
        // Sets new position
        setElementOffset(this.instance, this.refOffset);
        // Sets visibility
        this.instance.isVisible = this.isVisible;
        this.computeCssVars(this.portalParentRef, this.mirroredCssVars);
    };
    // Before being unmounted
    KupPortal.prototype.componentDidUnload = function () {
        this.portalRootNode.removeChild(this.instance);
    };
    //---- Watchers ----
    KupPortal.prototype.onPortalRootNodeChange = function (newValue) {
        newValue.appendChild(this.instance);
    };
    //---- Methods ----
    KupPortal.prototype.computeCssVars = function (el, props) {
        var _this = this;
        if (window) {
            var computed_1 = window.getComputedStyle(el);
            props.forEach(function (prop) {
                _this.instance.style.setProperty(prop, computed_1.getPropertyValue(prop));
            });
        }
    };
    /**
     * Returns the root node instance of the KetchupPortalInstance element
     */
    KupPortal.prototype.getPortalInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.instance];
            });
        });
    };
    //---- Rendering functions ----
    // This is portal component, which does not need any rendering
    KupPortal.prototype.render = function () { return null; };
    Object.defineProperty(KupPortal, "watchers", {
        get: function () {
            return {
                "portalRootNode": ["onPortalRootNodeChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return KupPortal;
}());
var KupPortalInstance = /** @class */ (function () {
    function KupPortalInstance(hostRef) {
        registerInstance(this, hostRef);
        this.additionalAdoptedStyleSheets = [];
        /**
         * Specifies if the current portal instance should be displayed or not.
         */
        this.isVisible = false;
        /**
         * Virtual node list the KetchupPortalInstance must render
         */
        this.vNodes = null;
        this.initialStyleSheets = [];
    }
    //---- Life cycle ----
    KupPortalInstance.prototype.componentWillRender = function () {
        // Avoid an error when there is no given style node
        if (!this.port.shadowRoot.querySelector('style[data-portal-style]') && this.styleNode) {
            this.port.shadowRoot.insertBefore(this.styleNode, this.port.shadowRoot.querySelector('style'));
        }
    };
    KupPortalInstance.prototype.componentDidUpdate = function () {
        // If there are adopted style sheets to be added to the portal instance, we set those after the rendering
        // This is because if set before the render there is no already set portal-instance style sheet.
        if (this.additionalAdoptedStyleSheets && this.additionalAdoptedStyleSheets.length) {
            // The first style sheet is always the one of the portal itself so it must be preserved.
            this.port.shadowRoot.adoptedStyleSheets = [this.port.shadowRoot.adoptedStyleSheets[0]].concat(this.additionalAdoptedStyleSheets);
        }
    };
    //---- Rendering functions ----
    // This is portal component, which does not need any rendering
    KupPortalInstance.prototype.render = function () {
        return this.vNodes;
    };
    Object.defineProperty(KupPortalInstance.prototype, "port", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupPortalInstance, "style", {
        get: function () { return ":host{display:none!important;position:absolute!important;z-index:99999!important}:host([is-visible]){display:inline-block!important}"; },
        enumerable: true,
        configurable: true
    });
    return KupPortalInstance;
}());
/**
 * Factory function for KetchupRadioElement
 * @constructor
 */
function KetchupRadioElementFactory() {
    return {
        label: '',
        value: ''
    };
}
var KupRadio = /** @class */ (function () {
    function KupRadio(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Label to describe the radio group
         */
        this.label = '';
        /**
         * Direction in which the radio elements must be placed
         */
        this.direction = 'horizontal';
        /**
         * Chooses which field of an item object should be used to create the list and be filtered.
         */
        this.displayedField = 'id';
        /**
         * Allows to pass an initial selected item for the Radio group
         */
        this.initialValue = KetchupRadioElementFactory();
        /**
         * Radio elements to display
         */
        this.items = [];
        /**
         * Radio elements value
         */
        this.radioName = '';
        /**
         * Chooses which field of an item object should be used to create the list and be filtered.
         */
        this.valueField = 'id';
        //---- Internal state ----
        this.selectedRadio = null;
        this.ketchupRadioChanged = createEvent(this, "ketchupRadioChanged", 6);
    }
    //---- Validating props ----
    KupRadio.prototype.checkDirection = function (newVal) {
        if (!/horizontal|vertical/.test(newVal)) {
            throw new Error('kup-radio: direction must be horizontal or vertical.');
        }
    };
    //---- Lifecycle Hooks ----
    KupRadio.prototype.componentWillLoad = function () {
        // When the component is going to be loaded, if there is an initial value set, we can reflect it to internal state
        // This is used because when component is instantiated it does NOT run watchers.
        this.reflectInitialValue(this.initialValue);
    };
    //---- Private methods ----
    // Always reflect changes of initialValue to value element
    KupRadio.prototype.reflectInitialValue = function (newValue, oldValue) {
        // When a new initial value is passed, we control that the new item is different from the old one before updating the state
        if (!oldValue || newValue[this.valueField] !== oldValue[this.valueField]) {
            this.onRadioChanged(newValue);
        }
    };
    // Typing for input element UIEvent & {target: HTMLInputElement}
    KupRadio.prototype.onRadioChanged = function (radio) {
        this.ketchupRadioChanged.emit({
            value: radio,
            oldValue: this.selectedRadio,
            info: {}
        });
        this.selectedRadio = radio;
    };
    //---- Rendering functions ----
    KupRadio.prototype.radioElementsComposer = function () {
        var _this = this;
        return this.items.map(function (radio) {
            // The id is necessary for the label to be associated with the input
            // TODO Anyway this can be extracted into another map object to avoid creating a new id each time the component is painted.
            var uId = generateUniqueId(radio[_this.valueField]);
            return h("li", { class: 'kup-radio__item' + (_this.selectedRadio && _this.selectedRadio[_this.valueField] === radio[_this.valueField] ? ' kup-radio__item--selected' : '') }, h("div", null, h("input", { id: uId, type: "radio", name: _this.radioName, value: radio[_this.valueField], onChange: _this.onRadioChanged.bind(_this, radio) })), h("label", { htmlFor: uId }, radio[_this.displayedField]));
        });
    };
    KupRadio.prototype.render = function () {
        var classRadioGroup = 'kup-radio__group';
        // When direction is horizontal
        if (this.direction === 'horizontal') {
            classRadioGroup += ' kup-radio__group--horizontal';
        }
        return (h("div", null, this.label ? h("p", null, this.label) : null, h("ul", { class: classRadioGroup }, this.radioElementsComposer())));
    };
    Object.defineProperty(KupRadio, "watchers", {
        get: function () {
            return {
                "direction": ["checkDirection"],
                "initialValue": ["reflectInitialValue"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupRadio, "style", {
        get: function () { return ":host{--rad_font-size:var(--kup-radio_font-size,14px);--rad_border-color:var(--kup-radio_border-color,grey);--rad_border-color--selected:var(--kup-radio_border-color,#676767);--rad_color:var(--kup-radio_color,#4e908f);--rad_tr-duration:var(--kup-radio_transition-duration,0.6s)}.kup-radio__group{list-style-type:none;margin:0;padding:0;position:relative;z-index:0}.kup-radio__group.kup-radio__group--horizontal{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.kup-radio__item{display:-ms-flexbox;display:flex;margin:10px 12px}.kup-radio__item,.kup-radio__item>div{-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:relative;z-index:0}.kup-radio__item>div{display:-ms-inline-flexbox;display:inline-flex;height:calc(var(--rad_font-size) * 1.4);width:calc(var(--rad_font-size) * 1.4)}.kup-radio__item>div:after,.kup-radio__item>div:before{border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;content:\"\"}.kup-radio__item>div:before{border:1px solid var(--rad_border-color);height:100%;left:0;position:absolute;top:0;-webkit-transition:border-color var(--rad_tr-duration);transition:border-color var(--rad_tr-duration);width:100%;z-index:0}.kup-radio__item>div:after{background-color:var(--rad_color);height:calc(100% - 6px);position:relative;opacity:0;-webkit-transition:opacity var(--rad_tr-duration);transition:opacity var(--rad_tr-duration);width:calc(100% - 6px);z-index:1}.kup-radio__item>div>input{cursor:pointer;height:100%;left:0;margin:0;opacity:0;position:absolute;top:0;width:100%;z-index:2}.kup-radio__item--selected div:before{border-color:var(--rad_border-color--selected)}.kup-radio__item--selected div:after{opacity:1}.kup-radio__item label{cursor:pointer;font-size:var(--rad_font-size);margin-left:10px}"; },
        enumerable: true,
        configurable: true
    });
    return KupRadio;
}());
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}
var isObject_1 = isObject;
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;
/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();
var _root = root;
/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function () {
    return _root.Date.now();
};
var now_1 = now;
/** Built-in value references. */
var Symbol = _root.Symbol;
var _Symbol = Symbol;
/** Used for built-in method references. */
var objectProto = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;
/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
        value[symToStringTag] = undefined;
        var unmasked = true;
    }
    catch (e) { }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag;
        }
        else {
            delete value[symToStringTag];
        }
    }
    return result;
}
var _getRawTag = getRawTag;
/** Used for built-in method references. */
var objectProto$1 = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
    return nativeObjectToString$1.call(value);
}
var _objectToString = objectToString;
/** `Object#toString` result references. */
var nullTag = '[object Null]', undefinedTag = '[object Undefined]';
/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
        ? _getRawTag(value)
        : _objectToString(value);
}
var _baseGetTag = baseGetTag;
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
    return value != null && typeof value == 'object';
}
var isObjectLike_1 = isObjectLike;
/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
    return typeof value == 'symbol' ||
        (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}
var isSymbol_1 = isSymbol;
/** Used as references for various `Number` constants. */
var NAN = 0 / 0;
/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol_1(value)) {
        return NAN;
    }
    if (isObject_1(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject_1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
}
var toNumber_1 = toNumber;
/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max, nativeMin = Math.min;
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber_1(wait) || 0;
    if (isObject_1(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing
            ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting;
    }
    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
            (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }
    function timerExpired() {
        var time = now_1();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
        timerId = undefined;
        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }
    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
        return timerId === undefined ? result : trailingEdge(now_1());
    }
    function debounced() {
        var time = now_1(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                clearTimeout(timerId);
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}
var debounce_1 = debounce;
// shamelessy copyed from https://github.com/ionic-team/ionic/blob/master/core/src/utils/helpers.ts
function debounceEvent(event, wait) {
    var original = event._original || event;
    return {
        _original: event,
        emit: debounce_1(original.emit.bind(original), wait),
    };
}
// export function debounce(func: (...args: any[]) => void, wait = 0) {
//     let timer: any;
//     return (...args: any[]): any => {
//         clearTimeout(timer);
//         timer = setTimeout(func, wait, ...args);
//     };
// }
var KupTextInput = /** @class */ (function () {
    function KupTextInput(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Marks the field as clearable, allowing an icon to delete its content
         */
        this.initialValue = '';
        /**
         * Specify the type of input. Allowed values: password, text.
         */
        this.inputType = 'text';
        /**
         * Marks the field as clearable, allowing an icon to delete its content
         */
        this.isClearable = false;
        /**
         * Label to describe the text-input clear button group
         */
        this.label = '';
        /**
         * The max length of the text field.
         * Default value copied from here: https://www.w3schools.com/tags/att_input_maxlength.asp
         */
        this.maxLength = 524288;
        /**
         * Set the amount of time, in milliseconds, to wait to trigger the `ketchupTextInputUpdated` event after each keystroke.
         */
        this.debounce = 400;
        /**
         * text for input placeholder
         */
        this.placeholder = '';
        //-- Validating props --
        //---- Internal state ----
        this.value = '';
        this.elementId = generateUniqueId('kup-input');
        //-- Constants --
        this.classInputText = 'kup-input-text';
        this.inputBlur = createEvent(this, "ketchupTextInputBlurred", 6);
        this.inputFocused = createEvent(this, "ketchupTextInputFocused", 6);
        this.ketchupTextInputSubmit = createEvent(this, "ketchupTextInputSubmit", 6);
        this.ketchupTextInputUpdated = createEvent(this, "ketchupTextInputUpdated", 6);
    }
    KupTextInput.prototype.debounceChanged = function () {
        this.ketchupTextInputUpdated = debounceEvent(this.ketchupTextInputUpdated, this.debounce);
    };
    //---- Lifecycle Hooks  ----
    KupTextInput.prototype.componentWillLoad = function () {
        // Sets initial value inside the element
        this.value = this.initialValue;
    };
    KupTextInput.prototype.componentDidLoad = function () {
        this.debounceChanged();
    };
    //---- Public Methods ----
    /**
     * Triggers the focus event on the input text
     * @method triggerFocus
     */
    KupTextInput.prototype.triggerFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // For focus issues, maybe have a look here
                // https://github.com/ionic-team/stencil/issues/180
                // https://github.com/ionic-team/stencil/issues/1008
                this.inputEl.focus();
                this.textInput.focus();
                return [2 /*return*/];
            });
        });
    };
    //---- Events and handlers ----
    /**
     * Clear the current content inside the the text input
     */
    KupTextInput.prototype.onClearClick = function () {
        var _this = this;
        var oldValue = this.value;
        this.value = '';
        this.ketchupTextInputUpdated.emit({
            value: this.value,
            oldValue: oldValue,
            info: {
                obj: this.obj,
            },
        });
        setTimeout(function () { return _this.triggerFocus(); }, 10);
    };
    /**
     * Listens for keydown events to get when 'Enter' is pressed, firing a submit event.
     */
    KupTextInput.prototype.onKeyDown = function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.ketchupTextInputSubmit.emit({
                value: this.value,
                oldValue: this.value,
                info: {
                    obj: this.obj,
                },
            });
        }
    };
    KupTextInput.prototype.onInputBlurred = function (event) {
        var target = event.target;
        this.inputBlur.emit({
            value: target.value,
            oldValue: this.value,
            info: {
                obj: this.obj,
            },
        });
        this.value = target.value;
        this.inputWrapperEl.classList.remove('focused');
    };
    KupTextInput.prototype.onInputFocused = function (event) {
        var target = event.target;
        this.inputFocused.emit({
            value: target.value,
            oldValue: this.value,
            info: {
                obj: this.obj,
            },
        });
        this.value = target.value;
        this.inputWrapperEl.classList.add('focused');
    };
    KupTextInput.prototype.onInputUpdated = function (event) {
        var target = event.target;
        this.ketchupTextInputUpdated.emit({
            value: target.value,
            oldValue: this.value,
            info: {
                obj: this.obj,
            },
        });
        this.value = target.value;
    };
    //---- Rendering functions ----
    KupTextInput.prototype.render = function () {
        var _this = this;
        var containerClass = this.classInputText + '__container';
        var lbl = null;
        if (this.label) {
            lbl = h("label", { htmlFor: this.elementId }, this.label);
        }
        var inputWrapperClass = this.classInputText + '__input-wrapper';
        return (h("div", { class: containerClass +
                (this.isClearable
                    ? ' ' + containerClass + '--clearable'
                    : '') }, lbl, h("div", { class: inputWrapperClass, ref: function (el) { return (_this.inputWrapperEl = el); } }, h("slot", { name: "left" }), h("input", { id: this.elementId, class: this.classInputText, maxlength: this.maxLength, ref: function (el) { return (_this.textInput = el); }, tabindex: "0", type: this.inputType, value: this.value, onBlur: this.onInputBlurred.bind(this), onInput: this.onInputUpdated.bind(this), onFocus: this.onInputFocused.bind(this), onKeyDown: this.onKeyDown.bind(this), placeholder: this.placeholder }), this.isClearable ? (h("button", { "aria-label": "Close", class: this.classInputText + '__clear', role: "button", onClick: this.onClearClick.bind(this) }, h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })))) : null)));
    };
    Object.defineProperty(KupTextInput.prototype, "inputEl", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupTextInput, "watchers", {
        get: function () {
            return {
                "debounce": ["debounceChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupTextInput, "style", {
        get: function () { return ":host{--itx_color:var(--kup-text-input_color,#000);--itx_font-size:var(--kup-text-input_font-size,1rem);--itx_border-color:var(--kup-text-input_border-color,grey);--itx_border-color--selected:var(--kup-text-input_border-color--selected,#4e908f);--itx_tr-duration:var(--kup-text-input_transition-duration,0.6s);--itx_icon-color:var(--kup-text-input_icon-color,grey);--itx_icon-color--hover:var(--kup-text-input_icon-color--hover,#676767);--itx_placeholder-color:var(--kup-text-input_placeholder-color,#bebebe);--itx_background-color:var(--kup-text-input_background-color,transparent);display:inline-block}label{margin-right:.5rem}.kup-input-text{color:var(--itx_color);background-color:transparent;border:none;outline:none;position:relative;-webkit-transition:background-color var(--itx_tr-duration);transition:background-color var(--itx_tr-duration);z-index:0}.kup-input-text__input-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:.2rem .4rem;background-color:var(--itx_background-color);border:1px solid var(--itx_border-color);border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box}.kup-input-text__input-wrapper .kup-input-text{font-size:var(--itx_font-size)}.kup-input-text__input-wrapper.focused{border-color:var(--itx_border-color--selected)}.kup-input-text__container{display:inline-block;position:relative;z-index:0}.kup-input-text::-webkit-input-placeholder{color:var(--itx_placeholder-color)}.kup-input-text::-moz-placeholder{color:var(--itx_placeholder-color)}.kup-input-text:-ms-input-placeholder{color:var(--itx_placeholder-color)}.kup-input-text::-ms-input-placeholder{color:var(--itx_placeholder-color)}.kup-input-text::placeholder{color:var(--itx_placeholder-color)}.kup-input-text__clear{-ms-flex-align:center;align-items:center;background-color:transparent;border:none;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;outline:none;z-index:1;padding:0}.kup-input-text__clear>svg{fill:var(--itx_icon-color);height:var(--itx_font-size);-webkit-transition:fill var(--itx_tr-duration);transition:fill var(--itx_tr-duration);width:var(--itx_font-size)}.kup-input-text__clear:hover>svg{fill:var(--itx_icon-color--hover)}"; },
        enumerable: true,
        configurable: true
    });
    return KupTextInput;
}());
export { KupBtn as kup_btn, KupButton as kup_button, KupCheckbox as kup_checkbox, KupCombo as kup_combo, KupFld as kup_fld, KupGauge as kup_gauge, KupHtml as kup_html, KupPortal as kup_portal, KupPortalInstance as kup_portal_instance, KupRadio as kup_radio, KupTextInput as kup_text_input };
