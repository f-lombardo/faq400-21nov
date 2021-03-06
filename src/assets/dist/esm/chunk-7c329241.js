import { m as moment, n as numeral } from './chunk-93a43134.js';

function formatToNumber(cell) {
    if (cell.obj) {
        return numeral(cell.obj.k).value();
    }
    return numeral(cell.value).value();
}
function formatToMomentDate(cell) {
    let format = 'YYYYMMDD';
    if (cell.obj) {
        const obj = cell.obj;
        if ('D8' === obj.t && '*DMYY' === obj.p) {
            format = 'DDMMYYYY';
        }
        return moment(cell.obj.k, format);
    }
    return moment(cell.value, 'DD/MM/YYYY');
}

export { formatToNumber as a, formatToMomentDate as f };
