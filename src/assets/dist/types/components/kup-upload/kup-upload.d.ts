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
    ketchupFileUploaded: EventEmitter<{
        message: string;
    }>;
    /**
     * Launched when file upload fail
     */
    ketchupFileRejected: EventEmitter<{
        message: string;
    }>;
    render(): any;
}
