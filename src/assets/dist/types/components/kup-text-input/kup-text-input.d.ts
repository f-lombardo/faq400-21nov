import { EventEmitter } from '../../stencil.core';
import { KetchupTextInputEvent } from './kup-text-input-declarations';
import { GenericObject } from '../../types/GenericTypes';
export declare class KupTextInput {
    /**
     * Marks the field as clearable, allowing an icon to delete its content
     */
    initialValue: string;
    /**
     * Specify the type of input. Allowed values: password, text.
     */
    inputType: string;
    /**
     * Marks the field as clearable, allowing an icon to delete its content
     */
    isClearable: boolean;
    /**
     * Label to describe the text-input clear button group
     */
    label: string;
    /**
     * The max length of the text field.
     * Default value copied from here: https://www.w3schools.com/tags/att_input_maxlength.asp
     */
    maxLength: number;
    /**
     * Set the amount of time, in milliseconds, to wait to trigger the `ketchupTextInputUpdated` event after each keystroke.
     */
    debounce: number;
    /**
     * A generic object which can be passed to the component.
     * Once this object is set, it will always be returned inside the info field of the
     * ketchupTextInputUpdated and ketchupTextInputSubmit.
     */
    obj?: GenericObject;
    /**
     * text for input placeholder
     */
    placeholder: string;
    protected debounceChanged(): void;
    value: string;
    inputEl: HTMLElement;
    elementId: string;
    textInput: HTMLInputElement;
    inputWrapperEl: HTMLDivElement;
    classInputText: string;
    componentWillLoad(): void;
    componentDidLoad(): void;
    /**
     * Triggers the focus event on the input text
     * @method triggerFocus
     */
    triggerFocus(): Promise<void>;
    /**
     * Clear the current content inside the the text input
     */
    onClearClick(): void;
    /**
     * Listens for keydown events to get when 'Enter' is pressed, firing a submit event.
     */
    onKeyDown(event: KeyboardEvent): void;
    /**
     * When text field loses focus (blur)
     */
    inputBlur: EventEmitter<KetchupTextInputEvent>;
    onInputBlurred(event: UIEvent & {
        target: HTMLInputElement;
    }): void;
    /**
     * When the text input gains focus
     */
    inputFocused: EventEmitter<KetchupTextInputEvent>;
    onInputFocused(event: UIEvent & {
        target: HTMLInputElement;
    }): void;
    /**
     * When a keydown enter event occurs it generates
     */
    ketchupTextInputSubmit: EventEmitter<KetchupTextInputEvent>;
    /**
     * When the input text value gets updated
     */
    ketchupTextInputUpdated: EventEmitter<KetchupTextInputEvent>;
    onInputUpdated(event: UIEvent & {
        target: HTMLInputElement;
    }): void;
    render(): any;
}
