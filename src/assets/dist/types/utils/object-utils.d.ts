import { Cell } from "../components/kup-data-table/kup-data-table-declarations";
interface CellObject {
    t: string;
    p: string;
}
export interface J4objKupButtonConfig {
    flat: boolean;
    iconClass: string;
    label: string;
    textmode: string;
    showtext: boolean;
    fillspace: boolean;
}
export declare function isBar({ t, p }: CellObject): boolean;
export declare function isButton({ t, p }: CellObject): boolean;
export declare function isCheckbox({ t, p }: CellObject): boolean;
export declare function isDate({ t }: CellObject): boolean;
export declare function isIcon({ t, p }: CellObject): boolean;
export declare function isImage({ t, p }: CellObject): boolean;
export declare function isLink({ t, p }: CellObject): boolean;
export declare function isNumber({ t }: CellObject): boolean;
export declare function isProgressBar({ t, p }: CellObject): boolean;
export declare function isVoCodver({ t, p }: CellObject): boolean;
export declare function createJ4objButtonConfig(cell: Cell): J4objKupButtonConfig;
export {};
