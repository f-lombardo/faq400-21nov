import { EventEmitter } from '../../stencil.core';
export declare class KupHtml {
    /**
     * The label to show when button isButton is active
     */
    label: string;
    /**
     * If true, the kup-html takes the shape of a button
     */
    isButton: boolean;
    /**
     * The address which must be referenced by the iframe
     */
    src: string;
    /**
     * When loading the frame has thrown an error
     */
    ketchupHtmlError: EventEmitter;
    onFrameError(): void;
    /**
     * When the iframe has been loaded
     */
    ketchupHtmlLoaded: EventEmitter;
    onFrameLoaded(): void;
    render(): any;
}
