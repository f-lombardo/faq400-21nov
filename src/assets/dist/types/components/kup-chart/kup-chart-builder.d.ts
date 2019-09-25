import { Column, DataTable } from '../kup-data-table/kup-data-table-declarations';
export declare const convertColumns: (data: DataTable, { series, axis }: {
    series: any;
    axis: any;
}) => Column[];
export declare const convertRows: (data: any, columns: Column[], showMarks: boolean) => any[];
