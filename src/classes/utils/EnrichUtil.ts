export default class EnrichUtil {
  static addObj(cell: Cell, type: string, param: string, code: string) {
    cell.obj = { t: type, p: param, k: code };

    if (type === "D8") {
      cell.obj = { t: type, p: param, k: cell.value };
      switch (param) {
        case "*YYMD": {
          var y = cell.value.substr(0, 4),
            m = cell.value.substr(4, 2),
            d = cell.value.substr(6, 2);
          cell.value = d + "/" + m + "/" + y;
          break;
        }
        case "*DMYY": {
          (y = cell.value.substr(4, 4)),
            (m = cell.value.substr(2, 2)),
            (d = cell.value.substr(0, 2));
          cell.value = d + "/" + m + "/" + y;
          break;
        }
        case "*MDYY": {
          (y = cell.value.substr(4, 4)),
            (m = cell.value.substr(0, 2)),
            (d = cell.value.substr(2, 2));
          cell.value = d + "/" + m + "/" + y;
          break;
        }
      }
    }
    if (type === "V2") {
      switch (param) {
        case "SI/NO": {
          cell.obj = { t: type, p: param, k: cell.value };
          break;
        }
      }
    }

    return cell;
  }

  static setCellIcon(cell: Cell, icon: string, iconcolor: string) {
    cell.value = icon;
    cell.style = { color: iconcolor };
    return cell;
  }
}
