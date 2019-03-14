import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class KetchupButton {
    ketchupButtonEl: HTMLElement;
    flat: boolean;
    label: string;
    buttonClass: string;
    iconClass: string;
    fillspace: boolean;
    showtext: boolean;
    showicon: boolean;
    rounded: boolean;
    textmode: string;
    transparent: boolean;
    borderColor: string;
    align: string;
    btnStyle: any;
    iconUrl: string;
    ketchupButtonClicked: EventEmitter;
    onBorderColorChange(newValue: string, oldValue: string): void;
    onStyleChanged(newValue: any, oldValue: any): void;
    onBtnClickedHandler(): void;
    _isHint(): boolean;
    render(): JSX.Element;
}
