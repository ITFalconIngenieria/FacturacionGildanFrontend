import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    sortDirections: NzTableSortOrder[];
}

export interface PlantaModel {
    id: number;
    nombre: string;
    codigo: string;
    estado: boolean;
}

export interface PlantaDTO {
    nombre?: string;
    codigo?: string;
    estado?: boolean;
}