import '../../stencil.core';
import { ButtonConfig } from './kup-btn-declarations';
export declare class KupBtn {
    buttons: any[];
    config: ButtonConfig;
    selectedBtnIndex: number;
    onBtnClicked(event: CustomEvent): void;
    render(): JSX.Element;
}
