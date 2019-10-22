export function isBar({ t, p }) {
    return 'J4' === t && 'BAR' === p;
}
export function isButton({ t, p }) {
    return 'J4' === t && 'BTN' === p;
}
export function isCheckbox({ t, p }) {
    return 'V2' === t && 'SI/NO' === p.toUpperCase();
}
export function isDate({ t }) {
    return 'D8' === t;
}
export function isIcon({ t, p }) {
    return 'J4' === t && 'ICO' === p;
}
export function isImage({ t, p }) {
    return 'J4' === t && 'IMG' === p;
}
export function isLink({ t, p }) {
    return 'J1' === t && 'URL' === p;
}
export function isNumber({ t }) {
    return 'NR' === t;
}
export function isProgressBar({ t, p }) {
    return 'J4' === t && 'PGB' === p;
}
export function isVoCodver({ t, p }) {
    return 'VO' === t && 'COD_VER' === p;
}
export function createJ4objButtonConfig(cell) {
    let label = cell.value;
    let textMode = 'Hint';
    let icon = null;
    let flat = true;
    let showtext = false;
    let fillspace = false;
    if (cell.config) {
        const config = cell.config;
        icon = config.icon;
        if (config.hasOwnProperty('showtext')) {
            showtext = config.showtext;
        }
        if (config.hasOwnProperty('fillspace')) {
            fillspace = config.fillspace;
        }
        if (config.hasOwnProperty('flat')) {
            flat = config.flat;
            if (!flat) {
                textMode = '';
            }
        }
        if (config.hasOwnProperty('fillspace')) {
            fillspace = config.fillspace;
        }
    }
    return {
        label,
        textmode: textMode,
        iconClass: icon,
        flat,
        showtext,
        fillspace
    };
}
