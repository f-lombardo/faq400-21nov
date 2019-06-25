import '../../stencil.core';
import { ElementOffset } from "../../utils/offset";
export declare class KupPortal {
    /**
     * Reference to the html element from which CSS Custom Properties must be derived
     */
    cssVarsRef: HTMLElement;
    /**
     * Tells the portal instance if it can be visible or not
     */
    isVisible: boolean;
    /**
     * Array of custom css vars which needs to be mirrored. Their value is computed from cssVarsRef
     */
    mirroredCssVars: string[];
    /**
     * Virtual node list the KetchupPortalInstance must render
     */
    nodes: JSX.Element[] | JSX.Element;
    /**
     * Calculated offset of where the portal must be positioned
     */
    refOffset: ElementOffset;
    /**
     * The HTML element on which the virtual node must be appended
     */
    portalRootNode: HTMLElement;
    /**
     * A style node to be copied into the KetchupPortalInstance
     */
    styleNode: HTMLStyleElement;
    instance: HTMLKupPortalInstanceElement;
    componentWillLoad(): void;
    componentWillUpdate(): void;
    componentDidUnload(): void;
    onPortalRootNodeChange(newValue: any): void;
    computeCssVars(el: HTMLElement, props: string[]): void;
    /**
     * Returns the root node instance of the KetchupPortalInstance element
     */
    getPortalInstance(): Promise<HTMLKupPortalInstanceElement>;
    render(): any;
}
