import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ColumnItem, NuevoServidorDTO, ServidorModel } from 'src/app/models/servidor';
import { ServidorService } from 'src/app/Servicios/servidor.service';

interface DataItem {
  name: string;
  chinese: number;
  tipo: boolean;
}

@Component({
  selector: 'app-servidor',
  templateUrl: './servidor.component.html',
  styleUrls: ['./servidor.component.css']
})
export class ServidorComponent implements OnInit {

  visible = false;
  searchValue = '';
  //servidorData: NuevoServidorDTO;

  listOfServidor: ServidorModel[] = [];
  listOfData: ServidorModel[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Nombre',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.nombre.localeCompare(b.nombre),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Base de Datos',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.baseDatos.localeCompare(b.baseDatos),
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
    private nzMessageService: NzMessageService,
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

}
