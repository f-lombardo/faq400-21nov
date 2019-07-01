interface CellObject {
    t: string;
    p: string;
}
export declare function isBar({ t, p }: CellObject): boolean;
export declare function isButton({ t, p }: CellObject): boolean;
export declare function isIcon({ t, p }: CellObject): boolean;
export declare function isImage({ t, p }: CellObject): boolean;
export declare function isLink({ t, p }: CellObject): boolean;
export declare function isNumber({ t }: CellObject): boolean;
export declare function isProgressBar({ t, p }: CellObject): boolean;
export declare function isVoCodver({ t, p }: CellObject): boolean;
export {};
