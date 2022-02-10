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
    expand: boolean;
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

export interface MedidorDetalle {
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
    expand: boolean;
    detalle: any;
}

export interface DetalleMedidorModel {
    id: number;
    medidorId: number;
    plantaId: number;
    unidad: string;
    unidadConversion: number;
    jerarquiaId: number;
    consumibleId: number;
    centroCostoId: number;
    porcentaje: number;
    biomasa: number;
    fechaI: string;
    fechaF: string;
    lectura: boolean;
    operacion: boolean;
    estado: boolean;
}

export interface DetalleMedidorDTO {
    medidorId?: number;
    plantaId?: number;
    unidad?: string;
    unidadConversion?: number;
    jerarquiaId?: number;
    consumibleId?: number;
    centroCostosId?: number;
    porcentaje?: number;
    biomasa?: number;
    fechaInicial?: string;
    fechaFinal?: string;
    lectura?: boolean;
    operacion?: boolean;
    estado?: boolean;
}