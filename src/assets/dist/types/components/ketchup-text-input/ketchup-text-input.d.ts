import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class KetchupTextInput {
    /**
     * Marks the field as clearable, allowing an icon to delete its content
     */
    initialValue: string;
    /**
     * Marks the field as clearable, allowing an icon to delete its content
     */
    isClearable: boolean;
    /**
     * Label to describe the radio group
     */
    label: string;
    /**
     * The max length of the text field.
     * Default value copied from here: https://www.w3schools.com/tags/att_input_maxlength.asp
     */
    maxLength: number;
    value: string;
    inputEl: HTMLElement;
    textInput: HTMLInputElement;
    classInputText: string;
    componentWillLoad(): void;
    /**
     * Triggers the focus event on the input text
     * @method triggerFocus
     */
    triggerFocus(): void;
    /**
     * Clear the current content inside the the text input
     * @method onClearClick
     */
    onClearClick(): void;
    inputBlur: EventEmitter;
    onInputBlurred(event: UIEvent & {
        target: HTMLInputElement;
    }): void;
    inputFocused: EventEmitter;
    onInputFocused(event: UIEvent & {
        target: HTMLInputElement;
    }): void;
    inputUpdated: EventEmitter;
    onInputUpdated(event: UIEvent & {
        target: HTMLInputElement;
    }): void;
    render(): JSX.Element;
}
