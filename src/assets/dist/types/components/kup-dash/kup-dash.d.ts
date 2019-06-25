import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class KupDash {
    layout: string;
    fontsize: string;
    ketchupDashClicked: EventEmitter<{}>;
    onDshClickedHandler(): void;
    render(): JSX.Element;
}
