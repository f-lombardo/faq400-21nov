import { ButtonConfig } from './kup-btn-declarations';
export declare class KupBtn {
    buttons: any[];
    config: ButtonConfig;
    selectedBtnIndex: number;
    onBtnClicked(event: CustomEvent): void;
    render(): any;
}
