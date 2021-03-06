import { r as registerInstance, c as createEvent, h } from './chunk-1851c479.js';
var KupImageButton = /** @class */ (function () {
    function KupImageButton(hostRef) {
        registerInstance(this, hostRef);
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
        this.kupImageButtonSelected = createEvent(this, "kupImageButtonSelected", 7);
    }
    // ---- Listeners ----
    KupImageButton.prototype.onImageClick = function (image) {
        var imageIndex = this.selectedImages.indexOf(image);
        if (this.allowMultiSelection) {
            if (imageIndex >= 0) {
                this.selectedImages.splice(imageIndex, 1);
            }
            else {
                this.selectedImages.push(image);
            }
            this.selectedImages = this.selectedImages.slice();
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
    };
    KupImageButton.prototype.render = function () {
        var _this = this;
        var imagesJsx = null;
        if (this.images.length > 0) {
            imagesJsx = this.images.map(function (image) {
                var divClass = {
                    selected: _this.selectedImages.includes(image),
                };
                var divStyle = {
                    width: _this.size + "px",
                };
                return (h("div", { class: divClass, onClick: function () { return _this.onImageClick(image); }, style: divStyle }, h("img", { src: image.src, title: image.description }), _this.showDescription ? image.description : null, h("div", { class: "overlay" })));
            });
        }
        return h("div", { id: "container" }, imagesJsx);
    };
    Object.defineProperty(KupImageButton, "style", {
        get: function () { return ":host{--imb_color:var(--kup-imb_color,#545454)}#container{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;color:var(--imb_color)}#container>div{margin:0 3px;position:relative;text-align:center;padding:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#container>div>img{display:block;width:100%;height:100%}#container>div>.overlay{position:absolute;top:0;left:0;opacity:0;-webkit-transition:opacity .25s linear;transition:opacity .25s linear;background-color:#000;width:100%;height:100%}#container>div.selected>.overlay,#container>div:hover>.overlay{-webkit-transition:opacity .25s linear;transition:opacity .25s linear;opacity:.6}"; },
        enumerable: true,
        configurable: true
    });
    return KupImageButton;
}());
export { KupImageButton as kup_image_button };
