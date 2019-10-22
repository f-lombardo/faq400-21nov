import { EventEmitter } from '../../stencil.core';
export declare class KupCheckbox {
    /**
     * Sets the checkbox to be disabled
     */
    checked: boolean;
    /**
     * Sets the checkbox to be disabled
     *
     * Must have reflect into the attribute
     */
    disabled: boolean;
    /**
     * The label to set to the component
     */
    label: string;
    /**
     * Sets the tabindex of the checkbox
     */
    setTabIndex: number;
    checkbox: HTMLInputElement;
    /**
     * Fired when the checkbox input is blurred
     */
    kupCheckboxBlur: EventEmitter<{
        checked: boolean;
    }>;
    /**
     * Fired when the checkbox input changes its value
     */
    kupCheckboxChange: EventEmitter<{
        checked: boolean;
    }>;
    /**
     * Fired when the checkbox input receive focus
     */
    kupCheckboxFocus: EventEmitter<{
        checked: boolean;
    }>;
    onCheckboxBlur(): void;
    onCheckboxChange(e: UIEvent): void;
    onCheckboxFocus(): void;
    onHostFocus(): void;
    render(): any;
}
