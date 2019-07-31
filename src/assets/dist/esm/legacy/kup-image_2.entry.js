import { r as registerInstance, h } from './chunk-1851c479.js';
var KupImage = /** @class */ (function () {
    function KupImage(hostRef) {
        registerInstance(this, hostRef);
        this.src = '';
        this.alt = '';
        this.width = 64;
        this.height = 64;
    }
    KupImage.prototype.render = function () {
        var badgesElem = null;
        if (this.badges) {
            badgesElem = this.badges.map(function (badge) {
                return (h("kup-badge", { text: badge.text, position: badge.position, icon: badge.icon }));
            });
        }
        var wrapperStyle = {
            width: this.width + "px",
            height: this.height + "px",
        };
        return (h("div", { id: "image-wrapper", style: wrapperStyle }, h("img", { src: this.src, alt: this.alt }), badgesElem));
    };
    Object.defineProperty(KupImage, "style", {
        get: function () { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);*{-webkit-box-sizing:border-box;box-sizing:border-box}#image-wrapper{position:relative;display:inline-block}#image-wrapper img{width:100%;height:100%}"; },
        enumerable: true,
        configurable: true
    });
    return KupImage;
}());
var KupProgressBar = /** @class */ (function () {
    function KupProgressBar(hostRef) {
        registerInstance(this, hostRef);
        this.value = 0;
        this.hideLabel = false;
    }
    KupProgressBar.prototype.render = function () {
        var valueStyle = {
            width: this.value + "%",
        };
        var label = null;
        if (!this.hideLabel) {
            if (this.labelText) {
                label = this.labelText;
            }
            else {
                label = this.value + '%';
            }
        }
        return (h("div", { id: "progress-bar" }, h("div", { id: "progress-bar-percentage", style: valueStyle }, h("span", null, label))));
    };
    Object.defineProperty(KupProgressBar, "style", {
        get: function () { return ":host{--pgb_background-color:var(--kup-pb_background-color,#ccc);--pgb_foreground-color:var(--kup-pb_foreground-color,#3063a5);--pgb_text-color:var(--kup-pb_text-color,#fff)}#progress-bar{width:100%;background:var(--pgb_background-color);position:relative;border-radius:5px}#progress-bar #progress-bar-percentage{background:var(--pgb_foreground-color);padding:5px 0;color:#fff;text-align:center;height:18px;border-radius:5px}#progress-bar #progress-bar-percentage span{display:inline-block;position:absolute;width:100%;left:0;line-height:18px;font-size:12px}"; },
        enumerable: true,
        configurable: true
    });
    return KupProgressBar;
}());
export { KupImage as kup_image, KupProgressBar as kup_progress_bar };
