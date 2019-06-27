import { EventEmitter } from '../../stencil.core';
import { KetchupFldChangeEvent, KetchupFldSubmitEvent } from './kup-fld-declarations';
import { KetchupTextInputEvent } from '../kup-text-input/kup-text-input-declarations';
import { KetchupRadioChangeEvent } from '../kup-radio/kup-radio-declarations';
import { KetchupComboEvent } from '../kup-combo/kup-combo-declarations';
export declare class KupFld {
    /**
     * Data the FLD must parse to fully be configured.
     * It must be either an Object or a JSON parsable string
     */
    config: string | object;
    /**
     * Effective data to pass to the component
     */
    data: any;
    updateInternalState(): void;
    /**
     * The type of the FLD
     */
    type: string;
    /**
     * Chooses if there is the need to show the submit button or not
     */
    showSubmit: boolean;
    /**
     * Chooses the submit button label to show
     */
    submitLabel: string;
    /**
     * Chooses the submit button position
     */
    submitPos: string;
    /**
     * Chooses the label to show
     * If set to empty or has only white space chars, the label get removed
     */
    label: string;
    /**
     * Chooses label position
     */
    labelPos: string;
    /**
     * Unsupported props gets propagated down to dynamic component
     */
    propagate: any;
    /**
     * Other configurations
     */
    extensions: {
        minQueryLength?: number;
        forceSelection?: boolean;
    };
    radioGeneratedName: string;
    currentValue: object | string;
    previousValue: object | string;
    onChangeInstance: any;
    onSubmitInstance: any;
    /**
     * Launched when the value of the current FLD changes.
     */
    ketchupFldChanged: EventEmitter<KetchupFldChangeEvent>;
    /**
     * Launched when the FLD values are confirmed and a submit event is triggered.
     */
    ketchupFldSubmit: EventEmitter<KetchupFldSubmitEvent>;
    componentWillLoad(): void;
    onChange(event: CustomEvent<KetchupTextInputEvent | KetchupRadioChangeEvent | KetchupComboEvent>): void;
    onSubmit(event: CustomEvent<KetchupTextInputEvent | KetchupRadioChangeEvent | KetchupComboEvent>): void;
    /**
     * Provides an interface to get the current value programmatically
     * @method getCurrentValue
     * @returns {any}
     */
    getCurrentValue(): Promise<string | object>;
    render(): any[];
}
