import numeral from 'numeral';
import moment from 'moment';
import { TotalMode, } from './kup-data-table-declarations';
export function sortRows(rows = [], sort = []) {
    if (!rows) {
        return [];
    }
    if (!sort || sort.length === 0) {
        return rows;
    }
    const isMultiSort = sort.length > 1;
    return rows.slice(0).sort((r1, r2) => {
        if (isMultiSort) {
            for (let i = 0; i < sort.length; i++) {
                const compare = compareRows(r1, r2, sort[i]);
                if (compare !== 0) {
                    return compare;
                }
            }
            return 0;
        }
        else {
            return compareRows(r1, r2, sort[0]);
        }
    });
}
function compareRows(r1, r2, sortObj) {
    if (r1.group) {
        r1.group.children = sortRows(r1.group.children);
        r2.group.children = sortRows(r2.group.children);
        if (r1.group.column !== sortObj.column) {
            return 0;
        }
        const group1 = r1.group.label;
        const group2 = r2.group.label;
        const sm = sortObj.sortMode === 'A' ? 1 : -1;
        return sm * group1.localeCompare(group2);
    }
    else {
        const cell1 = r1.cells[sortObj.column];
        const cell2 = r2.cells[sortObj.column];
        return compareCell(cell1, cell2, sortObj.sortMode);
    }
}
export function filterRows(rows = [], filters = {}, globalFilter = '', columns = []) {
    if (!rows) {
        return [];
    }
    if ((filters && Object.keys(filters).length > 0) ||
        (globalFilter && columns)) {
        let keys;
        if (filters) {
            keys = Object.keys(filters);
        }
        else {
            keys = [];
        }
        return rows.filter((r) => {
            if (globalFilter && columns) {
                if (columns.length === 0) {
                    return true;
                }
                let found = false;
                for (let i = 0; i < columns.length; i++) {
                    const c = columns[i];
                    const cellValue = r.cells[c].value;
                    if (cellValue
                        .toLowerCase()
                        .includes(globalFilter.toLocaleLowerCase())) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    return false;
                }
            }
            if (keys.length === 0) {
                return true;
            }
            return (keys.filter((key) => {
                const filterValue = filters[key];
                const cellValue = r.cells[key];
                if (!cellValue || !cellValue.value) {
                    return false;
                }
                if (cellValue.value
                    .toLowerCase()
                    .includes(filterValue.toLowerCase())) {
                    return true;
                }
            }).length === keys.length);
        });
    }
    return rows;
}
export function groupRows(rows = [], groups = [], totals = {}) {
    if (!rows) {
        return [];
    }
    if (!groups || groups.length === 0) {
        return rows;
    }
    const groupRows = [];
    rows.forEach((row) => {
        const columnName = groups[0].column;
        const cellValue = row.cells[columnName].value;
        let groupRow = null;
        for (let i = 0; i < groupRows.length; i++) {
            const currentGroupRow = groupRows[i];
            if (currentGroupRow.group.label === cellValue) {
                groupRow = currentGroupRow;
                break;
            }
        }
        if (groupRow === null) {
            groupRow = {
                group: {
                    id: cellValue,
                    parent: null,
                    column: columnName,
                    expanded: false,
                    label: cellValue,
                    children: [],
                    totals: {},
                },
                cells: {},
            };
            groupRows.push(groupRow);
        }
        for (let i = 1; i < groups.length; i++) {
            const group = groups[i];
            const tempCellValue = row.cells[group.column].value;
            let tempGroupingRow = null;
            for (let j = 0; j < groupRow.group.children.length; j++) {
                const childGroup = groupRow.group.children[j];
                const groupLabel = childGroup.group.label;
                if (groupLabel === tempCellValue) {
                    tempGroupingRow = childGroup;
                    break;
                }
            }
            if (!tempGroupingRow) {
                tempGroupingRow = {
                    cells: {},
                    group: {
                        id: tempCellValue,
                        parent: groupRow,
                        column: group.column,
                        children: [],
                        expanded: false,
                        label: tempCellValue,
                        totals: {},
                    },
                };
                adjustGroupId(tempGroupingRow);
                groupRow.group.children.push(tempGroupingRow);
            }
            groupRow = tempGroupingRow;
        }
        groupRow.group.children.push(row);
        updateGroupTotal(groupRow, totals, row);
    });
    adjustGroupsAvarage(groupRows, totals);
    return groupRows;
}
function updateGroupTotal(groupRow, totals, addedRow) {
    if (!groupRow || !totals) {
        return;
    }
    const keys = Object.keys(totals);
    if (keys.length === 0) {
        return;
    }
    keys.forEach((key) => {
        const currentTotalValue = groupRow.group.totals[key] || 0;
        const cell = addedRow.cells[key];
        const isNumber = cell.obj.t === 'NR';
        const totalMode = totals[key];
        switch (totalMode) {
            case TotalMode.COUNT:
                groupRow.group.totals[key] = currentTotalValue + 1;
                let parent = groupRow.group.parent;
                while (parent != null) {
                    const currentParentCount = parent.group.totals[key] || 0;
                    parent.group.totals[key] = currentParentCount + 1;
                    parent = parent.group.parent;
                }
                break;
            case TotalMode.SUM:
            case TotalMode.AVARAGE:
                if (isNumber) {
                    const cellValue = numeral(cell.obj.k);
                    groupRow.group.totals[key] = cellValue
                        .add(currentTotalValue)
                        .value();
                    let parent = groupRow.group.parent;
                    while (parent != null) {
                        const currentParentSum = parent.group.totals[key] || 0;
                        parent.group.totals[key] = cellValue
                            .add(currentParentSum)
                            .value();
                        parent = parent.group.parent;
                    }
                }
                break;
            default:
                console.warn(`invalid total mode: ${totalMode}`);
                break;
        }
    });
}
function adjustGroupsAvarage(groupRows, totals) {
    if (!groupRows || !totals) {
        return;
    }
    const keys = Object.keys(totals);
    if (groupRows.length === 0 || !groupRows[0].group || keys.length === 0) {
        return;
    }
    const avarageKeys = keys.filter((key) => TotalMode.AVARAGE === totals[key]);
    if (avarageKeys.length > 0) {
        groupRows
            .filter((groupRow) => groupRow.group.children.length > 0)
            .forEach((groupRow) => adjustGroupAvarage(groupRow, avarageKeys));
    }
}
function adjustGroupAvarage(row, avarage) {
    const children = row.group.children;
    if (children.length === 0) {
        return 0;
    }
    let numberOfLeaf = 0;
    if (children[0].group) {
        children.forEach((child) => {
            numberOfLeaf += adjustGroupAvarage(child, avarage);
        });
        avarage.forEach((avarageKey) => {
            row.group.totals[avarageKey] = numeral(row.group.totals[avarageKey])
                .divide(numberOfLeaf)
                .value();
        });
    }
    else {
        numberOfLeaf = children.length;
        avarage.forEach((avarageKey) => {
            row.group.totals[avarageKey] = numeral(row.group.totals[avarageKey])
                .divide(row.group.children.length)
                .value();
        });
    }
    return numberOfLeaf;
}
export function calcTotals(rows = [], totals = {}) {
    if (!rows || !totals) {
        return {};
    }
    const keys = Object.keys(totals);
    const footerRow = {};
    let onlyCount = keys.length === 0 &&
        keys.every((key) => totals[key] === TotalMode.COUNT);
    if (onlyCount) {
        keys.forEach((columnName) => (footerRow[columnName] = rows.length));
    }
    else {
        rows.forEach((r) => {
            keys.filter((key) => TotalMode.COUNT !== totals[key]).forEach((key) => {
                const cell = r.cells[key];
                if (cell.obj.t === 'NR') {
                    const cellValue = numeral(cell.obj.k);
                    const currentFooterValue = footerRow[key] || 0;
                    footerRow[key] = cellValue
                        .add(currentFooterValue)
                        .value();
                }
            });
        });
        for (let key of keys) {
            if (totals[key] === TotalMode.AVARAGE) {
                const sum = footerRow[key];
                if (sum && rows.length > 0) {
                    footerRow[key] = numeral(sum)
                        .divide(rows.length)
                        .value();
                }
            }
            else if (totals[key] === TotalMode.COUNT) {
                footerRow[key] = rows.length;
            }
        }
    }
    return footerRow;
}
function compareCell(cell1, cell2, sortMode) {
    const sm = sortMode === 'A' ? 1 : -1;
    const obj1 = cell1.obj;
    const obj2 = cell2.obj;
    if (!(obj1.t === obj2.t && obj1.p === obj2.p)) {
        let compare = obj1.t.localeCompare(obj2.t);
        if (compare === 0) {
            compare = obj1.p.localeCompare(obj2.p);
        }
        return compare;
    }
    if ('NR' === obj1.t) {
        const n1 = numeral(obj1.k).value();
        const n2 = numeral(obj2.k).value();
        if (n1 === n2) {
            return 0;
        }
        if (n1 > n2) {
            return sm * 1;
        }
        else {
            return sm * -1;
        }
    }
    if ('D8' === obj1.t) {
        let m1;
        let m2;
        if (obj1.p === '*YYMD') {
            m1 = moment(obj1.k, 'YYYYMMDD');
            m2 = moment(obj2.k, 'YYYYMMDD');
        }
        else if (obj1.p === '*DMYY') {
            m1 = moment(obj1.k, 'DDMMYYYY');
            m2 = moment(obj2.k, 'DDMMYYYY');
        }
        else {
            return obj1.k.localeCompare(obj2.k);
        }
        if (m1.isSame(m2)) {
            return 0;
        }
        if (m1.isBefore(m2)) {
            return sm * -1;
        }
        else {
            return sm * 1;
        }
    }
    let value1 = cell1.value;
    let value2 = cell2.value;
    return sm * value1.localeCompare(value2);
}
function adjustGroupId(row) {
    if (!row.group) {
        return;
    }
    let groupID = row.group.id;
    let parentRow = row.group.parent;
    while (parentRow !== null) {
        groupID = `${parentRow.group.id};${groupID}`;
        parentRow = parentRow.group.parent;
    }
    row.group.id = groupID;
}
