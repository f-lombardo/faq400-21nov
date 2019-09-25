import { EventEmitter } from '../../stencil.core';
export declare class KupChip {
    closable: boolean;
    disabled: boolean;
    close: EventEmitter;
    private onCloseClicked;
    render(): any;
}
