import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { ColumnItem, NuevoServidorDTO, ServidorModel } from 'src/app/models/servidor';
import { ServidorService } from 'src/app/Servicios/servidor.service';
import { UiServiceService } from 'src/app/Servicios/ui-service.service';

interface DataItem {
  name: string;
  chinese: number;
  tipo: boolean;
}

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-servidor',
  templateUrl: './servidor.component.html',
  styleUrls: ['./servidor.component.css']
})
export class ServidorComponent implements OnInit {

  visible = false;
  searchValue = '';
  isVisibleModal = false;
  //servidorData: NuevoServidorDTO;

  listOfServidor: ServidorModel[] = [];
  listOfData: ServidorModel[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Nombre',
      sortOrder: null,
      sortFn: (a: ServidorModel, b: ServidorModel) => a.nombre.localeCompare(b.nombre),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Base de datos',
      sortOrder: null,
      sortFn: (a: ServidorModel, b: ServidorModel) => a.baseDatos.localeCompare(b.baseDatos),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Estado',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.estado - b.estado,
      sortDirections: ['ascend', 'descend', null],
    }
  ];

  constructor(
    private fb: FormBuilder,
    private uiService: UiServiceService,
    private servidorService: ServidorService
  ) { }

  ngOnInit(): void {
    this.getServidores();
  }

  getServidores() {
    this.servidorService.getServidores().toPromise().then(
      (data: any) => {
        //console.log(data);
        this.listOfServidor = data;
        this.listOfData = [...this.listOfServidor];
      }
    );
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfData = this.listOfServidor.filter((item: ServidorModel) => item.nombre.indexOf(this.searchValue) !== -1);

    if(this.listOfData.length == 0) {
      //console.log('Entro al IF');
      this.listOfData = this.listOfServidor.filter((item: ServidorModel) => item.baseDatos.indexOf(this.searchValue) !== -1);
    }
  }

  cancelDeleteItem(): void {
    this.uiService.createMessage('info', 'Su registro sigue activo.');
  }

  confirmDeleteItem(): void {
    this.uiService.createMessage('success', 'El registro fue eliminado con éxito.');
  }

  showModal(): void {
    this.isVisibleModal = true;
  }

  handleOkModalFormServidor(): void {
    console.log('Button ok clicked!');
    this.isVisibleModal = false;
  }

  handleCancelModalFormServidor(): void {
    console.log('Button cancel clicked!');
    this.isVisibleModal = false;
  }

}
