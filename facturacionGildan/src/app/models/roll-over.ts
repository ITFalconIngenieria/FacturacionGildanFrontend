import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    sortDirections: NzTableSortOrder[];
}

export interface RollOverModel {
    id: number;
    fecha: string;
    descripcion: string;
    lecturaAnterior: number;
    lecturaNueva: number;
    estado: boolean;
    medidorId: number;
}

export interface RollOverDTO {
    fecha?: string;
    descripcion?: string;
    lecturaAnterior?: number;
    lecturaNueva?: number;
    estado?: boolean;
    medidorId?: number;
}