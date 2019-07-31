export var SortMode;
(function (SortMode) {
    SortMode["A"] = "A";
    SortMode["D"] = "D";
})(SortMode || (SortMode = {}));
export var TotalMode;
(function (TotalMode) {
    TotalMode["COUNT"] = "Count";
    TotalMode["SUM"] = "Sum";
    TotalMode["AVARAGE"] = "Avarage";
})(TotalMode || (TotalMode = {}));
export var PaginatorPos;
(function (PaginatorPos) {
    PaginatorPos["TOP"] = "Top";
    PaginatorPos["BOTTOM"] = "Bottom";
    PaginatorPos["BOTH"] = "Both";
})(PaginatorPos || (PaginatorPos = {}));
export var ShowGrid;
(function (ShowGrid) {
    ShowGrid["NONE"] = "None";
    ShowGrid["ROW"] = "Row";
    ShowGrid["COL"] = "Col";
    ShowGrid["COMPLETE"] = "Complete";
})(ShowGrid || (ShowGrid = {}));
//---- *NEXT functionalit AKA load more ----
export var LoadMoreMode;
(function (LoadMoreMode) {
    LoadMoreMode["CONSTANT"] = "constant";
    LoadMoreMode["CONSTANT_INCREMENT"] = "constant_increment";
    LoadMoreMode["PROGRESSIVE_THRESHOLD"] = "progressive_threshold";
})(LoadMoreMode || (LoadMoreMode = {}));
//---- Sortable Columns Functionality ----
export const KupDataTableColumnDragType = 'text/kup-data-table-column-drag';
