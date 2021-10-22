import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    sortDirections: NzTableSortOrder[];
}

export interface JerarquiaModel {
    id: number;
    nivel: number;
    descripcion: string;
    estado: boolean;
}

export interface JerarquiaDTO {
    nivel?: number;
    descripcion?: string;
    estado?: boolean;
}