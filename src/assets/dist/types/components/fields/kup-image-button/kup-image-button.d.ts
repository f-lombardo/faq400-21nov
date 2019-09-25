import { EventEmitter } from '../../../stencil.core';
import { Image } from './kup-image-declarations';
export declare class KupImageButton {
    /**
     * urls of the images
     */
    images: Image[];
    /**
     * image dimension
     */
    size: number;
    /**
     * If enabled, display the image description below the image
     */
    showDescription: boolean;
    /**
     * If enabled, can select one or more images
     */
    allowMultiSelection: boolean;
    selectedImages: Image[];
    kupImageButtonSelected: EventEmitter<{
        selectedImages: Image[];
    }>;
    onImageClick(image: Image): void;
    render(): any;
}
