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
    render(): any;
}
