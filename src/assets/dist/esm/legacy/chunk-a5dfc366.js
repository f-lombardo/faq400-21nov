function isBar(_a) {
    var t = _a.t, p = _a.p;
    return 'J4' === t && 'BAR' === p;
}
function isButton(_a) {
    var t = _a.t, p = _a.p;
    return 'J4' === t && 'BTN' === p;
}
function isCheckbox(_a) {
    var t = _a.t, p = _a.p;
    return 'V2' === t && 'SI/NO' === p.toUpperCase();
}
function isDate(_a) {
    var t = _a.t;
    return 'D8' === t;
}
function isIcon(_a) {
    var t = _a.t, p = _a.p;
    return 'J4' === t && 'ICO' === p;
}
function isImage(_a) {
    var t = _a.t, p = _a.p;
    return 'J4' === t && 'IMG' === p;
}
function isLink(_a) {
    var t = _a.t, p = _a.p;
    return 'J1' === t && 'URL' === p;
}
function isNumber(_a) {
    var t = _a.t;
    return 'NR' === t;
}
function isProgressBar(_a) {
    var t = _a.t, p = _a.p;
    return 'J4' === t && 'PGB' === p;
}
function isVoCodver(_a) {
    var t = _a.t, p = _a.p;
    return 'VO' === t && 'COD_VER' === p;
}
function createJ4objButtonConfig(cell) {
    var label = cell.value;
    var textMode = 'Hint';
    var icon = null;
    var flat = true;
    var showtext = false;
    var fillspace = false;
    if (cell.config) {
        var config = cell.config;
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
        label: label,
        textmode: textMode,
        iconClass: icon,
        flat: flat,
        showtext: showtext,
        fillspace: fillspace
    };
}
export { isButton as a, isCheckbox as b, isIcon as c, isImage as d, isLink as e, isNumber as f, isVoCodver as g, createJ4objButtonConfig as h, isBar as i, isDate as j, isProgressBar as k };
