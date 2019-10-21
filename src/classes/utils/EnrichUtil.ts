export default class EnrichUtil {
  static addObj(object: any, type: string, param: string, code: string) {
    object.obj = { t: type, p: param, k: code };

    if (type === "D8") {
      object.obj = { t: type, p: param, k: object.value };
      switch (param) {
        case "*YYMD": {
          var y = object.value.substr(0, 4),
            m = object.value.substr(4, 2),
            d = object.value.substr(6, 2);
          object.value = d + "/" + m + "/" + y;
          break;
        }
        case "*DMYY": {
          (y = object.value.substr(4, 4)),
            (m = object.value.substr(2, 2)),
            (d = object.value.substr(0, 2));
          object.value = d + "/" + m + "/" + y;
          break;
        }
        case "*MDYY": {
          (y = object.value.substr(4, 4)),
            (m = object.value.substr(0, 2)),
            (d = object.value.substr(2, 2));
          object.value = d + "/" + m + "/" + y;
          break;
        }
      }
    }
    if (type === "V2") {
      switch (param) {
        case "SI/NO": {
          object.obj = { t: type, p: param, k: object.value };
          break;
        }
      }
    }

    return object;
  }

  static setCellIcon(cell: Cell, icon: string, iconcolor: string) {
    cell.value = icon;
    cell.style = { color: iconcolor };
    return cell;
  }
}
