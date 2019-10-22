'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-c31c1549.js');

class KupImageButton {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
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
        this.kupImageButtonSelected = __chunk_1.createEvent(this, "kupImageButtonSelected", 7);
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
                return (__chunk_1.h("div", { class: divClass, onClick: () => this.onImageClick(image), style: divStyle }, __chunk_1.h("img", { src: image.src, title: image.description }), this.showDescription ? image.description : null, __chunk_1.h("div", { class: "overlay" })));
            });
        }
        return __chunk_1.h("div", { id: "container" }, imagesJsx);
    }
    static get style() { return ":host{--imb_color:var(--kup-imb_color,#545454)}#container{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;color:var(--imb_color)}#container>div{margin:0 3px;position:relative;text-align:center;padding:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#container>div>img{display:block;width:100%;height:100%}#container>div>.overlay{position:absolute;top:0;left:0;opacity:0;-webkit-transition:opacity .25s linear;transition:opacity .25s linear;background-color:#000;width:100%;height:100%}#container>div.selected>.overlay,#container>div:hover>.overlay{-webkit-transition:opacity .25s linear;transition:opacity .25s linear;opacity:.6}"; }
}

exports.kup_image_button = KupImageButton;
