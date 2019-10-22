import { KupPayloadEvent } from "../../types/EventInterfaces";
import { GenericObject } from "../../types/GenericTypes";
export interface KetchupRadioElement {
    label: string;
    value: string;
}
export declare type KetchupRadioChangeEvent = KupPayloadEvent<any, GenericObject>;
/**
 * Factory function for KetchupRadioElement
 * @constructor
 */
export declare function KetchupRadioElementFactory(): KetchupRadioElement;
