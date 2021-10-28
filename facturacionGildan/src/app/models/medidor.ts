import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    sortDirections: NzTableSortOrder[];
}

export interface MedidorModel {
    id: number;
    codigo: string;
    referenciaId: number;
    descripcion: string;
    ubicacion: string;
    multiplicador: number;
    formula: string;
    estado: boolean;
    servidorId: number;
    sourceTypeId: number;
}

export interface MedidorDTO {
    codigo?: string;
    referenciaId?: number;
    descripcion?: string;
    ubicacion?: string;
    multiplicador?: number;
    formula?: string;
    estado?: boolean;
    servidorId?: number;
    sourceTypeId?: number;
}