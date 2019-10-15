import { JSX } from '../../stencil.core';
export declare class KupPortalInstance {
    additionalAdoptedStyleSheets: CSSStyleSheet[];
    /**
     * Specifies if the current portal instance should be displayed or not.
     */
    isVisible: boolean;
    /**
     * A style node to be copied into the KetchupPortalInstance
     */
    styleNode: HTMLStyleElement;
    /**
     * Virtual node list the KetchupPortalInstance must render
     */
    vNodes?: JSX.Element[] | JSX.Element;
    port: HTMLElement;
    initialStyleSheets: CSSStyleSheet[];
    componentWillRender(): void;
    componentDidUpdate(): void;
    render(): JSX.Element | JSX.Element[];
}
