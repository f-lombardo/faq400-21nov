import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class KetchupDash {
    layout: string;
    ketchupDashClicked: EventEmitter<{}>;
    onDshClickedHandler(): void;
    render(): JSX.Element;
}
