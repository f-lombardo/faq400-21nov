import '../../stencil.core';
export declare class KupPortalInstance {
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
    componentWillUpdate(): void;
    port: HTMLElement;
    render(): JSX.Element | JSX.Element[];
}
