import { BadgePosition } from './kup-image-declarations';
export class KupImage {
    constructor() {
        this.src = '';
        this.alt = '';
        this.width = 64;
        this.height = 64;
    }
    render() {
        let badgesElem = null;
        if (this.badges) {
            badgesElem = this.badges.map((badge) => {
                const text = badge.text || '';
                const isTopRight = BadgePosition.TOP_RIGHT === badge.position;
                const isBottomRight = BadgePosition.BOTTOM_RIGHT === badge.position;
                const isBottomLeft = BadgePosition.BOTTOM_LEFT === badge.position;
                const badgeClass = {
                    badge: true,
                    topLeft: !isTopRight && !isBottomRight && !isBottomLeft,
                    topRight: isTopRight,
                    bottomRight: isBottomRight,
                    bottomLeft: isBottomLeft,
                };
                if (!text && badge.icon) {
                    badgeClass[badge.icon] = badge.icon;
                }
                return h("span", { class: badgeClass }, text);
            });
        }
        return (h("div", { id: "image-wrapper" },
            h("img", { src: this.src, alt: this.alt, width: this.width, height: this.height }),
            badgesElem));
    }
    static get is() { return "kup-image"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "alt": {
            "type": String,
            "attr": "alt"
        },
        "badges": {
            "type": "Any",
            "attr": "badges"
        },
        "height": {
            "type": Number,
            "attr": "height"
        },
        "src": {
            "type": String,
            "attr": "src"
        },
        "width": {
            "type": Number,
            "attr": "width"
        }
    }; }
    static get style() { return "/**style-placeholder:kup-image:**/"; }
}
