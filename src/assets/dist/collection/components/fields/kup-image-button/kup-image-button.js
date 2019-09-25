import { h } from '@stencil/core';
export class KupImageButton {
    constructor() {
        /**
         * urls of the images
         */
        this.images = [];
        /**
         * image dimension
         */
        this.size = 64;
        /**
         * If enabled, display the image description below the image
         */
        this.showDescription = false;
        /**
         * If enabled, can select one or more images
         */
        this.allowMultiSelection = false;
        this.selectedImages = [];
    }
    // ---- Listeners ----
    onImageClick(image) {
        const imageIndex = this.selectedImages.indexOf(image);
        if (this.allowMultiSelection) {
            if (imageIndex >= 0) {
                this.selectedImages.splice(imageIndex, 1);
            }
            else {
                this.selectedImages.push(image);
            }
            this.selectedImages = [...this.selectedImages];
        }
        else {
            // check if array already contains the image
            if (imageIndex >= 0) {
                this.selectedImages = [];
            }
            else {
                this.selectedImages = [image];
            }
        }
        this.kupImageButtonSelected.emit({
            selectedImages: this.selectedImages,
        });
    }
    render() {
        let imagesJsx = null;
        if (this.images.length > 0) {
            imagesJsx = this.images.map((image) => {
                const divClass = {
                    selected: this.selectedImages.includes(image),
                };
                const divStyle = {
                    width: `${this.size}px`,
                };
                return (h("div", { class: divClass, onClick: () => this.onImageClick(image), style: divStyle },
                    h("img", { src: image.src, title: image.description }),
                    this.showDescription ? image.description : null,
                    h("div", { class: "overlay" })));
            });
        }
        return h("div", { id: "container" }, imagesJsx);
    }
    static get is() { return "kup-image-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["kup-image-button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["kup-image-button.css"]
    }; }
    static get properties() { return {
        "images": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Image[]",
                "resolved": "Image[]",
                "references": {
                    "Image": {
                        "location": "import",
                        "path": "./kup-image-declarations"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "urls of the images"
            },
            "defaultValue": "[]"
        },
        "size": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "image dimension"
            },
            "attribute": "size",
            "reflect": true,
            "defaultValue": "64"
        },
        "showDescription": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If enabled, display the image description below the image"
            },
            "attribute": "show-description",
            "reflect": true,
            "defaultValue": "false"
        },
        "allowMultiSelection": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If enabled, can select one or more images"
            },
            "attribute": "allow-multi-selection",
            "reflect": true,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "selectedImages": {}
    }; }
    static get events() { return [{
            "method": "kupImageButtonSelected",
            "name": "kupImageButtonSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "{\n        selectedImages: Image[];\n    }",
                "resolved": "{ selectedImages: Image[]; }",
                "references": {
                    "Image": {
                        "location": "import",
                        "path": "./kup-image-declarations"
                    }
                }
            }
        }]; }
}
