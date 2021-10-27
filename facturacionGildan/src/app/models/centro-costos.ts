import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    sortDirections: NzTableSortOrder[];
}

export interface CentroCostosModel {
    id: number;
    descripcion: string;
    estado: boolean;
}

export interface CentroCostosDTO {
    descripcion?: string;
    estado?: boolean;
}