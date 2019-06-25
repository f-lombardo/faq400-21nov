import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { KetchupRadioElement, KetchupRadioChangeEvent } from "./kup-radio-declarations";
export declare class KupRadio {
    /**
     * Label to describe the radio group
     */
    label: string;
    /**
     * Direction in which the radio elements must be placed
     */
    direction: string;
    /**
     * Chooses which field of an item object should be used to create the list and be filtered.
     */
    displayedField: string;
    /**
     * Allows to pass an initial selected item for the Radio group
     */
    initialValue: KetchupRadioElement;
    /**
     * Radio elements to display
     */
    items: KetchupRadioElement[];
    /**
     * Radio elements value
     */
    radioName: string;
    /**
     * Chooses which field of an item object should be used to create the list and be filtered.
     */
    valueField: string;
    checkDirection(newVal: string): void;
    selectedRadio: KetchupRadioElement | null;
    componentWillLoad(): void;
    reflectInitialValue(newValue: KetchupRadioElement, oldValue?: KetchupRadioElement): void;
    /**
     * When currently selected radio button has been changed.
     * */
    ketchupRadioChanged: EventEmitter<KetchupRadioChangeEvent>;
    onRadioChanged(radio: KetchupRadioElement): void;
    radioElementsComposer(): JSX.Element[];
    render(): JSX.Element;
}
