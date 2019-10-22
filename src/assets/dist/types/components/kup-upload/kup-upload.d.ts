import { EventEmitter } from '../../stencil.core';
import { UploadProps } from './kup-upload-declarations';
/**
 * For use import in project:
 *      npm import @vaadin/vaadin-upload --save
 * and import in the classes where is used;
 *      import '@vaadin/vaadin-upload';
 */
export declare class KupUpload {
    /**
     */
    typeOptions: UploadProps;
    /**
     * Launched when file upload succeed
     */
    ketchupFileUploaded: EventEmitter;
    ketchupFileRejected: EventEmitter;
    /**
     * Explanation for this piece of code.
     *
     * The file upload component is currently based on vaadin-upload web component.
     * However, as of now (17/10/2019) Vaadin's components are built using the old Polymer3 project.
     * This means that, to allow specific styling you should follow the guide linked below.
     *
     * To sum it up:
     * 1 - [Here]{@link https://caniuse.com/#search=%3A%3Apart} you can see that the `::part` selector is not yet supported,
     *   since it is a working draft.
     * 2 - Following Polymer3 project guidelines, Vaadin used the <dom-module> approach to allow custom styling of element
     *    with the attribute selector ([part="the-part"]) for the ::part spec.
     * 3 - This means that you are not able to style the parts of these components by using traditional CSS,
     *    since the shadow dom prevents you from doing that.
     * 4 - In addition, these modules can be read by the components only (1) if they are placed directly inside the light-dom
     *    of the document, usually inside the body tag and (2) they must be specified BEFORE the FIRST instance of
     *    the component is initialized.
     *
     * Given all these constraints, the only solution is to declare a module before the first instance of the
     * file uploader is declared, and to check for that dom-module presence before inserting the node in the DOM to
     * prevent unwanted duplicates.
     *
     * From here you can then add parts of customization for the styles.
     * Take a look at the example below.
     *
     * @see https://github.com/vaadin/vaadin-themable-mixin#style-scopes
     * @see https://vaadin.com/components/vaadin-upload/html-api/elements/Vaadin.UploadElement
     * @todo Remove the usage of innerHTML and use the document create element API to create the structure, even if it means more code.
     */
    componentWillLoad(): void;
    render(): any;
}
