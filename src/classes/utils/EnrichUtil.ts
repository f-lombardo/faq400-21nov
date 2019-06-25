export default class EnrichUtil {
  static addObj(cell: Cell, type: string, param: string, code: string) {
    cell.obj = { t: type, p: param, k: code };
    return cell;
  }

  static setCellIcon(cell: Cell, icon: string, iconcolor: string) {
    cell.value = icon;
    cell.style = { color: iconcolor };
    return cell;
  }
}
