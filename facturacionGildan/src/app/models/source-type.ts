import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    sortDirections: NzTableSortOrder[];
}

export interface SourceTypeModel {
    id: number;
    descripcion: string;
    estado: boolean;
}

export interface SourceTypeDTO {
    descripcion?: string;
    estado?: boolean;
}