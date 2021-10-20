import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    sortDirections: NzTableSortOrder[];
}

export interface ServidorModel {
    id: number;
    nombre: string;
    baseDatos: string;
    estado: boolean;
}

export interface ServidorDTO {
    nombre?: string;
    baseDatos?: string;
    estado?: boolean;
}