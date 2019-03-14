import { EventEmitter } from '../../stencil.core';
export declare class KetchupFld {
    /**
     * Data the FLD must parse to fully be configured
     */
    json: string | object;
    /**
     * Effective data to pass to the component
     */
    data: any;
    updateInternalState(): void;
    componentWillLoad(): void;
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
    ketchupFldSubmit: EventEmitter;
    onSubmitClicked(): void;
    render(): any[];
}
