import '../../stencil.core';
export declare class KetchupBtn {
    buttons: any[];
    buttonClass: string;
    fillspace: boolean;
    showtext: boolean;
    showicon: boolean;
    horizontal: boolean;
    rounded: boolean;
    flat: boolean;
    transparent: boolean;
    showSelection: boolean;
    borderColor: string;
    textmode: string;
    align: string;
    columns: number;
    btnStyle: any;
    iconUrl: string;
    selectedBtnIndex: number;
    onShowSelectionChanged(newValue: boolean): void;
    onBtnClicked(event: CustomEvent): void;
    render(): JSX.Element;
}
