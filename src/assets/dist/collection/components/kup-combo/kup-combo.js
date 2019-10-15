import { h } from '@stencil/core';
import { eventFromElement } from '../../utils/utils';
import { getElementOffset } from '../../utils/offset';
/*
 * TODO: Control if there can be issues with z-index and elements not correctly triggering the functions to close the combo box list
 * See this article here to use the method to get the current position and avoid opening the menu in the wrong direction
 * https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
 */
export class KupCombo {
    constructor() {
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
    }
    //---- Lifecycle Hooks ----
    componentWillLoad() {
        // When the component is going to be loaded, if there is an initial value set, we can reflect it to internal state
        // This is used because when component is instantiated it does NOT run watchers.
        this.reflectInitialValue(this.initialValue);
    }
    componentDidLoad() {
        // When component is created, then the listener is set. @See clickFunction for more details
        document.addEventListener('click', this.clickFunction);
    }
    componentDidUnload() {
        // When component is destroyed, then the listener is removed. @See clickFunction for more details
        document.removeEventListener('click', this.clickFunction);
    }
    //---- Public Methods ----
    /**
     * Programmatically close the combo box
     * @method closeCombo
     */
    async closeCombo() {
        this.isOpen = false;
    }
    /**
     * Programmatically opens the combo box
     * @method openCombo
     */
    async openCombo() {
        this.comboPosition = this.calcBoxPosition();
        this.isOpen = true;
    }
    //---- Private methods ----
    // Always reflect changes of initialValue to value element
    reflectInitialValue(newValue, oldValue) {
        // When a new initial value is passed, we control that the new item is different from the old one before updating the state
        if (!oldValue ||
            newValue[this.valueField] !== oldValue[this.valueField]) {
            this.onComboSelected(newValue, oldValue);
        }
    }
    // When valueField changes, then reflects the changes also inside the value prop
    reflectValueField(newValue) {
        this.value = this.selected ? this.selected[newValue] : '';
    }
    // Calculates where the box must be positioned according to the position the text input is placed
    calcBoxPosition() {
        const windowX = document.documentElement.clientWidth;
        const windowY = document.documentElement.clientHeight;
        const { height, left, top, width, } = this.comboText.getBoundingClientRect();
        return {
            isRight: left + width / 2 > windowX / 2,
            isTop: top + height / 2 > windowY / 2,
        };
    }
    //---- Events and handlers ----
    /**
     * Clear the current content inside the the text input
     * @method onClearClick
     */
    onClearClick() {
        this.onComboSelected(null, this.selected);
    }
    /**
     * Opens the combo box when clicked
     * @method onComboClick
     */
    onComboClick() {
        this.openCombo();
    }
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
    async onDocumentClick(event) {
        let response = null;
        if (this.usePortal) {
            response = await this.portalRef.getPortalInstance();
        }
        try {
            if (event.composedPath().indexOf(this.comboEl) < 0 &&
                event.composedPath().indexOf(response) < 0) {
                this.closeCombo();
            }
        }
        catch (e) {
            const ele = event.target;
            if (!eventFromElement(this.comboEl, ele) &&
                !eventFromElement(response, ele)) {
                this.closeCombo();
            }
        }
    }
    /**
     * Function which gets triggered when filter changes
     * @param event
     */
    onFilterUpdate(event) {
        this.filter = event.detail.value.toLowerCase();
    }
    /**
     * When an item gets selected
     * @param item
     */
    onItemSelected(item) {
        if (item[this.valueField] !== this.value) {
            this.onComboSelected(item, this.selected);
        }
        this.closeCombo();
    }
    onComboSelected(item, oldItem) {
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
    }
    //---- Rendering functions ----
    // Creates the menu and its items
    composeList() {
        let filter = null;
        if (this.isFilterable) {
            filter = (h("div", { class: this.baseClass + '__filter' },
                h("kup-text-input", { onKetchupTextInputUpdated: this.onFilterUpdate.bind(this) })));
        }
        return (h("div", { class: this.baseClass +
                '__menu' +
                (this.isOpen ? ' is-open' : '') +
                (this.comboPosition.isRight ? ' is-right' : '') +
                (this.comboPosition.isTop ? ' is-top' : '') +
                (this.usePortal ? ' is-using-portal' : '') },
            filter,
            h("ul", { class: this.baseClass + '__list' }, this.items
                .filter((item) => !this.filter ||
                item[this.displayedField]
                    .toLowerCase()
                    .indexOf(this.filter) >= 0)
                .map((item) => (h("li", { onClick: () => this.onItemSelected(item) },
                h("span", null, item[this.displayedField])))))));
    }
    render() {
        const containerClass = this.baseClass + '__container';
        return [
            h("div", { class: containerClass +
                    (this.isClearable
                        ? ' ' + containerClass + '--clearable'
                        : ''), ref: (el) => (this.comboText = el) },
                h("span", { class: this.baseClass + '__current-value', onClick: this.onComboClick.bind(this) },
                    h("span", { class: "value-text" }, this.selected
                        ? this.selected[this.displayedField]
                        : ''),
                    h("svg", { class: this.baseClass +
                            '__icon ' +
                            this.baseClass +
                            '__chevron' +
                            (this.isOpen
                                ? ' ' + this.baseClass + '__chevron--open'
                                : ''), version: "1.1", width: "24", height: "24", viewBox: "0 0 24 24" },
                        h("path", { d: "M7,10L12,15L17,10H7Z" }))),
                this.isClearable ? (h("button", { "aria-label": "Close", class: this.baseClass + '__clear', role: "button", onClick: this.onClearClick.bind(this) },
                    h("svg", { class: this.baseClass + '__icon', viewBox: "0 0 24 24" },
                        h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })))) : null),
            this.usePortal ? (h("kup-portal", { isVisible: this.isOpen, mirroredCssVars: this.internalCssVars, nodes: this.composeList(), portalParentRef: this.comboEl, ref: (el) => (this.portalRef = el), 
                // Notice that the portal offset MUST be calculated considering the menu button, not the whole web component
                refOffset: getElementOffset(this.comboText, this.comboPosition), styleNode: this.comboEl.shadowRoot.querySelector('style') })) : (this.composeList()),
        ];
    }
    static get is() { return "kup-combo"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-combo.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-combo.css"]
    }; }
    static get properties() { return {
        "displayedField": {
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
                "text": "Chooses which field of an item object should be used to create the list and be filtered."
            },
            "attribute": "displayed-field",
            "reflect": false,
            "defaultValue": "'id'"
        },
        "initialValue": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "ComboItem | null",
                "resolved": "ComboItem",
                "references": {
                    "ComboItem": {
                        "location": "import",
                        "path": "./kup-combo-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Allows to pass an initial selected item for the combobox"
            },
            "defaultValue": "null"
        },
        "isClearable": {
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
                "text": "Marks the field as clearable, allowing an icon to delete its content"
            },
            "attribute": "is-clearable",
            "reflect": false,
            "defaultValue": "false"
        },
        "isFilterable": {
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
                "text": "Marks the field as filterable, allowing an input text to filter the options"
            },
            "attribute": "is-filterable",
            "reflect": true,
            "defaultValue": "true"
        },
        "items": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "ComboItem[]",
                "resolved": "ComboItem[]",
                "references": {
                    "ComboItem": {
                        "location": "import",
                        "path": "./kup-combo-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Items which can be selected"
            },
            "defaultValue": "[]"
        },
        "label": {
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
                "text": "Label to describe the radio group"
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "''"
        },
        "obj": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "GenericObject",
                "resolved": "GenericObject",
                "references": {
                    "GenericObject": {
                        "location": "import",
                        "path": "../../types/GenericTypes"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "An arbitrary object object which can be passed to the component.\r\nIt will be returned when ketchupComboSelected event is fired, inside detail.info.obj"
            }
        },
        "valueField": {
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
                "text": "Chooses which field of an item object should be used to create the list and be filtered."
            },
            "attribute": "value-field",
            "reflect": false,
            "defaultValue": "'id'"
        },
        "usePortal": {
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
                "tags": [{
                        "text": "kup-portal readme for more details.",
                        "name": "see"
                    }],
                "text": "If true, the combobox uses a Stencil portal to create the menu.\r\nPlease use this feature carefully, only if needed."
            },
            "attribute": "use-portal",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "value": {},
        "filter": {},
        "isOpen": {}
    }; }
    static get events() { return [{
            "method": "ketchupComboSelected",
            "name": "ketchupComboSelected",
            "bubbles": true,
            "cancelable": false,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "When an element has been selected"
            },
            "complexType": {
                "original": "KetchupComboEvent",
                "resolved": "KupPayloadEvent<ComboItem, GenericObject>",
                "references": {
                    "KetchupComboEvent": {
                        "location": "import",
                        "path": "./kup-combo-declarations"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "closeCombo": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Programmatically close the combo box",
                "tags": [{
                        "name": "method",
                        "text": "closeCombo"
                    }]
            }
        },
        "openCombo": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Programmatically opens the combo box",
                "tags": [{
                        "name": "method",
                        "text": "openCombo"
                    }]
            }
        }
    }; }
    static get elementRef() { return "comboEl"; }
    static get watchers() { return [{
            "propName": "initialValue",
            "methodName": "reflectInitialValue"
        }, {
            "propName": "valueField",
            "methodName": "reflectValueField"
        }]; }
}
