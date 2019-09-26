import { r as registerInstance, h, H as Host } from './chunk-1851c479.js';
var BadgePosition;
(function (BadgePosition) {
    BadgePosition["TOP_LEFT"] = "TL";
    BadgePosition["TOP_RIGHT"] = "TR";
    BadgePosition["BOTTOM_RIGHT"] = "BR";
    BadgePosition["BOTTOM_LEFT"] = "BL";
})(BadgePosition || (BadgePosition = {}));
var KupBadge = /** @class */ (function () {
    function KupBadge(hostRef) {
        registerInstance(this, hostRef);
        this.position = BadgePosition.TOP_RIGHT;
    }
    KupBadge.prototype.render = function () {
        var text = this.text || '';
        var isTopRight = BadgePosition.TOP_RIGHT === this.position;
        var isBottomRight = BadgePosition.BOTTOM_RIGHT === this.position;
        var isBottomLeft = BadgePosition.BOTTOM_LEFT === this.position;
        var hostClass = {
            'top-left': !isTopRight && !isBottomRight && !isBottomLeft,
            'top-right': isTopRight,
            'bottom-right': isBottomRight,
            'bottom-left': isBottomLeft,
        };
        var badgeClass = {};
        if (!text && this.icon) {
            badgeClass[this.icon] = true;
        }
        return (h(Host, { class: hostClass }, h("div", { id: "badge", class: badgeClass }, text)));
    };
    Object.defineProperty(KupBadge, "style", {
        get: function () { return "\@import url(https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css);:host{--bdg_background-color:var(--kup-badge_background-color,#95a5a6);--bdg_color:var(--kup-badge_color,#fff);--bdg_dim:var(--kup-badge_dimension,20px);position:absolute;max-width:70%}:host #badge{background-color:var(--bdg_background-color);color:var(--bdg_color);padding:0 3px;font-size:11px;border-radius:3px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}:host(.top-right){top:-3px;right:-4px}:host(.top-left){top:-3px;left:-4px}:host(.bottom-right){bottom:-3px;right:-4px}:host(.bottom-left){bottom:-3px;left:-4px}:host(.centered) #badge{-webkit-box-sizing:border-box;box-sizing:border-box;min-width:var(--bdg_dim);height:var(--bdg_dim);border-radius:calc(var(--bdg_dim) / 2)}:host(.centered.top-right){top:-10px;right:-10px}:host(.centered.top-left){top:-10px;left:-10px}:host(.centered.bottom-right){bottom:-10px;right:-10px}:host(.centered.bottom-left){bottom:-10px;left:-10px}"; },
        enumerable: true,
        configurable: true
    });
    return KupBadge;
}());
export { KupBadge as kup_badge };
