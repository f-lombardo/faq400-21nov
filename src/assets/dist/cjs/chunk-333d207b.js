'use strict';

function isBar({ t, p }) {
    return 'J4' === t && 'BAR' === p;
}
function isButton({ t, p }) {
    return 'J4' === t && 'BTN' === p;
}
function isCheckbox({ t, p }) {
    return 'V2' === t && 'SI/NO' === p.toUpperCase();
}
function isDate({ t }) {
    return 'D8' === t;
}
function isIcon({ t, p }) {
    return 'J4' === t && 'ICO' === p;
}
function isImage({ t, p }) {
    return 'J4' === t && 'IMG' === p;
}
function isLink({ t, p }) {
    return 'J1' === t && 'URL' === p;
}
function isNumber({ t }) {
    return 'NR' === t;
}
function isProgressBar({ t, p }) {
    return 'J4' === t && 'PGB' === p;
}
function isVoCodver({ t, p }) {
    return 'VO' === t && 'COD_VER' === p;
}
function createJ4objButtonConfig(cell) {
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

exports.createJ4objButtonConfig = createJ4objButtonConfig;
exports.isBar = isBar;
exports.isButton = isButton;
exports.isCheckbox = isCheckbox;
exports.isDate = isDate;
exports.isIcon = isIcon;
exports.isImage = isImage;
exports.isLink = isLink;
exports.isNumber = isNumber;
exports.isProgressBar = isProgressBar;
exports.isVoCodver = isVoCodver;
