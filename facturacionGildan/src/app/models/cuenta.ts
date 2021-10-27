import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    sortDirections: NzTableSortOrder[];
}

export interface CuentaModel {
    id: number;
    descripcion: string;
    codigo: number;
    estado: boolean;
}

export interface CuentaDTO {
    descripcion?: string;
    codigo?: number;
    estado?: boolean;
}