import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    sortDirections: NzTableSortOrder[];
}

export interface ConsumibleModel {
    id: number;
    nombre: string;
    estado: boolean;
}

export interface ConsumibleDTO {
    nombre?: string;
    estado?: boolean;
}