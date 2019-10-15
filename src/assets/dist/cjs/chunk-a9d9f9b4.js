'use strict';

const __chunk_3 = require('./chunk-4f8b617c.js');

function formatToNumber(cell) {
    if (cell.obj) {
        return __chunk_3.numeral(cell.obj.k).value();
    }
    return __chunk_3.numeral(cell.value).value();
}
function formatToMomentDate(cell) {
    let format = 'YYYYMMDD';
    if (cell.obj) {
        const obj = cell.obj;
        if ('D8' === obj.t && '*DMYY' === obj.p) {
            format = 'DDMMYYYY';
        }
        return __chunk_3.moment(cell.obj.k, format);
    }
    return __chunk_3.moment(cell.value, 'DD/MM/YYYY');
}

exports.formatToMomentDate = formatToMomentDate;
exports.formatToNumber = formatToNumber;
