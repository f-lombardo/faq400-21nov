import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { ComboItem } from './ketchup-combo-declarations';
/**
 * TODO: Control if there can be issues with z-index and elements not correctly triggering the functions to close the combo box list
 * See this article here to use the method to get the current position and avoid opening the menu in the wrong direction
 * https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
 **/
export declare class KetchupCombo {
    /**
     * Chooses which field of an item object should be used to create the list and be filtered.
     */
    displayedField: string;
    /**
     * Allows to pass an initial selected item for the combobox
     */
    initialValue: string;
    /**
     * Marks the field as clearable, allowing an icon to delete its content
     */
    isClearable: boolean;
    /**
     * Items which can be selected
     */
    items: ComboItem[];
    /**
     * Label to describe the radio group
     */
    label: string;
    value: string;
    filter: string;
    isOpen: boolean;
    comboEl: HTMLElement;
    selected: ComboItem;
    /**
     * Creates a variable with an instance of the handler for the click event and binds this instance of the combo box to it.
     * This is used to add and more importantly remove events listeners attached to the body.
     * Sets listener on document to check if a click originated elsewhere
     * In that case closes the combo
     */
    clickFunction: any;
    comboText: HTMLInputElement;
    comboPosition: {
        isRight: boolean;
        isTop: boolean;
    };
    baseClass: string;
    componentDidLoad(): void;
    componentDidUnload(): void;
    /**
     * Opens the combo box
     * @method closeCombo
     */
    closeCombo(): void;
    /**
     * Opens the combo box
     * @method openCombo
     */
    openCombo(): void;
    reflectInitialValue(newValue: string): void;
    calcBoxPosition(): {
        isRight: boolean;
        isTop: boolean;
    };
    /**
     * Clear the current content inside the the text input
     * @method onClearClick
     */
    onClearClick(): void;
    /**
     * Opens the combo box when clicked
     * @method onComboClick
     */
    onComboClick(): void;
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
    onDocumentClick(event: UIEvent): void;
    /**
     * Function which gets triggered when filter changes
     * @param event
     */
    onFilterUpdate(event: CustomEvent): void;
    /**
     * When an item gets selected
     * @param item
     */
    onItemSelected(item: ComboItem): void;
    ketchupComboSelected: EventEmitter;
    onComboSelected(item: ComboItem | null): void;
    render(): JSX.Element[];
}
